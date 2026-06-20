# Redis setup

In a config file like `src/config/redis.ts` do:

```ts
import { createClient } from "redis";
import { logger } from "./logger"; // فرض بر این که logger دارید

const redisClient = createClient({
  socket: {
    host: process.env.REDIS_HOST || "localhost",
    port: parseInt(process.env.REDIS_PORT || "6379"),
  },
});

redisClient.on("error", (err) => {
  logger.error("Redis Client Error", err);
});

redisClient.on("connect", () => {
  logger.info("Redis connected successfully");
});

export async function connectRedis() {
  if (!redisClient.isOpen) {
    await redisClient.connect();
  }
}

export async function disconnectRedis() {
  if (redisClient.isOpen) {
    await redisClient.quit();
  }
}

export default redisClient;
```

Then in your `server.ts` file of a ExpressJS file structure:

```ts
import express from "express";
import dotenv from "dotenv";
import { connectRedis, disconnectRedis } from "./config/redis";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Your middlewares and routes...

async function startServer() {
  try {
    // Connect to Redis
    await connectRedis();

    // Connect to PostgreSQL (existing code)
    // await connectDB();

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
}

// Graceful shutdown
process.on("SIGTERM", async () => {
  await disconnectRedis();
  process.exit(0);
});

startServer();
```

# Using Redis for OTP login process

Here is an example where you can use a tool like Redis to store and validate OTP login process. Create an OTP service class:

```ts
import redisClient from "../config/redis";

const OTP_EXPIRY = 120; // 2 minutes

export class OtpService {
  private getKey(phoneNumber: string): string {
    return `otp:${phoneNumber}`;
  }

  async sendOtp(phoneNumber: string): Promise<{
    status: number;
    message: string;
    remainingTime?: number;
  }> {
    const key = this.getKey(phoneNumber);

    // Check if unexpired OTP exists
    const existingOtp = await redisClient.get(key);
    if (existingOtp) {
      const ttl = await redisClient.ttl(key);
      return {
        status: 429,
        message: `کد قبلا ارسال شده. لطفا ${ttl} ثانیه صبر کنید`,
        remainingTime: ttl,
      };
    }

    // Generate OTP
    const otpCode = this.generateOtp();

    // Store in Redis with expiry
    await redisClient.setEx(key, OTP_EXPIRY, otpCode);

    // Send via SMS API (your existing implementation)
    // await sendOtpSms(phoneNumber, otpCode);

    return {
      status: 200,
      message: "کد با موفقیت ارسال شد",
    };
  }

  async verifyOtp(
    phoneNumber: string,
    otpCode: string,
  ): Promise<{
    success: boolean;
    message: string;
  }> {
    const key = this.getKey(phoneNumber);
    const storedOtp = await redisClient.get(key);

    if (!storedOtp) {
      return {
        success: false,
        message: "کد منقضی شده یا یافت نشد",
      };
    }

    if (storedOtp !== otpCode) {
      return {
        success: false,
        message: "کد وارد شده اشتباه است",
      };
    }

    // Delete after successful verification
    await redisClient.del(key);

    return {
      success: true,
      message: "کد با موفقیت تایید شد",
    };
  }

  private generateOtp(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }
}

export const otpService = new OtpService();
```

Then in your authentication controller:

```ts
import { Request, Response } from "express";
import { otpService } from "../services/otp.service";

export async function sendOtpHandler(req: Request, res: Response) {
  const { phone_number } = req.body;

  const result = await otpService.sendOtp(phone_number);

  return res.status(result.status).json(result);
}

export async function verifyOtpHandler(req: Request, res: Response) {
  const { phone_number, otp_code } = req.body;

  const result = await otpService.verifyOtp(phone_number, otp_code);

  return res.status(result.success ? 200 : 400).json(result);
}
```

# Docker compose setup

In an ExpressJS backend application that uses Redis use this as your `docker-compose.yaml` file:

```yaml
services:
  exprezz-db:
    image: postgres:16-alpine
    restart: always
    env_file:
      - .env
    ports:
      - "5432:5432"
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: ${POSTGRES_PASSWORD}
      POSTGRES_DB: exprezz-db
    volumes:
      - exprezz-data:/var/lib/postgresql/data
      - ./docker/init:/docker-entrypoint-initdb.d
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U postgres"]
      interval: 10s
      timeout: 5s
      retries: 5

  exprezz-redis:
    image: redis:7-alpine
    restart: always
    ports:
      - "6379:6379"
    volumes:
      - exprezz-redis-data:/data
    command: redis-server --appendonly yes
    healthcheck:
      test: ["CMD", "redis-cli", "ping"]
      interval: 10s
      timeout: 3s
      retries: 5

  exprezz-migrate:
    build:
      context: .
      dockerfile: Dockerfile

    env_file:
      - .env

    depends_on:
      exprezz-db:
        condition: service_healthy

    environment:
      DATABASE_HOST: exprezz-db
      DATABASE_PORT: 5432
      DATABASE_NAME: exprezz-db
      DATABASE_USERNAME: ${MIGRATION_USERNAME}
      DATABASE_PASSWORD: ${MIGRATION_PASSWORD}
      NODE_ENV: production

    command: npm run db:migrate

    restart: "no"

  backend:
    build:
      context: .
      dockerfile: Dockerfile
    restart: always
    env_file:
      - .env
    ports:
      - "8080:3006"
    depends_on:
      exprezz-db:
        condition: service_healthy
      exprezz-redis:
        condition: service_healthy
      exprezz-migrate:
        condition: service_completed_successfully
    environment:
      PORT: 3006
      DATABASE_HOST: exprezz-db
      DATABASE_PORT: 5432
      DATABASE_USERNAME: ${DATABASE_USERNAME}
      DATABASE_PASSWORD: ${DATABASE_PASSWORD}
      DATABASE_NAME: exprezz-db
      REDIS_HOST: exprezz-redis
      REDIS_PORT: 6379
      NODE_ENV: production
    volumes:
      - ./logs:/app/logs
volumes:
  exprezz-data:
  exprezz-redis-data:
```

And use this as your development docker compose setup:

```yaml
services:
  exprezz-db-dev:
    image: postgres:16-alpine
    restart: always
    env_file:
      - .env
    ports:
      - "5432:5432"
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: ${POSTGRES_PASSWORD}
      POSTGRES_DB: exprezz-db-dev
    volumes:
      - exprezz-dev-data:/var/lib/postgresql/data
      - ./docker/init:/docker-entrypoint-initdb.d
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U postgres"]
      interval: 10s
      timeout: 5s
      retries: 5

  exprezz-redis-dev:
    image: redis:7-alpine
    restart: always
    ports:
      - "6379:6379"
    volumes:
      - exprezz-redis-dev-data:/data
    command: redis-server --appendonly yes
    healthcheck:
      test: ["CMD", "redis-cli", "pint"]
      interval: 10s
      timeout: 3s
      retries: 5

  # on add new migrations, use "docker compose run --rm exprezz-migrate-dev"
  exprezz-migrate-dev:
    build:
      context: .
      dockerfile: Dockerfile.dev

    env_file:
      - .env

    depends_on:
      exprezz-db-dev:
        condition: service_healthy

    environment:
      DATABASE_HOST: exprezz-db-dev
      DATABASE_PORT: 5432
      DATABASE_NAME: exprezz-db-dev
      DATABASE_USERNAME: ${MIGRATION_USERNAME}
      DATABASE_PASSWORD: ${MIGRATION_PASSWORD}

    command: npm run db:migrate

    restart: "no"

  exprezz-backend-dev:
    build:
      context: .
      dockerfile: Dockerfile.dev
    restart: always
    env_file:
      - .env
    ports:
      - "3006:3006"
    depends_on:
      exprezz-db-dev:
        condition: service_healthy
      exprezz-redis-dev:
        condition: service_healthy
      exprezz-migrate-dev:
        condition: service_completed_successfully
    environment:
      PORT: 3006
      DATABASE_HOST: exprezz-db-dev
      DATABASE_PORT: 5432
      DATABASE_NAME: exprezz-db-dev
      DATABASE_USERNAME: ${DATABASE_USERNAME}
      DATABASE_PASSWORD: ${DATABASE_PASSWORD}
      REDIS_HOST: exprezz-redis-dev
      REDIS_PORT: 6379
      NODE_ENV: development
    volumes:
      - .:/app
      - /app/node_modules
      - ./logs:/app/logs
    command: npm run dev

volumes:
  exprezz-dev-data:
  exprezz-redis-dev-data:
```

## Connecting to Redis

While you dockerized services are running, you can connect to your redis service by doing:

```
docker exec -it [redis-service-name] redis-cli
```

### Checking keys

While having Redis CLI active:

```
KEYS *
```

### Check a specific record

```
GET [key]
<!-- GET otp:09151862464 -->
```

### Check TTL of a specific record

```
TTL [key]
<!-- TTL otp:09151862464 -->
```

# Debug logs

You can use these event handler on redis initialization to observe how the initiating process is being done:

```ts
import { createClient } from "redis";

const redisClient = createClient({
  socket: {
    host: process.env.REDIS_HOST || "localhost",
    port: parseInt(process.env.REDIS_PORT || "6379"),
    reconnectStrategy: (retries) => {
      if (retries > 10) {
        logger.error("❌ Redis connection failed after 10 retries");
        return new Error("Redis connection failed");
      }
      const delay = Math.min(retries * 100, 3000);
      logger.warn(
        `⚠️  Redis reconnecting... attempt ${retries}, waiting ${delay}ms`,
      );
      return delay;
    },
  },
});

redisClient.on("error", (err) => {
  logger.error("🔴 Redis client error: ", err);
});

redisClient.on("connect", () => {
  logger.info("🟢 Redis connected");
});

redisClient.on("ready", () => {
  logger.info("✅ Redis ready");
});

export async function connectRedis() {
  try {
    await redisClient.connect();
    logger.info("Redis connection established");
  } catch (error) {
    logger.error("Failed to connect to Redis:", error);
    throw error;
  }
}

export async function disconnectRedis() {
  try {
    await redisClient.quit();
    logger.info("Redis disconnected gracefully");
  } catch (error) {
    logger.error("Error disconnecting Redis:", error);
  }
}

export default redisClient;
```

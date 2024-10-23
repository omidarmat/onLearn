# ZOD essentials

- [ZOD essentials](#zod-essentials)
  - [Requirements](#requirements)
  - [Installation](#installation)
  - [Basic usage](#basic-usage)
  - [Primitives](#primitives)
    - [Coercion for primitives](#coercion-for-primitives)
    - [Strings](#strings)


## Requirements

- TypeScript 4.5+!
- You must enable `strict` mode in your `tsconfig.json`. This is a best practice for all TypeScript projects.

## Installation

```bash
npm install zod
```

## Basic usage

Creating a simple string schema:

```ts
import { z } from "zod";

// creating a schema for strings
const mySchema = z.string();

// parsing
mySchema.parse("tuna"); // => "tuna"
mySchema.parse(12); // => throws ZodError

// "safe" parsing (doesn't throw error if validation fails)
mySchema.safeParse("tuna"); // => { success: true; data: "tuna" }
mySchema.safeParse(12); // => { success: false; error: ZodError }
```

Creating an object schema:

```ts
import { z } from "zod";

const User = z.object({
  username: z.string(),
});

User.parse({ username: "Ludwig" });

// ???
// extract the inferred type
type User = z.infer<typeof User>;
// { username: string 
```

## Primitives

```ts
import { z } from "zod";

// primitive values
z.string();
z.number();
z.bigint();
z.boolean();
z.date();
z.symbol();

// empty types
z.undefined();
z.null();
z.void(); // accepts undefined

// catch-all types
// allows any value
z.any();
z.unknown();

// never type
// allows no values
z.never();
```

### Coercion for primitives

Zod now provides a more convenient way to coerce primitive values.

```ts
const schema = z.coerce.string();
schema.parse("tuna"); // => "tuna"
schema.parse(12); // => "12"
```

During the parsing step, the input is passed through the `String()` function, which is a JavaScript built-in for coercing data into strings.

```ts
schema.parse(12); // => "12"
schema.parse(true); // => "true"
schema.parse(undefined); // => "undefined"
schema.parse(null); // => "null"
```

The returned schema is a normal ZodString instance so you can use all string methods.

```ts
z.coerce.string().email().min(5);
```

### Strings

Zod includes a handful of string-specific validations.

```ts
// validations
z.string().max(5);
z.string().min(5);
z.string().length(5);
z.string().email();
z.string().url();
z.string().emoji();
z.string().uuid();
z.string().nanoid();
z.string().cuid();
z.string().cuid2();
z.string().ulid();
z.string().regex(regex);
z.string().includes(string);
z.string().startsWith(string);
z.string().endsWith(string);
z.string().datetime(); // ISO 8601; by default only `Z` timezone allowed
z.string().ip(); // defaults to allow both IPv4 and IPv6

// transforms
z.string().trim(); // trim whitespace
z.string().toLowerCase(); // toLowerCase
z.string().toUpperCase(); // toUpperCase

// added in Zod 3.23
z.string().date(); // ISO date format (YYYY-MM-DD)
z.string().time(); // ISO time format (HH:mm:ss[.SSSSSS])
z.string().duration(); // ISO 8601 duration
z.string().base64();
```

You can customize some common error messages when creating a string schema.

```ts
const name = z.string({
  required_error: "Name is required",
  invalid_type_error: "Name must be a string",
});
```

When using validation methods, you can pass in an additional argument to provide a custom error message.

```ts
z.string().min(5, { message: "Must be 5 or more characters long" });
z.string().max(5, { message: "Must be 5 or fewer characters long" });
z.string().length(5, { message: "Must be exactly 5 characters long" });
z.string().email({ message: "Invalid email address" });
z.string().url({ message: "Invalid url" });
z.string().emoji({ message: "Contains non-emoji characters" });
z.string().uuid({ message: "Invalid UUID" });
z.string().includes("tuna", { message: "Must include tuna" });
z.string().startsWith("https://", { message: "Must provide secure URL" });
z.string().endsWith(".com", { message: "Only .com domains allowed" });
z.string().datetime({ message: "Invalid datetime string! Must be UTC." });
z.string().date({ message: "Invalid date string!" });
z.string().time({ message: "Invalid time string!" });
z.string().ip({ message: "Invalid IP address" });
```


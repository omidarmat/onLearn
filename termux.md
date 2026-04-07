# Using curl for REST API Testing in Termux

First, install curl if not already available:

```bash
pkg install curl
```

---

## Basic HTTP Methods

**GET**

```bash
curl https://api.example.com/users
```

**POST with JSON**

```bash
curl -X POST https://api.example.com/users \
  -H "Content-Type: application/json" \
  -d '{"name":"John","email":"test@example.com"}'
```

**PUT**

```bash
curl -X PUT https://api.example.com/users/1 \
  -H "Content-Type: application/json" \
  -d '{"name":"Updated Name"}'
```

**DELETE**

```bash
curl -X DELETE https://api.example.com/users/1
```

---

## Common Flags

| Flag           | Purpose               |
| -------------- | --------------------- |
| `-X`           | HTTP method           |
| `-H`           | Add header            |
| `-d`           | Request body          |
| `-i`           | Show response headers |
| `-v`           | Verbose (debug)       |
| `-o file.json` | Save output to file   |
| `-s`           | Silent mode           |

---

## Authentication

**Bearer Token**

```bash
curl -H "Authorization: Bearer YOUR_TOKEN" https://api.example.com/data
```

**Basic Auth**

```bash
curl -u username:password https://api.example.com/data
```

---

## Pretty Print JSON Response

Install `jq` for formatted output:

```bash
pkg install jq
curl -s https://api.example.com/users | jq .
```

---

## Useful Tips for Termux

- Use single quotes `'` around JSON to avoid shell escaping issues
- For multiline requests, use `\` at end of each line
- Save base URLs as variables:

```bash
BASE="https://api.example.com"
curl $BASE/users
```

# Ping in Termux

## Install (if needed)

```bash
pkg install inetutils
```

---

## Basic Usage

**Simple ping:**

```bash
ping google.com
```

**Ping with count** (stop after N packets):

```bash
ping -c 4 google.com
```

**Ping an IP:**

```bash
ping 8.8.8.8
```

---

## Common Flags

| Flag   | Purpose                            |
| ------ | ---------------------------------- |
| `-c N` | Send N packets then stop           |
| `-i N` | Interval between packets (seconds) |
| `-s N` | Packet size in bytes               |
| `-t N` | TTL value                          |
| `-W N` | Timeout in seconds                 |

---

## Examples

```bash
# Ping 5 times
ping -c 5 google.com

# Ping every 2 seconds
ping -c 4 -i 2 google.com

# Ping with larger packet size
ping -c 4 -s 1024 google.com
```

---

## Stop Ping

Press **`Ctrl + C`** to stop continuous ping.

---

> **Note:** Some networks/servers block ICMP packets, so ping may not always work even if the server is online.

# REST API Testing & Ping Without Internet in Bare Termux

---

## REST API Testing (No curl install needed)

Termux comes with **`/dev/tcp`** — a built-in bash feature for raw TCP connections.

### GET Request

```bash
exec 3<>/dev/tcp/api.example.com/80
echo -e "GET /users HTTP/1.1\r\nHost: api.example.com\r\nConnection: close\r\n\r\n" >&3
cat <&3
exec 3>&-
```

### POST Request

```bash
exec 3<>/dev/tcp/api.example.com/80
echo -e "POST /users HTTP/1.1\r\nHost: api.example.com\r\nContent-Type: application/json\r\nContent-Length: 27\r\nConnection: close\r\n\r\n{\"name\":\"John\"}" >&3
cat <&3
exec 3>&-
```

> ⚠️ **Note:** `/dev/tcp` only works for **HTTP (port 80)**, not HTTPS (443) — no SSL support natively.

---

## Ping (No package needed)

### Method 1 — Check if host is reachable via `/dev/tcp`

```bash
# If connection opens = host is alive
timeout 3 bash -c 'echo > /dev/tcp/google.com/80' && echo "Host is UP" || echo "Host is DOWN"
```

### Method 2 — Measure response time manually

```bash
start=$(date +%s%N)
timeout 3 bash -c 'echo > /dev/tcp/google.com/80'
end=$(date +%s%N)
echo "Response time: $(( (end - start) / 1000000 )) ms"
```

### Method 3 — Loop like ping

```bash
for i in 1 2 3 4; do
  start=$(date +%s%N)
  timeout 3 bash -c 'echo > /dev/tcp/google.com/80' 2>/dev/null
  end=$(date +%s%N)
  echo "Probe $i: $(( (end - start) / 1000000 )) ms"
  sleep 1
done
```

---

## Key Limitations

| Feature          | With packages | Bare Termux |
| ---------------- | ------------- | ----------- |
| HTTPS API        | ✅            | ❌          |
| HTTP API         | ✅            | ✅          |
| Real ICMP Ping   | ✅            | ❌          |
| TCP reachability | ✅            | ✅          |
| JSON formatting  | ✅ (jq)       | ❌          |

---

> 💡 **Tip:** `/dev/tcp` is your best friend in bare Termux — it handles basic TCP connections without any installed tools.

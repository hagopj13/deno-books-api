# deno-books-api

This project is a simple REST API, built with [**Deno**](https://deno.land/). 

It is using Deno's [**oak**](https://deno.land/x/oak) and [**mongo**](https://deno.land/x/mongo) modules.

## Requirements
- **Deno**: https://deno.land/#installation
- **MongoDB**: https://www.mongodb.com/download-center/community

## Getting Started

**Clone the repo:**

```bash
git clone https://github.com/hagopj13/deno-books-api.git
cd deno-books-api
```

**Set the environment variables:**

```bash
cp .env.example .env

# open .env and modify the environment variables (if needed)
```

**Run the app:**

```bash
deno run --allow-write --allow-read --allow-plugin --allow-net --allow-env --unstable ./server.ts
```

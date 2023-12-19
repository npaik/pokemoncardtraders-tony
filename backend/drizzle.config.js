const { defineConfig } = require("drizzle-kit");
const dotenv = require("dotenv");

dotenv.config({
  path: ".env.local",
});

module.exports = defineConfig({
  schema: "./src/db/schema/*",
  driver: "turso",
  dbCredentials: {
    url: process.env.DATABASE_URL,
    authToken: process.env.DATABASE_AUTH_TOKEN,
  },
  out: "./drizzle",
});

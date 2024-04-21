import { defineConfig } from "drizzle-kit";
import "dotenv/config";

const DB_URL = process.env.DB_URL;
if (!DB_URL) throw new Error();

export default defineConfig({
  schema: "./lib/database/schema.ts",
  driver: "pg",
  dbCredentials: {
    connectionString: DB_URL,
  },
  verbose: true,
  strict: true,
});

import "server-only";

import * as schema from "./schema";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

const connectionString = process.env.DB_URL;
if (!connectionString) throw new Error();

const client = postgres(connectionString, { prepare: false });
export const db = drizzle(client, { schema });

import {
  pgTable,
  uuid,
  text,
  varchar,
  integer,
  json,
} from "drizzle-orm/pg-core";

export const categories = pgTable("categories", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
});

export const products = pgTable("products", {
  id: uuid("id").defaultRandom().primaryKey(),
  greenSealURL: varchar("green_seal_url").notNull(),
  category: uuid("category")
    .references(() => categories.id)
    .notNull(),
  upc: varchar("upc"),
  name: varchar("name").notNull(),
  description: varchar("description").notNull(),
  imageUrl: varchar("image_url"),
  productUrl: varchar("product_url"), // link to external product listing
  certifiedSince: integer("year"),
  companyName: varchar("company_name"),
  companyLink: varchar("company_link"),
  brand: varchar("brand"),
  skus: json("skus"),
});

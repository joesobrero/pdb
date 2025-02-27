import {
  pgTable,
  serial,
  text,
  timestamp,
  integer,
  jsonb,
} from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  fullName: text("full_name"),
  email: text("email").notNull().unique(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const briefs = pgTable("briefs", {
  id: serial("id").primaryKey(),
  user_id: integer("user_id").notNull(),
  name: text("name").notNull(),
  topics: jsonb("topics").notNull().default("[]"),
  length: text("length").notNull(),
  frequency: text("frequency").notNull(),
  tone: text("tone").notNull(),
  sources: jsonb("sources").notNull().default("[]"),
  restricted_sources: jsonb("restricted_sources").notNull().default("[]"),
  target_audience: text("target_audience"),
  created_at: timestamp("created_at").defaultNow(),
  updated_at: timestamp("updated_at").defaultNow(),
});

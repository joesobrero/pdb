import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  fullName: text("full_name"),
  email: text("email").notNull().unique(),
  createdAt: timestamp("created_at").defaultNow(),
});

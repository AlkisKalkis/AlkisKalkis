import {integer, pgTable, text} from "drizzle-orm/pg-core";

export const alkis = pgTable("alkis",{
    id: integer("id").primaryKey(),
    name: text("name").notNull(),
    price: integer("price").notNull(),
})

export const rawProduct = pgTable("rawProduct",{
    id: integer("id").primaryKey(),
    html: text("html").notNull(),
})
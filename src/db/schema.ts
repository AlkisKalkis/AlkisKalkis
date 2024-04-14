import {integer, pgTable, text} from "drizzle-orm/pg-core";

export const alkis = pgTable("alkis",{
    id: integer("id").primaryKey(),
    name: text("name").notNull(),
    price: integer("price").notNull(),
})

export const category = pgTable("category",{
    id: integer("id").primaryKey(),
    categoryName: text("categoryName").notNull(),
})

export const alkisCategory = pgTable("alkisCategory",{
    id: integer("id").primaryKey(),
    alkisId: integer("alkisId").references(() => alkis.id).notNull(),
    categoryId: integer("categoryId").references(() => category.id).notNull(),
})

export const priceHistory = pgTable("priceHistory", {
    id: integer("id").primaryKey(),
    alkisId: integer("alkisId").references(() => alkis.id).notNull(),
    priceKroner: integer("priceKroner").notNull(),
    priceOre: integer("priceOre").notNull(),
})

export const rawProduct = pgTable("rawProduct",{
    id: integer("id").primaryKey(),
    html: text("html").notNull(),
})
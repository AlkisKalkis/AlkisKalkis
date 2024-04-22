import { integer, pgTable, text, bigint, boolean } from "drizzle-orm/pg-core";

export const alkis = pgTable("alkis", {
    id: bigint("id", { mode: "bigint" }).primaryKey(),
    name: text("name").notNull(),
    alcoholByVolume: integer("alcoholByVolume").notNull(),
})

export const category = pgTable("category", {
    id: integer("id").primaryKey(),
    categoryName: text("categoryName").notNull(),
})

export const alkisCategory = pgTable("alkisCategory", {
    id: integer("id").primaryKey(),
    alkisId: bigint("alkisId", { mode: "bigint" }).references(() => alkis.id).notNull(),
    categoryId: integer("categoryId").references(() => category.id).notNull(),
})

export const priceHistory = pgTable("priceHistory", {
    id: integer("id").primaryKey(),
    alkisId: bigint("alkisId", { mode: "bigint" }).references(() => alkis.id).notNull(),
    priceKroner: integer("priceKroner").notNull(),
    priceOre: integer("priceOre").notNull(),
})

export const rawProduct = pgTable("rawProduct", {
    id: bigint("id", { mode: "bigint" }).primaryKey(),
    html: text("html").notNull(),
})

export const links = pgTable("links", {
    id: bigint("id", { mode: "bigint" }).primaryKey(),
    loc: text("loc").notNull(),
    image: text("image").notNull(),
    crawled: boolean("crawled").notNull(),
})
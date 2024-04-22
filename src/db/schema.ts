import { integer, pgTable, text, bigint, boolean, unique, serial } from "drizzle-orm/pg-core";

export const alkis = pgTable("alkis", {
    id: bigint("id", { mode: "bigint" }).primaryKey(),
    name: text("name").notNull(),
    alcoholByVolume: integer("alcoholByVolume").notNull(),
    price: integer("price").notNull(),
    volume: integer("volume").notNull(),
})

export const category = pgTable("category", {
    id: serial("id").primaryKey(),
    categoryName: text("categoryName").notNull().unique(),
})

export const alkisCategory = pgTable("alkisCategory", {
    id: serial("id").primaryKey(),
    alkisId: bigint("alkisId", { mode: "bigint" }).references(() => alkis.id).notNull(),
    categoryId: integer("categoryId").references(() => category.id).notNull(),
}, (table) => ({
    unq: unique().on(table.alkisId, table.categoryId),
}))

export const priceHistory = pgTable("priceHistory", {
    id: serial("id").primaryKey(),
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
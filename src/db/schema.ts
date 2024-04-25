import { relations } from "drizzle-orm";
import { integer, pgTable, text, bigint, boolean, unique, serial, timestamp } from "drizzle-orm/pg-core";

export const alkis = pgTable("alkis", {
    id: bigint("id", { mode: "bigint" }).primaryKey(),
    name: text("name").notNull(),
    alcoholByVolume: integer("alcoholByVolume").notNull(),
    price: integer("price").notNull(),
    volume: integer("volume").notNull(),
    pricePerAlcohol: integer("pricePerAlcohol").notNull(),
})

export const alkisRelations = relations(alkis, ({ many }) => ({ alkisCategory: many(alkisCategory) }))

export const category = pgTable("category", {
    id: serial("id").primaryKey(),
    categoryName: text("categoryName").notNull().unique(),
})

export const categoryRelations = relations(category, ({ many }) => ({ alkisCategory: many(alkisCategory) }))

export const alkisCategory = pgTable("alkisCategory", {
    id: serial("id").primaryKey(),
    alkisId: bigint("alkisId", { mode: "bigint" }).references(() => alkis.id).notNull(),
    categoryId: integer("categoryId").references(() => category.id).notNull(),
}, (table) => ({
    unq: unique().on(table.alkisId, table.categoryId),
}))

export const alkisCategoryRelations = relations(alkisCategory, ({ one }) => ({
    alkis: one(alkis, { fields: [alkisCategory.alkisId], references: [alkis.id] }),
    category: one(category, { fields: [alkisCategory.categoryId], references: [category.id] }),
}))

export const priceHistory = pgTable("priceHistory", {
    id: serial("id").primaryKey(),
    timestamp: timestamp("timestamp").notNull(),
    alkisId: bigint("alkisId", { mode: "bigint" }).references(() => alkis.id).notNull(),
    price: integer("price").notNull(),
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
import { sql, SQL } from "drizzle-orm";
import { Alkis } from "./types/alkis";
import db from "./db/drizzle";
import { AlkisQueryParams } from "./types/alkisQueryParams";

export const resultsPerPage = 48;

function buildSql(query: AlkisQueryParams, resultsPerPage: number) {
  const sqlChunks: SQL[] = [];
  sqlChunks.push(sql`select *
    from (select alkis.*, array_agg(category."categoryName") as categories
          from "alkisCategory" as alkis_to_categories
                   join alkis on alkis_to_categories."alkisId" = alkis.id
                   join category on alkis_to_categories."categoryId" = category.id
          group by alkis.id)`);

  const whereChunks: SQL[] = [];
  if (query.category) whereChunks.push(sql`${query.category}=ANY(categories)`);
  if (query.name) whereChunks.push(sql`name ILIKE ${"%" + query.name + "%"}`);
  if (query.minPrice) whereChunks.push(sql`price >= ${query.minPrice * 100}`);
  if (query.maxPrice) whereChunks.push(sql`price <= ${query.maxPrice * 100}`);
  if (query.minVolume) whereChunks.push(sql`volume >= ${query.minVolume * 10}`);
  if (query.maxVolume) whereChunks.push(sql`volume <= ${query.maxVolume * 10}`);
  if (query.minAlcohol)
    whereChunks.push(sql`"alcoholByVolume" >= ${query.minAlcohol * 10}`);
  if (query.maxAlcohol)
    whereChunks.push(sql`"alcoholByVolume" <= ${query.maxAlcohol * 10}`);

  if (whereChunks.length > 0) sqlChunks.push(sql`where`);
  sqlChunks.push(sql.join(whereChunks, sql` and `));

  sqlChunks.push(sql`order by "pricePerAlcohol" asc`);
  sqlChunks.push(sql`limit ${resultsPerPage}`);
  sqlChunks.push(sql`offset ${resultsPerPage * (query.page ?? 0)};`);
  return sql.join(sqlChunks, sql` `);
}

export const GetAlkisRows = async (
  query: AlkisQueryParams,
  resultsPerPage: number
): Promise<Alkis[]> => {
  const sqlQuery = buildSql(query, resultsPerPage);
  const queryResponse = await db.execute(sqlQuery);

  return queryResponse.rows as Alkis[];
};

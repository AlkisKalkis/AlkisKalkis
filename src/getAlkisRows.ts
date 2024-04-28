import { sql, SQL } from "drizzle-orm";
import { Alkis } from "./types/alkis";
import db from "./db/drizzle";

export const resultsPerPage = 50;

function buildSql(category: string, name: string, page: number, resultsPerPage: number) {
  const sqlChunks: SQL[] = [];
  sqlChunks.push(sql`select *
    from (select alkis.*, array_agg(category."categoryName") as categories
          from "alkisCategory" as alkis_to_categories
                   join alkis on alkis_to_categories."alkisId" = alkis.id
                   join category on alkis_to_categories."categoryId" = category.id
          group by alkis.id)`);

  if (category || name) {
    console.log("Adding where clause");
    sqlChunks.push(sql`where`);
  }
  if (category) {
    console.log("Adding category clause");
    sqlChunks.push(sql`${category}=ANY(categories)`);
  }
  if (category && name) {
    console.log("Adding AND");
    sqlChunks.push(sql`AND`);
  }
  if (name) {
    console.log("Adding name clause");
    sqlChunks.push(sql`name ILIKE ${"%" + name + "%"}`);
  }

  sqlChunks.push(sql`order by "pricePerAlcohol" asc`);
  sqlChunks.push(sql`limit ${resultsPerPage}`);
  sqlChunks.push(sql`offset ${resultsPerPage*page};`);
  return sql.join(sqlChunks, sql` `);
}

export const GetAlkisRows = async (
  categorySearch: string,
  searchName: string,
  page: number,
  resultsPerPage: number
): Promise<Alkis[]> => {
  const query = buildSql(categorySearch, searchName, page, resultsPerPage);
  const queryResponse = await db.execute(query);

  return queryResponse.rows as Alkis[];
};

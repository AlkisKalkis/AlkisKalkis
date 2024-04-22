import db from '../db/drizzle'
import { SQL, desc, eq, sql } from 'drizzle-orm';
import { alkis, alkisCategory, category } from '../db/schema';

async function heyo(): Promise<string> {
    const categories = await db.select().from(category);

    return (<html lang='en'>
        <head>
            <title>Hello World</title>
            <script src="https://unpkg.com/htmx.org@1.9.12"></script>
        </head>
        <body>


            <form
                name="search"
                hx-post="/test"
                hx-trigger="change"
                hx-target="#search-results"
                hx-swap="innerHTML"
                hx-indicator=".htmx-indicator">
                Kategori:
                <select name="category">
                    <option value=''></option>
                    {categories.map((category) => {
                        return (<option>{category.categoryName}</option>)
                    })}
                </select>

                Søk: <input class="form-control" type="search"
                    name="search" placeholder="Begin Typing To Search Users..."
                    hx-post="/test"
                    hx-trigger="change, input changed delay:0ms, search"
                    hx-target="#search-results"
                    hx-swap="innerHTML"
                    hx-indicator=".htmx-indicator"></input>
            </form>
            {searchForProduct('', '')}


        </body>
    </html>)
}

async function searchForProduct(searchName: string, categorySearch: string): Promise<string> {
    const query = buildSql(categorySearch, searchName)
    const queryResponse = await db.execute(query)

    const alkisRows = queryResponse.rows as { id: bigint, name: string, alcoholByVolume: number, price: number, volume: number, categories: string[] }[]

    return (<table id="search-results">
        <tr>
            <th>Navn</th>
            <th>Pris</th>
            <th>Alkohol</th>
            <th>Volum</th>
            <th>Kategorier</th>
        </tr>
        {alkisRows.map((alkis) => {
            return (
                <tr>
                    <td>{alkis.name}</td>
                    <td>Kr {alkis.price / 100}</td>
                    <td>{alkis.alcoholByVolume / 10}%</td>
                    <td>{alkis.volume / 10}cl</td>
                    <td>{alkis.categories.join(' - ')}</td>
                </tr>)
        })
        }
    </table>
    )
}

function buildSql(category: string, name: string) {
    const sqlChunks: SQL[] = []
    sqlChunks.push(sql`select *
    from (select alkis.*, array_agg(category."categoryName") as categories
          from "alkisCategory" as alkis_to_categories
                   join alkis on alkis_to_categories."alkisId" = alkis.id
                   join category on alkis_to_categories."categoryId" = category.id
          group by alkis.id)`)

    if (category || name) {
        console.log('Adding where clause')
        sqlChunks.push(sql`where`)
    }
    if (category) {
        console.log('Adding category clause')
        sqlChunks.push(sql`${category}=ANY(categories)`)
    }
    if (category && name) {
        console.log('Adding AND')
        sqlChunks.push(sql`AND`)
    }
    if (name) {
        console.log('Adding name clause')
        sqlChunks.push(sql`name ILIKE ${"%" + name + "%"}`)
    }

    sqlChunks.push(sql`order by price desc;`)

    return sql.join(sqlChunks, sql` `)
}

export { heyo, searchForProduct };
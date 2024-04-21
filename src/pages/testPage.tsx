import db from '../db/drizzle'
import { asc, desc, eq, ilike } from 'drizzle-orm';
import { alkis, alkisCategory, category } from '../db/schema';

async function heyo(): Promise<string> {
    const allProductsPromise = db.select().from(alkis).leftJoin(alkisCategory, eq(alkisCategory.alkisId, alkis.id)).leftJoin(category, eq(category.id, alkisCategory.id)).orderBy(desc(alkis.alcoholByVolume));
    const categoriesPromise = db.select().from(category);
    const [allProducts, categories] = await Promise.all([allProductsPromise, categoriesPromise])
  
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
                        <option value='bais'>bais</option>
                        {categories.map((category) => {
                            return (<option value='category.categoryName'>{category.categoryName}</option>)
                        })}
                    </select>
            </form>
            Søk: <input class="form-control" type="search" 
                    name="search" placeholder="Begin Typing To Search Users..." 
                    hx-post="/test" 
                    hx-trigger="input changed delay:0ms, search" 
                    hx-target="#search-results"
                    hx-swap="innerHTML"
                    hx-indicator=".htmx-indicator"></input>
                {searchForProduct('')}
            </body>
        </html>)
}

async function searchForProduct(searchName:string): Promise<string> {
    console.log(searchName);
    const allProducts = await db.select().from(alkis).where(ilike((alkis.name), "%"+searchName+"%")).leftJoin(alkisCategory, eq(alkisCategory.alkisId, alkis.id)).leftJoin(category, eq(category.id, alkisCategory.id)).orderBy(desc(alkis.alcoholByVolume));
    
    return (<table id="search-results">
                    <tr>
                        <th>Navn</th>
                        <th>Pris per alkohol</th>
                        <th>Kategorier</th>
                    </tr>
    {allProducts.map((product) => {
            return (
            <tr>
                <td>{product.alkis.name}</td>
                <td>{product.alkis.alcoholByVolume}</td>
                <td>{product.category?.categoryName}</td>
            </tr>)})
    }
    </table>
    )
}

export {heyo, searchForProduct};
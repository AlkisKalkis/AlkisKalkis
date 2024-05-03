import { Alkis } from "../types/alkis";
import { GetAlkisRows, resultsPerPage } from "../getAlkisRows";
import { AlkisCard } from "./alkisCard";
import { Query } from "../types/query";

function getMoreProductsDiv(
  page: number,
  category: string,
  name: string,
  newProducts: Alkis[]
) {
  if (newProducts.length >= resultsPerPage) {
    const queryEndpointArray = [];
    queryEndpointArray.push("page=" + (page + 1));
    if (category != "") queryEndpointArray.push("category=" + category);
    if (name != "") queryEndpointArray.push("name=" + name);
    return (
      <div
        hx-get={"/alkis?" + queryEndpointArray.join("&")}
        hx-trigger="revealed"
        hx-swap="afterend"
        hx-indicator="#spinner"
      ></div>
    );
  } else {
    return (
      <div>
        <p class="text-lg">Det var alt!</p>
      </div>
    );
  }
}

export const AlkisList = async (query: Query): Promise<JSX.Element> => {
  const name = query?.name ?? "";
  const category = query?.category ?? "";
  const page = query?.page ?? 0;

  const alkisRows: Alkis[] = await GetAlkisRows(
    category,
    name,
    page,
    resultsPerPage
  );

  console.log(
    "Received a query for:\n\tName:" +
      name +
      " Category: " +
      category +
      " Page: " +
      page
  );
  return (
    <div>
      <div class="">
        {alkisRows.map((alkis) => {
          return AlkisCard(alkis);
        })}
        {getMoreProductsDiv(page, category, name, alkisRows)}
      </div>
    </div>
  );
};

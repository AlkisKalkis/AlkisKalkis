import { Alkis } from "../types/alkis";
import { GetAlkisRows, resultsPerPage } from "../getAlkisRows";
import { AlkisCard } from "./alkisCard";
import { AlkisQueryParams } from "../types/alkisQueryParams";

function getMoreProductsDiv(query: AlkisQueryParams, newProducts: Alkis[]) {
  if (newProducts.length >= resultsPerPage) {
    const queryEndpointArray = [];
    queryEndpointArray.push("page=" + ((query.page ?? 0) + 1));
    if (query.category) queryEndpointArray.push("category=" + query.category);
    if (query.name) queryEndpointArray.push("name=" + query.name);
    if (query.minPrice) queryEndpointArray.push("minPrice=" + query.minPrice);
    if (query.maxPrice) queryEndpointArray.push("maxPrice=" + query.maxPrice);
    if (query.minAlcohol)
      queryEndpointArray.push("minAlcohol=" + query.minAlcohol);
    if (query.maxAlcohol)
      queryEndpointArray.push("maxAlcohol=" + query.maxAlcohol);
    if (query.minVolume)
      queryEndpointArray.push("minVolume=" + query.minVolume);
    if (query.maxVolume)
      queryEndpointArray.push("maxVolume=" + query.maxVolume);

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

export const AlkisList = async (
  query: AlkisQueryParams
): Promise<JSX.Element> => {
  const alkisRows: Alkis[] = await GetAlkisRows(query, resultsPerPage);

  return (
    <>
      {alkisRows.map((alkis) => {
        return AlkisCard(alkis);
      })}
      {getMoreProductsDiv(query, alkisRows)}
    </>
  );
};

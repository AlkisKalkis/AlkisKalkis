import { Alkis } from "../types/alkis";
import { GetAlkisRows } from "../getAlkisRows";
import { AlkisCard } from "./alkisCard";
import { Query } from "../types/query";

export const AlkisList = async (
  query: Query,
): Promise<JSX.Element> => {
  const name = query?.name || "";
  const category = query?.category || "";
  const page = parseInt(query?.page || "0");

  const alkisRows: Alkis[] = await GetAlkisRows(category, name, page);

  return (
    <div>
    <div id="alkis-list">
      {alkisRows.map((alkis) => {
        return AlkisCard(alkis);
      })}
      <div 
        hx-get={"/alkis?page=" + (page+1) + "?category=" + category + "?name="+name }
        hx-trigger="revealed"
        hx-swap="afterend"/>
    </div>
    </div>
  );
};

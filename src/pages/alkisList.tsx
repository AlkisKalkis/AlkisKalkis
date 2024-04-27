import { Alkis } from "../types/alkis";
import { GetAlkisRows } from "../getAlkisRows";
import { AlkisCard } from "./alkisCard";

export const AlkisList = async (
  query: Record<string, string | undefined>
): Promise<JSX.Element> => {
  const name = query?.name || "";
  const category = query?.category || "";
  const alkisRows: Alkis[] = await GetAlkisRows(category, name);

  return (
    <div id="alkis-list">
      {alkisRows.map((alkis) => {
        return AlkisCard(alkis);
      })}
    </div>
  );
};

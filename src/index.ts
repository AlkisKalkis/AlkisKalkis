import { Elysia, t } from "elysia";
import { html } from "@elysiajs/html";
import staticPlugin from "@elysiajs/static";
import { BasePage } from "./pages/basePage";
import { AlkisListPage } from "./pages/alkisListPage";
import { AlkisList } from "./pages/alkisList";
import { Query } from "./types/query";

const app = new Elysia()
  .use(html())
  .use(
    staticPlugin({
      assets: "./src/public",
    })
  )
  .get("/", () => BasePage(AlkisListPage()))
  .get(
    "/alkis",
    async ({ query }: { query: Query }) => await AlkisList(query),
    {
      query: t.Object({
        name: t.Optional(t.String({ default: "" })),
        category: t.Optional(t.String({ default: "" })),
        page: t.Optional(t.Numeric({ default: 0 })),
      }),
    }
  )
  .listen(3000)
  .onError((err) => {
    console.error(err);
  });

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);

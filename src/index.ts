import { Elysia, t } from "elysia";
import { html } from "@elysiajs/html";
import staticPlugin from "@elysiajs/static";
import { BasePage } from "./pages/basePage";
import { AlkisListPage } from "./pages/alkisListPage";
import { AlkisList } from "./pages/alkisList";
import { AlkisQueryParams } from "./types/alkisQueryParams";

const app = new Elysia()
  .use(html())
  .use(
    staticPlugin({
      assets: "./src/public",
    })
  )
  .onTransform((context) => {
    for (const key in context.query) {
      if (context.query[key] === "") {
        context.query[key] = undefined;
      }
    }
  })
  .get("/", () => BasePage(AlkisListPage()))
  .get(
    "/alkis",
    async ({ query }: { query: AlkisQueryParams }) => await AlkisList(query),
    {
      query: t.Object({
        name: t.Optional(t.String()),
        category: t.Optional(t.String()),
        page: t.Optional(t.Numeric({ default: 0 })),
        minPrice: t.Optional(t.Numeric()),
        maxPrice: t.Optional(t.Numeric()),
        minAlcohol: t.Optional(t.Numeric()),
        maxAlcohol: t.Optional(t.Numeric()),
        minVolume: t.Optional(t.Numeric()),
        maxVolume: t.Optional(t.Numeric()),
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

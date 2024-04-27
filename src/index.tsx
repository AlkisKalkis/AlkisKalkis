import { Elysia } from "elysia";
import { html } from "@elysiajs/html";
import staticPlugin from "@elysiajs/static";
import { BasePage } from "./pages/basePage";
import { AlkisListPage } from "./pages/alkisListPage";
import { AlkisList } from "./pages/alkisList";

const app = new Elysia()
  .use(html())
  .use(
    staticPlugin({
      assets: "./src/public",
    })
  )
  .get("/", () => BasePage(AlkisListPage()))
  .get("/alkis", async ({ query }) => await AlkisList(query))
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);

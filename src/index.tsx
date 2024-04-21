import { Elysia } from "elysia";
import { html } from '@elysiajs/html'

import  {heyo, searchForProduct} from './pages/testPage'

const app = new Elysia()
  .use(html())
  .get("/", () => "Hello Elysia")
  .get("/test", async () => heyo())
  .post("/test", (req: {body: {search: string, category:string}}) => searchForProduct(req.body.search, req.body.category))
  //.post("/test", (req) => (console.log(req)))
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);

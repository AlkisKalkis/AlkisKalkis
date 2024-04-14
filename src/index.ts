import { Elysia } from "elysia";

function heyo (): string{
  return "heyo"
}

const app = new Elysia()
  .get("/", () => "Hello Elysia")
  .get("/test", heyo())
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);

import  {Hono} from "hono";
const app = new Hono();

app.get("/status", (c) => {
  return c.json({message: "Hello World"});
});

app.get("/", (c) => {
  return c.html(`<h1>Hello</h1>`);
});

app.get("/api/calculate", (c) => {
  const text = c.req.query("text");
  const wpm = c.req.query("wpm");
  return c.json({message: text, wpm});
});
export default app;
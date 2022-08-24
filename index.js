import express from "express";

const PORT = 3001;

const app = express();

// disable cache
app.set("etag", false);

app.use((_req, res, next) => {
  res.set("Cache-Control", "no-store");
  next();
});

app.get("/set-cookie", (_req, res) => {
  res.cookie("token", "superSecureToken", {
    httpOnly: true,
  });
  res.end();
});

app.get("/backend", (req, res) => {
  const cookies = req.headers.cookie || "";
  console.log(cookies.split(";"));
  res.end();
});

app.get("/", (_req, res) => {
  res.sendFile("index.html", { root: "./public" });
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});

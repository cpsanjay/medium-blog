const express = require("express");

const app = express();

app.get("/health-check", (req, res) => {
  res.json({
    msg: "healthCheck",
  });
});

app.post("/api/v1/user/signup", (req, res) => {});

app.post("/api/v1/user/signup", (req, res) => {});

app.post("/api/v1/user/signin", (req, res) => {});

app.post("/api/v1/blog", (req, res) => {});

app.put("/api/v1/blog", (req, res) => {});

app.get("/api/v1/blog/:id", (req, res) => {});

app.post("/api/v1/blog/bulk", (req, res) => {});

app.listen(5000, () => console.log("connected"));

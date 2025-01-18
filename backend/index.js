const jwt = require("jsonwebtoken");
const express = require("express");
const userRouter = require("./routes/user");
const blogRouter = require("./routes/blogs");

const app = express();
app.use(express.json());

const middleWare = (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    if (!authHeader) {
      return res.status(401).json({ msg: "Authorization header missing" });
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      return res.status(401).json({ msg: "Token missing" });
    }

    const user = jwt.verify(token, "secret"); // Replace "secret" with your env variable
    if (user) {
      req.userId = user.id; // Attach userId to the request object
      return next();
    }

    res.status(403).json({ msg: "Unauthorized" });
  } catch (error) {
    console.error(error);
    res.status(403).json({ msg: "Invalid or expired token" });
  }
};

app.get("/health-check", (req, res) => {
  res.json({
    msg: "healthCheck",
  });
});

app.use(
  "/api/v1/user",

  userRouter
);
app.use("/api/v1/blog", middleWare, blogRouter);

app.listen(5000, () => console.log("connected"));

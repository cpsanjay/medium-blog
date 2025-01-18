const express = require("express");
const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const router = express.Router();

router.post("/signup", async (req, res) => {
  try {
    const user = await prisma.user.create({
      data: {
        username: req.body.username,
        password: req.body.password,
      },
    });

    res.status(200).json({
      jwt: jwt.sign(
        {
          id: user.id,
        },
        "secret"
      ),
    });
  } catch (error) {
    console.log(error);
    res.status(411).json({
      msg: "Invalid",
    });
  }
});

router.post("/signin", async (req, res) => {
  const user = await prisma.user.findFirst({
    where: {
      username: req.body.username,
      password: req.body.password,
    },
  });

  if (!user) {
    res.status(403).json({
      msg: "Unauthorised",
    });
  }

  res.status(200).json({
    jwt: jwt.sign(
      {
        id: user.id,
      },
      "secret"
    ),
  });
});

module.exports = router;

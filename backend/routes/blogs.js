const express = require("express");

const router = express.Router();
const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

router.post("/", async (req, res) => {
  console.log(req.userId);
  const blog = await prisma.post.create({
    data: {
      title: req.body.title,
      desctiption: req.body.description,
      authodId: "36d4d6e1-a5ce-478d-9800-f8f38d16afd5",
    },
  });

  res.status(200).json({
    blog,
  });
});
router.put("/", async (req, res) => {
  const blog = await prisma.post.update({
    where: {
      id: req.body.id,
    },
    data: {
      title: req.body.title,
      desctiption: req.body.description,
    },
  });
  res.status(200).json({
    blog,
  });
});

router.get("/bulk", async (req, res) => {
  const blogs = await prisma.post.findMany();

  res.status(200).json({ blogs });
});

router.get("/:id", async (req, res) => {
  const blog = await prisma.post.findFirst({
    where: {
      id: req.params.id,
    },
  });
  res.status(200).json({
    blog,
  });
});

module.exports = router;

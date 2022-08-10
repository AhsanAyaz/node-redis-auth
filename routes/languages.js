const express = require("express");
const router = express.Router();
const Language = require("../models/Language");

router.get("/", async (req, res) => {
  const languages = await Language.find({});
  res.status(200).json({ languages });
});

module.exports = router;

var express = require("express");
var router = express.Router();

router.get("/", (req, res) => {
  res.json("Welcome To ShpereWallet Hackathon");
});
router.get("/genkey", (req, res) => res.send("ABCD"));

router.post("/sgn", (req, res) => res.send(""));

module.exports = router;

const bodyParser = require("body-parser");

const express = require("express");
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/", require("./routes"));

app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send("Something went wrong!! Check server console");
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

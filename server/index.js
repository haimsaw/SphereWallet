const express = require("express");
const next = require("next");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
let compression = require("compression");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
const withAuth = require("./routes/auth.route");

require("dotenv").config();

const PORT = process.env.PORT || 3000;
const dev = process.env.NODE_ENV !== "production"; //true false

const nextApp = next({ dev });
const handle = nextApp.getRequestHandler(); //part of next config

const db = mongoose.connect(process.env.MONGO_CONN_STRING, { useNewUrlParser: true });

nextApp.prepare().then(() => {
  const app = express();

  // Json praser
  app.use(bodyParser.json());

  // Url encoded parser
  app.use(bodyParser.urlencoded({ extended: true }));

  // Compression
  app.use(compression());

  // Helmet
  app.use(helmet());

  // Cookies
  app.use(cookieParser());

  // Api Routes
  app.use("/api/answer", require("./routes/answer.route"));
  app.use("/api/invitees", require("./routes/invitees.route"));
  app.use("/api/messages", require("./routes/messages.route"));
  app.use("/api/users", require("./routes/users.route"));

  // Next.js Routes
  app.get("/admin/:userHash", (req, res) => {
    return nextApp.render(req, res, "/admin", { userHash: req.params.userHash });
  });
  app.get("/i/:inviteeHash", (req, res) => {
    return nextApp.render(req, res, "/landingGilElad", { inviteeHash: req.params.inviteeHash });
  });
  app.get("*", (req, res) => {
    return handle(req, res);
  });

  app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(500).send("Something went wrong!!");
  });

  // Start server
  app.listen(PORT, err => {
    if (err) throw err;
    console.log(`ready at http://localhost:${PORT} \n isDev: ${dev}`);
  });
});

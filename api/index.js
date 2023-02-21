const express = require("express");
const app = express();
const session = require("express-session");

let RedisStore = require("connect-redis")(session);

const Redis = require("ioredis");

let client = new Redis(process.env.REDIS_URL);

app.use(express.static("public"));

app.use(
  session({
    store: new RedisStore({ client }),
    secret: process.env.FOO_COOKIE_SECRET ?? "test",
    resave: false,
    saveUninitialized: true,
  })
);

app.use(function (req, res, next) {
  if (!req.session.clickAmount) {
    req.session.clickAmount = 0;
  }
  next();
});

app.get("/", (req, res) => {
  res.sendFile("/public/index.html");
});

app.get("/get-click", function (req, res) {
  const clickAmount = req.session.clickAmount;
  res.json({ clickAmount: clickAmount });
});

app.put("/update-click", function (req, res) {
  req.session.clickAmount += 1;
  const clickAmount = req.session.clickAmount;
  res.json({ clickAmount: clickAmount });
});

app.delete("/reset-click", function (req, res) {
  req.session.clickAmount = 0;
  const clickAmount = req.session.clickAmount;
  res.json({ clickAmount: clickAmount });
});

module.exports = app;
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const session = require("express-session");
const { createClient } = require("redis");
const redisClient = createClient({ legacyMode: true });
const connectRedis = require("connect-redis");

var indexRouter = require("./routes/index");
var authRouter = require("./routes/auth");

var app = express();

// app.set('trust proxy', 1); // enable this if you run behind a proxy (e.g. nginx)
const RedisStore = connectRedis(session);

//Configure redis client
redisClient.connect().catch(console.error);

//Configure session middleware
app.use(
  session({
    store: new RedisStore({ client: redisClient }),
    secret: "secret$%^134",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false, // if true only transmit cookie over https
      httpOnly: false, // if true prevent client side JS from reading the cookie
      maxAge: 1000 * 60 * 10, // session max age in miliseconds
    },
  })
);

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/", indexRouter);
app.use("/auth", authRouter);

app.use(express.static(path.join(__dirname, "public")));

module.exports = app;

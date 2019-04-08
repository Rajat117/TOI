const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const path = require("path");
const passport = require("passport");
const routes = require("./routes/routing");
const app = express();
const { googleAuth, facebookAuth } = require("./config/auth.js");
const swaggerUi = require("swagger-ui-express");
swaggerDocument = require("./api-docs.json");

const db = require("./models");
googleAuth(passport);
facebookAuth(passport);

// var argv = require("minimist")(process.argv.slice(2));
// var subpath = express();
// app.use("/v1", subpath);
// var swagger = require("swagger-node-express").createNew(subpath);
// app.use(express.static("dist"));
app.set("view engine", "ejs");

// app.get("/", function(req, res) {
//   res.sendFile(__dirname + "/dist/index.html");
// });
// swagger.setApiInfo({
//   title: "example API",
//   description: "API to do something, manage something...",
//   termsOfServiceUrl: "",
//   contact: "yourname@something.com",
//   license: "",
//   licenseUrl: ""
// });

db.sequelize
  .sync()
  .then(() => {
    console.log("Database connected");
  })
  .catch(err => console.log("Error: " + err));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(passport.initialize());
app.use(cookieParser());
app.use("/", routes);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const PORT = process.env.PORT || 8000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));

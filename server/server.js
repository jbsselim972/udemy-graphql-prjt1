const express = require("express");
const models = require("./models");
const expressGraphQL = require("express-graphql");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const schema = require("./schema/schema");

const app = express();

// Replace with your mongoLab URI
const MONGO_URI = `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@cluster0.bidtf.mongodb.net/?retryWrites=true&w=majority`;
if (!MONGO_URI) {
  throw new Error("You must provide a MongoDB Atlas URI");
}

mongoose.Promise = global.Promise;
mongoose.connect(MONGO_URI);
mongoose.connection
  .once("open", () => console.log("Connected to MongoDB Atlas instance."))
  .on("error", (error) =>
    console.log("Error connecting to MongoDB Atlas:", error)
  );

app.use(bodyParser.json());
app.use(
  "/graphql",
  expressGraphQL({
    schema,
    graphiql: true,
  })
);

const webpackMiddleware = require("webpack-dev-middleware");
const webpack = require("webpack");
const webpackConfig = require("../webpack.config.js");
app.use(webpackMiddleware(webpack(webpackConfig)));

module.exports = app;

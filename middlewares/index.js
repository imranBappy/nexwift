const morgan = require("morgan");
const express = require("express");
const cors = require("cors");

const middlewares = [
  morgan("dev"),
  express.static("public"),
  cors(),
  express.urlencoded({ extended: true }),
  express.json(),
];

const setMiddlewares = (app) => {
  middlewares.forEach((middleware) => {
    app.use(middleware);
  });
};

module.exports = setMiddlewares;

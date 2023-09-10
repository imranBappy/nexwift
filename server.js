const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const errorHandle = require("./middlewares/errorHandle");
const setRoutes = require("./routes");
const setMiddlewares = require("./middlewares");

const app = express();
dotenv.config({ path: "./config/.env" });

// connect Database
connectDB();

// setup view Engine
app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");
app.set("views", "views");

//set middlewares
setMiddlewares(app);

// all routes set here
setRoutes(app);

app.use((req, res, next) => {
  res.status(404).json({ error: "Not Found" });
});

// handle Error
app.use(errorHandle);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});

const morgan = require("morgan");
const express = require("express");
const app = express();
const cors = require("cors");

app.use(morgan("dev"));
app.use(express.json());

const dotenv = require("dotenv")
const path = require("path")

const envFile = `.env.${process.env.NODE_ENV}`;
dotenv.config({ path: path.resolve(process.cwd(), envFile) });

app.use(
  cors({
    origin: process.env.USERBASE_API_URL,
    credentials: true,
  })
);

// Important: Handle preflight OPTIONS requests
app.options(
  "*",
  cors({
    origin: process.env.USERBASE_API_URL,
    credentials: true,
  })
);

app.use("/api/users", require("./users/index"));
app.use("/api/items", require("./items/index"));
app.use("/api/items", require("./comments/index"));
app.use("/api/comments", require("./comments/index"));
app.use("/api/users", require("./comments/index"));

app.get("/health", (req, res) => {
  res.status(200).send("Ok");
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || " Internal server error.");
});

app.use((req, res) => {
  res.status(404).send("Not Found");
});

module.exports = app;

const app = require("./app");
const dotenv = require("dotenv");
const path = require("path");

const envFile = `.env.${process.env.NODE_ENV}`;
dotenv.config({ path: path.resolve(process.cwd(), envFile) });

app.listen(process.env.EXPRESS_PORT, "0.0.0.0", () => {
  console.log("Hello!");
});

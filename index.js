const app = require("./app");



app.listen(process.env.EXPRESS_PORT, '0.0.0.0', () => {
  console.log("Hello!");
});
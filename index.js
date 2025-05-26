const app = require("./app");

const PORT = 80; //prod


app.listen(PORT, '0.0.0.0', () => {
  //console.log(`I am listening on port ${PORT}`);
  console.log("Hello!");
});
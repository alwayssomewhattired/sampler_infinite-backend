const router = require("express").Router();

const {
  getItems,
  getItem,
  postAudio,
  getSpecificItems,
  isLoggedIn,
  // getReview,
} = require("../db");

router.get("/allItems", async (req, res, next) => {
  try {
    const response = await getItems();
    res.send(response);
  } catch (error) {
    next(error);
  }
});

// USE QUERY INSTEAD OF PARAMS
router.get("/specificItems", isLoggedIn, async (req, res, next) => {
  try {
    if (req.user == undefined) {
      res.status(401).send("No user logged in.");
    } else {
      const itemIds = req.query.itemIds; // expected as comma-separated or array
      if (!itemIds) return res.status(400).send("Missing itemIds");
      // if itemIds is a string like "123,456"
      const idsArray =
        typeof itemIds === "string" ? itemIds.split(",") : itemIds;
      const response = await getSpecificItems(idsArray);
      res.send(response);
    }
  } catch (error) {
    next(error);
  }
});

router.get("/:itemId", async (req, res, next) => {
  try {
    const id = req.params.itemId;
    const response = await getItem(id);
    res.send(response);
  } catch (error) {
    next(error);
  }
});

router.post("/:id/:user/:name", isLoggedIn, async (req, res, next) => {
  try {
    if (req.user == undefined) {
      res.status(401).send("No user logged in.");
    } else {
      const id = req.params.id;
      const user = req.params.user;
      const name = req.params.name;
      const { description } = req.body;
      const response = await postAudio(id, user, name, description);
      res.send(response);
    }
  } catch (error) {
    next(error);
  }
});

// router.get("/:itemId/reviews", async (req, res, next) => {
//   try {
//     const itemID = req.params.itemId;
//     const response = await getReview(itemID);
//     res.send(response);
//   } catch (error) {
//     next(error);
//   }
// });

module.exports = router;

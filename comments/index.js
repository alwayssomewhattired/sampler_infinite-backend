const router = require("express").Router();

const {
  isLoggedIn,
  createComment,
  getComments,
  getAudioComment,
  updateComment,
  getReactComment,
  postReactComment,
  deleteComment,
  createReply,
  // getReviewComments,
  // deleteReview,
} = require("../db");

// router.post(
//   "/:itemId/reviews/:reviewId/comments",
//   isLoggedIn,
//   async (req, res, next) => {
//     try {
//       if (req.user == undefined) {
//         res.status(401).send("No user logged in.");
//       } else {
//         const itemID = req.params.itemId;
//         const reviewID = req.params.reviewId;
//         const userID = req.user.id;
//         const { commentText } = req.body;
//         const response = await createComment(
//           itemID,
//           reviewID,
//           commentText,
//           userID
//         );
//         res.send(response);
//       }
//     } catch (error) {
//       next(error);
//     }
//   }
// );

router.post("/:itemId/comments", isLoggedIn, async (req, res, next) => {
  try {
    if (req.user == undefined) {
      res.status(401).send("No user logged in.");
    } else {
      const itemID = req.params.itemId;
      // const reviewID = req.params.reviewId;
      const userID = req.user.id;
      const { commentText } = req.body;
      const response = await createComment(
        itemID,
        // reviewID,
        commentText,
        userID
      );
      res.send(response);
    }
  } catch (error) {
    next(error);
  }
});

router.post("/reply", isLoggedIn, async (req, res, next) => {
  try {
    if (req.user == undefined) {
      res.status(401).send("No user logged in.");
    } else {
      const { replyText, parentCommentId, itemID } = req.body;
      const userID = req.user.id;
      const commentText = replyText;
      const response = await createReply(
        userID,
        commentText,
        parentCommentId,
        itemID
      );
      res.send(response);
    }
  } catch (error) {
    next(error);
  }
});

router.post("/reactionType", async (req, res, next) => {
  try {
    const { commentIDs } = req.body;
    const response = await getReactComment(commentIDs);
    res.send(response);
  } catch (error) {
    next(error);
  }
});

router.post(
  "/:commentID/reactionComment",
  isLoggedIn,
  async (req, res, next) => {
    try {
      if (req.user == undefined) {
        res.status(401).send("No user logged in.");
      } else {
        const userID = req.user.id;
        const commentID = req.params.commentID;
        const reaction = req.body.reaction;
        const response = await postReactComment(userID, commentID, reaction);
        res.send(response);
      }
    } catch (error) {
      next(error);
    }
  }
);

router.get("/me", isLoggedIn, async (req, res, next) => {
  try {
    if (req.user == undefined) {
      res.status(401).send("No user logged in.");
    } else {
      const userID = req.user.id;
      const response = await getComments(userID);
      res.send(response);
    }
  } catch (error) {
    next(error);
  }
});

router.get("/:itemId/comment", isLoggedIn, async (req, res, next) => {
  try {
    // if (req.user == undefined) {
    //   res.status(401).send("No user logged in.");
    // } else {
    const itemID = req.params.itemId;
    const response = await getAudioComment(itemID);
    res.send(response);
    // }
  } catch (error) {
    next(error);
  }
});

router.put("/updateComments/:commentId", isLoggedIn, async (req, res, next) => {
  try {
    if (req.user == undefined) {
      res.status(401).send("No user logged in.");
    } else {
      const userID = req.user.id;
      const id = req.params.commentId;
      const { commentText } = req.body;
      const response = await updateComment(userID, id, commentText);
      res.send(response);
    }
  } catch (error) {
    next(error);
  }
});

router.delete("/:commentId", isLoggedIn, async (req, res, next) => {
  try {
    if (req.user == undefined) {
      res.status(401).send("No user logged in.");
    } else {
      const userID = req.params.userId;
      const id = req.params.commentId;
      const response = await deleteComment(userID, id);
      res.send(response);
    }
  } catch (error) {
    next(error);
  }
});

// router.get("/:reviewId/comments", isLoggedIn, async (req, res, next) => {
//   try {
//     if (req.user == undefined) {
//       res.status(401).send("No user logged in.");
//     } else {
//       const reviewID = req.params.reviewId;
//       const response = await getReviewComments(reviewID);
//       res.send(response);
//     }
//   } catch (error) {
//     next(error);
//   }
// });

// router.delete(
//   "/:userId/reviews/:reviewId",
//   isLoggedIn,
//   async (req, res, next) => {
//     try {
//       if (req.user == undefined) {
//         res.status(401).send("No user logged in.");
//       } else {
//         const userID = req.params.userId;
//         const id = req.params.reviewId;
//         const response = await deleteReview(userID, id);
//         res.send(response);
//       }
//     } catch (error) {
//       next(error);
//     }
//   }
// );

module.exports = router;

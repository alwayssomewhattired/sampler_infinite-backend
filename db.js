const { prisma } = require("./common");
const jwt = require("jsonwebtoken");

const isLoggedIn = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.slice(7);
  if (!token) {
    return next();
  }
  try {
    const { id } = jwt.verify(token, process.env.JWT);
    const user = await getUser(id);
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

const createUser = async (username, email, password) => {
  const response = await prisma.User.create({
    data: {
      username,
      email,
      password,
    },
  });
  console.log(response);
  return response;
};

const loginUser = async (email) => {
  const response = await prisma.User.findFirstOrThrow({
    where: {
      email,
    },
  });
  console.log(response);
  return response;
};

const getUser = async (id) => {
  const response = await prisma.User.findFirstOrThrow({
    where: {
      id,
    },
    select: {
      username: true,
      id: true,
      email: true,
    },
  });
  console.log(response);
  return response;
};

const getUserNamesByIds = async (ids) => {
  console.log(ids);
  const response = await prisma.User.findMany({
    where: {
      id: {
        in: ids, // Use 'in' to filter multiple IDs
      },
    },
    select: {
      id: true,
      username: true, // Only select the 'name' field
    },
  });
  console.log(response);
  // Map to extract names only
  // const names = response.map((User) => User.username);
  // console.log(names);
  return response;
};

const getAllUsers = async () => {
  const response = await prisma.User.findMany({});
  console.log(response);
  return response;
};

const getOneUser = async (id) => {
  const response = await prisma.User.findFirstOrThrow({
    where: {
      id,
    },
  });
  console.log(response);
  return response;
};

const deleteUser = async (id) => {
  const response = await prisma.User.delete({
    where: {
      id,
    },
  });
  console.log(response);
  return response;
};

const updateUserEmail = async (id, email) => {
  const response = await prisma.User.update({
    where: {
      id,
    },
    data: { email },
  });
  console.log(response);
  return response;
};

const updateUserUsername = async (id, username) => {
  const response = await prisma.User.update({
    where: {
      id,
    },
    data: { username },
  });
  console.log(response);
  return response;
};

const updateUserPassword = async (id, password) => {
  const response = await prisma.User.update({
    where: {
      id,
    },
    data: { password },
  });
  console.log(response);
  return response;
};

const getItems = async () => {
  const response = await prisma.Item.findMany({});
  console.log(response);
  return response;
};

const getSpecificItems = async (itemIDs) => {
  try {
    const response = await prisma.Item.findMany({
      where: {
        id: {
          in: itemIDs,
        },
      },
    });
    console.log(response);
    return response;
  } catch (error) {
    console.error("Item not found: ", error);
  }
};

const getItem = async (id) => {
  const response = await prisma.Item.findFirstOrThrow({
    where: {
      id,
    },
  });
  console.log(response);
  return response;
};

const postAudio = async (id, user, name, description) => {
  const response = await prisma.Item.create({
    data: {
      id,
      user,
      name,
      description,
    },
  });
  console.log(response);
  return response;
};

const createComment = async (itemID, commentText, userID) => {
  const response = await prisma.Comment.create({
    data: {
      commentText,
      userID,
      itemID,
      // reviewID,
    },
  });
  console.log(response);
  return response;
};

const createReply = async (userID, commentText, parentCommentId, itemID) => {
  try {
    const response = await prisma.Comment.create({
      data: {
        userID,
        commentText,
        parentCommentId,
        itemID,
      },
    });
    console.log(response);
    return response;
  } catch (error) {
    console.error(error);
  }
};

const getComments = async (userID) => {
  const response = await prisma.Comment.findMany({
    where: {
      userID,
    },
    // include: {
    //   childComments: {
    //     include: {
    //       childComments: true,
    //     },
    //   },
    // },
  });
  console.log(response);
  return response;
};

const getAudioComment = async (itemID) => {
  const response = await prisma.Comment.findMany({
    where: {
      itemID,
    },
    include: {
      childComments: {
        include: {
          childComments: true,
        },
      },
    },
  });
  console.log(response);
  return response;
};

const updateComment = async (userID, id, commentText) => {
  const response = await prisma.Comment.update({
    where: {
      id,
      userID,
    },
    data: {
      commentText,
    },
  });
  console.log(response);
  return response;
};

const getReactComment = async (commentIDs) => {
  const response = await prisma.commentReaction.groupBy({
    by: ["commentID", "reactionType"],
    where: {
      commentID: {
        in: commentIDs,
      },
    },
    _count: {
      reactionType: true,
    },
  });
  console.log(response);
  return response;
};

const postReactComment = async (userID, commentID, reaction) => {
  const response = await prisma.commentReaction.upsert({
    where: {
      userID_commentID: {
        // using the composite constraint
        userID: userID,
        commentID: commentID,
      },
    },
    update: {
      // if record already exists, then this
      reactionType: reaction,
    },
    create: {
      // if record doesn't exist, then this
      userID: userID,
      commentID: commentID,
      reactionType: reaction,
    },
  });
  console.log(response);
  return response;
};

const deleteComment = async (userID, id) => {
  const response = await prisma.Comment.delete({
    where: {
      id,
      userID,
    },
  });
  console.log(response);
  return response;
};

// const getReview = async (itemID) => {
//   const response = await prisma.Review.findMany({
//     where: {
//       itemID,
//     },
//   });
//   console.log(response);
//   return response;
// };

// const getSpecificReview = async (itemID, id) => {
//   const response = await prisma.Review.findFirstOrThrow({
//     where: {
//       itemID,
//       id,
//     },
//   });
//   console.log(response);
//   return response;
// };

// const getReviewComments = async (reviewID) => {
//   const response = await prisma.Comment.findMany({
//     where: {
//       reviewID,
//     },
//   });
//   console.log(response);
//   return response;
// };

// const getReviews = async (userID) => {
//   const response = await prisma.Review.findMany({
//     where: {
//       userID,
//     },
//   });
//   console.log(response);
//   return response;
// };

// const createReview = async (itemID, reviewText, userID) => {
//   const response = await prisma.Review.create({
//     data: {
//       reviewText,
//       userID,
//       itemID,
//     },
//   });
//   console.log(response);
//   return response;
// };

// const updateReview = async (userID, id) => {
//   const response = await prisma.Review.update({
//     where: {
//       id,
//       userID,
//     },
//     data: {
//       reviewText,
//     },
//   });
//   console.log(response);
//   return response;
// };

// const deleteReview = async (userID, id) => {
//   const response = await prisma.Review.delete({
//     where: {
//       id,
//       userID,
//     },
//   });
//   console.log(response);
//   return response;
// };

module.exports = {
  createUser,
  loginUser,
  getUser,
  getAllUsers,
  getOneUser,
  getUserNamesByIds,
  deleteUser,
  updateUserUsername,
  updateUserEmail,
  updateUserPassword,
  getItems,
  getSpecificItems,
  getItem,
  postAudio,
  isLoggedIn,
  createComment,
  createReply,
  getComments,
  getAudioComment,
  updateComment,
  postReactComment,
  getReactComment,
  deleteComment,
  // getReview,
  // getReviews,
  // getSpecificReview,
  // getReviewComments,
  // createReview,
  // updateReview,
  // deleteReview,
};

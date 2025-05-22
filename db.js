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

const createUser = async (username, email, password, photoId) => {
  const response = await prisma.User.create({
    data: {
      username,
      email,
      password,
      photoId,
    },
  });
  return response;
};

const loginUser = async (email) => {
  const response = await prisma.User.findFirstOrThrow({
    where: {
      email,
    },
  });
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
      photoId: true,
    },
  });
  return response;
};

const getUserNamesByIds = async (ids) => {
  const response = await prisma.User.findMany({
    where: {
      id: {
        in: ids,
      },
    },
    select: {
      id: true,
      username: true, 
    },
  });

  return response;
};

const getOneUser = async (id) => {
  const response = await prisma.User.findFirstOrThrow({
    where: {
      id,
    },
  });
  return response;
};

const getAllUsers = async () => {
  const response = await prisma.User.findMany({});
  return response;
};

const getAboutSelf = async (id) => {
  const response = await prisma.User.findFirstOrThrow({
    where: {
      id,
    },
    select: {
      created_at: true,
      photoId: true,
      username: true,
      email: true,
      comments: {
        select: {
          created_at: true,
          itemID: true,
          userID: true,
          commentText: true,
          item: true,
          id: true,
          reactions: true,
        },
      },
      items: {
        select: {
          reactions: true,
          id: true,
          user: true,
          name: true,
          description: true,
          created_at: true,
        },
      },
    },
  });
  return response;
};

const getAboutHim = async (id) => {
  const response = await prisma.User.findFirstOrThrow({
    where: {
      id,
    },
    select: {
      created_at: true,
      photoId: true,
      username: true,
      comments: {
        select: {
          created_at: true,
          itemID: true,
          userID: true,
          commentText: true,
          item: true,
          id: true,
          reactions: true,
        },
      },
      items: {
        select: {
          reactions: true,
          id: true,
          user: true,
          name: true,
          description: true,
          created_at: true,
        },
      },
    },
  });
  return response;
};

const deleteUser = async (id) => {
  const response = await prisma.User.delete({
    where: {
      id,
    },
  });
  return response;
};

const createPhoto = async (id, photoId) => {
  const response = await prisma.User.update({
    where: {
      id,
    },
    data: { photoId },
  });
  return response;
};

const updateUserEmail = async (id, email) => {
  const response = await prisma.User.update({
    where: {
      id,
    },
    data: { email },
  });
  return response;
};

const updateUserUsername = async (id, username) => {
  const response = await prisma.User.update({
    where: {
      id,
    },
    data: { username },
  });
  return response;
};

const updateUserPassword = async (id, password) => {
  const response = await prisma.User.update({
    where: {
      id,
    },
    data: { password },
  });
  return response;
};

const getItems = async () => {
  const response = await prisma.Item.findMany({
    include: {
      User: {
        select: {
          username: true,
          photoId: true,
        },
      },
      reactions: true,
    },
  });
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
    select: {
      name: true,
      description: true,
      created_at: true,
      User: true,
      reactions: true,
      id: true,
    },
  });
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
  return response;
};

const postReactItem = async (userID, itemID, reaction) => {
  try {
    const response = await prisma.itemReaction.upsert({
      where: {
        userID_itemID: {
          // using the composite constraint
          userID: userID,
          itemID: itemID,
        },
      },
      update: {
        // if record already exists, then this
        reactionType: reaction,
      },
      create: {
        // if record doesn't exist, then this
        userID: userID,
        itemID: itemID,
        reactionType: reaction,
      },
    });
    return response;
  } catch (error) {
    console.error(error);
  }
};

const createComment = async (itemID, commentText, userID) => {
  const response = await prisma.Comment.create({
    data: {
      commentText,
      userID,
      itemID,
    },
  });
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

    include: {
      reactions: true,
    },
  });
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
      user: {
        select: {
          username: true,
          photoId: true,
        },
      },
    },
  });
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
  return response;
};

const deleteComment = async (userID, id) => {
  const response = await prisma.Comment.delete({
    where: {
      id,
      userID,
    },
  });
  return response;
};

module.exports = {
  createUser,
  loginUser,
  getUser,
  getAllUsers,
  getOneUser,
  getUserNamesByIds,
  getAboutSelf,
  getAboutHim,
  deleteUser,
  createPhoto,
  updateUserUsername,
  updateUserEmail,
  updateUserPassword,
  getItems,
  getSpecificItems,
  getItem,
  postAudio,
  postReactItem,
  isLoggedIn,
  createComment,
  createReply,
  getComments,
  getAudioComment,
  updateComment,
  postReactComment,
  getReactComment,
  deleteComment,
};

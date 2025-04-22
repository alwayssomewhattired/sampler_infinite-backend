const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const {
  createUser,
  loginUser,
  getUser,
  getAllUsers,
  getOneUser,
  getUserNamesByIds,
  deleteUser,
  updateUserEmail,
  updateUserUsername,
  updateUserPassword,
} = require("../db");

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

router.post("/register", async (req, res, next) => {
  try {
    const { username, email, normal_password } = req.body;
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(normal_password, salt);
    const response = await createUser(username, email, password);
    const token = jwt.sign({ id: response.id }, process.env.JWT);
    const me = response.id;
    res.send({ token, me });
  } catch (error) {
    next(error);
  }
});

router.post("/login", async (req, res, next) => {
  try {
    const { email, normal_password } = req.body;
    const user = await loginUser(email, normal_password);
    if ((await bcrypt.compare(normal_password, user.password)) == false) {
      const error = Error("Wrong password");
      error.status = 401;
      throw error;
    }
    const me = user.id;
    const token = jwt.sign({ id: user.id }, process.env.JWT);
    res.send({ token, me });
  } catch (error) {
    console.log(error);
  }
});

router.get("/aboutMe", isLoggedIn, async (req, res, next) => {
  try {
    req.user == undefined
      ? res.status(401).send("No user logged in.")
      : res.status(200).send(req.user);
  } catch (error) {
    next(error);
  }
});

router.get("/allUsers", isLoggedIn, async (req, res, next) => {
  try {
    if (req.user == undefined) {
      res.status(401).send("No user logged in.");
    }
    const response = await getAllUsers();
    res.send(response);
  } catch (error) {
    next(error);
  }
});

router.get("/allUserNames", isLoggedIn, async (req, res, next) => {
  try {
    if (req.user == undefined) {
      res.status(401).send("No user logged in.");
    }
    const ids = req.body;
    const response = await getUserNamesByIds(ids);
    res.send(response);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", isLoggedIn, async (req, res, next) => {
  try {
    if (req.user == undefined) {
      res.status(401).send("No user logged in.");
    }
    const id = req.params.id;
    const response = await getOneUser(id);
    res.send(response);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", isLoggedIn, async (req, res, next) => {
  try {
    if (req.user == undefined) {
      res.status(401).send("No user logged in.");
    }
    const id = req.params.id;
    const response = await deleteUser(id);
    res.send(response);
  } catch (error) {
    next(error);
  }
});

router.put("/:id/email", isLoggedIn, async (req, res, next) => {
  try {
    if (req.user == undefined) {
      res.status(401).send("No user logged in.");
    }
    const id = req.params.id;
    const { email } = req.body;
    const response = await updateUserEmail(id, email);
    res.send(response);
  } catch (error) {
    next(error);
  }
});

router.put("/:id/username", isLoggedIn, async (req, res, next) => {
  try {
    if (req.user == undefined) {
      res.status(401).send("No user logged in.");
    }
    const id = req.params.id;
    const { username } = req.body;
    const response = await updateUserUsername(id, username);
    res.send(response);
  } catch (error) {
    next(error);
  }
});

router.put("/:id/password", isLoggedIn, async (req, res, next) => {
  try {
    if (req.user == undefined) {
      res.status(401).send("No user logged in.");
    }
    const id = req.params.id;
    const { normal_password } = req.body;
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(normal_password, salt);
    const response = await updateUserPassword(id, password);
    res.send(response);
  } catch (error) {
    next(error);
  }
});

module.exports = router;

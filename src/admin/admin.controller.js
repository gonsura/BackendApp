const express = require("express");
const prisma = require("../db/index");
const {
  allUsers,
  userById,
  deleteUserById,
  createUser,
  editUserById,
} = require("./admin.service");
const router = express.Router();

router.get("/", async (req, res) => {
  const users = await allUsers();

  res.send(users);
});
router.post("/", async (req, res) => {
  try {
    const newData = req.body;
    const user = await createProduct(newData);

    res.send({
      data: user,
      message: "create Level success",
    });
  } catch (err) {
    res.status(400).send(err.message);
  }
});
router.put("/:id", async (req, res) => {
  const userId = req.params.id;
  const newData = req.body;
  if (
    !(
      newData.nameUser &&
      newData.emailUser &&
      newData.passwordUser &&
      newData.tlpUser &&
      newData.addressUser &&
      newData.levelUser &&
      newData.statusUser &&
      newData.fotoUser
    )
  ) {
    return res.status(400).send("some fields are missings");
  }
  const user = await editUserById(parseInt(userId), newData);

  res.send({
    data: user,
    message: "Update User success",
  });
});
router.patch("/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const newData = req.body;
    const user = await editUserById(parseInt(userId), newData);

    res.send({
      data: user,
      message: "Update User success",
    });
  } catch (err) {
    res.status(400).send(err.message);
  }
});
router.delete("/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    await deleteUserById(parseInt(userId));

    res.send("User deleted");
  } catch (err) {
    res.status(400).send(err.message);
  }
});
router.get("/:id", async (req, res) => {
  try {
    const userId = parseInt(req.params.id);
    const users = await userById(userId);
    res.send(users);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

module.exports = router;

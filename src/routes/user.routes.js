const { Router } = require("express");
const { createUser, getAllUser } = require("../controllers/user.controller");

const router = Router();

//api: url/user/__

//users routes
router.post("/create-user", createUser);
router.post("/get-all-users", getAllUser);

module.exports = router;

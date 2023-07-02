const express = require("express");
const User = require("../models/UsersModel");
const jwt = require("jsonwebtoken"); // jwt acts as the connection between frontend and backend,

const router = express.Router();

/* Function to Generate JWT */
const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" }); // SECRET is a variable only known to the backend server to ensure greater security
};

/* Login */
router.post("/login", async (request, response) => {
  const obj = request.body;
  const name = obj.username;
  const password = obj.password;

  try {
    const user = await User.login(name, password);

    /* JSON Web Token */
    const token = createToken(user._id);

    response.status(200).json({ name, token });
  } catch (error) {
    //console.log(error.message);
    response.status(400).json({ error: error.message });
  }
});

/* Signup */
router.post("/signup", async (request, response) => {
  const obj = request.body;
  const name = obj.name;
  const email = obj.email;
  const password = obj.password;

  try {
    const user = await User.signup(name, email, password); // .signup() is a statically created function in UsersModel.js

    /* JSON Web Token */
    const token = createToken(user._id);

    response.status(200).json({ name, token });
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
});

router.post("/verify", (request, response) => {
  const token = request.body.token;

  try {
    jwt.verify(token, process.env.SECRET);
    response.status(200).json({ message: "Verification successful" });
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
});

module.exports = router;

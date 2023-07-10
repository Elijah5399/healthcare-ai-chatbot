const mongoose = require("mongoose");
const Schema = mongoose.Schema; // a schema defines the structure of a type of document inside the database
const bcrypt = require("bcrypt"); // bcrypt is a npm package that allows us to hash passwords
const validator = require("validator"); // validator is a npm package that allows us to check the validity of emails and passwords

const userSchema = new Schema(
  {
    name: {
        type: String,
        required: true,
        unique: true
    },
    email: {
      type: String,
      required: true,
      unique: true, // ensures emails are unique
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

/* Static Signup Method */
userSchema.statics.signup = async function (name, email, password) {   // creating an additional static method for usersModel that can be used
  /* Validation Checks */
  if (!email || !password) {
    throw Error("All fields must be filled");
  }

  if (!validator.isEmail(email)) {
    throw Error("Email is not valid");
  }

  if (!validator.isStrongPassword(password, { minNumbers: 0, minSymbols: 0 })) {
    throw Error(
      "Password must be at least 8 characters long with at least 1 upper and lower case character and 1 number and 1 special character. Please ensure that there is no lexicographical sequence of characters as well"
    );
  }

  const exists = await this.findOne({ email }); // a second layer of check to ensure that emails are unique

  if (exists) {
    throw Error("Email already taken");
  }

  /* Creating User + Save it in Collection */
  const salt = await bcrypt.genSalt(10); // salt is a sequence of characters added after a password before hashing to prevent password matching in the event of similar passwords
  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({ name, email, password: hash });

  return user;
};

/* Static Login Method */
userSchema.statics.login = async function (name, password) {
  /* Validation Checks */
  if (!name || !password) {
    throw Error("All fields must be filled");
  }

  const user = await this.findOne({ name }); // a second layer of check to ensure that emails are unique

  if (!user) {
    throw new Error("Incorrect username");
  }

  const matchPassword = await bcrypt.compare(password, user.password);

  if (!matchPassword) {
    throw Error("Incorrect password");
  }

  return user;
};

const User = mongoose.model("User", userSchema);

module.exports = User;

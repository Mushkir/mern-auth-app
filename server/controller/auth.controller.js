import bcrypt from "bcrypt";
import User from "../model/user.model.js";

export const AuthIndex = (req, res) => {
  res.json({ msg: "From Auth GET" });
};

export const SignUp = async (req, res) => {
  const { username, email, password } = req.body; // Getting the json data from frontend.

  const hashedPassword = bcrypt.hashSync(password, 10);

  const newUser = new User({
    username: username,
    email: email,
    password: hashedPassword,
  });

  try {
    const user = await newUser.save();

    return res.status(200).json({ user });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
  // res.json({ data: req.body }); For debugging
};

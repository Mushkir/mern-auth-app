import bcrypt from "bcrypt";
import User from "../model/user.model.js";
import { use } from "bcrypt/promises.js";

export const AuthIndex = (req, res) => {
  res.json({ msg: "From Auth GET" });
};

export const SignUp = async (req, res) => {
  const { username, email, password } = req.body; // Extracting data from the request body

  try {
    // Check if a user with the provided email already exists
    const findUserEmail = await User.findOne({ email: email });

    if (findUserEmail) {
      // If user exists, return a conflict status code and message
      return res.json({ status: 409, message: "Email already exists!" });
    } else {
      // Hash the password before saving
      const hashedPassword = bcrypt.hashSync(password, 10);

      // Create a new user object
      const newUser = new User({
        username: username,
        email: email,
        password: hashedPassword,
      });

      // Save the new user to the database
      const user = await newUser.save();

      // Return a success status code and the user object (excluding the password for security)
      return res.json({ status: 201, user: user });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

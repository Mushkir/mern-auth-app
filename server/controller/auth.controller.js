import bcrypt from "bcrypt";
import User from "../model/user.model.js";
import jwt from "jsonwebtoken";

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

export const SignIn = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const findUser = await User.findOne({ email: email });

    if (!findUser) {
      res.json({ status: 404, message: "User not found" });
    } else {
      const validPassword = bcrypt.compareSync(password, findUser.password);

      if (!validPassword) {
        res.json({ status: 401, message: "Wrong creditials" });
      } else {
        const token = jwt.sign(
          { userId: findUser._id },
          process.env.SECRET_KEY
        );
        const { password: password, ...userDataExceptPassword } =
          findUser.toObject();

        res
          .cookie("access_token", token, {
            expires: new Date(Date.now() + 86400000),
            secure: true,
            httpOnly: true,
          })
          .json({ status: 200, userDataExceptPassword });
      }
    }

    // res.json(findUser);
  } catch (error) {
    console.log("Error from SignIn: " + error.message);
  }
  // res.json(email);
};

export const GoogleAuth = async (req, res) => {
  const { name, email, photo } = req.body;

  /*
  DB col:
  username: name,
  email: email,
  password: ?
  img: photo
  */

  try {
    const findUser = await User.findOne({ email: email });

    if (!findUser) {
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);

      const encryptedPassword = bcrypt.hashSync(generatedPassword, 10);

      const newUser = new User({
        username: name,
        email: email,
        password: encryptedPassword,
        profilePicture: photo,
      });

      const user = await newUser.save();

      const { password, ...rest } = user.toObject();

      const token = jwt.sign({ user: user._id }, process.env.SECRET_KEY);

      res
        .cookie("access_token", token, {
          expires: new Date(Date.now() + 86400000),
          secure: true,
          httpOnly: true,
        })
        .json(rest);
    } else {
      const token = jwt.sign({ user: findUser._id }, process.env.SECRET_KEY);

      const { password, ...rest } = findUser.toObject();

      res
        .cookie("access_token", token, {
          expires: new Date(Date.now() + 86400000),
          secure: true,
          httpOnly: true,
        })
        .json(rest);
    }
  } catch (error) {
    console.log(`Error from GoogleAuth: ${error.message}`);
  }
};

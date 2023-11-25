import User from "../models/User.js";
import { ctrlContactWrapper } from "../decorators/index.js";
import { HttpError } from "../helpers/index.js";
import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken";
import "dotenv/config";

const { JWT_SECRET_KEY } = process.env;

// try {
//   const errToken =
//     "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NjIxNTlkNGM2OTlmNjY4MjNiNDU4YyIsImlhdCI6MTcwMDkyOTkwMCwiZXhwIjoxNzAxMDAxOTAwfQ.lw-PwufjlSxbqn00TpS_SoXlusr42ohHvcj3It37zfM";

//   //* Перевіряє чи дійсно токен був зашифрований JWT_SECRET_KEY цим рядком(Якщо НІ,то повертає Invalid signature)
//   //*Якщо 1 ОК, то далі перевіряє чи час життя не сплинув (Якщо минув -> JWT EXPIRES)
//   //*Якщо все ОК -> payload

//   const { id } = jsonwebtoken.verify(token, JWT_SECRET_KEY);

//   console.log({ id });
// } catch (error) {
//   console.log(error.message);
// }

const signup = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user) {
    throw HttpError(409, "Such email is exist");
  }

  const hashPassword = await bcrypt.hash(password, 10);
  const newUser = await User.create({ ...req.body, password: hashPassword });

  res.status(201).json({
    user: {
      email: newUser.email,
      subscription: newUser.subscription,
    },
  });
};

const signin = async (req, res) => {
  const { email, password } = req.body;

  const findUser = await User.findOne({ email });

  if (!findUser) {
    throw HttpError(401, "Email or password is wrong");
  }

  const comparePassword = await bcrypt.compare(password, findUser.password);

  if (!comparePassword) {
    throw HttpError(401, "Email or password is wrong");
  }

  const payload = {
    id: findUser._id,
  };

  const token = jsonwebtoken.sign(payload, JWT_SECRET_KEY, {
    expiresIn: "20h",
  });

  res.status(200).json({
    token,
    user: {
      email,
      subscription: findUser.subscription,
    },
  });
};

export default {
  signup: ctrlContactWrapper(signup),
  signin: ctrlContactWrapper(signin),
};

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { dbConnect } from "../../../utils/mongoose";
import { serialize } from "cookie";
import User from "../../../models/user.model";

dbConnect();

export default async function login(req, res) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(403).json({ message: "Usuario o contraseña invalida" });
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return res.status(403).json({ message: "Usuario o contraseña invalida" });
    }

    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
        name: user.firstName,
        lastName: user.lastName,
        typeUser: user.typeUser,
        superUser: user.superUser,
      },
      process.env.NEXT_PUBLIC_JWT_SECRET_KEY,
      { expiresIn: "9h" }
    );
    const serialized = serialize("myTokenName", token, {
      httpOnly: true,
      sameSite: "strict",
      maxAge: 1000 * 60 * 60 * 9,
      path: "/",
    });

    // console.log("este es el token del back", token);
    res.setHeader("Set-Cookie", serialized);
    return res.status(201).json({
      message: "User login",
      user: {
        id: user._id,
        email: user.email,
        name: user.firstName,
        lastName: user.lastName,
        typeUser: user.typeUser,
        superUser: user.superUser,
      },
    });
  } catch (err) {
    res.status(400).json({ message: "User could not login", data: err });
  }
}

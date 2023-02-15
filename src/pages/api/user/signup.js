/* eslint-disable no-underscore-dangle */
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { dbConnect } from "../../../utils/mongoose";
import { serialize } from "cookie";
import User from "../../../models/user.model";

dbConnect();

export default async function handler(req, res) {
  const { method } = req;
  const { authorization } = req.headers;

  switch (method) {
    case "GET":
      try {
        const token = authorization.split(" ")[1];
        const { id } = jwt.verify(
          token,
          process.env.NEXT_PUBLIC_JWT_SECRET_KEY
        );
        const user = await User.findById(id);
        if (!user) {
          return res.status(400).json({ message: "No find User" });
        }

        return res.status(200).json({
          message: "User found",
          user: {
            name: user.firstName,
            lastName: user.lastName,
            typeUser: user.typeUser,
            email: user.email,
          },
        });
      } catch (error) {
        return res.status(400).json({ error: error.message });
      }

    case "POST":
      try {
        const { password, confirmPassword } = req.body;
        if (password !== confirmPassword) {
          return res.status(403).json({ message: "Contraseñas no coinciden" });
        }

        const encPassword = await bcrypt.hash(password, 8);

        const user = await User.create({
          ...req.body,
          password: encPassword,
        });
        // sendMail(user);

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

        return res.status(201).json({
          message: "User Created",
          token,
          user: {
            name: user.firstName,
            lastName: user.lastName,
            typeUser: user.typeUser,
            email: user.email,
          },
        });
      } catch (error) {
        return res.status(400).json({ error: error.message });
      }

    default:
      return res.status(400).json({ msg: "this method is not supported" });
  }
}

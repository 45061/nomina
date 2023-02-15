import { dbConnect } from "../../../utils/mongoose";

import Worker from "../../../models/worker.model";

import { verify } from "jsonwebtoken";

dbConnect();

export default async function handler(req, res) {
  const { method } = req;
  const { myTokenName } = req.cookies;

  switch (method) {
    case "POST":
      try {
        const user = verify(
          myTokenName,
          process.env.NEXT_PUBLIC_JWT_SECRET_KEY
        );

        const { typeUser } = user;

        if (!typeUser) {
          return res.status(400).json({ msg: "this user is not authorized" });
        }

        const worker = await Worker.create({
          ...req.body,
        });

        return res.status(201).json({
          message: "Worker Created",
        });
      } catch (error) {
        return res.status(400).json({ error: error.message });
      }

    default:
      return res.status(400).json({ msg: "this method is not supported" });
  }
}

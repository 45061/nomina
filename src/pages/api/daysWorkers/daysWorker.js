import { dbConnect } from "../../../utils/mongoose";

import Worked from "../../../models/workedDay.model";
import Worker from "../../../models/worker.model";

import { verify } from "jsonwebtoken";

dbConnect();

export default async function handler(req, res) {
  const { method, body } = req;
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
        const { id } = body;

        const worker = await Worker.findById(id).populate("workedDays");

        return res.status(201).json({
          message: "Worked Day Created",
          worker,
        });
      } catch (error) {
        return res.status(400).json({ error: error.message });
      }

    case "GET":
      try {
        const user = verify(
          myTokenName,
          process.env.NEXT_PUBLIC_JWT_SECRET_KEY
        );

        const { typeUser } = user;

        if (!typeUser) {
          return res.status(400).json({ msg: "this user is not authorized" });
        }

        const daysWorker = await Worked.find();

        console.log("esto es value", body);

        return res.status(201).json({
          message: "Worker Found",
          daysWorker,
        });
      } catch (error) {
        return res.status(400).json({ error: error.message });
      }

    default:
      return res.status(400).json({ msg: "this method is not supported" });
  }
}

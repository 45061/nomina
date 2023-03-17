import { dbConnect } from "../../../utils/mongoose";

import Report from "@/models/report.model";
import Worker from "@/models/worker.model";

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

        const { workerId } = body;

        const worker = await Worker.findById(workerId);

        const report = await Report.create({
          ...body,
          workerId: worker,
        });

        worker.reports.push(report);

        await worker.save({ validateBeforeSave: false });

        return res.status(201).json({
          message: "WorkPlace Created",
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

        const report = await Report.find();

        // const workPlace = await WorkPlace.find();

        return res.status(201).json({
          message: "Report Found",
          report,
        });
      } catch (error) {
        return res.status(400).json({ error: error.message });
      }

    default:
      return res.status(400).json({ msg: "this method is not supported" });
  }
}

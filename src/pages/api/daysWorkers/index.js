import { dbConnect } from "../../../utils/mongoose";

import Worked from "../../../models/workedDay.model";
import Worker from "../../../models/worker.model";

import { verify } from "jsonwebtoken";
import dayjs from "dayjs";

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

        const { workerId, firstDate, secondDate } = body;

        const worker = await Worker.findById(workerId)
          .populate("placeOfResidence", "_id placeName")
          .populate({
            path: "workedDays",
            populate: { path: "placeOfWork" },
          });

        const listDaysWork = worker.workedDays
          .filter(
            (item) =>
              dayjs(item.workDay).$M >= dayjs(firstDate).$M &&
              dayjs(item.workDay).$M <= dayjs(secondDate).$M
          )
          .filter(
            (item) =>
              dayjs(item.workDay).$D >= dayjs(firstDate).$D &&
              dayjs(item.workDay).$D <= dayjs(secondDate).$D
          );

        const newWorker = {
          name: `${worker.firstName} ${worker.lastName}`,
          numer: worker.numer,
          email: worker.email,
          salary: worker.salary,
          positionInTheCompany: worker.positionInTheCompany,
          dateOfAdmission: worker.dateOfAdmission,
          recidence: worker.placeOfResidence,
        };

        return res.status(201).json({
          message: "List Days Created",
          listDaysWork,
          newWorker,
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

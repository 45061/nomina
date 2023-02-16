import { dbConnect } from "../../../utils/mongoose";

import Worked from "../../../models/workedDay.model";

import { verify } from "jsonwebtoken";
import dayjs from "dayjs";
import moment from "moment";

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
        const { entryTime, departureTime } = body;

        const workNoLunch = [];

        const workDone = moment(departureTime)
          .subtract(dayjs(entryTime).$H, "h")
          .subtract(dayjs(entryTime).$m, "m")
          .format();

        if (dayjs(departureTime).$H > 12) {
          workNoLunch.push(moment(workDone).subtract(1, "h").format());
        } else {
          workNoLunch.push(workDone);
        }

        // console.log("estas son las horas", dayjs(workNoLunch));

        body.hoursWorked = `${dayjs(workNoLunch).$H}:${dayjs(workNoLunch).$m}`;

        if (dayjs(workNoLunch).$H >= 10) {
          body.lunch = true;
        } else {
          body.lunch = false;
        }
        if (dayjs(workNoLunch).$H >= 9) {
          const extraHours = moment(dayjs(workNoLunch).$d)
            .subtract(8, "h")
            .subtract(30, "m")
            .format();
          body.extraHours = `${dayjs(extraHours).$H}:${dayjs(extraHours).$m}`;
        } else {
          body.extraHours = 0;
        }
        // console.log("esto es workNoLunch", dayjs(workNoLunch));

        // const hoursCalculation = moment(workNoLunch)
        //   .subtract(dayjs(entryTime).$H, "h")
        //   .subtract(dayjs(entryTime).$m, "m")
        //   .format();

        // const minutsWorked = dayjs(hoursCalculation).$m;

        console.log("esto es body", body);
        // console.log("estas son las horas trabajadas", hoursWorked);
        // console.log("estas son las minutos trabajadas", minutsWorked);
        // const worker = await Worker.create({
        //   ...req.body,
        // });

        return res.status(201).json({
          message: "Worker Created",
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

        const workers = await Worked.find();

        return res.status(201).json({
          message: "Worker Found",
          workers,
        });
      } catch (error) {
        return res.status(400).json({ error: error.message });
      }

    default:
      return res.status(400).json({ msg: "this method is not supported" });
  }
}

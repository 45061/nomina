import { dbConnect } from "../../../utils/mongoose";

import Worked from "../../../models/workedDay.model";
import Worker from "../../../models/worker.model";

import { verify } from "jsonwebtoken";
import dayjs from "dayjs";
import moment from "moment";
import login from "../user/login";

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
        const { entryTime, departureTime, workerId } = body;

        const worker = await Worker.findById(workerId);

        const workNoLunch = [];

        const workDone = moment(departureTime)
          .subtract(dayjs(entryTime).$H, "h")
          .subtract(dayjs(entryTime).$m, "m")
          .format();

        if (dayjs(departureTime).$H - dayjs(entryTime).$H >= 8) {
          workNoLunch.push(moment(workDone).subtract(1, "h").format());
        } else if (dayjs(departureTime).$H > 13 && dayjs(entryTime).$H < 12) {
          workNoLunch.push(moment(workDone).subtract(1, "h").format());
        } else {
          workNoLunch.push(workDone);
        }

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
        if (dayjs(workNoLunch).$H < 8) {
          const mustHoursCounter = moment(dayjs(workNoLunch).$d)
            .subtract(8, "h")
            .subtract(30, "m")
            .format();
          if (dayjs(mustHoursCounter).$m === 0) {
            body.mustHours = `${24 - dayjs(mustHoursCounter).$H}:0`;
          } else {
            body.mustHours = `${23 - dayjs(mustHoursCounter).$H}:${
              60 - dayjs(mustHoursCounter).$m
            }`;
          }
        } else {
          body.mustHours = 0;
        }

        const dayWorker = await Worked.create({
          ...body,
          userId: worker,
        });

        worker.workedDays.push(dayWorker);

        await worker.save({ validateBeforeSave: false });

        return res.status(201).json({
          message: "Worked Day Created",
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

    case "PUT":
      try {
        const { body } = req;
        const user = verify(
          myTokenName,
          process.env.NEXT_PUBLIC_JWT_SECRET_KEY
        );

        const { typeUser } = user;

        if (!typeUser) {
          return res.status(400).json({ msg: "this user is not authorized" });
        }

        const { id } = body;
        // console.log("esto es id", id);

        const dayWorker = await Worked.findById(id);

        if (!dayWorker) {
          return res.status(400).json({ message: "No find Worker" });
        }

        const { entryTime, departureTime, workerId } = body;

        const workNoLunch = [];

        const workDone = moment(departureTime)
          .subtract(dayjs(entryTime).$H, "h")
          .subtract(dayjs(entryTime).$m, "m")
          .format();

        if (dayjs(departureTime).$H - dayjs(entryTime).$H >= 8) {
          workNoLunch.push(moment(workDone).subtract(1, "h").format());
        } else if (dayjs(departureTime).$H > 13 && dayjs(entryTime).$H < 12) {
          workNoLunch.push(moment(workDone).subtract(1, "h").format());
        } else {
          workNoLunch.push(workDone);
        }

        dayWorker.hoursWorked = `${dayjs(workNoLunch).$H}:${
          dayjs(workNoLunch).$m
        }`;

        if (dayjs(workNoLunch).$H >= 10) {
          dayWorker.lunch = true;
        } else {
          dayWorker.lunch = false;
        }
        if (dayjs(workNoLunch).$H >= 9) {
          const extraHours = moment(dayjs(workNoLunch).$d)
            .subtract(8, "h")
            .subtract(30, "m")
            .format();
          dayWorker.extraHours = `${dayjs(extraHours).$H}:${
            dayjs(extraHours).$m
          }`;
        } else {
          dayWorker.extraHours = 0;
        }
        if (dayjs(workNoLunch).$H < 8) {
          const mustHoursCounter = moment(dayjs(workNoLunch).$d)
            .subtract(8, "h")
            .subtract(30, "m")
            .format();
          if (dayjs(mustHoursCounter).$m === 0) {
            dayWorker.mustHours = `${24 - dayjs(mustHoursCounter).$H}:0`;
          } else {
            dayWorker.mustHours = `${23 - dayjs(mustHoursCounter).$H}:${
              60 - dayjs(mustHoursCounter).$m
            }`;
          }
        } else {
          dayWorker.mustHours = 0;
        }

        dayWorker.workDay = body.workDay;
        dayWorker.entryTime = body.entryTime;
        dayWorker.departureTime = body.departureTime;
        dayWorker.nightHours = body.nightHours;
        dayWorker.holiday = body.holiday;
        dayWorker.vacations = body.vacations;
        dayWorker.inability = body.inability;

        await dayWorker.save({ validateBeforeSave: false });

        return res.status(201).json({
          message: "Worker Day Upload",
        });
      } catch (error) {
        return res.status(400).json({ error: error.message });
      }

    default:
      return res.status(400).json({ msg: "this method is not supported" });
  }
}

import { dbConnect } from "../../../utils/mongoose";

import Worked from "../../../models/workedDay.model";
import Worker from "../../../models/worker.model";
import WorkPlace from "@/models/workPlace.model";

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
        const { entryTime, departureTime, workerId, lunchTime } = body;

        const hoursLunchTime = Math.floor(parseInt(lunchTime) / 60);
        const minutsLunchTime = Math.round(
          (parseInt(lunchTime) / 60 - hoursLunchTime) * 60
        );

        const worker = await Worker.findById(workerId);

        const workNoLunch = [];

        const workDone = moment(departureTime)
          .subtract(dayjs(entryTime).$H, "h")
          .subtract(dayjs(entryTime).$m, "m")
          .format();

        workNoLunch.push(
          moment(workDone)
            .subtract(hoursLunchTime, "h")
            .subtract(minutsLunchTime, "m")
            .format()
        );

        body.hoursWorked = `${dayjs(workNoLunch).$H}:${dayjs(workNoLunch).$m}`;

        if (dayjs(workNoLunch).$H >= 10) {
          body.lunch = true;
        } else {
          body.lunch = false;
        }

        if (dayjs(entryTime).$W === 6 && dayjs(workNoLunch).$H > 5) {
          const extraHours = moment(dayjs(workNoLunch).$d)
            .subtract(5, "h")
            .subtract(30, "m")
            .format();
          body.extraHours = `${dayjs(extraHours).$H}:${dayjs(extraHours).$m}`;
        } else if (dayjs(workNoLunch).$H >= 9) {
          const extraHours = moment(dayjs(workNoLunch).$d)
            .subtract(8, "h")
            .subtract(30, "m")
            .format();
          body.extraHours = `${dayjs(extraHours).$H}:${dayjs(extraHours).$m}`;
        } else {
          body.extraHours = "0:0";
        }

        if (dayjs(entryTime).$W === 6 && dayjs(workNoLunch).$H <= 5) {
          const mustHoursCounter = moment(dayjs(workNoLunch).$d)
            .subtract(5, "h")
            .subtract(30, "m")
            .format();
          if (dayjs(mustHoursCounter).$m === 0) {
            body.mustHours = `${24 - dayjs(mustHoursCounter).$H}:0`;
          } else {
            body.mustHours = `${23 - dayjs(mustHoursCounter).$H}:${
              60 - dayjs(mustHoursCounter).$m
            }`;
          }
        } else if (dayjs(workNoLunch).$H < 8) {
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
          body.mustHours = "0:0";
        }

        const { placeOfWork } = body;

        console.log("esto es placeOfWork)", placeOfWork);

        const place = await WorkPlace.findById(placeOfWork);

        console.log("esto es place", place);

        const dayWorker = await Worked.create({
          ...body,
          userId: worker,
          placeOfWork: place,
        });

        console.log("esto es dayWorker", dayWorker);

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

        const dayWorker = await Worked.findById(id);

        if (!dayWorker) {
          return res.status(400).json({ message: "No find Worker" });
        }

        const { entryTime, departureTime, lunchTime } = body;

        const hoursLunchTime = Math.floor(parseInt(lunchTime) / 60);
        const minutsLunchTime = Math.round(
          (parseInt(lunchTime) / 60 - hoursLunchTime) * 60
        );

        const workNoLunch = [];

        const workDone = moment(departureTime)
          .subtract(dayjs(entryTime).$H, "h")
          .subtract(dayjs(entryTime).$m, "m")
          .format();

        workNoLunch.push(
          moment(workDone)
            .subtract(hoursLunchTime, "h")
            .subtract(minutsLunchTime, "m")
            .format()
        );

        dayWorker.hoursWorked = `${dayjs(workNoLunch).$H}:${
          dayjs(workNoLunch).$m
        }`;

        if (dayjs(workNoLunch).$H >= 10) {
          dayWorker.lunch = true;
        } else {
          dayWorker.lunch = false;
        }

        if (dayjs(entryTime).$W === 6 && dayjs(workNoLunch).$H > 5) {
          const extraHours = moment(dayjs(workNoLunch).$d)
            .subtract(5, "h")
            .subtract(30, "m")
            .format();
          dayWorker.extraHours = `${dayjs(extraHours).$H}:${
            dayjs(extraHours).$m
          }`;
        } else if (dayjs(workNoLunch).$H >= 9) {
          const extraHours = moment(dayjs(workNoLunch).$d)
            .subtract(8, "h")
            .subtract(30, "m")
            .format();
          dayWorker.extraHours = `${dayjs(extraHours).$H}:${
            dayjs(extraHours).$m
          }`;
        } else {
          dayWorker.extraHours = "0:0";
        }

        if (dayjs(entryTime).$W === 6 && dayjs(workNoLunch).$H <= 5) {
          const mustHoursCounter = moment(dayjs(workNoLunch).$d)
            .subtract(5, "h")
            .subtract(30, "m")
            .format();
          if (dayjs(mustHoursCounter).$m === 0) {
            dayWorker.mustHours = `${24 - dayjs(mustHoursCounter).$H}:0`;
          } else {
            dayWorker.mustHours = `${23 - dayjs(mustHoursCounter).$H}:${
              60 - dayjs(mustHoursCounter).$m
            }`;
          }
        } else if (dayjs(workNoLunch).$H < 8) {
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
          dayWorker.mustHours = "0:0";
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

    case "DELETE":
      try {
        const user = verify(
          myTokenName,
          process.env.NEXT_PUBLIC_JWT_SECRET_KEY
        );

        const { typeUser } = user;

        if (!typeUser) {
          return res.status(400).json({ msg: "this user is not authorized" });
        }

        const { workerId, _id } = body;

        await Worked.findByIdAndDelete(_id);

        const deleteWorked = _id.toString();

        const worker = await Worker.findById(workerId);

        worker.workedDays = worker.workedDays.filter(
          (item) => item._id.toString() !== deleteWorked
        );

        await worker.save({ validateBeforeSave: false });

        return res.status(201).json({
          message: "Worked Delete",
        });
      } catch (error) {
        return res.status(400).json({ error: error.message });
      }

    default:
      return res.status(400).json({ msg: "this method is not supported" });
  }
}

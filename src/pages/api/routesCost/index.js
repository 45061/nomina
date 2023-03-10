import { dbConnect } from "../../../utils/mongoose";

import WorkPlace from "../../../models/workPlace.model";
import RecidencePlace from "@/models/recidencePlace.model";
import RouteWork from "@/models/route.model";

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

        const { firstPlace, secondPlace } = body;

        const recidence = await RecidencePlace.findById(firstPlace);
        const work = await WorkPlace.findById(secondPlace);

        await RouteWork.create({
          ...body,
          firstPlace: recidence,
          secondPlace: work,
        });

        return res.status(201).json({
          message: "RouteWork Created",
        });
      } catch (error) {
        return res.status(400).json({ error: error.message });
      }

    case "PUT":
      try {
        const user = verify(
          myTokenName,
          process.env.NEXT_PUBLIC_JWT_SECRET_KEY
        );

        const { typeUser } = user;

        if (!typeUser) {
          return res.status(400).json({ msg: "this user is not authorized" });
        }

        const { firstPlace, secondPlace, id, subsidy } = body;

        const recidence = await RecidencePlace.findById(firstPlace);
        const work = await WorkPlace.findById(secondPlace);
        const route = await RouteWork.findById(id);

        route.firstPlace = recidence;
        route.secondPlace = work;
        route.subsidy = subsidy;

        await route.save({ validateBeforeSave: false });

        return res.status(201).json({
          message: "RouteWork Edited",
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

        const routes = await RouteWork.find().populate(
          "firstPlace secondPlace"
        );

        return res.status(201).json({
          message: "WorkPlace Found",
          routes,
        });
      } catch (error) {
        return res.status(400).json({ error: error.message });
      }

    default:
      return res.status(400).json({ msg: "this method is not supported" });
  }
}

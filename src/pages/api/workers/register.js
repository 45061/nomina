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

        await Worker.create({
          ...req.body,
        });

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

        const workers = await Worker.find();

        return res.status(201).json({
          message: "Worker Found",
          workers,
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

        const { id } = req.body;
        // console.log("esto es id", id);

        const worker = await Worker.findById(id);

        if (!worker) {
          return res.status(400).json({ message: "No find Worker" });
        }

        worker.firstName = body.firstName;
        worker.lastName = body.lastName;
        worker.email = body.email;
        worker.numer = body.numer;
        worker.dateOfAdmission = body.dateOfAdmission;
        worker.salary = body.salary;
        worker.positionInTheCompany = body.positionInTheCompany;
        worker.healthProvider = body.healthProvider;
        worker.pensionProvider = body.pensionProvider;
        worker.compensationBox = body.compensationBox;
        worker.occupationalRiskInsurer = body.occupationalRiskInsurer;
        worker.activeEmployee = body.activeEmployee;

        await worker.save({ validateBeforeSave: false });

        return res.status(201).json({
          message: "Worker Upload",
        });
      } catch (error) {
        return res.status(400).json({ error: error.message });
      }

    default:
      return res.status(400).json({ msg: "this method is not supported" });
  }
}

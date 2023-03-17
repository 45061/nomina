import { dbConnect } from "@/utils/mongoose";

import Report from "@/models/report.model";
import Worker from "@/models/worker.model";

dbConnect();

export async function getReports() {
  const workers = await Worker.find().populate("reports");
  return workers;
}

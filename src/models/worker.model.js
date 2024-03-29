const { Schema, model, models } = require("mongoose");

const workerSchema = new Schema(
  {
    firstName: {
      required: true,
      type: String,
    },
    lastName: {
      required: true,
      type: String,
    },
    email: {
      type: String,
    },
    numer: {
      requiered: true,
      type: String,
    },
    dateOfAdmission: {
      requiered: true,
      type: String,
    },
    salary: {
      required: true,
      type: String,
    },
    positionInTheCompany: {
      required: true,
      type: String,
    },
    healthProvider: {
      required: true,
      type: String,
    },
    pensionProvider: {
      required: true,
      type: String,
    },
    compensationBox: {
      required: true,
      type: String,
    },
    occupationalRiskInsurer: {
      required: true,
      type: String,
    },
    placeOfResidence: {
      require: true,
      type: [{ type: Schema.Types.ObjectId, ref: "RecidencePlace" }],
    },
    activeEmployee: {
      required: true,
      type: Boolean,
    },
    workedDays: {
      type: [{ type: Schema.Types.ObjectId, ref: "Worked" }],
    },
    reports: {
      type: [{ type: Schema.Types.ObjectId, ref: "Report" }],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default models.Worker || model("Worker", workerSchema);

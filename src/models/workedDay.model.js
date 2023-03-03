const { Schema, model, models } = require("mongoose");

const workedDaySchema = new Schema(
  {
    workerId: {
      type: Schema.Types.ObjectId,
      ref: "Worker",
      required: true,
    },
    workDay: {
      required: true,
      type: String,
    },
    entryTime: {
      type: String,
    },
    departureTime: {
      requiered: true,
      type: String,
    },
    hoursWorked: {
      requiered: true,
      type: String,
    },
    lunch: {
      requiered: true,
      type: Boolean,
    },
    extraHours: {
      required: true,
      type: String,
    },
    mustHours: {
      required: true,
      type: String,
    },
    nightHours: {
      required: true,
      type: String,
    },
    lunchTime: {
      required: true,
      type: String,
    },
    holiday: {
      required: true,
      type: Boolean,
    },
    vacations: {
      required: true,
      type: String,
    },
    inability: {
      required: true,
      type: String,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default models.Worked || model("Worked", workedDaySchema);

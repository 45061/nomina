const { Schema, model, models } = require("mongoose");

const workerSchema = new Schema(
  {
    workerId: {
      require: true,
      type: [{ type: Schema.Types.ObjectId, ref: "Worker" }],
    },
    firstDate: {
      required: true,
      type: String,
    },
    secondDate: {
      type: String,
    },
    hoursToPay: {
      requiered: true,
      type: String,
    },
    hoursToPayMoney: {
      requiered: true,
      type: String,
    },
    extraHours: {
      required: true,
      type: String,
    },
    extraHoursMoney: {
      required: true,
      type: String,
    },
    nightHours: {
      required: true,
      type: String,
    },
    nightHoursMoney: {
      required: true,
      type: String,
    },
    holidayHours: {
      required: true,
      type: String,
    },
    holidayHoursMoeny: {
      required: true,
      type: String,
    },
    transport: {
      required: true,
      type: String,
    },
    fullPayment: {
      require: true,
      type: String,
    },
    numberLunches: {
      require: true,
      type: String,
    },
    valueLunches: {
      require: true,
      type: String,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default models.Worker || model("Worker", workerSchema);

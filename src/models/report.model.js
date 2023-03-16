const { Schema, model, models } = require("mongoose");

const reportSchema = new Schema(
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
    holidayHoursMoney: {
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

export default models.Report || model("Report", reportSchema);

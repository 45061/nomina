const { Schema, model, models } = require("mongoose");

const routeWorkSchema = new Schema(
  {
    firsPlace: {
      type: [{ type: Schema.Types.ObjectId, ref: "RecidencePlace" }],
    },
    secondPlace: {
      type: [{ type: Schema.Types.ObjectId, ref: "WorkPlace" }],
    },
    subsidy: {
      required: true,
      type: Number,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default models.RouteWork || model("RouteWork", routeWorkSchema);

const { Schema, model, models } = require("mongoose");

const recidencePlaceSchema = new Schema(
  {
    placeName: {
      required: true,
      type: String,
    },
    workers: {
      type: [{ type: Schema.Types.ObjectId, ref: "Worker" }],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default models.RecidencePlace ||
  model("RecidencePlace", recidencePlaceSchema);

const { Schema, model, models } = require("mongoose");

const workPlaceSchema = new Schema(
  {
    placeName: {
      required: true,
      type: String,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default models.WorkPlace || model("WorkPlace", workPlaceSchema);

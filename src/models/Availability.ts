import mongoose, { Schema } from "mongoose";

const AvailabilitySchema = new Schema(
  {
    professionalId: {
      type: Schema.Types.ObjectId,
      ref: "Professional",
      required: true,
    },

    professionalName: {
      type: String,
      required: true,
    },

    date: {
      type: String,
      required: true,
    },

    times: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

export const Availability =
  mongoose.models.Availability ||
  mongoose.model("Availability", AvailabilitySchema);
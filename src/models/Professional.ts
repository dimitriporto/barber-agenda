import mongoose, { Schema } from "mongoose";

const ProfessionalSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    active: {
      type: Boolean,
      default: true,
    },

    services: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

export const Professional =
  mongoose.models.Professional ||
  mongoose.model("Professional", ProfessionalSchema);
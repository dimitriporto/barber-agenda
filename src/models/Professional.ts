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

    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      default: null,
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
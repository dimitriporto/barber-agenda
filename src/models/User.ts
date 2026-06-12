import mongoose, { Schema } from "mongoose";

// Define os campos do usuário no MongoDB
const UserSchema = new Schema(
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

    password: {
      type: String,
      required: true,
    },

    // Define o tipo de usuário no sistema
    role: {
      type: String,
      enum: ["admin", "professional", "client"],
      default: "client",
    },
  },
  {
    timestamps: true,
  }
);

/*
  Reaproveita o model no Hot Reload.
  Evita erro de recompilação do Mongoose.
*/
export const User =
  mongoose.models.User || mongoose.model("User", UserSchema);
import mongoose, { Schema } from "mongoose";

// Define os campos do agendamento
const AppointmentSchema = new Schema(
  {
    service: {
      type: String,
      required: true,
    },

    barber: {
      type: String,
      required: true,
    },

    date: {
      type: String,
      required: true,
    },

    time: {
      type: String,
      required: true,
    },

    notes: {
      type: String,
      default: "",
    },

    // Relaciona o agendamento ao usuário logado
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
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
export const Appointment =
  mongoose.models.Appointment ||
  mongoose.model("Appointment", AppointmentSchema);
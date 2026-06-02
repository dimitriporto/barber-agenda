import { create } from "zustand";

type AppointmentFilter = "all" | "today" | "upcoming";

type AppointmentFilterStore = {
  filter: AppointmentFilter;
  setFilter: (filter: AppointmentFilter) => void;
};

// Estado global de UI para filtro dos agendamentos
export const useAppointmentFilterStore = create<AppointmentFilterStore>(
  (set) => ({
    filter: "all",
    setFilter: (filter) => set({ filter }),
  })
);
export type WeeklyClass = {
  start: string;
  end: string;
  trainer: "Йоанна" | "Ива" | "Жени";
  capacity: number;
};

export type WeeklyClassSchedule = Record<string, WeeklyClass[]>;

const daySlots = (trainer: WeeklyClass["trainer"]): WeeklyClass[] => [
  { start: "07:30", end: "08:20", trainer, capacity: 5 },
  { start: "08:35", end: "09:25", trainer, capacity: 5 },
  { start: "10:00", end: "10:50", trainer, capacity: 5 },
  { start: "17:30", end: "18:20", trainer, capacity: 5 },
  { start: "19:00", end: "19:50", trainer, capacity: 5 }
];

const mondaySchedule: WeeklyClass[] = [
  { start: "07:30", end: "08:20", trainer: "Йоанна", capacity: 5 },
  { start: "08:35", end: "09:25", trainer: "Йоанна", capacity: 5 },
  { start: "10:00", end: "10:50", trainer: "Йоанна", capacity: 5 },
  { start: "17:30", end: "18:20", trainer: "Ива", capacity: 5 },
  { start: "19:00", end: "19:50", trainer: "Ива", capacity: 5 }
];

export const weeklyClassSchedule: WeeklyClassSchedule = {
  "0": daySlots("Йоанна"),
  "1": mondaySchedule,
  "2": mondaySchedule,
  "3": [
    { start: "07:00", end: "07:50", trainer: "Ива", capacity: 5 },
    { start: "08:30", end: "09:20", trainer: "Ива", capacity: 5 }
  ],
  "4": daySlots("Жени"),
  "5": daySlots("Йоанна"),
  "6": daySlots("Жени")
};

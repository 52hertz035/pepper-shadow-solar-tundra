import type { MemberStatus, TaskStatus } from "@/lib/types";

export const SEAT_COLORS = ["bg-seat-a", "bg-seat-b", "bg-seat-c"] as const;
export const SEAT_TEXT = ["text-seat-a", "text-seat-b", "text-seat-c"] as const;

export function seatColor(index: number): string {
  return SEAT_COLORS[index % SEAT_COLORS.length];
}

export function seatText(index: number): string {
  return SEAT_TEXT[index % SEAT_TEXT.length];
}

export function statusLabel(status: MemberStatus): string {
  switch (status) {
    case "studying":
      return "Studying";
    case "break":
      return "Break";
    case "done":
      return "Done";
    default:
      return "Idle";
  }
}

export function taskStatusLabel(status: TaskStatus): string {
  switch (status) {
    case "todo":
      return "To do";
    case "doing":
      return "Doing";
    case "done":
      return "Done";
    case "parked":
      return "Parked";
  }
}

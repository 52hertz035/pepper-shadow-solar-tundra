export const MEMBER_STATUSES = ["idle", "studying", "break", "done"] as const;
export type MemberStatus = (typeof MEMBER_STATUSES)[number];

export const TASK_STATUSES = ["todo", "doing", "done", "parked"] as const;
export type TaskStatus = (typeof TASK_STATUSES)[number];

export const PRIORITIES = ["high", "normal", "low"] as const;
export type Priority = (typeof PRIORITIES)[number];

export const EVENT_KINDS = [
  "checkin",
  "checkout",
  "break",
  "nudge",
  "honesty",
  "goal",
] as const;
export type EventKind = (typeof EVENT_KINDS)[number];

export type Member = {
  id: string;
  name: string;
  status: MemberStatus;
  sessionStartedAt: string | null;
  sessionGoal: string;
  todaySpentMin: number;
  sortOrder: number;
  updatedAt: string;
};

export type Task = {
  id: string;
  dayDate: string | null;
  title: string;
  course: string;
  ownerId: string | null;
  status: TaskStatus;
  priority: Priority;
  estMin: number | null;
  spentMin: number;
  progress: number;
  dueDate: string | null;
  notes: string;
  honesty: string;
  sortOrder: number;
  updatedAt: string;
};

export type BoardEvent = {
  id: string;
  memberId: string | null;
  kind: EventKind;
  body: string;
  createdAt: string;
};

export type WeekStats = {
  done: number;
  open: number;
  spentMin: number;
  estMin: number;
};

export type Board = {
  date: string;
  members: Member[];
  tasks: Task[];
  events: BoardEvent[];
  week: WeekStats;
};

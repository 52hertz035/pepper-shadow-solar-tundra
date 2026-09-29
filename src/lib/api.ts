import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { getSql } from "@/lib/db";
import { addDays, asIso, asIsoOrNull, newId, startOfWeek } from "@/lib/format";
import type {
  Board,
  BoardEvent,
  EventKind,
  Member,
  MemberStatus,
  Priority,
  Task,
  TaskStatus,
} from "@/lib/types";

type MemberRow = {
  id: string;
  name: string;
  status: string;
  session_started_at: unknown;
  session_goal: string;
  today_spent_min: number;
  spent_on_date: string | null;
  sort_order: number;
  updated_at: unknown;
};

type TaskRow = {
  id: string;
  day_date: string | null;
  title: string;
  course: string;
  owner_id: string | null;
  status: string;
  priority: string;
  est_min: number | null;
  spent_min: number;
  progress: number;
  due_date: string | null;
  notes: string;
  honesty: string;
  sort_order: number;
  updated_at: unknown;
};

type EventRow = {
  id: string;
  member_id: string | null;
  kind: string;
  body: string;
  created_at: unknown;
};

const dateSchema = z.string().regex(/^\d{4}-\d{2}-\d{2}$/);

function mapMember(row: MemberRow, date: string): Member {
  const spentToday = row.spent_on_date === date ? row.today_spent_min : 0;
  return {
    id: row.id,
    name: row.name,
    status: row.status as MemberStatus,
    sessionStartedAt: asIsoOrNull(row.session_started_at),
    sessionGoal: row.session_goal ?? "",
    todaySpentMin: spentToday,
    sortOrder: row.sort_order,
    updatedAt: asIso(row.updated_at),
  };
}

function mapTask(row: TaskRow): Task {
  return {
    id: row.id,
    dayDate: row.day_date,
    title: row.title ?? "",
    course: row.course ?? "",
    ownerId: row.owner_id,
    status: row.status as TaskStatus,
    priority: row.priority as Priority,
    estMin: row.est_min,
    spentMin: row.spent_min ?? 0,
    progress: row.progress ?? 0,
    dueDate: row.due_date,
    notes: row.notes ?? "",
    honesty: row.honesty ?? "",
    sortOrder: row.sort_order,
    updatedAt: asIso(row.updated_at),
  };
}

function mapEvent(row: EventRow): BoardEvent {
  return {
    id: row.id,
    memberId: row.member_id,
    kind: row.kind as EventKind,
    body: row.body ?? "",
    createdAt: asIso(row.created_at),
  };
}

async function ensureSeed(date: string) {
  const sql = await getSql();
  const alex = "seat_alex";
  const sam = "seat_sam";

  const existing = await sql<{ id: string }>`select id from members limit 1`;
  if (existing.length === 0) {
    await sql.query(
      `insert into members (id, name, status, session_started_at, session_goal, today_spent_min, spent_on_date, sort_order)
       values
         ($1, 'Alex', 'studying', now() - interval '72 minutes', 'Finish Ch. 8 notes, then 20 Anki', 55, $3, 0),
         ($2, 'Sam', 'studying', now() - interval '64 minutes', 'PS6 Q1–Q4 before anything else', 50, $3, 1)`,
      [alex, sam, date],
    );
  }

  const taskCount = await sql<{ n: number }>`select count(*)::int as n from tasks`;
  if ((taskCount[0]?.n ?? 0) === 0) {
    await sql.query(
      `insert into tasks (id, day_date, title, course, owner_id, status, priority, est_min, spent_min, progress, due_date, notes, honesty, sort_order)
       values
         ($1, $7, 'Finish lecture notes Ch. 8', 'CS 229', $8, 'doing', 'high', 90, 55, 70, $7, 'Stop after the proofs section. Do not open Twitter.', '', 0),
         ($2, $7, 'Problem set 6 — Q1 to Q4', 'MATH 53', $9, 'doing', 'high', 120, 50, 40, $7, 'Ask Alex if Q3 series test looks right.', '', 1),
         ($3, $7, 'Anki: 40 cards', 'LANG', $8, 'todo', 'normal', 25, 0, 0, $7, '', '', 2),
         ($4, $7, 'Outline essay intro', 'HIST 12', $8, 'todo', 'high', 60, 0, 0, $7, 'Thesis: the archive is not a neutral source.', '', 3),
         ($5, $7, 'Review midterm mistakes', 'CS 229', $9, 'parked', 'normal', 45, 10, 10, null, 'Waiting on posted solutions.', 'Put this off twice. Do it tomorrow morning.', 4),
         ($6, $7, 'Read 12 pages of the paper', 'CS 229', $9, 'todo', 'low', 40, 0, 0, $7, '', '', 5)`,
      [newId("task"), newId("task"), newId("task"), newId("task"), newId("task"), newId("task"), date, alex, sam],
    );
  }

  const eventCount = await sql<{ n: number }>`select count(*)::int as n from events`;
  if ((eventCount[0]?.n ?? 0) === 0) {
    await sql.query(
      `insert into events (id, member_id, kind, body, created_at)
       values
         ($1, $5, 'checkin', 'Ch. 8 notes then Anki', now() - interval '72 minutes'),
         ($2, $6, 'checkin', 'PS6 before anything else', now() - interval '64 minutes'),
         ($3, $6, 'nudge', 'Nudge to Alex — you said Anki at 9.', now() - interval '22 minutes'),
         ($4, $5, 'honesty', 'Scrolled for 20 minutes. Back now.', now() - interval '18 minutes')`,
      [newId("evt"), newId("evt"), newId("evt"), newId("evt"), alex, sam],
    );
  }
}

async function insertEvent(
  memberId: string | null,
  kind: EventKind,
  body: string,
) {
  const sql = await getSql();
  await sql.query(
    `insert into events (id, member_id, kind, body) values ($1, $2, $3, $4)`,
    [newId("evt"), memberId, kind, body],
  );
}

async function loadBoard(date: string): Promise<Board> {
  await ensureSeed(date);
  const sql = await getSql();
  const weekStart = startOfWeek(date);
  const weekEnd = addDays(weekStart, 6);

  const [memberRows, taskRows, eventRows, weekRows] = await Promise.all([
    sql<MemberRow>`select * from members order by sort_order, created_at`,
    sql<TaskRow>`select * from tasks where day_date = ${date} or day_date is null order by sort_order, created_at`,
    sql<EventRow>`select * from events order by created_at desc limit 40`,
    sql<{
      done: number;
      open: number;
      spent: number;
      est: number;
    }>`select
        coalesce(sum(case when status = 'done' then 1 else 0 end), 0)::int as done,
        coalesce(sum(case when status <> 'done' then 1 else 0 end), 0)::int as open,
        coalesce(sum(spent_min), 0)::int as spent,
        coalesce(sum(est_min), 0)::int as est
      from tasks
      where day_date between ${weekStart} and ${weekEnd}`,
  ]);

  const week = weekRows[0] ?? { done: 0, open: 0, spent: 0, est: 0 };

  return {
    date,
    members: memberRows.map((row) => mapMember(row, date)),
    tasks: taskRows.map(mapTask),
    events: eventRows.map(mapEvent),
    week: {
      done: week.done,
      open: week.open,
      spentMin: week.spent,
      estMin: week.est,
    },
  };
}

export const getBoard = createServerFn({ method: "GET" })
  .validator(z.object({ date: dateSchema }))
  .handler(async ({ data }) => loadBoard(data.date));

export const addMember = createServerFn({ method: "POST" })
  .validator(z.object({ name: z.string().trim().min(1).max(24) }))
  .handler(async ({ data }) => {
    const sql = await getSql();
    const countRows = await sql<{ n: number }>`select count(*)::int as n from members`;
    const n = countRows[0]?.n ?? 0;
    if (n >= 6) throw new Error("This desk holds six people.");
    const id = newId("seat");
    await sql.query(
      `insert into members (id, name, sort_order) values ($1, $2, $3)`,
      [id, data.name, n],
    );
    return { id };
  });

export const renameMember = createServerFn({ method: "POST" })
  .validator(
    z.object({
      id: z.string(),
      name: z.string().trim().min(1).max(24),
    }),
  )
  .handler(async ({ data }) => {
    const sql = await getSql();
    await sql.query(`update members set name = $1, updated_at = now() where id = $2`, [
      data.name,
      data.id,
    ]);
    return { ok: true as const };
  });

export const setPresence = createServerFn({ method: "POST" })
  .validator(
    z.object({
      memberId: z.string(),
      date: dateSchema,
      status: z.enum(["idle", "studying", "break", "done"]),
      sessionGoal: z.string().max(160).optional(),
    }),
  )
  .handler(async ({ data }) => {
    const sql = await getSql();
    const rows = await sql<MemberRow>`select * from members where id = ${data.memberId}`;
    const row = rows[0];
    if (!row) throw new Error("Unknown seat.");

    const member = mapMember(row, data.date);
    let spent = member.todaySpentMin;
    let started = member.sessionStartedAt;

    if (member.status === "studying" && started) {
      const elapsedMin = Math.max(
        0,
        Math.round((Date.now() - new Date(started).getTime()) / 60000),
      );
      if (data.status !== "studying") {
        spent += elapsedMin;
        started = null;
      }
    }

    if (data.status === "studying" && member.status !== "studying") {
      started = new Date().toISOString();
    }

    const goal = data.sessionGoal ?? member.sessionGoal;

    await sql.query(
      `update members
       set status = $1,
           session_started_at = $2,
           session_goal = $3,
           today_spent_min = $4,
           spent_on_date = $5,
           updated_at = now()
       where id = $6`,
      [data.status, started, goal, spent, data.date, data.memberId],
    );

    if (data.status === "studying" && member.status !== "studying") {
      await insertEvent(data.memberId, "checkin", goal || "Started.");
    } else if (data.status === "break" && member.status !== "break") {
      await insertEvent(data.memberId, "break", "Stepped out.");
    } else if (data.status === "done" && member.status !== "done") {
      await insertEvent(data.memberId, "checkout", "Done for now.");
    } else if (data.sessionGoal !== undefined && data.sessionGoal !== member.sessionGoal) {
      await insertEvent(data.memberId, "goal", data.sessionGoal);
    }

    return { ok: true as const };
  });

export const setGoal = createServerFn({ method: "POST" })
  .validator(
    z.object({
      memberId: z.string(),
      date: dateSchema,
      sessionGoal: z.string().max(160),
    }),
  )
  .handler(async ({ data }) => {
    const sql = await getSql();
    await sql.query(
      `update members set session_goal = $1, spent_on_date = coalesce(spent_on_date, $2), updated_at = now() where id = $3`,
      [data.sessionGoal, data.date, data.memberId],
    );
    if (data.sessionGoal.trim()) {
      await insertEvent(data.memberId, "goal", data.sessionGoal.trim());
    }
    return { ok: true as const };
  });

export const sendNudge = createServerFn({ method: "POST" })
  .validator(
    z.object({
      fromId: z.string(),
      toId: z.string(),
      body: z.string().max(200).optional(),
    }),
  )
  .handler(async ({ data }) => {
    const sql = await getSql();
    const rows = await sql<{ id: string; name: string }>`
      select id, name from members where id in (${data.fromId}, ${data.toId})`;
    const to = rows.find((r) => r.id === data.toId);
    const from = rows.find((r) => r.id === data.fromId);
    if (!to || !from) throw new Error("Unknown seat.");
    const note = data.body?.trim();
    const body = note
      ? `Nudge to ${to.name} — ${note}`
      : `Nudge to ${to.name} — time to lock in.`;
    await insertEvent(data.fromId, "nudge", body);
    return { ok: true as const };
  });

export const logHonesty = createServerFn({ method: "POST" })
  .validator(
    z.object({
      memberId: z.string(),
      body: z.string().trim().min(1).max(280),
      taskId: z.string().optional(),
    }),
  )
  .handler(async ({ data }) => {
    const sql = await getSql();
    await insertEvent(data.memberId, "honesty", data.body);
    if (data.taskId) {
      await sql.query(
        `update tasks set honesty = $1, updated_at = now() where id = $2`,
        [data.body, data.taskId],
      );
    }
    return { ok: true as const };
  });

export const createTask = createServerFn({ method: "POST" })
  .validator(
    z.object({
      date: dateSchema,
      title: z.string().max(160).optional(),
      ownerId: z.string().nullable().optional(),
    }),
  )
  .handler(async ({ data }) => {
    const sql = await getSql();
    const id = newId("task");
    const maxRows = await sql<{ m: number | null }>`
      select max(sort_order) as m from tasks where day_date = ${data.date}`;
    const sort = (maxRows[0]?.m ?? -1) + 1;
    await sql.query(
      `insert into tasks (id, day_date, title, owner_id, sort_order)
       values ($1, $2, $3, $4, $5)`,
      [id, data.date, data.title ?? "", data.ownerId ?? null, sort],
    );
    const rows = await sql<TaskRow>`select * from tasks where id = ${id}`;
    return mapTask(rows[0]);
  });

export const updateTask = createServerFn({ method: "POST" })
  .validator(
    z.object({
      id: z.string(),
      title: z.string().max(160).optional(),
      course: z.string().max(40).optional(),
      ownerId: z.string().nullable().optional(),
      status: z.enum(["todo", "doing", "done", "parked"]).optional(),
      priority: z.enum(["high", "normal", "low"]).optional(),
      estMin: z.number().int().min(0).max(24 * 60).nullable().optional(),
      spentMin: z.number().int().min(0).max(24 * 60).optional(),
      progress: z.number().int().min(0).max(100).optional(),
      dueDate: z.union([dateSchema, z.null()]).optional(),
      notes: z.string().max(400).optional(),
      honesty: z.string().max(280).optional(),
    }),
  )
  .handler(async ({ data }) => {
    const sql = await getSql();
    const sets: string[] = [];
    const params: unknown[] = [];
    let i = 1;
    const put = (col: string, value: unknown) => {
      sets.push(`${col} = $${i++}`);
      params.push(value);
    };

    if (data.title !== undefined) put("title", data.title);
    if (data.course !== undefined) put("course", data.course);
    if (data.ownerId !== undefined) put("owner_id", data.ownerId);
    if (data.status !== undefined) {
      put("status", data.status);
      if (data.status === "done" && data.progress === undefined) put("progress", 100);
      if (data.status === "todo" && data.progress === undefined) put("progress", 0);
    }
    if (data.priority !== undefined) put("priority", data.priority);
    if (data.estMin !== undefined) put("est_min", data.estMin);
    if (data.spentMin !== undefined) put("spent_min", data.spentMin);
    if (data.progress !== undefined) put("progress", data.progress);
    if (data.dueDate !== undefined) put("due_date", data.dueDate);
    if (data.notes !== undefined) put("notes", data.notes);
    if (data.honesty !== undefined) put("honesty", data.honesty);
    if (sets.length === 0) return { ok: true as const };
    sets.push("updated_at = now()");
    params.push(data.id);
    await sql.query(
      `update tasks set ${sets.join(", ")} where id = $${i}`,
      params,
    );
    return { ok: true as const };
  });

export const deleteTask = createServerFn({ method: "POST" })
  .validator(z.object({ id: z.string() }))
  .handler(async ({ data }) => {
    const sql = await getSql();
    await sql.query(`delete from tasks where id = $1`, [data.id]);
    return { ok: true as const };
  });

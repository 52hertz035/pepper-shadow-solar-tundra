import { n as TSS_SERVER_FUNCTION, t as createServerFn } from "./ssr.mjs";
import { d as newId, n as asIso, p as startOfWeek, r as asIsoOrNull, t as addDays } from "./format-PmHHrmbf.mjs";
import { a as object, i as number, n as _null, o as string, s as union, t as _enum } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/api-DF8He84b.js
var createServerRpc = (serverFnMeta, splitImportFn) => {
	const url = "/_serverFn/" + serverFnMeta.id;
	return Object.assign(splitImportFn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var _0002_lockin_default = "-- Shared study desk. Unowned rows: anyone with the link can read/write.\ncreate table if not exists members (\n  id text primary key,\n  name text not null,\n  status text not null default 'idle',\n  session_started_at timestamptz,\n  session_goal text not null default '',\n  today_spent_min integer not null default 0,\n  spent_on_date date,\n  sort_order integer not null default 0,\n  created_at timestamptz not null default now(),\n  updated_at timestamptz not null default now()\n);\n\ncreate table if not exists tasks (\n  id text primary key,\n  day_date date,\n  title text not null default '',\n  course text not null default '',\n  owner_id text references members(id) on delete set null,\n  status text not null default 'todo',\n  priority text not null default 'normal',\n  est_min integer,\n  spent_min integer not null default 0,\n  progress integer not null default 0,\n  due_date date,\n  notes text not null default '',\n  honesty text not null default '',\n  sort_order integer not null default 0,\n  created_at timestamptz not null default now(),\n  updated_at timestamptz not null default now()\n);\n\ncreate index if not exists tasks_day_date_idx on tasks (day_date);\ncreate index if not exists tasks_owner_id_idx on tasks (owner_id);\n\ncreate table if not exists events (\n  id text primary key,\n  member_id text references members(id) on delete set null,\n  kind text not null,\n  body text not null default '',\n  created_at timestamptz not null default now()\n);\n\ncreate index if not exists events_created_at_idx on events (created_at desc);\n";
/**
* Migration bookkeeping shared by the two appliers — `scripts/migrate.mjs`
* (deploy, `readdir`) and `src/lib/db.ts` (PGLite preview, `import.meta.glob`).
*
* Applied files are keyed by BASENAME, so the same file applies once no matter
* which directory it is globbed from. That is what makes the auth schema safe to
* copy from `migrations/auth/` into `migrations/` when an app turns sign-in on:
* a database that already has `0001_auth.sql` will not re-run it.
*
* Neither applier descends into subdirectories, so `migrations/auth/*.sql` is
* out of scope for both until it is copied up.
*/
/**
* The `_migrations` key for a migration path (or bare filename).
* @param {string} path
* @returns {string}
*/
function migrationName(path) {
	return path.split("/").pop() ?? path;
}
/**
* @param {string} path
* @returns {boolean}
*/
function isMigrationFile(path) {
	return path.endsWith(".sql");
}
/**
* Migrations in `paths` that are not yet in `applied`, in apply order.
* Non-`.sql` entries (a `readdir` also yields `migrations/auth/`) are dropped.
* @param {Iterable<string>} paths
* @param {Iterable<string>} applied
* @returns {Array<{ name: string, path: string }>}
*/
function pendingMigrations(paths, applied) {
	const done = new Set(applied);
	return [...paths].filter(isMigrationFile).map((path) => ({
		name: migrationName(path),
		path
	})).sort((a, b) => a.name.localeCompare(b.name)).filter(({ name }) => !done.has(name));
}
var rawDatabaseUrl = typeof process !== "undefined" ? process.env.DATABASE_URL : void 0;
var databaseUrl = rawDatabaseUrl && rawDatabaseUrl.trim() ? rawDatabaseUrl : void 0;
/**
* Active backend: real **Neon** when `DATABASE_URL` is set (deployed / configured
* sandbox), otherwise a local embedded **PGLite** (Postgres compiled to WASM) so
* the app has a working database even with nothing configured — the live preview
* included. Swap in Neon later by just setting `DATABASE_URL`; no code changes.
*/
var dbSource = databaseUrl ? "neon" : "pglite";
/**
* Init state lives on globalThis as promises: dev HMR creates new instances of
* this module, and two instances racing module-level state would open a second
* pool or run two concurrent PGLite migration passes (whose duplicate
* `_migrations` insert rejects — and would get memoized, poisoning every later
* `getSql()`). A failed init clears its slot so the next call retries.
*/
var globalRef = globalThis;
/**
* Result-type parity: Postgres sends every value as text plus a type OID — the
* JS value is the DRIVER's parsing choice, and pg and PGLite disagree (pg:
* int8 -> string, date -> local-midnight Date; PGLite: int8 -> BigInt, which
* JSON.stringify rejects, date -> UTC Date). Normalize both so preview and
* production return identical, JSON-safe shapes:
*   int8/bigint (incl. count(*)) -> number (past 2^53 loses precision — cast
*                                   `::text` if you ever need huge integers)
*   date                         -> 'YYYY-MM-DD' string
*   interval                     -> Postgres interval text
* numeric already comes back as a string on both (arbitrary precision).
*/
var OID_INT8 = 20;
var OID_DATE = 1082;
var OID_INTERVAL = 1186;
var identity = (v) => v;
/** Wrap a query runner in the tagged-template + `.query()` `Sql` surface. */
function toSql(run) {
	const sql = (async (strings, ...values) => {
		let text = strings[0];
		for (let i = 0; i < values.length; i += 1) text += `$${i + 1}${strings[i + 1]}`;
		return run(text, values);
	});
	sql.query = (text, params = []) => run(text, params);
	return sql;
}
function createNeonSql() {
	globalRef.__pgSqlPromise__ ??= (async () => {
		const { Pool, types } = await import("../_libs/pg.mjs").then((n) => n.t);
		types.setTypeParser(OID_INT8, Number);
		types.setTypeParser(OID_DATE, identity);
		types.setTypeParser(OID_INTERVAL, identity);
		const pool = new Pool({ connectionString: databaseUrl });
		return toSql(async (text, params) => {
			return (await pool.query(text, params)).rows;
		});
	})().catch((err) => {
		globalRef.__pgSqlPromise__ = void 0;
		throw err;
	});
	return globalRef.__pgSqlPromise__;
}
async function createPgliteSql() {
	globalRef.__pgliteInstance__ ??= (async () => {
		const { PGlite } = await import("../_libs/electric-sql__pglite.mjs").then((n) => n.t);
		const pg = new PGlite({ parsers: {
			[OID_INT8]: Number,
			[OID_DATE]: identity,
			[OID_INTERVAL]: identity
		} });
		await pg.waitReady;
		await pg.exec("create table if not exists _migrations (name text primary key, applied_at timestamptz not null default now())");
		return pg;
	})().catch((err) => {
		globalRef.__pgliteInstance__ = void 0;
		throw err;
	});
	const pg = await globalRef.__pgliteInstance__;
	const migrate = async () => {
		const migrations = /* #__PURE__ */ Object.assign({ "/migrations/0002_lockin.sql": _0002_lockin_default });
		const done = (await pg.query("select name from _migrations")).rows.map((r) => r.name);
		for (const { name, path } of pendingMigrations(Object.keys(migrations), done)) await pg.transaction(async (tx) => {
			await tx.exec(migrations[path]);
			await tx.query("insert into _migrations (name) values ($1)", [name]);
		});
	};
	const pass = (globalRef.__pgliteMigrateChain__ ?? Promise.resolve()).catch(() => void 0).then(migrate);
	globalRef.__pgliteMigrateChain__ = pass;
	await pass;
	return toSql(async (text, params) => {
		return (await pg.query(text, params)).rows;
	});
}
var sqlPromise = null;
async function createSql() {
	if (typeof window !== "undefined") throw new Error("@/lib/db is server-only — call getSql() from a createServerFn handler or a server route loader, never from client code.");
	return dbSource === "neon" ? createNeonSql() : createPgliteSql();
}
/**
* Get the shared, **server-only** SQL client. Neon when `DATABASE_URL` is set,
* otherwise the local PGLite fallback. Memoized — safe to call per request.
*
* Schema comes from `migrations/*.sql`, auto-applied before the first query on
* both backends — define tables there, never inline in server functions.
*/
function getSql() {
	sqlPromise ??= createSql().catch((err) => {
		sqlPromise = null;
		throw err;
	});
	return sqlPromise;
}
/**
* Finish DB bootstrap before the server handles traffic.
*
* - **PGLite** (preview / no `DATABASE_URL`): open the in-memory DB and apply
*   `migrations/*.sql`. Idempotent — concurrent callers share one promise.
* - **Neon**: no-op (pool is created lazily on first query).
*
* Vite `configureServer` awaits this at dev startup; production imports of this
* module kick it off immediately (see bottom of file).
*/
function ensureDbReady() {
	if (dbSource !== "pglite") return Promise.resolve();
	return getSql().then(() => void 0);
}
var globalBoot = globalThis;
if (typeof window === "undefined" && dbSource === "pglite") globalBoot.__pgBootstrapPromise__ ??= ensureDbReady().catch((err) => {
	globalBoot.__pgBootstrapPromise__ = void 0;
	console.error("[db] PGLite bootstrap failed:", err);
	throw err;
});
var dateSchema = string().regex(/^\d{4}-\d{2}-\d{2}$/);
function mapMember(row, date) {
	const spentToday = row.spent_on_date === date ? row.today_spent_min : 0;
	return {
		id: row.id,
		name: row.name,
		status: row.status,
		sessionStartedAt: asIsoOrNull(row.session_started_at),
		sessionGoal: row.session_goal ?? "",
		todaySpentMin: spentToday,
		sortOrder: row.sort_order,
		updatedAt: asIso(row.updated_at)
	};
}
function mapTask(row) {
	return {
		id: row.id,
		dayDate: row.day_date,
		title: row.title ?? "",
		course: row.course ?? "",
		ownerId: row.owner_id,
		status: row.status,
		priority: row.priority,
		estMin: row.est_min,
		spentMin: row.spent_min ?? 0,
		progress: row.progress ?? 0,
		dueDate: row.due_date,
		notes: row.notes ?? "",
		honesty: row.honesty ?? "",
		sortOrder: row.sort_order,
		updatedAt: asIso(row.updated_at)
	};
}
function mapEvent(row) {
	return {
		id: row.id,
		memberId: row.member_id,
		kind: row.kind,
		body: row.body ?? "",
		createdAt: asIso(row.created_at)
	};
}
async function ensureSeed(date) {
	const sql = await getSql();
	if ((await sql`select id from members limit 1`).length > 0) return;
	const alex = "seat_alex";
	const sam = "seat_sam";
	await sql.query(`insert into members (id, name, status, session_started_at, session_goal, today_spent_min, spent_on_date, sort_order)
     values
       ($1, 'Alex', 'studying', now() - interval '72 minutes', 'Finish Ch. 8 notes, then 20 Anki', 55, $3, 0),
       ($2, 'Sam', 'studying', now() - interval '64 minutes', 'PS6 Q1–Q4 before anything else', 50, $3, 1)`, [
		alex,
		sam,
		date
	]);
	await sql.query(`insert into tasks (id, day_date, title, course, owner_id, status, priority, est_min, spent_min, progress, due_date, notes, honesty, sort_order)
     values
       ($1, $11, 'Finish lecture notes Ch. 8', 'CS 229', $12, 'doing', 'high', 90, 55, 70, $11, 'Stop after the proofs section. Do not open Twitter.', '', 0),
       ($2, $11, 'Problem set 6 — Q1 to Q4', 'MATH 53', $13, 'doing', 'high', 120, 50, 40, $11, 'Ask Alex if Q3 series test looks right.', '', 1),
       ($3, $11, 'Anki: 40 cards', 'LANG', $12, 'todo', 'normal', 25, 0, 0, $11, '', '', 2),
       ($4, $11, 'Outline essay intro', 'HIST 12', $12, 'todo', 'high', 60, 0, 0, $11, 'Thesis: the archive is not a neutral source.', '', 3),
       ($5, $11, 'Review midterm mistakes', 'CS 229', $13, 'parked', 'normal', 45, 10, 10, null, 'Waiting on posted solutions.', 'Put this off twice. Do it tomorrow morning.', 4),
       ($6, $11, 'Read 12 pages of the paper', 'CS 229', $13, 'todo', 'low', 40, 0, 0, $11, '', '', 5)`, [
		newId("task"),
		newId("task"),
		newId("task"),
		newId("task"),
		newId("task"),
		newId("task"),
		date,
		alex,
		sam
	]);
	await sql.query(`insert into events (id, member_id, kind, body, created_at)
     values
       ($1, $5, 'checkin', 'Ch. 8 notes then Anki', now() - interval '72 minutes'),
       ($2, $6, 'checkin', 'PS6 before anything else', now() - interval '64 minutes'),
       ($3, $6, 'nudge', 'Nudge to Alex — you said Anki at 9.', now() - interval '22 minutes'),
       ($4, $5, 'honesty', 'Scrolled for 20 minutes. Back now.', now() - interval '18 minutes')`, [
		newId("evt"),
		newId("evt"),
		newId("evt"),
		newId("evt"),
		alex,
		sam
	]);
}
async function insertEvent(memberId, kind, body) {
	await (await getSql()).query(`insert into events (id, member_id, kind, body) values ($1, $2, $3, $4)`, [
		newId("evt"),
		memberId,
		kind,
		body
	]);
}
async function loadBoard(date) {
	await ensureSeed(date);
	const sql = await getSql();
	const weekStart = startOfWeek(date);
	const weekEnd = addDays(weekStart, 6);
	const [memberRows, taskRows, eventRows, weekRows] = await Promise.all([
		sql`select * from members order by sort_order, created_at`,
		sql`select * from tasks where day_date = ${date} or day_date is null order by sort_order, created_at`,
		sql`select * from events order by created_at desc limit 40`,
		sql`select
        coalesce(sum(case when status = 'done' then 1 else 0 end), 0)::int as done,
        coalesce(sum(case when status <> 'done' then 1 else 0 end), 0)::int as open,
        coalesce(sum(spent_min), 0)::int as spent,
        coalesce(sum(est_min), 0)::int as est
      from tasks
      where day_date between ${weekStart} and ${weekEnd}`
	]);
	const week = weekRows[0] ?? {
		done: 0,
		open: 0,
		spent: 0,
		est: 0
	};
	return {
		date,
		members: memberRows.map((row) => mapMember(row, date)),
		tasks: taskRows.map(mapTask),
		events: eventRows.map(mapEvent),
		week: {
			done: week.done,
			open: week.open,
			spentMin: week.spent,
			estMin: week.est
		}
	};
}
var getBoard_createServerFn_handler = createServerRpc({
	id: "ea88a71a3c4c6aedc2a8929659e4f5bb2ed01f4066218d7c04638fc561f03ee0",
	name: "getBoard",
	filename: "src/lib/api.ts"
}, (opts) => getBoard.__executeServer(opts));
var getBoard = createServerFn({ method: "GET" }).validator(object({ date: dateSchema })).handler(getBoard_createServerFn_handler, async ({ data }) => loadBoard(data.date));
var addMember_createServerFn_handler = createServerRpc({
	id: "42273f5ccc39bf3cf79294023b670b75633c25e021b30de5b1056493a20f86d6",
	name: "addMember",
	filename: "src/lib/api.ts"
}, (opts) => addMember.__executeServer(opts));
var addMember = createServerFn({ method: "POST" }).validator(object({ name: string().trim().min(1).max(24) })).handler(addMember_createServerFn_handler, async ({ data }) => {
	const sql = await getSql();
	const n = (await sql`select count(*)::int as n from members`)[0]?.n ?? 0;
	if (n >= 6) throw new Error("This desk holds six people.");
	const id = newId("seat");
	await sql.query(`insert into members (id, name, sort_order) values ($1, $2, $3)`, [
		id,
		data.name,
		n
	]);
	return { id };
});
var renameMember_createServerFn_handler = createServerRpc({
	id: "a9252779416628287f1d974994da0fe83d33f457149a8f879af7d8eb1a94d4f7",
	name: "renameMember",
	filename: "src/lib/api.ts"
}, (opts) => renameMember.__executeServer(opts));
var renameMember = createServerFn({ method: "POST" }).validator(object({
	id: string(),
	name: string().trim().min(1).max(24)
})).handler(renameMember_createServerFn_handler, async ({ data }) => {
	await (await getSql()).query(`update members set name = $1, updated_at = now() where id = $2`, [data.name, data.id]);
	return { ok: true };
});
var setPresence_createServerFn_handler = createServerRpc({
	id: "498efb21f56237d93ef95b47db531af9eacaed83110d937fd80e8f50bbbb1703",
	name: "setPresence",
	filename: "src/lib/api.ts"
}, (opts) => setPresence.__executeServer(opts));
var setPresence = createServerFn({ method: "POST" }).validator(object({
	memberId: string(),
	date: dateSchema,
	status: _enum([
		"idle",
		"studying",
		"break",
		"done"
	]),
	sessionGoal: string().max(160).optional()
})).handler(setPresence_createServerFn_handler, async ({ data }) => {
	const sql = await getSql();
	const row = (await sql`select * from members where id = ${data.memberId}`)[0];
	if (!row) throw new Error("Unknown seat.");
	const member = mapMember(row, data.date);
	let spent = member.todaySpentMin;
	let started = member.sessionStartedAt;
	if (member.status === "studying" && started) {
		const elapsedMin = Math.max(0, Math.round((Date.now() - new Date(started).getTime()) / 6e4));
		if (data.status !== "studying") {
			spent += elapsedMin;
			started = null;
		}
	}
	if (data.status === "studying" && member.status !== "studying") started = (/* @__PURE__ */ new Date()).toISOString();
	const goal = data.sessionGoal ?? member.sessionGoal;
	await sql.query(`update members
       set status = $1,
           session_started_at = $2,
           session_goal = $3,
           today_spent_min = $4,
           spent_on_date = $5,
           updated_at = now()
       where id = $6`, [
		data.status,
		started,
		goal,
		spent,
		data.date,
		data.memberId
	]);
	if (data.status === "studying" && member.status !== "studying") await insertEvent(data.memberId, "checkin", goal || "Started.");
	else if (data.status === "break" && member.status !== "break") await insertEvent(data.memberId, "break", "Stepped out.");
	else if (data.status === "done" && member.status !== "done") await insertEvent(data.memberId, "checkout", "Done for now.");
	else if (data.sessionGoal !== void 0 && data.sessionGoal !== member.sessionGoal) await insertEvent(data.memberId, "goal", data.sessionGoal);
	return { ok: true };
});
var setGoal_createServerFn_handler = createServerRpc({
	id: "489cf1c803fd7fc40003067c0437de060542b26f4ae0c768282339e0e2e4ceec",
	name: "setGoal",
	filename: "src/lib/api.ts"
}, (opts) => setGoal.__executeServer(opts));
var setGoal = createServerFn({ method: "POST" }).validator(object({
	memberId: string(),
	date: dateSchema,
	sessionGoal: string().max(160)
})).handler(setGoal_createServerFn_handler, async ({ data }) => {
	await (await getSql()).query(`update members set session_goal = $1, spent_on_date = coalesce(spent_on_date, $2), updated_at = now() where id = $3`, [
		data.sessionGoal,
		data.date,
		data.memberId
	]);
	if (data.sessionGoal.trim()) await insertEvent(data.memberId, "goal", data.sessionGoal.trim());
	return { ok: true };
});
var sendNudge_createServerFn_handler = createServerRpc({
	id: "a7a6fe27c5e81cf1fb4ba92911f4617a44ac3eb09b9aae6c208568f06e79072e",
	name: "sendNudge",
	filename: "src/lib/api.ts"
}, (opts) => sendNudge.__executeServer(opts));
var sendNudge = createServerFn({ method: "POST" }).validator(object({
	fromId: string(),
	toId: string(),
	body: string().max(200).optional()
})).handler(sendNudge_createServerFn_handler, async ({ data }) => {
	const rows = await (await getSql())`
      select id, name from members where id in (${data.fromId}, ${data.toId})`;
	const to = rows.find((r) => r.id === data.toId);
	const from = rows.find((r) => r.id === data.fromId);
	if (!to || !from) throw new Error("Unknown seat.");
	const note = data.body?.trim();
	const body = note ? `Nudge to ${to.name} — ${note}` : `Nudge to ${to.name} — time to lock in.`;
	await insertEvent(data.fromId, "nudge", body);
	return { ok: true };
});
var logHonesty_createServerFn_handler = createServerRpc({
	id: "557eab454a972a7c53b9b07569fd388ac3847f004c02be31aee522101d629934",
	name: "logHonesty",
	filename: "src/lib/api.ts"
}, (opts) => logHonesty.__executeServer(opts));
var logHonesty = createServerFn({ method: "POST" }).validator(object({
	memberId: string(),
	body: string().trim().min(1).max(280),
	taskId: string().optional()
})).handler(logHonesty_createServerFn_handler, async ({ data }) => {
	const sql = await getSql();
	await insertEvent(data.memberId, "honesty", data.body);
	if (data.taskId) await sql.query(`update tasks set honesty = $1, updated_at = now() where id = $2`, [data.body, data.taskId]);
	return { ok: true };
});
var createTask_createServerFn_handler = createServerRpc({
	id: "a1662d0d40950a22b15f969d25172d3f43ec2cc69f7602b2ec3c67218af5b1b1",
	name: "createTask",
	filename: "src/lib/api.ts"
}, (opts) => createTask.__executeServer(opts));
var createTask = createServerFn({ method: "POST" }).validator(object({
	date: dateSchema,
	title: string().max(160).optional(),
	ownerId: string().nullable().optional()
})).handler(createTask_createServerFn_handler, async ({ data }) => {
	const sql = await getSql();
	const id = newId("task");
	const sort = ((await sql`
      select max(sort_order) as m from tasks where day_date = ${data.date}`)[0]?.m ?? -1) + 1;
	await sql.query(`insert into tasks (id, day_date, title, owner_id, sort_order)
       values ($1, $2, $3, $4, $5)`, [
		id,
		data.date,
		data.title ?? "",
		data.ownerId ?? null,
		sort
	]);
	return mapTask((await sql`select * from tasks where id = ${id}`)[0]);
});
var updateTask_createServerFn_handler = createServerRpc({
	id: "41fe4deada2855c13e9987d76d9c982b82581bd9e60ae80580deb6e26547229f",
	name: "updateTask",
	filename: "src/lib/api.ts"
}, (opts) => updateTask.__executeServer(opts));
var updateTask = createServerFn({ method: "POST" }).validator(object({
	id: string(),
	title: string().max(160).optional(),
	course: string().max(40).optional(),
	ownerId: string().nullable().optional(),
	status: _enum([
		"todo",
		"doing",
		"done",
		"parked"
	]).optional(),
	priority: _enum([
		"high",
		"normal",
		"low"
	]).optional(),
	estMin: number().int().min(0).max(1440).nullable().optional(),
	spentMin: number().int().min(0).max(1440).optional(),
	progress: number().int().min(0).max(100).optional(),
	dueDate: union([dateSchema, _null()]).optional(),
	notes: string().max(400).optional(),
	honesty: string().max(280).optional()
})).handler(updateTask_createServerFn_handler, async ({ data }) => {
	const sql = await getSql();
	const sets = [];
	const params = [];
	let i = 1;
	const put = (col, value) => {
		sets.push(`${col} = $${i++}`);
		params.push(value);
	};
	if (data.title !== void 0) put("title", data.title);
	if (data.course !== void 0) put("course", data.course);
	if (data.ownerId !== void 0) put("owner_id", data.ownerId);
	if (data.status !== void 0) {
		put("status", data.status);
		if (data.status === "done" && data.progress === void 0) put("progress", 100);
		if (data.status === "todo" && data.progress === void 0) put("progress", 0);
	}
	if (data.priority !== void 0) put("priority", data.priority);
	if (data.estMin !== void 0) put("est_min", data.estMin);
	if (data.spentMin !== void 0) put("spent_min", data.spentMin);
	if (data.progress !== void 0) put("progress", data.progress);
	if (data.dueDate !== void 0) put("due_date", data.dueDate);
	if (data.notes !== void 0) put("notes", data.notes);
	if (data.honesty !== void 0) put("honesty", data.honesty);
	if (sets.length === 0) return { ok: true };
	sets.push("updated_at = now()");
	params.push(data.id);
	await sql.query(`update tasks set ${sets.join(", ")} where id = $${i}`, params);
	return { ok: true };
});
var deleteTask_createServerFn_handler = createServerRpc({
	id: "7fd8c2ba54724bf4acbc23f574fc1cddfadc645902be25b28b56901ffbe44217",
	name: "deleteTask",
	filename: "src/lib/api.ts"
}, (opts) => deleteTask.__executeServer(opts));
var deleteTask = createServerFn({ method: "POST" }).validator(object({ id: string() })).handler(deleteTask_createServerFn_handler, async ({ data }) => {
	await (await getSql()).query(`delete from tasks where id = $1`, [data.id]);
	return { ok: true };
});
//#endregion
export { addMember_createServerFn_handler, createTask_createServerFn_handler, deleteTask_createServerFn_handler, getBoard_createServerFn_handler, logHonesty_createServerFn_handler, renameMember_createServerFn_handler, sendNudge_createServerFn_handler, setGoal_createServerFn_handler, setPresence_createServerFn_handler, updateTask_createServerFn_handler };

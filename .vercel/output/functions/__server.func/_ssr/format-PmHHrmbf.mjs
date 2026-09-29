//#region node_modules/.nitro/vite/services/ssr/assets/format-PmHHrmbf.js
function todayLocal() {
	return toIsoDate(/* @__PURE__ */ new Date());
}
function toIsoDate(d) {
	return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}
function parseIsoDate(iso) {
	const [y, m, d] = iso.split("-").map(Number);
	return new Date(y, (m ?? 1) - 1, d ?? 1);
}
function addDays(iso, n) {
	const dt = parseIsoDate(iso);
	dt.setDate(dt.getDate() + n);
	return toIsoDate(dt);
}
function startOfWeek(iso) {
	const dt = parseIsoDate(iso);
	const day = dt.getDay();
	const diff = day === 0 ? -6 : 1 - day;
	dt.setDate(dt.getDate() + diff);
	return toIsoDate(dt);
}
function formatDayLabel(iso) {
	return parseIsoDate(iso).toLocaleDateString(void 0, {
		weekday: "short",
		month: "short",
		day: "numeric"
	});
}
function formatDayShort(iso) {
	return parseIsoDate(iso).toLocaleDateString(void 0, { weekday: "short" });
}
function formatDayNum(iso) {
	return String(parseIsoDate(iso).getDate());
}
function formatMinutes(min) {
	if (min == null || Number.isNaN(min)) return "—";
	const n = Math.max(0, Math.round(min));
	if (n === 0) return "0m";
	const h = Math.floor(n / 60);
	const m = n % 60;
	if (h === 0) return `${m}m`;
	if (m === 0) return `${h}h`;
	return `${h}h ${m}m`;
}
function parseMinutes(raw) {
	const t = raw.trim().toLowerCase();
	if (!t || t === "—" || t === "-") return null;
	const hm = t.match(/^(\d+)\s*h(?:\s*(\d+)\s*m?)?$/);
	if (hm) return Number(hm[1]) * 60 + Number(hm[2] ?? 0);
	const m = t.match(/^(\d+)\s*m$/);
	if (m) return Number(m[1]);
	const n = Number(t);
	if (Number.isFinite(n)) return Math.max(0, Math.round(n));
	return null;
}
function formatElapsed(ms) {
	const total = Math.max(0, Math.floor(ms / 1e3));
	const h = Math.floor(total / 3600);
	const m = Math.floor(total % 3600 / 60);
	const s = total % 60;
	const mm = String(m).padStart(2, "0");
	const ss = String(s).padStart(2, "0");
	if (h > 0) return `${h}:${mm}:${ss}`;
	return `${mm}:${ss}`;
}
function formatTime(iso) {
	const d = new Date(iso);
	if (Number.isNaN(d.getTime())) return "";
	return d.toLocaleTimeString(void 0, {
		hour: "numeric",
		minute: "2-digit"
	});
}
function initials(name) {
	const parts = name.trim().split(/\s+/).filter(Boolean);
	if (parts.length === 0) return "?";
	if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
	return (parts[0][0] + parts[1][0]).toUpperCase();
}
function newId(prefix) {
	return `${prefix}_${crypto.randomUUID().replace(/-/g, "").slice(0, 16)}`;
}
function asIso(value) {
	if (value instanceof Date) return value.toISOString();
	if (typeof value === "string") return value;
	return String(value ?? "");
}
function asIsoOrNull(value) {
	if (value == null || value === "") return null;
	return asIso(value);
}
//#endregion
export { formatDayNum as a, formatMinutes as c, newId as d, parseMinutes as f, formatDayLabel as i, formatTime as l, todayLocal as m, asIso as n, formatDayShort as o, startOfWeek as p, asIsoOrNull as r, formatElapsed as s, addDays as t, initials as u };

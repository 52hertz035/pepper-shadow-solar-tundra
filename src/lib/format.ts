export function todayLocal(): string {
  const d = new Date();
  return toIsoDate(d);
}

export function toIsoDate(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export function parseIsoDate(iso: string): Date {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, (m ?? 1) - 1, d ?? 1);
}

export function addDays(iso: string, n: number): string {
  const dt = parseIsoDate(iso);
  dt.setDate(dt.getDate() + n);
  return toIsoDate(dt);
}

export function startOfWeek(iso: string): string {
  const dt = parseIsoDate(iso);
  const day = dt.getDay();
  const diff = day === 0 ? -6 : 1 - day;
  dt.setDate(dt.getDate() + diff);
  return toIsoDate(dt);
}

export function formatDayLabel(iso: string): string {
  return parseIsoDate(iso).toLocaleDateString(undefined, {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}

export function formatDayShort(iso: string): string {
  return parseIsoDate(iso).toLocaleDateString(undefined, { weekday: "short" });
}

export function formatDayNum(iso: string): string {
  return String(parseIsoDate(iso).getDate());
}

export function formatMinutes(min: number | null | undefined): string {
  if (min == null || Number.isNaN(min)) return "—";
  const n = Math.max(0, Math.round(min));
  if (n === 0) return "0m";
  const h = Math.floor(n / 60);
  const m = n % 60;
  if (h === 0) return `${m}m`;
  if (m === 0) return `${h}h`;
  return `${h}h ${m}m`;
}

export function parseMinutes(raw: string): number | null {
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

export function formatElapsed(ms: number): string {
  const total = Math.max(0, Math.floor(ms / 1000));
  const h = Math.floor(total / 3600);
  const m = Math.floor((total % 3600) / 60);
  const s = total % 60;
  const mm = String(m).padStart(2, "0");
  const ss = String(s).padStart(2, "0");
  if (h > 0) return `${h}:${mm}:${ss}`;
  return `${mm}:${ss}`;
}

export function formatTime(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleTimeString(undefined, { hour: "numeric", minute: "2-digit" });
}

export function initials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[1][0]).toUpperCase();
}

export function newId(prefix: string): string {
  return `${prefix}_${crypto.randomUUID().replace(/-/g, "").slice(0, 16)}`;
}

export function asIso(value: unknown): string {
  if (value instanceof Date) return value.toISOString();
  if (typeof value === "string") return value;
  return String(value ?? "");
}

export function asIsoOrNull(value: unknown): string | null {
  if (value == null || value === "") return null;
  return asIso(value);
}

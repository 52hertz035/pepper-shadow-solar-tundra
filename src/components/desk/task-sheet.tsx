import { ChevronDown, Plus, Trash2 } from "lucide-react";
import { useMemo, useState } from "react";
import { CellInput } from "@/components/desk/cell-input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Textarea } from "@/components/ui/textarea";
import { formatMinutes, initials, parseMinutes } from "@/lib/format";
import { seatColor, taskStatusLabel } from "@/lib/seats";
import type { Member, Priority, Task, TaskStatus } from "@/lib/types";
import { cn } from "@/lib/utils";

const STATUSES: TaskStatus[] = ["todo", "doing", "done", "parked"];

type Filter = "all" | "open" | "mine";

export function TaskSheet({
  tasks,
  members,
  whoami,
  onCreate,
  onUpdate,
  onDelete,
}: {
  tasks: Task[];
  members: Member[];
  whoami: string;
  onCreate: () => void;
  onUpdate: (id: string, patch: Partial<Task>) => void;
  onDelete: (id: string) => void;
}) {
  const [filter, setFilter] = useState<Filter>("open");
  const [expanded, setExpanded] = useState<string | null>(null);
  const ownerIndex = useMemo(() => {
    const map = new Map<string, number>();
    members.forEach((m, i) => map.set(m.id, i));
    return map;
  }, [members]);

  const visible = tasks.filter((t) => {
    if (filter === "open") return t.status === "todo" || t.status === "doing";
    if (filter === "mine") return t.ownerId === whoami;
    return true;
  });

  const dated = visible.filter((t) => t.dayDate);
  const backlog = visible.filter((t) => !t.dayDate);

  return (
    <div className="min-w-0 overflow-hidden rounded-lg bg-sheet shadow-border">
      <div className="flex flex-wrap items-center justify-between gap-2 px-3 py-2">
        <div className="flex gap-1">
          {(
            [
              ["open", "Open"],
              ["mine", "Mine"],
              ["all", "All"],
            ] as const
          ).map(([id, label]) => (
            <button
              key={id}
              type="button"
              onClick={() => setFilter(id)}
              className={cn(
                "h-9 rounded-sm px-3 text-sm transition-colors duration-150",
                filter === id
                  ? "bg-accent text-foreground"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              {label}
            </button>
          ))}
        </div>
        <Button size="sm" variant="outline" onClick={onCreate}>
          <Plus className="size-3.5" />
          Add task
        </Button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[52rem] border-separate border-spacing-0 text-sm">
          <thead>
            <tr className="text-left text-xs text-muted-foreground">
              <th className="w-8 border-y border-border px-1 py-2 font-medium" />
              <th className="w-24 border-y border-border px-1 py-2 font-medium">Status</th>
              <th className="border-y border-border px-1 py-2 font-medium">Task</th>
              <th className="w-28 border-y border-border px-1 py-2 font-medium">Course</th>
              <th className="w-20 border-y border-border px-1 py-2 font-medium">Who</th>
              <th className="w-12 border-y border-border px-1 py-2 font-medium">Pri</th>
              <th className="w-16 border-y border-border px-1 py-2 text-right font-medium">Est</th>
              <th className="w-16 border-y border-border px-1 py-2 text-right font-medium">Spent</th>
              <th className="w-20 border-y border-border px-1 py-2 font-medium">Progress</th>
              <th className="w-28 border-y border-border px-1 py-2 font-medium">Due</th>
              <th className="w-10 border-y border-border px-1 py-2 font-medium" />
            </tr>
          </thead>
          <tbody>
            {dated.map((task) => (
              <TaskRows
                key={task.id}
                task={task}
                members={members}
                ownerIndex={ownerIndex}
                expanded={expanded === task.id}
                onToggle={() => setExpanded(expanded === task.id ? null : task.id)}
                onUpdate={onUpdate}
                onDelete={onDelete}
              />
            ))}
            {backlog.length > 0 ? (
              <tr>
                <td
                  colSpan={11}
                  className="bg-muted/40 px-3 py-1.5 text-xs tracking-wide text-muted-foreground uppercase"
                >
                  Backlog
                </td>
              </tr>
            ) : null}
            {backlog.map((task) => (
              <TaskRows
                key={task.id}
                task={task}
                members={members}
                ownerIndex={ownerIndex}
                expanded={expanded === task.id}
                onToggle={() => setExpanded(expanded === task.id ? null : task.id)}
                onUpdate={onUpdate}
                onDelete={onDelete}
              />
            ))}
            {visible.length === 0 ? (
              <tr>
                <td colSpan={11} className="px-3 py-10 text-center text-sm text-muted-foreground">
                  Nothing here. Add a task, or switch the filter.
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function TaskRows({
  task,
  members,
  ownerIndex,
  expanded,
  onToggle,
  onUpdate,
  onDelete,
}: {
  task: Task;
  members: Member[];
  ownerIndex: Map<string, number>;
  expanded: boolean;
  onToggle: () => void;
  onUpdate: (id: string, patch: Partial<Task>) => void;
  onDelete: (id: string) => void;
}) {
  const owner = members.find((m) => m.id === task.ownerId);
  const idx = task.ownerId ? (ownerIndex.get(task.ownerId) ?? 0) : 0;
  const muted = task.status === "done" || task.status === "parked";

  return (
    <>
      <tr
        className={cn(
          "group border-b border-border",
          muted && "opacity-60",
          task.status === "done" && "text-muted-foreground",
        )}
      >
        <td className="border-b border-border px-1 py-0.5">
          <button
            type="button"
            onClick={onToggle}
            aria-label={expanded ? "Hide details" : "Show details"}
            className="flex size-8 items-center justify-center rounded-xs text-muted-foreground hover:bg-accent hover:text-foreground"
          >
            <ChevronDown
              className={cn(
                "size-4 transition-transform duration-150",
                expanded && "rotate-180",
              )}
            />
          </button>
        </td>
        <td className="border-b border-border px-1 py-0.5">
          <StatusSelect
            value={task.status}
            onChange={(status) => onUpdate(task.id, { status })}
          />
        </td>
        <td className="border-b border-border px-1 py-0.5">
          <CellInput
            value={task.title}
            placeholder="What are you doing"
            className={cn(task.status === "done" && "line-through")}
            onCommit={(title) => onUpdate(task.id, { title })}
          />
        </td>
        <td className="border-b border-border px-1 py-0.5">
          <CellInput
            value={task.course}
            placeholder="Course"
            onCommit={(course) => onUpdate(task.id, { course })}
          />
        </td>
        <td className="border-b border-border px-1 py-0.5">
          <OwnerSelect
            members={members}
            value={task.ownerId}
            onChange={(ownerId) => onUpdate(task.id, { ownerId })}
            owner={owner}
            idx={idx}
          />
        </td>
        <td className="border-b border-border px-1 py-0.5">
          <PriorityToggle
            value={task.priority}
            onChange={(priority) => onUpdate(task.id, { priority })}
          />
        </td>
        <td className="border-b border-border px-1 py-0.5">
          <CellInput
            value={task.estMin == null ? "" : formatMinutes(task.estMin)}
            placeholder="—"
            align="right"
            className="tabular"
            onCommit={(raw) => onUpdate(task.id, { estMin: parseMinutes(raw) })}
          />
        </td>
        <td className="border-b border-border px-1 py-0.5">
          <CellInput
            value={task.spentMin ? formatMinutes(task.spentMin) : ""}
            placeholder="0m"
            align="right"
            className="tabular"
            onCommit={(raw) => {
              const n = parseMinutes(raw);
              onUpdate(task.id, { spentMin: n ?? 0 });
            }}
          />
        </td>
        <td className="border-b border-border px-1 py-0.5">
          <ProgressCell
            value={task.progress}
            onChange={(progress) => onUpdate(task.id, { progress })}
          />
        </td>
        <td className="border-b border-border px-1 py-0.5">
          <input
            type="date"
            value={task.dueDate ?? ""}
            onChange={(e) => onUpdate(task.id, { dueDate: e.target.value || null })}
            className="h-8 w-full bg-transparent px-1 text-sm text-foreground outline-none [color-scheme:dark] hover:bg-accent/60 focus:bg-background focus:ring-1 focus:ring-ring"
          />
        </td>
        <td className="border-b border-border px-1 py-0.5">
          <button
            type="button"
            onClick={() => onDelete(task.id)}
            aria-label="Delete task"
            className="flex size-8 items-center justify-center rounded-xs text-muted-foreground opacity-0 hover:bg-accent hover:text-destructive group-hover:opacity-100"
          >
            <Trash2 className="size-3.5" />
          </button>
        </td>
      </tr>
      {expanded ? (
        <tr>
          <td colSpan={11} className="border-b border-border bg-muted/30 px-3 py-3">
            <div className="grid gap-3 md:grid-cols-2">
              <label className="block">
                <span className="mb-1 block text-xs text-muted-foreground">Notes</span>
                <Textarea
                  defaultValue={task.notes}
                  placeholder="One useful constraint. Not a diary."
                  className="min-h-20"
                  onBlur={(e) => {
                    if (e.target.value !== task.notes) {
                      onUpdate(task.id, { notes: e.target.value });
                    }
                  }}
                />
              </label>
              <label className="block">
                <span className="mb-1 block text-xs text-muted-foreground">Honesty</span>
                <Textarea
                  defaultValue={task.honesty}
                  placeholder="Did you actually work this, or park it and pretend?"
                  className="min-h-20"
                  onBlur={(e) => {
                    if (e.target.value !== task.honesty) {
                      onUpdate(task.id, { honesty: e.target.value });
                    }
                  }}
                />
              </label>
            </div>
          </td>
        </tr>
      ) : null}
    </>
  );
}

function StatusSelect({
  value,
  onChange,
}: {
  value: TaskStatus;
  onChange: (s: TaskStatus) => void;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className={cn(
            "h-8 rounded-xs px-2 text-left text-xs font-medium",
            "hover:bg-accent",
            value === "doing" && "text-doing",
            value === "done" && "text-muted-foreground",
            value === "parked" && "text-warn",
          )}
        >
          {taskStatusLabel(value)}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {STATUSES.map((s) => (
          <DropdownMenuItem key={s} onSelect={() => onChange(s)}>
            {taskStatusLabel(s)}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function OwnerSelect({
  members,
  value,
  onChange,
  owner,
  idx,
}: {
  members: Member[];
  value: string | null;
  onChange: (id: string | null) => void;
  owner?: Member;
  idx: number;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button type="button" className="flex h-8 items-center gap-1.5 rounded-xs px-1 hover:bg-accent">
          {owner ? (
            <>
              <span
                className={cn(
                  "flex size-5 items-center justify-center rounded-xs text-xs font-medium text-primary-foreground",
                  seatColor(idx),
                )}
              >
                {initials(owner.name)}
              </span>
              <span className="truncate text-xs">{owner.name}</span>
            </>
          ) : (
            <span className="text-xs text-muted-foreground">—</span>
          )}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onSelect={() => onChange(null)}>Unassigned</DropdownMenuItem>
        {members.map((m, i) => (
          <DropdownMenuItem key={m.id} onSelect={() => onChange(m.id)}>
            <span
              className={cn(
                "flex size-5 items-center justify-center rounded-xs text-xs font-medium text-primary-foreground",
                seatColor(i),
              )}
            >
              {initials(m.name)}
            </span>
            {m.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function PriorityToggle({
  value,
  onChange,
}: {
  value: Priority;
  onChange: (p: Priority) => void;
}) {
  const cycle: Record<Priority, Priority> = {
    normal: "high",
    high: "low",
    low: "normal",
  };
  return (
    <button
      type="button"
      onClick={() => onChange(cycle[value])}
      className={cn(
        "h-8 w-full rounded-xs text-xs font-medium hover:bg-accent",
        value === "high" && "text-destructive",
        value === "low" && "text-muted-foreground",
        value === "normal" && "text-muted-foreground/70",
      )}
      aria-label={`Priority ${value}`}
    >
      {value === "high" ? "High" : value === "low" ? "Low" : "—"}
    </button>
  );
}

function ProgressCell({
  value,
  onChange,
}: {
  value: number;
  onChange: (n: number) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onChange(value >= 100 ? 0 : Math.min(100, value + 25))}
      aria-label={`Progress ${value} percent`}
      className="flex h-8 w-full items-center gap-2 rounded-xs px-1 hover:bg-accent"
    >
      <div className="h-1 min-w-8 flex-1 overflow-hidden rounded-full bg-muted">
        <div
          className="h-full rounded-full bg-foreground/70 transition-[width] duration-200 ease-out"
          style={{ width: `${value}%` }}
        />
      </div>
      <span className="w-7 shrink-0 text-right text-xs tabular text-muted-foreground">
        {value}
      </span>
    </button>
  );
}

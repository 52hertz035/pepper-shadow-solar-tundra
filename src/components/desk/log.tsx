import { formatTime } from "@/lib/format";
import type { BoardEvent, EventKind, Member } from "@/lib/types";
import { cn } from "@/lib/utils";

const KIND_LABEL: Record<EventKind, string> = {
  checkin: "Started",
  checkout: "Done",
  break: "Break",
  nudge: "Nudge",
  honesty: "Honest",
  goal: "Goal",
};

export function ActivityLog({
  events,
  members,
}: {
  events: BoardEvent[];
  members: Member[];
}) {
  const names = new Map(members.map((m) => [m.id, m.name]));

  return (
    <aside className="rounded-lg bg-sheet p-3 shadow-border">
      <h2 className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
        Today’s log
      </h2>
      {events.length === 0 ? (
        <p className="mt-4 text-sm text-muted-foreground">
          Check-ins, nudges, and slips show up here.
        </p>
      ) : (
        <ol className="mt-3 space-y-3">
          {events.map((event) => (
            <li key={event.id} className="grid grid-cols-[3.5rem_1fr] gap-2 text-sm">
              <time className="tabular text-xs leading-5 text-muted-foreground">
                {formatTime(event.createdAt)}
              </time>
              <div>
                <div className="flex items-baseline gap-2">
                  <span
                    className={cn(
                      "text-xs font-medium",
                      event.kind === "honesty" && "text-warn",
                      event.kind === "nudge" && "text-seat-a",
                      event.kind === "checkin" && "text-doing",
                    )}
                  >
                    {KIND_LABEL[event.kind]}
                  </span>
                  <span className="truncate text-xs text-muted-foreground">
                    {event.memberId ? names.get(event.memberId) : ""}
                  </span>
                </div>
                {event.body ? (
                  <p className="mt-0.5 text-sm text-foreground/90">{event.body}</p>
                ) : null}
              </div>
            </li>
          ))}
        </ol>
      )}
    </aside>
  );
}

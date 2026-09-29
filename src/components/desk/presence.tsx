import { Coffee, LogOut, Play, Send } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useNow } from "@/hooks/use-now";
import { formatElapsed, formatMinutes, initials } from "@/lib/format";
import { seatColor, statusLabel } from "@/lib/seats";
import type { Member, MemberStatus } from "@/lib/types";
import { cn } from "@/lib/utils";

export function PresenceStrip({
  members,
  whoami,
  date,
  onStatus,
  onGoal,
  onNudge,
}: {
  members: Member[];
  whoami: string;
  date: string;
  onStatus: (memberId: string, status: MemberStatus) => Promise<unknown> | unknown;
  onGoal: (memberId: string, goal: string) => Promise<unknown> | unknown;
  onNudge: (fromId: string, toId: string, body?: string) => Promise<unknown> | unknown;
}) {
  return (
    <section className="grid gap-2 md:grid-cols-2">
      {members.map((member, i) => (
        <PresenceCard
          key={member.id}
          member={member}
          index={i}
          mine={member.id === whoami}
          whoami={whoami}
          date={date}
          onStatus={onStatus}
          onGoal={onGoal}
          onNudge={onNudge}
        />
      ))}
    </section>
  );
}

function PresenceCard({
  member,
  index,
  mine,
  whoami,
  onStatus,
  onGoal,
  onNudge,
}: {
  member: Member;
  index: number;
  mine: boolean;
  whoami: string;
  date: string;
  onStatus: (memberId: string, status: MemberStatus) => Promise<unknown> | unknown;
  onGoal: (memberId: string, goal: string) => Promise<unknown> | unknown;
  onNudge: (fromId: string, toId: string, body?: string) => Promise<unknown> | unknown;
}) {
  const live = member.status === "studying" && Boolean(member.sessionStartedAt);
  const now = useNow(live);
  const elapsed = live && member.sessionStartedAt
    ? now - new Date(member.sessionStartedAt).getTime()
    : 0;
  const liveMin = Math.floor(elapsed / 60000);
  const totalMin = member.todaySpentMin + (live ? liveMin : 0);

  return (
    <article
      className={cn(
        "rounded-md bg-secondary p-3 shadow-border",
        mine && "ring-1 ring-foreground/25",
      )}
    >
      <div className="flex items-start gap-3">
        <div
          className={cn(
            "mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-sm text-xs font-medium text-primary-foreground",
            seatColor(index),
          )}
        >
          {initials(member.name)}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-baseline justify-between gap-2">
            <div className="flex min-w-0 items-baseline gap-2">
              <h2 className="truncate text-sm font-medium">{member.name}</h2>
              {mine ? (
                <span className="text-xs text-muted-foreground">you</span>
              ) : null}
            </div>
            <StatusChip status={member.status} live={live} elapsed={elapsed} />
          </div>
          <p className="mt-0.5 text-xs text-muted-foreground tabular">
            Today {formatMinutes(totalMin)}
          </p>
          <GoalLine
            value={member.sessionGoal}
            editable={mine}
            onCommit={(goal) => onGoal(member.id, goal)}
          />
        </div>
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        {mine ? (
          <>
            <Button
              size="sm"
              variant={member.status === "studying" ? "secondary" : "default"}
              onClick={() => onStatus(member.id, "studying")}
            >
              <Play className="size-3.5" />
              Start
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => onStatus(member.id, "break")}
            >
              <Coffee className="size-3.5" />
              Break
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => onStatus(member.id, "done")}
            >
              <LogOut className="size-3.5" />
              Done
            </Button>
          </>
        ) : (
          <NudgeButton
            fromId={whoami}
            toName={member.name}
            toId={member.id}
            onNudge={onNudge}
          />
        )}
      </div>
    </article>
  );
}

function StatusChip({
  status,
  live,
  elapsed,
}: {
  status: MemberStatus;
  live: boolean;
  elapsed: number;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 text-xs font-medium",
        status === "studying" && "text-doing",
        status === "break" && "text-warn",
        status === "done" && "text-muted-foreground",
        status === "idle" && "text-muted-foreground",
      )}
    >
      <span
        className={cn(
          "size-1.5 rounded-full",
          status === "studying" && "bg-doing",
          status === "break" && "bg-warn",
          status === "done" && "bg-muted-foreground/50",
          status === "idle" && "bg-muted-foreground/40",
          live && "animate-pulse",
        )}
      />
      {live ? (
        <span className="tabular">{formatElapsed(elapsed)}</span>
      ) : (
        statusLabel(status)
      )}
    </span>
  );
}

function GoalLine({
  value,
  editable,
  onCommit,
}: {
  value: string;
  editable: boolean;
  onCommit: (goal: string) => void;
}) {
  const [draft, setDraft] = useState(value);
  useEffect(() => setDraft(value), [value]);

  if (!editable) {
    return (
      <p className="mt-2 line-clamp-2 text-sm text-foreground/90">
        {value || <span className="text-muted-foreground">No goal yet.</span>}
      </p>
    );
  }

  return (
    <input
      value={draft}
      onChange={(e) => setDraft(e.target.value)}
      onBlur={() => {
        if (draft !== value) onCommit(draft);
      }}
      onKeyDown={(e) => {
        if (e.key === "Enter") e.currentTarget.blur();
      }}
      placeholder="Today’s one line — what are you actually doing?"
      className="mt-2 h-8 w-full rounded-xs bg-transparent text-sm outline-none placeholder:text-muted-foreground/60 hover:bg-accent/50 focus:bg-background focus:px-1.5 focus:ring-1 focus:ring-ring"
    />
  );
}

function NudgeButton({
  fromId,
  toId,
  toName,
  onNudge,
}: {
  fromId: string;
  toId: string;
  toName: string;
  onNudge: (fromId: string, toId: string, body?: string) => Promise<unknown> | unknown;
}) {
  const [open, setOpen] = useState(false);
  const [body, setBody] = useState("");

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" variant="outline">
          <Send className="size-3.5" />
          Nudge {toName}
        </Button>
      </DialogTrigger>
      <DialogContent
        title={`Nudge ${toName}`}
        description="Short, specific, not a lecture. They’ll see it in the log."
      >
        <Textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="You said you’d start at 9."
          maxLength={200}
        />
        <div className="mt-3 flex justify-end gap-2">
          <Button variant="ghost" size="sm" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button
            size="sm"
            onClick={async () => {
              await onNudge(fromId, toId, body.trim() || undefined);
              toast(`Nudge sent to ${toName}`);
              setBody("");
              setOpen(false);
            }}
          >
            Send
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export function HonestyButton({
  onSubmit,
}: {
  onSubmit: (body: string) => Promise<unknown> | unknown;
}) {
  const [open, setOpen] = useState(false);
  const [body, setBody] = useState("");

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" variant="ghost">
          Log a slip
        </Button>
      </DialogTrigger>
      <DialogContent
        title="Be honest"
        description="One sentence. No performance. This is the point of a study partner."
      >
        <Input
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Scrolled for 20 minutes. Back now."
          maxLength={280}
        />
        <div className="mt-3 flex justify-end gap-2">
          <Button variant="ghost" size="sm" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button
            size="sm"
            disabled={!body.trim()}
            onClick={async () => {
              await onSubmit(body.trim());
              toast("Logged.");
              setBody("");
              setOpen(false);
            }}
          >
            Log it
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

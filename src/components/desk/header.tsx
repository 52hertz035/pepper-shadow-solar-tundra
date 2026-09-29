import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { addDays, formatDayLabel, formatDayNum, formatDayShort, formatMinutes, initials } from "@/lib/format";
import { seatColor } from "@/lib/seats";
import type { Member, WeekStats } from "@/lib/types";
import { cn } from "@/lib/utils";

export function DeskHeader({
  date,
  weekDays,
  isToday,
  members,
  whoami,
  week,
  onDate,
  onWhoami,
  onRename,
  onAdd,
}: {
  date: string;
  weekDays: string[];
  isToday: boolean;
  members: Member[];
  whoami: string;
  week: WeekStats;
  onDate: (iso: string) => void;
  onWhoami: (id: string) => void;
  onRename: (id: string, name: string) => void;
  onAdd: (name: string) => Promise<string | void>;
}) {
  const me = members.find((m) => m.id === whoami) ?? members[0];
  const meIdx = Math.max(0, members.findIndex((m) => m.id === whoami));

  return (
    <header className="flex flex-col gap-4">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div className="flex items-baseline gap-3">
          <Mark />
          <div>
            <h1 className="font-display text-3xl leading-none tracking-tight">Lock In</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Shared desk. Check in, work, tell the truth.
            </p>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <p className="mr-1 hidden text-xs text-muted-foreground sm:block">
            Week {week.done} done · {week.open} open · {formatMinutes(week.spentMin)} logged
          </p>
          {me ? (
            <WhoMenu
              members={members}
              me={me}
              meIdx={meIdx}
              onWhoami={onWhoami}
              onRename={onRename}
              onAdd={onAdd}
            />
          ) : null}
        </div>
      </div>

      <div className="flex items-center gap-1">
        <button
          type="button"
          aria-label="Previous day"
          onClick={() => onDate(addDays(date, -1))}
          className="flex size-11 items-center justify-center rounded-sm text-muted-foreground hover:bg-accent hover:text-foreground"
        >
          <ChevronLeft className="size-4" />
        </button>
        <div className="flex min-w-0 flex-1 gap-1 overflow-x-auto">
          {weekDays.map((d) => {
            const active = d === date;
            return (
              <button
                key={d}
                type="button"
                onClick={() => onDate(d)}
                className={cn(
                  "flex min-w-11 flex-1 flex-col items-center rounded-sm px-2 py-1.5 text-xs transition-colors duration-150",
                  active
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-accent hover:text-foreground",
                )}
              >
                <span className="uppercase">{formatDayShort(d)}</span>
                <span className="tabular text-sm font-medium">{formatDayNum(d)}</span>
              </button>
            );
          })}
        </div>
        <button
          type="button"
          aria-label="Next day"
          onClick={() => onDate(addDays(date, 1))}
          className="flex size-11 items-center justify-center rounded-sm text-muted-foreground hover:bg-accent hover:text-foreground"
        >
          <ChevronRight className="size-4" />
        </button>
      </div>
      <p className="text-sm text-muted-foreground">
        {formatDayLabel(date)}
        {isToday ? " · today" : ""}
      </p>
    </header>
  );
}

function Mark() {
  return (
    <svg
      viewBox="0 0 32 32"
      className="size-9 shrink-0"
      aria-hidden="true"
    >
      <rect width="32" height="32" rx="6" className="fill-primary" />
      <rect x="8" y="10" width="6" height="14" rx="1.5" className="fill-primary-foreground" />
      <rect x="18" y="10" width="6" height="14" rx="1.5" className="fill-primary-foreground/70" />
    </svg>
  );
}

function WhoMenu({
  members,
  me,
  meIdx,
  onWhoami,
  onRename,
  onAdd,
}: {
  members: Member[];
  me: Member;
  meIdx: number;
  onWhoami: (id: string) => void;
  onRename: (id: string, name: string) => void;
  onAdd: (name: string) => Promise<string | void>;
}) {
  const [adding, setAdding] = useState(false);
  const [name, setName] = useState("");
  const [renaming, setRenaming] = useState(false);
  const [renameTo, setRenameTo] = useState(me.name);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="gap-2">
            <span
              className={cn(
                "flex size-5 items-center justify-center rounded-xs text-xs font-medium text-primary-foreground",
                seatColor(meIdx),
              )}
            >
              {initials(me.name)}
            </span>
            I am {me.name}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>This browser is</DropdownMenuLabel>
          {members.map((m, i) => (
            <DropdownMenuItem key={m.id} onSelect={() => onWhoami(m.id)}>
              <span
                className={cn(
                  "flex size-5 items-center justify-center rounded-xs text-xs font-medium text-primary-foreground",
                  seatColor(i),
                )}
              >
                {initials(m.name)}
              </span>
              {m.name}
              {m.id === me.id ? (
                <span className="ml-auto text-xs text-muted-foreground">you</span>
              ) : null}
            </DropdownMenuItem>
          ))}
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onSelect={() => {
              setRenameTo(me.name);
              setRenaming(true);
            }}
          >
            Rename {me.name}
          </DropdownMenuItem>
          <DropdownMenuItem
            onSelect={() => {
              setName("");
              setAdding(true);
            }}
          >
            <Plus className="size-3.5" />
            Add partner
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={adding} onOpenChange={setAdding}>
        <DialogContent title="Add a partner" description="They pick this seat from I am on their browser.">
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="First name"
            maxLength={24}
            autoFocus
          />
          <div className="mt-3 flex justify-end gap-2">
            <Button variant="ghost" size="sm" onClick={() => setAdding(false)}>
              Cancel
            </Button>
            <Button
              size="sm"
              disabled={!name.trim()}
              onClick={async () => {
                const id = await onAdd(name.trim());
                if (id) onWhoami(id);
                setAdding(false);
              }}
            >
              Add
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={renaming} onOpenChange={setRenaming}>
        <DialogContent title="Rename">
          <Input
            value={renameTo}
            onChange={(e) => setRenameTo(e.target.value)}
            maxLength={24}
            autoFocus
          />
          <div className="mt-3 flex justify-end gap-2">
            <Button variant="ghost" size="sm" onClick={() => setRenaming(false)}>
              Cancel
            </Button>
            <Button
              size="sm"
              disabled={!renameTo.trim()}
              onClick={() => {
                onRename(me.id, renameTo.trim());
                setRenaming(false);
              }}
            >
              Save
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

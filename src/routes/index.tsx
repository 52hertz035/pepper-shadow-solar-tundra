import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { DeskHeader } from "@/components/desk/header";
import { ActivityLog } from "@/components/desk/log";
import { HonestyButton, PresenceStrip } from "@/components/desk/presence";
import { TaskSheet } from "@/components/desk/task-sheet";
import { useBoard } from "@/hooks/use-board";
import { addDays, startOfWeek, todayLocal } from "@/lib/format";
import type { MemberStatus, Task } from "@/lib/types";
import { readWhoami, writeWhoami } from "@/lib/whoami";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  const [date, setDate] = useState("");
  const [whoami, setWhoami] = useState("");
  const board = useBoard(date);
  const data = board.query.data;
  const members = data?.members ?? [];
  const today = date ? todayLocal() : "";
  const weekDays = useMemo(() => {
    if (!date) return [];
    const start = startOfWeek(date);
    return Array.from({ length: 7 }, (_, i) => addDays(start, i));
  }, [date]);

  useEffect(() => {
    setDate(todayLocal());
    const stored = readWhoami();
    if (stored) setWhoami(stored);
  }, []);

  useEffect(() => {
    if (members.length === 0) return;
    if (whoami && members.some((m) => m.id === whoami)) return;
    const next = members[0].id;
    setWhoami(next);
    writeWhoami(next);
  }, [members, whoami]);

  const pickSeat = (id: string) => {
    setWhoami(id);
    writeWhoami(id);
  };

  const setStatus = (memberId: string, status: MemberStatus) =>
    board.presence.mutateAsync({ data: { memberId, date, status } });

  const setGoal = (memberId: string, sessionGoal: string) =>
    board.goal.mutateAsync({ data: { memberId, date, sessionGoal } });

  const nudge = (fromId: string, toId: string, body?: string) =>
    board.nudge.mutateAsync({ data: { fromId, toId, body } });

  const updateTask = (id: string, patch: Partial<Task>) => {
    board.update.mutate({
      data: {
        id,
        title: patch.title,
        course: patch.course,
        ownerId: patch.ownerId,
        status: patch.status,
        priority: patch.priority,
        estMin: patch.estMin,
        spentMin: patch.spentMin,
        progress: patch.progress,
        dueDate: patch.dueDate,
        notes: patch.notes,
        honesty: patch.honesty,
      },
    });
  };

  return (
    <main className="mx-auto min-h-dvh w-full max-w-6xl overflow-x-hidden px-4 py-6 sm:px-6 sm:py-8">
      <DeskHeader
        date={date}
        weekDays={weekDays}
        isToday={date === today}
        members={members}
        whoami={whoami}
        week={data?.week ?? { done: 0, open: 0, spentMin: 0, estMin: 0 }}
        onDate={setDate}
        onWhoami={pickSeat}
        onRename={(id, name) => board.rename.mutate({ data: { id, name } })}
        onAdd={async (name) => {
          const res = await board.add.mutateAsync({ data: { name } });
          return res.id;
        }}
      />

      {board.query.isError ? (
        <p className="mt-8 text-sm text-destructive">
          Couldn’t load the desk. Refresh and try again.
        </p>
      ) : null}

      {!date || (board.query.isPending && !data) ? (
        <LoadingDesk />
      ) : (
        <div className="mt-6 space-y-4">
          <PresenceStrip
            members={members}
            whoami={whoami}
            date={date}
            onStatus={setStatus}
            onGoal={setGoal}
            onNudge={nudge}
          />

          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="text-sm text-muted-foreground">
              One line per task. Open the chevron only if you need notes.
            </p>
            {whoami ? (
              <HonestyButton
                onSubmit={(body) =>
                  board.honesty.mutateAsync({ data: { memberId: whoami, body } })
                }
              />
            ) : null}
          </div>

          <div className="grid min-w-0 items-start gap-4 lg:grid-cols-[minmax(0,1fr)_18rem]">
            <div className="min-w-0">
              <TaskSheet
                tasks={data?.tasks ?? []}
                members={members}
                whoami={whoami}
                onCreate={() =>
                  board.create.mutate({
                    data: { date, ownerId: whoami || null, title: "" },
                  })
                }
                onUpdate={updateTask}
                onDelete={(id) => board.remove.mutate({ data: { id } })}
              />
            </div>
            <ActivityLog events={data?.events ?? []} members={members} />
          </div>
        </div>
      )}
    </main>
  );
}

function LoadingDesk() {
  return (
    <div className="mt-6 space-y-4">
      <div className="grid gap-2 md:grid-cols-2">
        <div className="h-36 animate-pulse rounded-md bg-secondary" />
        <div className="h-36 animate-pulse rounded-md bg-secondary" />
      </div>
      <div className="h-80 animate-pulse rounded-lg bg-sheet" />
    </div>
  );
}

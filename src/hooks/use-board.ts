import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  addMember,
  createTask,
  deleteTask,
  getBoard,
  logHonesty,
  renameMember,
  sendNudge,
  setGoal,
  setPresence,
  updateTask,
} from "@/lib/api";
import type { Board, Task } from "@/lib/types";

export function useBoard(date: string) {
  const qc = useQueryClient();
  const key = ["board", date] as const;

  const query = useQuery({
    queryKey: key,
    queryFn: () => getBoard({ data: { date } }),
    refetchInterval: 5000,
    enabled: Boolean(date),
  });

  const invalidate = () => qc.invalidateQueries({ queryKey: key });

  const patchTasks = (updater: (tasks: Task[]) => Task[]) => {
    qc.setQueryData<Board>(key, (old) => {
      if (!old) return old;
      return { ...old, tasks: updater(old.tasks) };
    });
  };

  const presence = useMutation({
    mutationFn: setPresence,
    onSuccess: invalidate,
  });

  const goal = useMutation({
    mutationFn: setGoal,
    onSuccess: invalidate,
  });

  const nudge = useMutation({
    mutationFn: sendNudge,
    onSuccess: invalidate,
  });

  const honesty = useMutation({
    mutationFn: logHonesty,
    onSuccess: invalidate,
  });

  const rename = useMutation({
    mutationFn: renameMember,
    onSuccess: invalidate,
  });

  const add = useMutation({
    mutationFn: addMember,
    onSuccess: invalidate,
  });

  const create = useMutation({
    mutationFn: createTask,
    onSuccess: (task) => {
      patchTasks((tasks) => [...tasks, task]);
    },
  });

  const update = useMutation({
    mutationFn: updateTask,
    onMutate: async (vars) => {
      await qc.cancelQueries({ queryKey: key });
      const prev = qc.getQueryData<Board>(key);
      const patch = vars.data;
      patchTasks((tasks) =>
        tasks.map((t) => {
          if (t.id !== patch.id) return t;
          const next = { ...t };
          if (patch.title !== undefined) next.title = patch.title;
          if (patch.course !== undefined) next.course = patch.course;
          if (patch.ownerId !== undefined) next.ownerId = patch.ownerId;
          if (patch.status !== undefined) {
            next.status = patch.status;
            if (patch.status === "done" && patch.progress === undefined) next.progress = 100;
            if (patch.status === "todo" && patch.progress === undefined) next.progress = 0;
          }
          if (patch.priority !== undefined) next.priority = patch.priority;
          if (patch.estMin !== undefined) next.estMin = patch.estMin;
          if (patch.spentMin !== undefined) next.spentMin = patch.spentMin;
          if (patch.progress !== undefined) next.progress = patch.progress;
          if (patch.dueDate !== undefined) next.dueDate = patch.dueDate;
          if (patch.notes !== undefined) next.notes = patch.notes;
          if (patch.honesty !== undefined) next.honesty = patch.honesty;
          return next;
        }),
      );
      return { prev };
    },
    onError: (_err, _vars, ctx) => {
      if (ctx?.prev) qc.setQueryData(key, ctx.prev);
    },
    onSettled: invalidate,
  });

  const remove = useMutation({
    mutationFn: deleteTask,
    onMutate: async (vars) => {
      await qc.cancelQueries({ queryKey: key });
      const prev = qc.getQueryData<Board>(key);
      patchTasks((tasks) => tasks.filter((t) => t.id !== vars.data.id));
      return { prev };
    },
    onError: (_err, _vars, ctx) => {
      if (ctx?.prev) qc.setQueryData(key, ctx.prev);
    },
    onSettled: invalidate,
  });

  return {
    query,
    presence,
    goal,
    nudge,
    honesty,
    rename,
    add,
    create,
    update,
    remove,
    invalidate,
  };
}

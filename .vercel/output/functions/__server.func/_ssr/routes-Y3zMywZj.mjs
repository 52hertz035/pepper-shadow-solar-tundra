import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { n as Slot, s as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { n as TSS_SERVER_FUNCTION, r as getServerFnById, t as createServerFn } from "./ssr.mjs";
import { a as formatDayNum, c as formatMinutes, f as parseMinutes, i as formatDayLabel, l as formatTime, m as todayLocal, o as formatDayShort, p as startOfWeek, s as formatElapsed, t as addDays, u as initials } from "./format-PmHHrmbf.mjs";
import { a as object, i as number, n as _null, o as string, s as union, t as _enum } from "../_libs/zod.mjs";
import { a as Plus, c as Coffee, d as ChevronDown, i as Send, l as ChevronRight, o as Play, r as Trash2, s as LogOut, t as X, u as ChevronLeft } from "../_libs/lucide-react.mjs";
import { i as useQueryClient, n as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { a as DialogOverlay, c as DialogTrigger$1, i as DialogDescription, n as DialogClose, o as DialogPortal, r as DialogContent$1, s as DialogTitle, t as Dialog$1 } from "../_libs/@radix-ui/react-dialog+[...].mjs";
import { a as Root2, i as Portal2, n as Item2, o as Separator2, r as Label2, s as Trigger, t as Content2 } from "../_libs/@radix-ui/react-dropdown-menu+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { n as clsx, t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-Y3zMywZj.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
var buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-sm text-sm font-medium transition-[background-color,color,box-shadow,transform,opacity] duration-150 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/70 disabled:pointer-events-none disabled:opacity-40 active:not-disabled:scale-[0.96] [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0", {
	variants: {
		variant: {
			default: "bg-primary text-primary-foreground hover:bg-primary/90",
			secondary: "bg-secondary text-secondary-foreground shadow-[var(--shadow-border)] hover:shadow-[var(--shadow-border-hover)]",
			outline: "bg-transparent text-foreground shadow-[var(--shadow-border)] hover:bg-accent",
			ghost: "text-muted-foreground hover:bg-accent hover:text-foreground",
			destructive: "bg-destructive text-primary-foreground hover:bg-destructive/90"
		},
		size: {
			default: "h-11 px-4",
			sm: "h-9 px-3 text-sm",
			lg: "h-12 px-5",
			icon: "size-11",
			"icon-sm": "size-9"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
function Button({ className, variant, size, asChild = false, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(asChild ? Slot : "button", {
		className: cn(buttonVariants({
			variant,
			size,
			className
		})),
		...props
	});
}
var Dialog = Dialog$1;
var DialogTrigger = DialogTrigger$1;
function DialogContent({ className, children, title, description, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay, { className: cn("fixed inset-0 z-50 bg-background/70", "data-[state=open]:animate-in data-[state=closed]:animate-out", "data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0") }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent$1, {
		className: cn("fixed top-1/2 left-1/2 z-50 w-[min(100%-2rem,26rem)] -translate-x-1/2 -translate-y-1/2", "rounded-lg bg-card p-4 text-card-foreground shadow-[var(--shadow-border)]", "data-[state=open]:animate-in data-[state=closed]:animate-out", "data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0", "data-[state=open]:zoom-in-95 data-[state=closed]:zoom-out-95", className),
		...props,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-4 pr-8",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
					className: "font-display text-xl font-medium tracking-tight",
					children: title
				}), description ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, {
					className: "mt-1 text-sm text-muted-foreground",
					children: description
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, {
					className: "sr-only",
					children: title
				})]
			}),
			children,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogClose, {
				className: "absolute top-3 right-3 flex size-9 items-center justify-center rounded-sm text-muted-foreground hover:bg-accent hover:text-foreground",
				"aria-label": "Close",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4" })
			})
		]
	})] });
}
var DropdownMenu = Root2;
var DropdownMenuTrigger = Trigger;
function DropdownMenuContent({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Portal2, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Content2, {
		sideOffset: 6,
		className: cn("z-50 min-w-40 rounded-md bg-popover p-1 text-sm text-popover-foreground shadow-[var(--shadow-border)]", "origin-[var(--radix-dropdown-menu-content-transform-origin)]", "data-[state=open]:animate-in data-[state=closed]:animate-out", "data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0", "data-[state=closed]:zoom-out-[0.97] data-[state=open]:zoom-in-[0.97]", className),
		...props
	}) });
}
function DropdownMenuItem({ className, inset, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Item2, {
		className: cn("flex cursor-pointer items-center gap-2 rounded-xs px-2 py-2 text-sm outline-none select-none", "focus:bg-accent focus:text-accent-foreground", "data-disabled:pointer-events-none data-disabled:opacity-40", inset && "pl-8", className),
		...props
	});
}
function DropdownMenuSeparator({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Separator2, {
		className: cn("my-1 h-px bg-border", className),
		...props
	});
}
function DropdownMenuLabel({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label2, {
		className: cn("px-2 py-1.5 text-xs text-muted-foreground", className),
		...props
	});
}
function Input({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
		className: cn("flex h-11 w-full rounded-sm bg-secondary px-3 text-sm text-foreground shadow-[var(--shadow-border)]", "placeholder:text-muted-foreground/70", "transition-[box-shadow] duration-150 ease-out", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/70", "disabled:opacity-40", className),
		...props
	});
}
var SEAT_COLORS = [
	"bg-seat-a",
	"bg-seat-b",
	"bg-seat-c"
];
function seatColor(index) {
	return SEAT_COLORS[index % SEAT_COLORS.length];
}
function statusLabel(status) {
	switch (status) {
		case "studying": return "Studying";
		case "break": return "Break";
		case "done": return "Done";
		default: return "Idle";
	}
}
function taskStatusLabel(status) {
	switch (status) {
		case "todo": return "To do";
		case "doing": return "Doing";
		case "done": return "Done";
		case "parked": return "Parked";
	}
}
function DeskHeader({ date, weekDays, isToday, members, whoami, week, onDate, onWhoami, onRename, onAdd }) {
	const me = members.find((m) => m.id === whoami) ?? members[0];
	const meIdx = Math.max(0, members.findIndex((m) => m.id === whoami));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
		className: "flex flex-col gap-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-end justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-baseline gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mark, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "font-display text-3xl leading-none tracking-tight",
						children: "Lock In"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm text-muted-foreground",
						children: "Shared desk. Check in, work, tell the truth."
					})] })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mr-1 hidden text-xs text-muted-foreground sm:block",
						children: [
							"Week ",
							week.done,
							" done · ",
							week.open,
							" open · ",
							formatMinutes(week.spentMin),
							" logged"
						]
					}), me ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WhoMenu, {
						members,
						me,
						meIdx,
						onWhoami,
						onRename,
						onAdd
					}) : null]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-1",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						"aria-label": "Previous day",
						onClick: () => onDate(addDays(date, -1)),
						className: "flex size-11 items-center justify-center rounded-sm text-muted-foreground hover:bg-accent hover:text-foreground",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "size-4" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex min-w-0 flex-1 gap-1 overflow-x-auto",
						children: weekDays.map((d) => {
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => onDate(d),
								className: cn("flex min-w-11 flex-1 flex-col items-center rounded-sm px-2 py-1.5 text-xs transition-colors duration-150", d === date ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-accent hover:text-foreground"),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "uppercase",
									children: formatDayShort(d)
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "tabular text-sm font-medium",
									children: formatDayNum(d)
								})]
							}, d);
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						"aria-label": "Next day",
						onClick: () => onDate(addDays(date, 1)),
						className: "flex size-11 items-center justify-center rounded-sm text-muted-foreground hover:bg-accent hover:text-foreground",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "size-4" })
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-sm text-muted-foreground",
				children: [formatDayLabel(date), isToday ? " · today" : ""]
			})
		]
	});
}
function Mark() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: "0 0 32 32",
		className: "size-9 shrink-0",
		"aria-hidden": "true",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				width: "32",
				height: "32",
				rx: "6",
				className: "fill-primary"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: "8",
				y: "10",
				width: "6",
				height: "14",
				rx: "1.5",
				className: "fill-primary-foreground"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: "18",
				y: "10",
				width: "6",
				height: "14",
				rx: "1.5",
				className: "fill-primary-foreground/70"
			})
		]
	});
}
function WhoMenu({ members, me, meIdx, onWhoami, onRename, onAdd }) {
	const [adding, setAdding] = (0, import_react.useState)(false);
	const [name, setName] = (0, import_react.useState)("");
	const [renaming, setRenaming] = (0, import_react.useState)(false);
	const [renameTo, setRenameTo] = (0, import_react.useState)(me.name);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenu, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuTrigger, {
			asChild: true,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				variant: "outline",
				size: "sm",
				className: "gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: cn("flex size-5 items-center justify-center rounded-xs text-xs font-medium text-primary-foreground", seatColor(meIdx)),
						children: initials(me.name)
					}),
					"I am ",
					me.name
				]
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuContent, {
			align: "end",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuLabel, { children: "This browser is" }),
				members.map((m, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
					onSelect: () => onWhoami(m.id),
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: cn("flex size-5 items-center justify-center rounded-xs text-xs font-medium text-primary-foreground", seatColor(i)),
							children: initials(m.name)
						}),
						m.name,
						m.id === me.id ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "ml-auto text-xs text-muted-foreground",
							children: "you"
						}) : null
					]
				}, m.id)),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuSeparator, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
					onSelect: () => {
						setRenameTo(me.name);
						setRenaming(true);
					},
					children: ["Rename ", me.name]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
					onSelect: () => {
						setName("");
						setAdding(true);
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-3.5" }), "Add partner"]
				})
			]
		})] }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
			open: adding,
			onOpenChange: setAdding,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
				title: "Add a partner",
				description: "They pick this seat from I am on their browser.",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					value: name,
					onChange: (e) => setName(e.target.value),
					placeholder: "First name",
					maxLength: 24,
					autoFocus: true
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-3 flex justify-end gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "ghost",
						size: "sm",
						onClick: () => setAdding(false),
						children: "Cancel"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						size: "sm",
						disabled: !name.trim(),
						onClick: async () => {
							const id = await onAdd(name.trim());
							if (id) onWhoami(id);
							setAdding(false);
						},
						children: "Add"
					})]
				})]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
			open: renaming,
			onOpenChange: setRenaming,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
				title: "Rename",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					value: renameTo,
					onChange: (e) => setRenameTo(e.target.value),
					maxLength: 24,
					autoFocus: true
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-3 flex justify-end gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "ghost",
						size: "sm",
						onClick: () => setRenaming(false),
						children: "Cancel"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						size: "sm",
						disabled: !renameTo.trim(),
						onClick: () => {
							onRename(me.id, renameTo.trim());
							setRenaming(false);
						},
						children: "Save"
					})]
				})]
			})
		})
	] });
}
var KIND_LABEL = {
	checkin: "Started",
	checkout: "Done",
	break: "Break",
	nudge: "Nudge",
	honesty: "Honest",
	goal: "Goal"
};
function ActivityLog({ events, members }) {
	const names = new Map(members.map((m) => [m.id, m.name]));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
		className: "rounded-lg bg-sheet p-3 shadow-[var(--shadow-border)]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "text-xs font-medium tracking-wide text-muted-foreground uppercase",
			children: "Today’s log"
		}), events.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-4 text-sm text-muted-foreground",
			children: "Check-ins, nudges, and slips show up here."
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
			className: "mt-3 space-y-3",
			children: events.map((event) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
				className: "grid grid-cols-[3.5rem_1fr] gap-2 text-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("time", {
					className: "tabular text-xs leading-5 text-muted-foreground",
					children: formatTime(event.createdAt)
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-baseline gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: cn("text-xs font-medium", event.kind === "honesty" && "text-warn", event.kind === "nudge" && "text-seat-a", event.kind === "checkin" && "text-doing"),
						children: KIND_LABEL[event.kind]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "truncate text-xs text-muted-foreground",
						children: event.memberId ? names.get(event.memberId) : ""
					})]
				}), event.body ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-0.5 text-sm text-foreground/90",
					children: event.body
				}) : null] })]
			}, event.id))
		})]
	});
}
function Textarea({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
		className: cn("flex min-h-24 w-full rounded-sm bg-secondary px-3 py-2 text-sm text-foreground shadow-[var(--shadow-border)]", "placeholder:text-muted-foreground/70", "transition-[box-shadow] duration-150 ease-out", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/70", "disabled:opacity-40", className),
		...props
	});
}
function useNow(enabled, intervalMs = 1e3) {
	const [now, setNow] = (0, import_react.useState)(() => Date.now());
	(0, import_react.useEffect)(() => {
		if (!enabled) return;
		const id = window.setInterval(() => setNow(Date.now()), intervalMs);
		return () => window.clearInterval(id);
	}, [enabled, intervalMs]);
	return now;
}
function PresenceStrip({ members, whoami, date, onStatus, onGoal, onNudge }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "grid gap-2 md:grid-cols-2",
		children: members.map((member, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PresenceCard, {
			member,
			index: i,
			mine: member.id === whoami,
			whoami,
			date,
			onStatus,
			onGoal,
			onNudge
		}, member.id))
	});
}
function PresenceCard({ member, index, mine, whoami, onStatus, onGoal, onNudge }) {
	const live = member.status === "studying" && Boolean(member.sessionStartedAt);
	const now = useNow(live);
	const elapsed = live && member.sessionStartedAt ? now - new Date(member.sessionStartedAt).getTime() : 0;
	const liveMin = Math.floor(elapsed / 6e4);
	const totalMin = member.todaySpentMin + (live ? liveMin : 0);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: cn("rounded-md bg-secondary p-3 shadow-[var(--shadow-border)]", mine && "ring-1 ring-foreground/25"),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-start gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: cn("mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-sm text-xs font-medium text-primary-foreground", seatColor(index)),
				children: initials(member.name)
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "min-w-0 flex-1",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-baseline justify-between gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex min-w-0 items-baseline gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "truncate text-sm font-medium",
								children: member.name
							}), mine ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs text-muted-foreground",
								children: "you"
							}) : null]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusChip, {
							status: member.status,
							live,
							elapsed
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-0.5 text-xs text-muted-foreground tabular",
						children: ["Today ", formatMinutes(totalMin)]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GoalLine, {
						value: member.sessionGoal,
						editable: mine,
						onCommit: (goal) => onGoal(member.id, goal)
					})
				]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-3 flex flex-wrap gap-2",
			children: mine ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					size: "sm",
					variant: member.status === "studying" ? "secondary" : "default",
					onClick: () => onStatus(member.id, "studying"),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, { className: "size-3.5" }), "Start"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					size: "sm",
					variant: "outline",
					onClick: () => onStatus(member.id, "break"),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Coffee, { className: "size-3.5" }), "Break"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					size: "sm",
					variant: "ghost",
					onClick: () => onStatus(member.id, "done"),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { className: "size-3.5" }), "Done"]
				})
			] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NudgeButton, {
				fromId: whoami,
				toName: member.name,
				toId: member.id,
				onNudge
			})
		})]
	});
}
function StatusChip({ status, live, elapsed }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: cn("inline-flex items-center gap-1.5 text-xs font-medium", status === "studying" && "text-doing", status === "break" && "text-warn", status === "done" && "text-muted-foreground", status === "idle" && "text-muted-foreground"),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: cn("size-1.5 rounded-full", status === "studying" && "bg-doing", status === "break" && "bg-warn", status === "done" && "bg-muted-foreground/50", status === "idle" && "bg-muted-foreground/40", live && "animate-pulse") }), live ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "tabular",
			children: formatElapsed(elapsed)
		}) : statusLabel(status)]
	});
}
function GoalLine({ value, editable, onCommit }) {
	const [draft, setDraft] = (0, import_react.useState)(value);
	(0, import_react.useEffect)(() => setDraft(value), [value]);
	if (!editable) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "mt-2 line-clamp-2 text-sm text-foreground/90",
		children: value || /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-muted-foreground",
			children: "No goal yet."
		})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
		value: draft,
		onChange: (e) => setDraft(e.target.value),
		onBlur: () => {
			if (draft !== value) onCommit(draft);
		},
		onKeyDown: (e) => {
			if (e.key === "Enter") e.currentTarget.blur();
		},
		placeholder: "Today’s one line — what are you actually doing?",
		className: "mt-2 h-8 w-full rounded-xs bg-transparent text-sm outline-none placeholder:text-muted-foreground/60 hover:bg-accent/50 focus:bg-background focus:px-1.5 focus:shadow-[0_0_0_1px_var(--color-ring)]"
	});
}
function NudgeButton({ fromId, toId, toName, onNudge }) {
	const [open, setOpen] = (0, import_react.useState)(false);
	const [body, setBody] = (0, import_react.useState)("");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Dialog, {
		open,
		onOpenChange: setOpen,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTrigger, {
			asChild: true,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				size: "sm",
				variant: "outline",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Send, { className: "size-3.5" }),
					"Nudge ",
					toName
				]
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			title: `Nudge ${toName}`,
			description: "Short, specific, not a lecture. They’ll see it in the log.",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
				value: body,
				onChange: (e) => setBody(e.target.value),
				placeholder: "You said you’d start at 9.",
				maxLength: 200
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-3 flex justify-end gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "ghost",
					size: "sm",
					onClick: () => setOpen(false),
					children: "Cancel"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					size: "sm",
					onClick: async () => {
						await onNudge(fromId, toId, body.trim() || void 0);
						toast(`Nudge sent to ${toName}`);
						setBody("");
						setOpen(false);
					},
					children: "Send"
				})]
			})]
		})]
	});
}
function HonestyButton({ onSubmit }) {
	const [open, setOpen] = (0, import_react.useState)(false);
	const [body, setBody] = (0, import_react.useState)("");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Dialog, {
		open,
		onOpenChange: setOpen,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTrigger, {
			asChild: true,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				size: "sm",
				variant: "ghost",
				children: "Log a slip"
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			title: "Be honest",
			description: "One sentence. No performance. This is the point of a study partner.",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
				value: body,
				onChange: (e) => setBody(e.target.value),
				placeholder: "Scrolled for 20 minutes. Back now.",
				maxLength: 280
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-3 flex justify-end gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "ghost",
					size: "sm",
					onClick: () => setOpen(false),
					children: "Cancel"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					size: "sm",
					disabled: !body.trim(),
					onClick: async () => {
						await onSubmit(body.trim());
						toast("Logged.");
						setBody("");
						setOpen(false);
					},
					children: "Log it"
				})]
			})]
		})]
	});
}
function CellInput({ value, placeholder, className, align = "left", onCommit, onEmptyDelete }) {
	const [draft, setDraft] = (0, import_react.useState)(value);
	const ref = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		setDraft(value);
	}, [value]);
	const commit = () => {
		const next = draft;
		if (next === value) return;
		if (!next.trim() && onEmptyDelete && !value.trim()) {
			onEmptyDelete();
			return;
		}
		onCommit(next);
	};
	const onKeyDown = (e) => {
		if (e.key === "Enter") {
			e.preventDefault();
			ref.current?.blur();
		}
		if (e.key === "Escape") {
			setDraft(value);
			ref.current?.blur();
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
		ref,
		value: draft,
		placeholder,
		onChange: (e) => setDraft(e.target.value),
		onBlur: commit,
		onKeyDown,
		className: cn("h-8 w-full min-w-0 bg-transparent px-1.5 text-sm text-foreground outline-none", "placeholder:text-muted-foreground/50", "rounded-xs transition-[background-color,box-shadow] duration-150", "hover:bg-accent/60 focus:bg-background focus:shadow-[0_0_0_1px_var(--color-ring)]", align === "right" && "text-right", align === "center" && "text-center", className)
	});
}
var STATUSES = [
	"todo",
	"doing",
	"done",
	"parked"
];
function TaskSheet({ tasks, members, whoami, onCreate, onUpdate, onDelete }) {
	const [filter, setFilter] = (0, import_react.useState)("open");
	const [expanded, setExpanded] = (0, import_react.useState)(null);
	const ownerIndex = (0, import_react.useMemo)(() => {
		const map = /* @__PURE__ */ new Map();
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
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-lg bg-sheet shadow-[var(--shadow-border)]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-wrap items-center justify-between gap-2 px-3 py-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex gap-1",
				children: [
					["open", "Open"],
					["mine", "Mine"],
					["all", "All"]
				].map(([id, label]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => setFilter(id),
					className: cn("h-9 rounded-sm px-3 text-sm transition-colors duration-150", filter === id ? "bg-accent text-foreground" : "text-muted-foreground hover:text-foreground"),
					children: label
				}, id))
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				size: "sm",
				variant: "outline",
				onClick: onCreate,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-3.5" }), "Add task"]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "overflow-x-auto",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
				className: "w-full min-w-[52rem] border-separate border-spacing-0 text-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
					className: "text-left text-xs text-muted-foreground",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { className: "w-8 border-y border-border px-1 py-2 font-medium" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "w-24 border-y border-border px-1 py-2 font-medium",
							children: "Status"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "border-y border-border px-1 py-2 font-medium",
							children: "Task"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "w-28 border-y border-border px-1 py-2 font-medium",
							children: "Course"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "w-20 border-y border-border px-1 py-2 font-medium",
							children: "Who"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "w-12 border-y border-border px-1 py-2 font-medium",
							children: "Pri"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "w-16 border-y border-border px-1 py-2 text-right font-medium",
							children: "Est"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "w-16 border-y border-border px-1 py-2 text-right font-medium",
							children: "Spent"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "w-20 border-y border-border px-1 py-2 font-medium",
							children: "Progress"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "w-28 border-y border-border px-1 py-2 font-medium",
							children: "Due"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { className: "w-10 border-y border-border px-1 py-2 font-medium" })
					]
				}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tbody", { children: [
					dated.map((task) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TaskRows, {
						task,
						members,
						ownerIndex,
						expanded: expanded === task.id,
						onToggle: () => setExpanded(expanded === task.id ? null : task.id),
						onUpdate,
						onDelete
					}, task.id)),
					backlog.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						colSpan: 11,
						className: "bg-muted/40 px-3 py-1.5 text-xs tracking-wide text-muted-foreground uppercase",
						children: "Backlog"
					}) }) : null,
					backlog.map((task) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TaskRows, {
						task,
						members,
						ownerIndex,
						expanded: expanded === task.id,
						onToggle: () => setExpanded(expanded === task.id ? null : task.id),
						onUpdate,
						onDelete
					}, task.id)),
					visible.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						colSpan: 11,
						className: "px-3 py-10 text-center text-sm text-muted-foreground",
						children: "Nothing here. Add a task, or switch the filter."
					}) }) : null
				] })]
			})
		})]
	});
}
function TaskRows({ task, members, ownerIndex, expanded, onToggle, onUpdate, onDelete }) {
	const owner = members.find((m) => m.id === task.ownerId);
	const idx = task.ownerId ? ownerIndex.get(task.ownerId) ?? 0 : 0;
	const muted = task.status === "done" || task.status === "parked";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
		className: cn("group border-b border-border", muted && "opacity-60", task.status === "done" && "text-muted-foreground"),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
				className: "border-b border-border px-1 py-0.5",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: onToggle,
					"aria-label": expanded ? "Hide details" : "Show details",
					className: "flex size-8 items-center justify-center rounded-xs text-muted-foreground hover:bg-accent hover:text-foreground",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: cn("size-4 transition-transform duration-150", expanded && "rotate-180") })
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
				className: "border-b border-border px-1 py-0.5",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusSelect, {
					value: task.status,
					onChange: (status) => onUpdate(task.id, { status })
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
				className: "border-b border-border px-1 py-0.5",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CellInput, {
					value: task.title,
					placeholder: "What are you doing",
					className: cn(task.status === "done" && "line-through"),
					onCommit: (title) => onUpdate(task.id, { title })
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
				className: "border-b border-border px-1 py-0.5",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CellInput, {
					value: task.course,
					placeholder: "Course",
					onCommit: (course) => onUpdate(task.id, { course })
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
				className: "border-b border-border px-1 py-0.5",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OwnerSelect, {
					members,
					value: task.ownerId,
					onChange: (ownerId) => onUpdate(task.id, { ownerId }),
					owner,
					idx
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
				className: "border-b border-border px-1 py-0.5",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PriorityToggle, {
					value: task.priority,
					onChange: (priority) => onUpdate(task.id, { priority })
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
				className: "border-b border-border px-1 py-0.5",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CellInput, {
					value: task.estMin == null ? "" : formatMinutes(task.estMin),
					placeholder: "—",
					align: "right",
					className: "tabular",
					onCommit: (raw) => onUpdate(task.id, { estMin: parseMinutes(raw) })
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
				className: "border-b border-border px-1 py-0.5",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CellInput, {
					value: task.spentMin ? formatMinutes(task.spentMin) : "",
					placeholder: "0m",
					align: "right",
					className: "tabular",
					onCommit: (raw) => {
						const n = parseMinutes(raw);
						onUpdate(task.id, { spentMin: n ?? 0 });
					}
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
				className: "border-b border-border px-1 py-0.5",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProgressCell, {
					value: task.progress,
					onChange: (progress) => onUpdate(task.id, { progress })
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
				className: "border-b border-border px-1 py-0.5",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					type: "date",
					value: task.dueDate ?? "",
					onChange: (e) => onUpdate(task.id, { dueDate: e.target.value || null }),
					className: "h-8 w-full bg-transparent px-1 text-sm text-foreground outline-none [color-scheme:dark] hover:bg-accent/60 focus:bg-background focus:shadow-[0_0_0_1px_var(--color-ring)]"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
				className: "border-b border-border px-1 py-0.5",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => onDelete(task.id),
					"aria-label": "Delete task",
					className: "flex size-8 items-center justify-center rounded-xs text-muted-foreground opacity-0 hover:bg-accent hover:text-destructive group-hover:opacity-100",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-3.5" })
				})
			})
		]
	}), expanded ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
		colSpan: 11,
		className: "border-b border-border bg-muted/30 px-3 py-3",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-3 md:grid-cols-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "block",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "mb-1 block text-xs text-muted-foreground",
					children: "Notes"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
					defaultValue: task.notes,
					placeholder: "One useful constraint. Not a diary.",
					className: "min-h-20",
					onBlur: (e) => {
						if (e.target.value !== task.notes) onUpdate(task.id, { notes: e.target.value });
					}
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "block",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "mb-1 block text-xs text-muted-foreground",
					children: "Honesty"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
					defaultValue: task.honesty,
					placeholder: "Did you actually work this, or park it and pretend?",
					className: "min-h-20",
					onBlur: (e) => {
						if (e.target.value !== task.honesty) onUpdate(task.id, { honesty: e.target.value });
					}
				})]
			})]
		})
	}) }) : null] });
}
function StatusSelect({ value, onChange }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenu, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuTrigger, {
		asChild: true,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			className: cn("h-8 rounded-xs px-2 text-left text-xs font-medium", "hover:bg-accent", value === "doing" && "text-doing", value === "done" && "text-muted-foreground", value === "parked" && "text-warn"),
			children: taskStatusLabel(value)
		})
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuContent, { children: STATUSES.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuItem, {
		onSelect: () => onChange(s),
		children: taskStatusLabel(s)
	}, s)) })] });
}
function OwnerSelect({ members, value, onChange, owner, idx }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenu, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuTrigger, {
		asChild: true,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			className: "flex h-8 items-center gap-1.5 rounded-xs px-1 hover:bg-accent",
			children: owner ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: cn("flex size-5 items-center justify-center rounded-xs text-xs font-medium text-primary-foreground", seatColor(idx)),
				children: initials(owner.name)
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "truncate text-xs",
				children: owner.name
			})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-xs text-muted-foreground",
				children: "—"
			})
		})
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuItem, {
		onSelect: () => onChange(null),
		children: "Unassigned"
	}), members.map((m, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
		onSelect: () => onChange(m.id),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: cn("flex size-5 items-center justify-center rounded-xs text-xs font-medium text-primary-foreground", seatColor(i)),
			children: initials(m.name)
		}), m.name]
	}, m.id))] })] });
}
function PriorityToggle({ value, onChange }) {
	const cycle = {
		normal: "high",
		high: "low",
		low: "normal"
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		onClick: () => onChange(cycle[value]),
		className: cn("h-8 w-full rounded-xs text-xs font-medium hover:bg-accent", value === "high" && "text-destructive", value === "low" && "text-muted-foreground", value === "normal" && "text-muted-foreground/70"),
		"aria-label": `Priority ${value}`,
		children: value === "high" ? "High" : value === "low" ? "Low" : "—"
	});
}
function ProgressCell({ value, onChange }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center gap-1.5 px-1",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "h-1 flex-1 overflow-hidden rounded-full bg-muted",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "h-full rounded-full bg-foreground/70 transition-[width] duration-200 ease-out",
				style: { width: `${value}%` }
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CellInput, {
			value: String(value),
			align: "right",
			className: "w-9 tabular",
			onCommit: (raw) => {
				const n = Number(raw.replace("%", ""));
				if (Number.isFinite(n)) onChange(Math.min(100, Math.max(0, Math.round(n))));
			}
		})]
	});
}
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var dateSchema = string().regex(/^\d{4}-\d{2}-\d{2}$/);
var getBoard = createServerFn({ method: "GET" }).validator(object({ date: dateSchema })).handler(createSsrRpc("ea88a71a3c4c6aedc2a8929659e4f5bb2ed01f4066218d7c04638fc561f03ee0"));
var addMember = createServerFn({ method: "POST" }).validator(object({ name: string().trim().min(1).max(24) })).handler(createSsrRpc("42273f5ccc39bf3cf79294023b670b75633c25e021b30de5b1056493a20f86d6"));
var renameMember = createServerFn({ method: "POST" }).validator(object({
	id: string(),
	name: string().trim().min(1).max(24)
})).handler(createSsrRpc("a9252779416628287f1d974994da0fe83d33f457149a8f879af7d8eb1a94d4f7"));
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
})).handler(createSsrRpc("498efb21f56237d93ef95b47db531af9eacaed83110d937fd80e8f50bbbb1703"));
var setGoal = createServerFn({ method: "POST" }).validator(object({
	memberId: string(),
	date: dateSchema,
	sessionGoal: string().max(160)
})).handler(createSsrRpc("489cf1c803fd7fc40003067c0437de060542b26f4ae0c768282339e0e2e4ceec"));
var sendNudge = createServerFn({ method: "POST" }).validator(object({
	fromId: string(),
	toId: string(),
	body: string().max(200).optional()
})).handler(createSsrRpc("a7a6fe27c5e81cf1fb4ba92911f4617a44ac3eb09b9aae6c208568f06e79072e"));
var logHonesty = createServerFn({ method: "POST" }).validator(object({
	memberId: string(),
	body: string().trim().min(1).max(280),
	taskId: string().optional()
})).handler(createSsrRpc("557eab454a972a7c53b9b07569fd388ac3847f004c02be31aee522101d629934"));
var createTask = createServerFn({ method: "POST" }).validator(object({
	date: dateSchema,
	title: string().max(160).optional(),
	ownerId: string().nullable().optional()
})).handler(createSsrRpc("a1662d0d40950a22b15f969d25172d3f43ec2cc69f7602b2ec3c67218af5b1b1"));
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
})).handler(createSsrRpc("41fe4deada2855c13e9987d76d9c982b82581bd9e60ae80580deb6e26547229f"));
var deleteTask = createServerFn({ method: "POST" }).validator(object({ id: string() })).handler(createSsrRpc("7fd8c2ba54724bf4acbc23f574fc1cddfadc645902be25b28b56901ffbe44217"));
function useBoard(date) {
	const qc = useQueryClient();
	const key = ["board", date];
	const query = useQuery({
		queryKey: key,
		queryFn: () => getBoard({ data: { date } }),
		refetchInterval: 5e3,
		enabled: Boolean(date)
	});
	const invalidate = () => qc.invalidateQueries({ queryKey: key });
	const patchTasks = (updater) => {
		qc.setQueryData(key, (old) => {
			if (!old) return old;
			return {
				...old,
				tasks: updater(old.tasks)
			};
		});
	};
	return {
		query,
		presence: useMutation({
			mutationFn: setPresence,
			onSuccess: invalidate
		}),
		goal: useMutation({
			mutationFn: setGoal,
			onSuccess: invalidate
		}),
		nudge: useMutation({
			mutationFn: sendNudge,
			onSuccess: invalidate
		}),
		honesty: useMutation({
			mutationFn: logHonesty,
			onSuccess: invalidate
		}),
		rename: useMutation({
			mutationFn: renameMember,
			onSuccess: invalidate
		}),
		add: useMutation({
			mutationFn: addMember,
			onSuccess: invalidate
		}),
		create: useMutation({
			mutationFn: createTask,
			onSuccess: (task) => {
				patchTasks((tasks) => [...tasks, task]);
			}
		}),
		update: useMutation({
			mutationFn: updateTask,
			onMutate: async (vars) => {
				await qc.cancelQueries({ queryKey: key });
				const prev = qc.getQueryData(key);
				const patch = vars.data;
				patchTasks((tasks) => tasks.map((t) => {
					if (t.id !== patch.id) return t;
					const next = { ...t };
					if (patch.title !== void 0) next.title = patch.title;
					if (patch.course !== void 0) next.course = patch.course;
					if (patch.ownerId !== void 0) next.ownerId = patch.ownerId;
					if (patch.status !== void 0) {
						next.status = patch.status;
						if (patch.status === "done" && patch.progress === void 0) next.progress = 100;
						if (patch.status === "todo" && patch.progress === void 0) next.progress = 0;
					}
					if (patch.priority !== void 0) next.priority = patch.priority;
					if (patch.estMin !== void 0) next.estMin = patch.estMin;
					if (patch.spentMin !== void 0) next.spentMin = patch.spentMin;
					if (patch.progress !== void 0) next.progress = patch.progress;
					if (patch.dueDate !== void 0) next.dueDate = patch.dueDate;
					if (patch.notes !== void 0) next.notes = patch.notes;
					if (patch.honesty !== void 0) next.honesty = patch.honesty;
					return next;
				}));
				return { prev };
			},
			onError: (_err, _vars, ctx) => {
				if (ctx?.prev) qc.setQueryData(key, ctx.prev);
			},
			onSettled: invalidate
		}),
		remove: useMutation({
			mutationFn: deleteTask,
			onMutate: async (vars) => {
				await qc.cancelQueries({ queryKey: key });
				const prev = qc.getQueryData(key);
				patchTasks((tasks) => tasks.filter((t) => t.id !== vars.data.id));
				return { prev };
			},
			onError: (_err, _vars, ctx) => {
				if (ctx?.prev) qc.setQueryData(key, ctx.prev);
			},
			onSettled: invalidate
		}),
		invalidate
	};
}
var KEY = "lockin.whoami";
function readWhoami() {
	if (typeof window === "undefined") return null;
	try {
		return localStorage.getItem(KEY);
	} catch {
		return null;
	}
}
function writeWhoami(id) {
	try {
		localStorage.setItem(KEY, id);
	} catch {}
}
function Home() {
	const [date, setDate] = (0, import_react.useState)("");
	const [whoami, setWhoami] = (0, import_react.useState)("");
	const board = useBoard(date);
	const data = board.query.data;
	const members = data?.members ?? [];
	const today = date ? todayLocal() : "";
	const weekDays = (0, import_react.useMemo)(() => {
		if (!date) return [];
		const start = startOfWeek(date);
		return Array.from({ length: 7 }, (_, i) => addDays(start, i));
	}, [date]);
	(0, import_react.useEffect)(() => {
		setDate(todayLocal());
		const stored = readWhoami();
		if (stored) setWhoami(stored);
	}, []);
	(0, import_react.useEffect)(() => {
		if (members.length === 0) return;
		if (whoami && members.some((m) => m.id === whoami)) return;
		const next = members[0].id;
		setWhoami(next);
		writeWhoami(next);
	}, [members, whoami]);
	const pickSeat = (id) => {
		setWhoami(id);
		writeWhoami(id);
	};
	const setStatus = (memberId, status) => board.presence.mutateAsync({ data: {
		memberId,
		date,
		status
	} });
	const setGoal = (memberId, sessionGoal) => board.goal.mutateAsync({ data: {
		memberId,
		date,
		sessionGoal
	} });
	const nudge = (fromId, toId, body) => board.nudge.mutateAsync({ data: {
		fromId,
		toId,
		body
	} });
	const updateTask = (id, patch) => {
		board.update.mutate({ data: {
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
			honesty: patch.honesty
		} });
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto min-h-dvh w-full max-w-6xl px-4 py-6 sm:px-6 sm:py-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DeskHeader, {
				date,
				weekDays,
				isToday: date === today,
				members,
				whoami,
				week: data?.week ?? {
					done: 0,
					open: 0,
					spentMin: 0,
					estMin: 0
				},
				onDate: setDate,
				onWhoami: pickSeat,
				onRename: (id, name) => board.rename.mutate({ data: {
					id,
					name
				} }),
				onAdd: async (name) => {
					return (await board.add.mutateAsync({ data: { name } })).id;
				}
			}),
			board.query.isError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-8 text-sm text-destructive",
				children: "Couldn’t load the desk. Refresh and try again."
			}) : null,
			!date || board.query.isPending && !data ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoadingDesk, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6 space-y-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PresenceStrip, {
						members,
						whoami,
						date,
						onStatus: setStatus,
						onGoal: setGoal,
						onNudge: nudge
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-center justify-between gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted-foreground",
							children: "One line per task. Open the chevron only if you need notes."
						}), whoami ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HonestyButton, { onSubmit: (body) => board.honesty.mutateAsync({ data: {
							memberId: whoami,
							body
						} }) }) : null]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid items-start gap-4 lg:grid-cols-[minmax(0,1fr)_18rem]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TaskSheet, {
							tasks: data?.tasks ?? [],
							members,
							whoami,
							onCreate: () => board.create.mutate({ data: {
								date,
								ownerId: whoami || null,
								title: ""
							} }),
							onUpdate: updateTask,
							onDelete: (id) => board.remove.mutate({ data: { id } })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ActivityLog, {
							events: data?.events ?? [],
							members
						})]
					})
				]
			})
		]
	});
}
function LoadingDesk() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mt-6 space-y-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-2 md:grid-cols-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-36 animate-pulse rounded-md bg-secondary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-36 animate-pulse rounded-md bg-secondary" })]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-80 animate-pulse rounded-lg bg-sheet" })]
	});
}
//#endregion
export { Home as component };

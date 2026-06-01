import {
    FaRegCalendar,
    FaRegClock,
    FaHourglassHalf,
    FaBolt,
    FaLock,
    FaPenToSquare,
    FaBoxArchive,
    FaTrashCan,
    FaBoxOpen,
} from "react-icons/fa6";

export default function TaskCard({
    task,
    onToggle,
    onArchive,
    onRestore,
    onDelete,
    onEdit,
}) {
    const isArchived = task.status === "archived";
    const tagLabel =
        task.category === "Development"
            ? task.sprint
                ? `Sprint ${task.sprint.split("-")[1]}`
                : "Work"
            : "Routine";

    return (
        <div
            className={`bg-white p-3.5 border-l-[3px] border border-slate-200 rounded-sm shadow-sm flex items-start space-x-3 transition-all hover:border-slate-300 hover:shadow ${task.completed && !isArchived ? "opacity-60" : ""} ${isArchived ? "opacity-80 bg-slate-50" : ""}`}
            style={{ borderLeftColor: task.completed ? "#cbd5e1" : task.color }}
        >
            {/* checkbox / lock icon */}
            <div className="pt-0.5 shrink-0">
                {isArchived ? (
                    <FaLock className="text-slate-300 mt-1" />
                ) : (
                    <input
                        type="checkbox"
                        checked={task.completed}
                        onChange={() => onToggle(task._id)}
                        className="w-4 h-4 accent-slate-600 cursor-pointer rounded-sm mt-0.5"
                    />
                )}
            </div>

            {/* task details */}
            <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start gap-2">
                    <h3
                        className={`text-sm font-semibold text-slate-800 truncate ${task.completed && !isArchived ? "line-through text-slate-400" : ""}`}
                    >
                        {task.title}
                    </h3>
                    <span
                        className="text-[10px] px-2 py-0.5 rounded-sm uppercase tracking-wider font-semibold border shrink-0"
                        style={{
                            backgroundColor: `${task.color}10`,
                            borderColor: `${task.color}20`,
                            color: task.color,
                        }}
                    >
                        {tagLabel}
                    </span>
                </div>

                {task.desc && (
                    <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed break-all">
                        {task.desc}
                    </p>
                )}

                <div className="mt-2.5 flex flex-wrap items-center gap-x-3 gap-y-2 text-[11px] text-slate-500 font-medium">
                    <span className="flex items-center gap-1.5 bg-slate-50 px-2 py-1 rounded-sm border border-slate-100">
                        <FaRegCalendar className="text-slate-400" /> {task.date}
                    </span>
                    <span className="flex items-center gap-1.5 bg-slate-50 px-2 py-1 rounded-sm border border-slate-100">
                        <FaRegClock className="text-slate-400" /> {task.time}
                    </span>
                    {task.duration && (
                        <span className="flex items-center gap-1.5">
                            <FaHourglassHalf /> {task.duration}h
                        </span>
                    )}
                    <span className="flex items-center gap-1.5">
                        <FaBolt
                            style={{
                                color:
                                    task.energy > 3
                                        ? "#ef4444"
                                        : task.energy > 1
                                          ? "#eab308"
                                          : "#84cc16",
                            }}
                        />
                        {task.energy}/5
                    </span>
                </div>
            </div>

            {/* action btns */}
            <div className="flex flex-col sm:flex-row gap-2 shrink-0 pt-0.5">
                {isArchived ? (
                    <button
                        onClick={() => onRestore(task._id)}
                        className="text-slate-500 hover:text-slate-800 px-3 py-1 text-xs border border-slate-200 rounded-sm bg-white shadow-sm hover:border-slate-300 transition-colors whitespace-nowrap flex items-center"
                    >
                        <FaBoxOpen className="mr-1.5" /> Restore
                    </button>
                ) : (
                    <>
                        <button
                            onClick={onEdit}
                            className="text-slate-400 hover:text-slate-700 bg-slate-50 hover:bg-slate-100 p-1.5 rounded-sm border border-transparent hover:border-slate-200 transition-colors"
                            title="Edit coming soon"
                        >
                            <FaPenToSquare />
                        </button>
                        <button
                            onClick={() => onArchive(task._id)}
                            className="text-slate-400 hover:text-slate-700 bg-slate-50 hover:bg-slate-100 p-1.5 rounded-sm border border-transparent hover:border-slate-200 transition-colors"
                        >
                            <FaBoxArchive />
                        </button>
                        <button
                            onClick={() => onDelete(task._id)}
                            className="text-slate-400 hover:text-red-500 bg-slate-50 hover:bg-red-50 p-1.5 rounded-sm border border-transparent hover:border-red-100 transition-colors"
                        >
                            <FaTrashCan />
                        </button>
                    </>
                )}
            </div>
        </div>
    );
}

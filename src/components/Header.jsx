import { useContext } from "react";
import { FaLayerGroup, FaCheckDouble } from "react-icons/fa6";
import { TaskContext } from "../contexts/TaskContext";

export default function Header() {
    const { tasks } = useContext(TaskContext);

    const activeCount = tasks.filter(
        (t) => t.status === "active" && !t.completed,
    ).length;
    const completedCount = tasks.filter(
        (t) => t.status === "active" && t.completed,
    ).length;

    return (
        <header className="shrink-0 flex justify-between items-end border-b border-slate-300 pb-3">
            <div>
                <h1 className="text-2xl font-bold text-slate-800 flex items-center">
                    <FaLayerGroup className="text-slate-400 mr-2 text-xl" />
                    Balance Tracker
                </h1>
                <em className="text-sm text-slate-500 mt-1 hidden sm:block">
                    Sync your professional works and personal well-being.
                </em>
            </div>
            <div className="text-right text-xs text-slate-500">
                <span className="inline-flex items-center font-medium text-slate-700 bg-white px-3 py-1.5 rounded-sm border border-slate-200 shadow-sm">
                    <FaCheckDouble className="text-slate-400 mr-1.5 text-[14px]" />
                    Active: {activeCount} | Done: {completedCount}
                </span>
            </div>
        </header>
    );
}

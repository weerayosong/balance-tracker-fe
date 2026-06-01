import { useState, useContext } from "react";
import {
    FaMagnifyingGlass,
    FaClipboardCheck,
    FaBoxOpen,
} from "react-icons/fa6";
import { TaskContext } from "../contexts/TaskContext";
import TaskCard from "./TaskCard";

export default function TaskBoard() {
    const {
        tasks,
        toggleTask,
        archiveTask,
        deleteTask,
        restoreTask,
        setEditingTask,
    } = useContext(TaskContext);

    // local state for filter
    const [currentTab, setCurrentTab] = useState("Active");
    const [searchQuery, setSearchQuery] = useState("");
    const [categoryFilter, setCategoryFilter] = useState("All");

    // filter logic
    const filteredTasks = tasks.filter((task) => {
        const matchSearch =
            task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (task.desc &&
                task.desc.toLowerCase().includes(searchQuery.toLowerCase()));
        const matchCategory =
            categoryFilter === "All" || task.category === categoryFilter;
        const matchView = task.status === currentTab.toLowerCase();

        return matchSearch && matchCategory && matchView;
    });

    return (
        <div className="flex flex-col bg-white border border-slate-200 rounded-sm shadow-sm h-full w-full">
            {/* filter & tabs */}
            <div className="p-3 border-b border-slate-200 bg-slate-50 shrink-0 space-y-2 rounded-t-sm">
                <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-3">
                    {/* tabs */}
                    <div className="flex bg-slate-200 p-1 rounded-sm w-full xl:w-auto shrink-0">
                        <button
                            onClick={() => setCurrentTab("Active")}
                            className={`flex-1 xl:flex-none px-6 py-1 text-sm font-medium rounded-sm transition-all ${currentTab === "Active" ? "bg-white shadow-sm text-slate-800" : "text-slate-500 hover:text-slate-700 hover:bg-slate-300"}`}
                        >
                            Active Board
                        </button>
                        <button
                            onClick={() => setCurrentTab("Archived")}
                            className={`flex-1 xl:flex-none px-6 py-1 text-sm font-medium rounded-sm transition-all ${currentTab === "Archived" ? "bg-white shadow-sm text-slate-800" : "text-slate-500 hover:text-slate-700 hover:bg-slate-300"}`}
                        >
                            Archived (History)
                        </button>
                    </div>

                    {/* search & cat */}
                    <div className="flex flex-col sm:flex-row gap-2 w-full xl:w-auto">
                        <div className="relative flex-1 sm:w-64">
                            <FaMagnifyingGlass className="absolute left-3 top-2.5 text-slate-400 text-xs" />
                            <input
                                type="search"
                                placeholder="Search..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full border border-slate-300 rounded-sm pl-8 pr-3 py-1 text-sm focus:outline-none focus:border-slate-500 bg-white"
                            />
                        </div>
                        <select
                            value={categoryFilter}
                            onChange={(e) => setCategoryFilter(e.target.value)}
                            className="border border-slate-300 rounded-sm px-3 py-1 text-sm focus:outline-none focus:border-slate-500 bg-white text-slate-700 w-full sm:w-auto shrink-0"
                        >
                            <option value="All">All Categories</option>
                            <option value="Development">Work / Dev</option>
                            <option value="Health & Routine">
                                Life / Routine
                            </option>
                        </select>
                    </div>
                </div>
            </div>

            {/* .map */}
            <div className="flex-1 overflow-y-auto custom-scrollbar p-3 space-y-3 bg-slate-50/50">
                {filteredTasks.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-slate-400 p-6 border-2 border-dashed border-slate-200 rounded-sm bg-white/50">
                        {currentTab === "Active" ? (
                            <FaClipboardCheck className="text-4xl mb-3 text-slate-300" />
                        ) : (
                            <FaBoxOpen className="text-4xl mb-3 text-slate-300" />
                        )}
                        <p className="text-sm font-medium text-slate-500">
                            {currentTab === "Active"
                                ? "All caught up!"
                                : "Archive is empty."}
                        </p>
                    </div>
                ) : (
                    filteredTasks.map((task) => (
                        <TaskCard
                            key={task._id}
                            task={task}
                            onToggle={toggleTask}
                            onArchive={archiveTask}
                            onRestore={restoreTask}
                            onDelete={deleteTask}
                            onEdit={() => setEditingTask(task)}
                        />
                    ))
                )}
            </div>
        </div>
    );
}

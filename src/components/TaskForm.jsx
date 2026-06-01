/* eslint-disable */
import { useState, useContext, useEffect } from "react";
import { FaPlus, FaPlay, FaXmark } from "react-icons/fa6";
import { TaskContext } from "../contexts/TaskContext";

export default function TaskForm() {
    const { addTask, editingTask, editTask, setEditingTask } =
        useContext(TaskContext);

    const initialFormState = {
        title: "",
        desc: "",
        category: "Development",
        sprint: "",
        date: new Date().toISOString().split("T")[0],
        time: "09:00",
        duration: "",
        energy: 3,
        url: "",
        color: "#334155",
    };

    const [formData, setFormData] = useState(initialFormState);

    useEffect(() => {
        if (editingTask) {
            setFormData({
                title: editingTask.title || "",
                desc: editingTask.desc || "",
                category: editingTask.category || "Development",
                sprint: editingTask.sprint || "",
                date:
                    editingTask.date || new Date().toISOString().split("T")[0],
                time: editingTask.time || "09:00",
                duration: editingTask.duration || "",
                energy: editingTask.energy || 3,
                url: editingTask.url || "",
                color: editingTask.color || "#334155",
                priority: editingTask.priority || "normal",
            });
        } else {
            setFormData(initialFormState);
        }
    }, [editingTask]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editingTask) {
            editTask(editingTask._id, formData);
        } else {
            addTask(formData);
            setFormData(initialFormState);
        }
    };

    const handleCancelEdit = () => {
        setEditingTask(null);
    };

    const titleLength = formData.title.length;
    const descLength = formData.desc.length;

    return (
        <div
            className={`flex flex-col bg-white border ${editingTask ? "border-sky-300 shadow-sky-100" : "border-slate-200"} rounded-sm shadow-sm h-full relative transition-colors duration-300`}
        >
            <form
                onSubmit={handleSubmit}
                className="flex flex-col h-full min-h-0"
            >
                <div
                    className={`p-3 border-b border-slate-100 flex justify-between items-center rounded-t-sm shrink-0 ${editingTask ? "bg-sky-50" : "bg-slate-50 lg:bg-white"}`}
                >
                    <span
                        className={`font-semibold flex items-center ${editingTask ? "text-sky-700" : "text-slate-700"}`}
                    >
                        <FaPlus
                            className={`${editingTask ? "text-sky-500" : "text-slate-400"} mr-2 ${editingTask ? "rotate-45" : ""} transition-transform`}
                        />
                        {editingTask ? "Edit Task" : "Create New Task"}
                    </span>

                    <div className="flex gap-2">
                        {/* ปุ่ม Cancel จะโผล่มาเฉพาะตอนแก้ไข */}
                        {editingTask && (
                            <button
                                type="button"
                                onClick={handleCancelEdit}
                                className="flex items-center gap-1 text-slate-500 hover:text-slate-700 px-3 py-1.5 rounded-sm text-xs font-medium hover:bg-slate-200 transition-colors"
                            >
                                <FaXmark /> Cancel
                            </button>
                        )}

                        <button
                            type="submit"
                            className={`flex items-center gap-1.5 text-white px-4 py-1.5 rounded-sm text-xs font-medium transition-colors shadow-sm ${editingTask ? "bg-sky-600 hover:bg-sky-700" : "bg-slate-800 hover:bg-slate-700"}`}
                        >
                            <FaPlay />
                            {editingTask ? "Update Task" : "Save Task"}
                        </button>
                    </div>
                </div>

                <div className="overflow-y-auto custom-scrollbar flex-1 px-4 py-1">
                    <div className="space-y-3">
                        {/* title */}
                        <div>
                            <div className="flex justify-between items-end mb-1">
                                <label className="block text-xs font-medium text-slate-600">
                                    Task Title{" "}
                                    <span className="text-red-500">*</span>
                                </label>
                                <span
                                    className={`text-[10px] ${titleLength >= 64 ? "text-red-500 font-bold" : "text-slate-400"}`}
                                >
                                    {titleLength}/64
                                </span>
                            </div>
                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                required
                                maxLength={64}
                                placeholder="e.g., UI Design or Sushi Dinner"
                                className="w-full border border-slate-300 rounded-sm px-3 py-1.5 text-sm focus:outline-none focus:border-slate-500 focus:ring-1 focus:ring-slate-500"
                            />
                        </div>

                        {/* description */}
                        <div>
                            <div className="flex justify-between items-end mb-1">
                                <label className="block text-xs font-medium text-slate-600">
                                    Description
                                </label>
                                <span
                                    className={`text-[10px] ${descLength >= 256 ? "text-red-500 font-bold" : "text-slate-400"}`}
                                >
                                    {descLength}/256
                                </span>
                            </div>
                            <textarea
                                name="desc"
                                value={formData.desc}
                                onChange={handleChange}
                                rows="2"
                                maxLength={256}
                                placeholder="Add notes or acceptance criteria..."
                                className="w-full border border-slate-300 rounded-sm px-3 py-1.5 text-sm focus:outline-none focus:border-slate-500 focus:ring-1 focus:ring-slate-500 resize-none"
                            ></textarea>
                        </div>

                        {/* category&sprint */}
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-xs font-medium text-slate-600 mb-1">
                                    Category{" "}
                                    <span className="text-red-500">*</span>
                                </label>
                                <select
                                    name="category"
                                    value={formData.category}
                                    onChange={handleChange}
                                    className="w-full border border-slate-300 rounded-sm px-3 py-1.5 text-sm focus:outline-none focus:border-slate-500 focus:ring-1 focus:ring-slate-500 text-slate-700"
                                >
                                    <option value="Development">
                                        Work / Dev
                                    </option>
                                    <option value="Health & Routine">
                                        Life / Routine
                                    </option>
                                </select>
                            </div>

                            {/* hide sprint if routine */}
                            <div
                                style={{
                                    visibility:
                                        formData.category === "Health & Routine"
                                            ? "hidden"
                                            : "visible",
                                }}
                            >
                                <label className="block text-xs font-medium text-slate-600 mb-1">
                                    Week (Sprint)
                                </label>
                                <input
                                    type="week"
                                    name="sprint"
                                    value={formData.sprint}
                                    onChange={handleChange}
                                    className="w-full border border-slate-300 rounded-sm px-3 py-1.5 text-sm focus:outline-none focus:border-slate-500 focus:ring-1 focus:ring-slate-500 text-slate-700"
                                />
                            </div>
                        </div>
                    </div>

                    <hr className="border-slate-100 my-2" />

                    {/* date, time, duration, energy */}
                    <div className="space-y-3">
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-xs font-medium text-slate-600 mb-1">
                                    Date <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="date"
                                    name="date"
                                    value={formData.date}
                                    onChange={handleChange}
                                    required
                                    className="w-full border border-slate-300 rounded-sm px-3 py-1.5 text-sm focus:outline-none focus:border-slate-500 focus:ring-1 focus:ring-slate-500"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-slate-600 mb-1">
                                    Time <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="time"
                                    name="time"
                                    value={formData.time}
                                    onChange={handleChange}
                                    required
                                    className="w-full border border-slate-300 rounded-sm px-3 py-1.5 text-sm focus:outline-none focus:border-slate-500 focus:ring-1 focus:ring-slate-500"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-5 items-start">
                            <div>
                                <label className="block text-xs font-medium text-slate-600 mb-1">
                                    Est. Hours
                                </label>
                                <input
                                    type="number"
                                    name="duration"
                                    value={formData.duration}
                                    onChange={handleChange}
                                    min="0.5"
                                    max="24"
                                    step="0.5"
                                    placeholder="e.g. 2"
                                    className="w-full border border-slate-300 rounded-sm px-3 py-1.5 text-sm focus:outline-none focus:border-slate-500 focus:ring-1 focus:ring-slate-500"
                                />
                            </div>
                            <div>
                                <div className="flex justify-between items-end mb-1">
                                    <label className="block text-xs font-medium text-slate-600">
                                        Energy Level
                                    </label>
                                    <span className="text-[10px] text-slate-500 font-medium">
                                        {formData.energy}/5
                                    </span>
                                </div>
                                <input
                                    type="range"
                                    name="energy"
                                    value={formData.energy}
                                    onChange={handleChange}
                                    min="1"
                                    max="5"
                                    step="1"
                                    list="energy-markers"
                                    className="w-full accent-slate-600 cursor-pointer h-1.5 mb-1 mt-1.5"
                                />
                                <datalist id="energy-markers">
                                    <option value="1"></option>
                                    <option value="2"></option>
                                    <option value="3"></option>
                                    <option value="4"></option>
                                    <option value="5"></option>
                                </datalist>
                                <div className="flex justify-between text-[8px] text-slate-400 px-1 font-medium mt-1 mx-0.5">
                                    <span>1</span>
                                    <span>2</span>
                                    <span>3</span>
                                    <span>4</span>
                                    <span>5</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <hr className="border-slate-100 my-2" />

                    {/* URL & color */}
                    <div className="space-y-3 pb-2">
                        <div>
                            <label className="block text-xs font-medium text-slate-600 mb-1">
                                Reference URL
                            </label>
                            <input
                                type="url"
                                name="url"
                                value={formData.url}
                                onChange={handleChange}
                                placeholder="https://..."
                                className="w-full border border-slate-300 rounded-sm px-3 py-1.5 text-sm focus:outline-none focus:border-slate-500 focus:ring-1 focus:ring-slate-500"
                            />
                        </div>

                        <div className="flex items-start gap-3">
                            <div className="w-14 shrink-0">
                                <label className="block text-xs font-medium text-slate-600 mb-1">
                                    Tag
                                </label>
                                <input
                                    type="color"
                                    name="color"
                                    value={formData.color}
                                    onChange={handleChange}
                                    className="h-8 w-full border border-slate-300 rounded-sm cursor-pointer p-0.5 bg-white"
                                />
                            </div>

                            <div className="flex-1 min-w-0">
                                <label className="block text-xs font-medium text-slate-600 mb-1">
                                    Attachment
                                </label>
                                <div
                                    className="w-full border border-slate-200 border-dashed rounded-sm px-3 py-2 text-sm text-slate-400 bg-slate-50 flex items-center justify-center"
                                    title="Coming soon"
                                >
                                    <span className="text-[11px] font-medium">
                                        File upload coming soon...
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}

/* eslint-disable react-refresh/only-export-components */
import { createContext, useState } from "react";

export const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
    // initial state with mock test
    const [tasks, setTasks] = useState([
        {
            id: 1,
            title: "Design REST API Endpoints",
            desc: "Plan GET, POST, PUT, DELETE for /tasks route.",
            category: "Development",
            date: "2026-05-31",
            time: "08:30",
            energy: 5,
            color: "#334155",
            completed: false,
            status: "active",
        },
        {
            id: 2,
            title: "30 Min Jogging in the Park",
            desc: "Clear the mind before coding.",
            category: "Health & Routine",
            date: "2026-05-31",
            time: "05:30",
            energy: 1,
            color: "#10b981",
            completed: true,
            status: "active",
        },
    ]);

    // --- Handlers ---

    // add
    const addTask = () => {
        setTasks();
    };

    // toggle
    const toggleTask = () => {};

    // archive
    const archiveTask = () => {};

    // del
    const deleteTask = () => {};

    return (
        <TaskContext.Provider
            value={{ tasks, addTask, toggleTask, archiveTask, deleteTask }}
        >
            {children}
        </TaskContext.Provider>
    );
};

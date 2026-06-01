/* eslint-disable */
import { createContext, useState, useEffect } from "react";
import { taskService } from "../services/taskService";

export const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
    const [tasks, setTasks] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const [editingTask, setEditingTask] = useState(null);

    // 1. taskService.getAllTasks
    const fetchTasks = async () => {
        try {
            setIsLoading(true);
            const data = await taskService.getAllTasks();
            if (data.success) {
                setTasks(data.data);
            }
        } catch (error) {
            console.error("Error fetching tasks:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    // 2. taskService.createTask
    const addTask = async (newTaskData) => {
        try {
            const data = await taskService.createTask(newTaskData);
            if (data.success) {
                setTasks((prev) => [...prev, data.data]);
            }
        } catch (error) {
            console.error("Error adding task:", error);
        }
    };

    // --- updateTaskState (Helper Function)  ---
    const updateTaskState = async (id, updatedFields) => {
        try {
            const data = await taskService.updateTask(id, updatedFields);
            if (data.success) {
                setTasks((prev) =>
                    prev.map((t) => (t._id === id ? data.data : t)),
                );
            }
        } catch (error) {
            console.error("Error updating task:", error);
        }
    };

    // 3. update 3.1.toggle 3.2.archive 3.3.restore
    const toggleTask = (id) => {
        const task = tasks.find((t) => t._id === id);
        if (task) updateTaskState(id, { completed: !task.completed });
    };
    const archiveTask = (id) => updateTaskState(id, { status: "archived" });
    const restoreTask = (id) => updateTaskState(id, { status: "active" });

    // 4. taskService.deleteTask(id)
    const deleteTask = async (id) => {
        try {
            const data = await taskService.deleteTask(id);
            if (data.success) {
                setTasks((prev) => prev.filter((t) => t._id !== id));
            }
        } catch (error) {
            console.error("Error deleting task:", error);
        }
    };
    // 5. taskService.updateTask
    const editTask = async (id, updatedData) => {
        try {
            const data = await taskService.updateTask(id, updatedData);
            if (data.success) {
                setTasks((prev) =>
                    prev.map((t) => (t._id === id ? data.data : t)),
                );

                setEditingTask(null);
            }
        } catch (error) {
            console.error("Error editing task:", error);
        }
    };

    return (
        <TaskContext.Provider
            value={{
                tasks,
                isLoading,
                addTask,
                toggleTask,
                archiveTask,
                restoreTask,
                deleteTask,
                editingTask,
                setEditingTask,
                editTask,
            }}
        >
            {children}
        </TaskContext.Provider>
    );
};

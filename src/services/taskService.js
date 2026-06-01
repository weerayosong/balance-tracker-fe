const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3002/api/v2";

export const taskService = {
    // GET
    getAllTasks: async () => {
        const res = await fetch(`${API_URL}/tasks`);
        if (!res.ok) throw new Error("Failed to fetch tasks");
        return res.json();
    },

    // POST
    createTask: async (taskData) => {
        const res = await fetch(`${API_URL}/tasks`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(taskData),
        });
        if (!res.ok) throw new Error("Failed to create task");
        return res.json();
    },

    // PUT
    updateTask: async (id, updatedFields) => {
        const res = await fetch(`${API_URL}/tasks/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedFields),
        });
        if (!res.ok) throw new Error("Failed to update task");
        return res.json();
    },

    // DELETE
    deleteTask: async (id) => {
        const res = await fetch(`${API_URL}/tasks/${id}`, {
            method: "DELETE",
        });
        if (!res.ok) throw new Error("Failed to delete task");
        return res.json();
    },
};

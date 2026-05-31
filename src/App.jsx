import { Outlet } from "react-router-dom";
import { TaskProvider } from "./contexts/TaskContext";

function App() {
    return (
        <TaskProvider>
            <div className="bg-zinc-100 h-dvh overflow-hidden flex flex-col font-sans text-slate-800">
                <div className="max-w-350 mx-auto w-full h-full flex flex-col p-3 md:p-6 gap-4">
                    <Outlet />
                </div>
            </div>
        </TaskProvider>
    );
}

export default App;

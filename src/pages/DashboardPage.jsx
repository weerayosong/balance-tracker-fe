export default function DashboardPage() {
    return (
        <main className="flex-1 flex flex-col lg:flex-row gap-4 lg:gap-6 min-h-0">
            <div className="flex-1 flex items-center justify-center bg-white border border-slate-200 rounded-sm shadow-sm">
                <h1 className="text-xl text-slate-400">Dashboard Page</h1>
                {/* left col: <TaskForm />, right col: <TaskBoard /> */}
            </div>
        </main>
    );
}

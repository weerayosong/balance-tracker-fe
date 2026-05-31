import Header from "../components/Header";

export default function DashboardPage() {
    return (
        <>
            <Header />

            <main className="flex-1 flex flex-col lg:flex-row gap-4 lg:gap-6 min-h-0">
                <aside className="hidden lg:flex flex-col bg-white border border-slate-200 rounded-sm shadow-sm shrink-0 lg:w-100 xl:w-105 lg:h-full p-4 items-center justify-center text-slate-400">
                    Left Column: Task Form Area
                </aside>

                <section className="flex-1 flex flex-col bg-white border border-slate-200 rounded-sm shadow-sm min-h-0 p-4 items-center justify-center text-slate-400">
                    Right Column: Task Board Area
                </section>
            </main>
        </>
    );
}

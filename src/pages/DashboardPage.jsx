import Header from "../components/Header";
import TaskForm from "../components/TaskForm";
import TaskBoard from "../components/TaskBoard";

export default function DashboardPage() {
    return (
        <>
            <Header />

            <main className="flex-1 flex flex-col lg:flex-row gap-4 lg:gap-6 min-h-0">
                <aside className="hidden lg:block shrink-0 lg:w-100 xl:w-105 lg:h-full">
                    <TaskForm />
                </aside>

                <section className="flex-1 min-h-0 h-full w-full">
                    <TaskBoard />
                </section>
            </main>
        </>
    );
}

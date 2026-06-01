// src/components/TaskSkeleton.jsx
export default function TaskSkeleton() {
    return (
        <div className="bg-white p-3.5 border-l-[3px] border-slate-200 rounded-sm shadow-sm flex items-start space-x-3 animate-pulse">
            {/* checkbox */}
            <div className="w-4 h-4 bg-slate-200 rounded-sm mt-0.5 shrink-0"></div>

            {/* task content */}
            <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start gap-2 mb-2">
                    {/* title */}
                    <div className="h-4 bg-slate-200 rounded-sm w-3/4"></div>
                    {/* tag */}
                    <div className="h-4 bg-slate-100 rounded-sm w-12 shrink-0"></div>
                </div>

                {/* description 2 lines */}
                <div className="space-y-1.5 mb-3">
                    <div className="h-2.5 bg-slate-100 rounded-sm w-full"></div>
                    <div className="h-2.5 bg-slate-100 rounded-sm w-5/6"></div>
                </div>

                {/* mini icons */}
                <div className="flex gap-2">
                    <div className="h-5 w-16 bg-slate-100 rounded-sm"></div>
                    <div className="h-5 w-16 bg-slate-100 rounded-sm"></div>
                    <div className="h-5 w-12 bg-slate-100 rounded-sm"></div>
                </div>
            </div>
        </div>
    );
}

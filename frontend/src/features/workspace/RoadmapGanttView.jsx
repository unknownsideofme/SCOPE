import React from "react"
import { Calendar, CheckCircle2, Clock, ShieldCheck, Lock, ChevronRight } from "lucide-react"
import { Progress } from "../../ui/progress"
import { StatusBadge } from "../../patterns/StatusBadge"
import { MoneyText } from "../../patterns/MoneyText"
import { Button } from "../../ui/button"

export function RoadmapGanttView({ milestones, onSelectMilestone }) {
  return (
    <div className="p-4 sm:p-6 bg-[#F2EEE8] min-h-[500px]">
      <div className="rounded-xl border border-[#DDD3C9] bg-[#FFFCF8] p-5 shadow-2xs">
        {/* Roadmap header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#DDD3C9] mb-6">
          <div>
            <h3 className="text-base sm:text-lg font-bold font-space text-[#302925]">Milestone Contract Roadmap</h3>
            <p className="text-sm text-[#776F67] mt-0.5 font-dmsans">
              Sequence of verification gates. Next milestone unlocks only upon neutral acceptance of prerequisites.
            </p>
          </div>
          <span className="text-xs text-[#776F67] font-mono font-medium">Q4 2026 Release Schedule</span>
        </div>

        {/* Roadmap Items */}
        <div className="space-y-4 font-inter">
          {milestones.map((ms, index) => {
            return (
              <div
                key={ms.id}
                onClick={() => onSelectMilestone(ms)}
                className="group relative rounded-lg border border-[#DDD3C9] bg-[#FFFCF8] p-5 hover:border-[#C28C62] hover:shadow-xs cursor-pointer transition-all"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3.5">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#EAE3D9] font-mono text-sm font-bold text-[#302925] border border-[#DDD3C9]">
                      {index + 1}
                    </div>
                    <div>
                      <h4 className="text-sm sm:text-base font-bold text-[#302925] group-hover:text-[#7A3438] group-hover:underline font-manrope">
                        {ms.title}
                      </h4>
                      <p className="text-xs sm:text-sm text-[#776F67] line-clamp-1 mt-0.5">{ms.summary}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3.5">
                    <StatusBadge status={ms.status} />
                    <MoneyText amountInCents={ms.amount} className="text-[#236B2B] font-bold" />
                  </div>
                </div>

                {/* Progress bar and timeline indicators */}
                <div className="space-y-2 pt-2.5 border-t border-[#DDD3C9]/60">
                  <div className="flex items-center justify-between text-xs text-[#776F67]">
                    <span>
                      Audit verification: <strong className="text-[#302925] font-bold">{ms.progress}%</strong> ({ms.criteria.filter((c) => c.status === "Met").length} of {ms.criteria.length} criteria met)
                    </span>
                    <span className="font-mono text-[#776F67]">Target: {ms.dueDate}</span>
                  </div>
                  <Progress value={ms.progress} className="h-2 bg-[#DDD3C9]" />
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

import React from "react"
import { CheckCircle2, Clock, AlertTriangle, ShieldCheck, GitPullRequest, ArrowRight } from "lucide-react"
import { Badge } from "../../ui/badge"
import { Card, CardHeader, CardTitle, CardContent } from "../../ui/card"
import { Avatar } from "../../ui/avatar"
import { StatusBadge } from "../../patterns/StatusBadge"
import { HashChip } from "../../patterns/HashChip"
import { MoneyText } from "../../patterns/MoneyText"

export function StatusBoardView({ milestones, onSelectCriterion }) {
  const columns = [
    { id: "backlog", title: "Agreed Backlog", statusMatch: ["Backlog", "Draft"] },
    { id: "in_progress", title: "In Progress", statusMatch: ["In progress", "In Progress"] },
    { id: "audit", title: "Audit & Verification", statusMatch: ["Unverified", "Needs human"] },
    { id: "met", title: "Met / Done", statusMatch: ["Met", "Done"] },
  ]

  const allCriteria = milestones.flatMap((ms) =>
    ms.criteria.map((c) => ({ ...c, milestone: ms }))
  )

  return (
    <div className="p-4 sm:p-6 bg-[#F2EEE8] min-h-[500px]">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {columns.map((col) => {
          const items = allCriteria.filter((c) => col.statusMatch.includes(c.status))

          return (
            <div key={col.id} className="flex flex-col rounded-lg bg-[#EAE3D9]/60 border border-[#DDD3C9] p-3">
              {/* Column Header */}
              <div className="flex items-center justify-between pb-3 border-b border-[#DDD3C9] mb-3">
                <span className="text-sm font-bold font-manrope text-[#302925]">{col.title}</span>
                <span className="rounded-full bg-[#DDD3C9] px-2 py-0.5 text-xs text-[#302925] font-mono font-semibold">
                  {items.length}
                </span>
              </div>

              {/* Column Items */}
              <div className="space-y-3 overflow-y-auto max-h-[600px] pr-1 font-inter">
                {items.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => onSelectCriterion(item.milestone, item)}
                    className="rounded-lg border border-[#DDD3C9] bg-[#FFFCF8] p-3.5 text-xs shadow-2xs hover:border-[#C28C62] hover:shadow-xs cursor-pointer transition-all"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-mono text-xs font-medium text-[#776F67]">#{item.id}</span>
                      <StatusBadge status={item.status} />
                    </div>

                    <p className="font-semibold text-[#302925] line-clamp-2 text-sm leading-snug">
                      {item.title}
                    </p>

                    <div className="mt-3 flex items-center justify-between border-t border-[#DDD3C9]/60 pt-2 text-xs text-[#776F67]">
                      <span className="font-mono text-[#7A3438] font-bold">{item.milestone.title.split(":")[0]}</span>
                      {item.pr && item.pr !== "-" && (
                        <span className="font-mono text-[#7A3438] flex items-center gap-1 font-semibold">
                          <GitPullRequest className="h-3 w-3" />
                          {item.pr}
                        </span>
                      )}
                    </div>
                  </div>
                ))}

                {items.length === 0 && (
                  <div className="py-8 text-center text-xs text-[#776F67]">
                    No criteria in this stage.
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

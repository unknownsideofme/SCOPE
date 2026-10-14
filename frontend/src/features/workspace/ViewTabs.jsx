import React from "react"
import { LayoutList, Kanban, Calendar, Bug, CheckSquare, UserCheck, Plus, SlidersHorizontal, Activity, GitPullRequest } from "lucide-react"
import { Button } from "../../ui/button"
import { cn } from "../../lib/utils"

export function ViewTabs({ activeView, onViewChange, milestoneCounts }) {
  const tabs = [
    { id: "backlog", label: "Prioritized backlog", icon: LayoutList, count: 8 },
    { id: "board", label: "Status board", icon: Kanban },
    { id: "roadmap", label: "Roadmap", icon: Calendar },
    { id: "bugs", label: "Bugs & Findings 🪲", icon: Bug, count: 2 },
    { id: "review", label: "In review", icon: CheckSquare, count: 1 },
    { id: "escrow", label: "Escrow & Payout", icon: Activity },
  ]

  return (
    <div className="flex items-center justify-between border-b border-[#DDD3C9] bg-[#FFFCF8] px-4 sm:px-6 overflow-x-auto no-scrollbar">
      {/* Left view selector tabs */}
      <div className="flex items-center space-x-1.5 py-2">
        {tabs.map((tab) => {
          const Icon = tab.icon
          const isActive = activeView === tab.id

          return (
            <button
              key={tab.id}
              onClick={() => onViewChange(tab.id)}
              className={cn(
                "flex items-center gap-2 rounded-md px-3 py-1.5 text-sm font-manrope font-medium transition-all whitespace-nowrap cursor-pointer tracking-tight",
                isActive
                  ? "bg-[#EAE3D9] text-[#302925] shadow-2xs border border-[#DDD3C9] font-bold"
                  : "text-[#776F67] hover:text-[#302925] hover:bg-[#F2EEE8]"
              )}
            >
              <Icon className={cn("h-4 w-4", isActive ? "text-[#7A3438]" : "text-[#776F67]")} />
              <span>{tab.label}</span>
              {tab.count !== undefined && (
                <span className="ml-1 rounded-full bg-[#DDD3C9] px-2 py-0.5 text-xs text-[#302925] font-mono font-semibold">
                  {tab.count}
                </span>
              )}
            </button>
          )
        })}

        <button className="flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-sm font-manrope text-[#776F67] hover:text-[#302925] hover:bg-[#F2EEE8] cursor-pointer">
          <Plus className="h-3.5 w-3.5" />
          <span>New view</span>
        </button>
      </div>

      {/* Right secondary action buttons */}
      <div className="hidden md:flex items-center gap-2.5 py-1">
        <Button variant="ghost" size="sm" className="h-8 text-sm text-[#776F67] hover:text-[#302925]">
          Add status update
        </Button>
        <Button variant="ghost" size="sm" className="h-8 text-sm text-[#776F67] hover:text-[#302925]">
          Insights
        </Button>
        <Button variant="outline" size="sm" className="h-8 text-sm text-[#302925] gap-2 border-[#DDD3C9] bg-[#FFFCF8]">
          <GitPullRequest className="h-3.5 w-3.5 text-[#7A3438]" />
          <span>Workflows</span>
          <span className="rounded-full bg-[#EAE3D9] px-1.5 py-0.5 text-xs text-[#302925] font-mono">7</span>
        </Button>
      </div>
    </div>
  )
}

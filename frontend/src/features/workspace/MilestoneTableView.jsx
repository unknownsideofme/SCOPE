import React, { useState } from "react"
import {
  ChevronDown,
  ChevronRight,
  Circle,
  CheckCircle2,
  AlertCircle,
  GitPullRequest,
  Plus,
  ShieldCheck,
  Sparkles,
  ExternalLink,
  Lock,
} from "lucide-react"
import { Badge } from "../../ui/badge"
import { Avatar } from "../../ui/avatar"
import { Button } from "../../ui/button"
import { Progress } from "../../ui/progress"
import { StatusBadge } from "../../patterns/StatusBadge"
import { HashChip } from "../../patterns/HashChip"
import { MoneyText } from "../../patterns/MoneyText"
import { cn } from "../../lib/utils"

export function MilestoneTableView({
  milestones,
  onSelectCriterion,
  onAddCriterion,
  searchQuery,
  activeFilter,
}) {
  const [collapsedGroups, setCollapsedGroups] = useState({})

  const toggleGroup = (id) => {
    setCollapsedGroups((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

  // Filter criteria based on search query and filter
  const filterCriterion = (c) => {
    if (activeFilter === "met" && c.status !== "Met") return false
    if (activeFilter === "in_progress" && c.status !== "In progress" && c.status !== "Backlog") return false
    if (activeFilter === "unverified" && c.status !== "Unverified" && c.status !== "Needs human") return false

    if (!searchQuery) return true
    const q = searchQuery.toLowerCase()
    return (
      c.title.toLowerCase().includes(q) ||
      c.id.toLowerCase().includes(q) ||
      (c.assignee && c.assignee.toLowerCase().includes(q)) ||
      (c.pr && c.pr.toLowerCase().includes(q)) ||
      (c.method && c.method.toLowerCase().includes(q))
    )
  }

  return (
    <div className="w-full overflow-x-auto text-sm font-inter bg-[#FFFCF8] border-b border-[#DDD3C9]">
      <div className="min-w-[1020px]">
        {/* Table Headings */}
        <div className="grid grid-cols-12 items-center border-b border-[#DDD3C9] bg-[#F2EEE8] px-4 sm:px-6 py-2.5 text-xs font-semibold text-[#776F67] tracking-wider uppercase select-none">
          <div className="col-span-5 flex items-center gap-2">
            <span>Title</span>
          </div>
          <div className="col-span-2">Status</div>
          <div className="col-span-1">Assignees</div>
          <div className="col-span-1">Linked PR</div>
          <div className="col-span-2">Verification / Progress</div>
          <div className="col-span-1 text-right">Size / Escrow</div>
        </div>

        {/* Milestone Groups */}
        {milestones.map((ms) => {
          const isCollapsed = !!collapsedGroups[ms.id]
          const visibleCriteria = ms.criteria.filter(filterCriterion)

          return (
            <div key={ms.id} className="border-b border-[#DDD3C9] last:border-b-0">
              {/* Group Header matching GitHub Projects format */}
              <div
                onClick={() => toggleGroup(ms.id)}
                className="flex items-center justify-between bg-[#EAE3D9] px-4 sm:px-6 py-3 text-sm font-semibold text-[#302925] border-y border-[#DDD3C9] hover:bg-[#DDD3C9]/70 cursor-pointer transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <button className="text-[#776F67] hover:text-[#302925] focus:outline-none cursor-pointer">
                    {isCollapsed ? (
                      <ChevronRight className="h-4 w-4" />
                    ) : (
                      <ChevronDown className="h-4 w-4" />
                    )}
                  </button>
                  <span className="text-[#302925] font-bold text-base font-space">{ms.title}</span>
                  <span className="rounded-full bg-[#DDD3C9] px-2 py-0.5 text-xs text-[#302925] font-mono font-semibold">
                    {ms.criteria.length}
                  </span>
                  <span className="text-xs text-[#776F67] font-mono ml-1">
                    Escrow: <MoneyText amountInCents={ms.amount} size="sm" className="text-[#236B2B]" />
                  </span>
                  <Badge variant="stripe" className="text-xs py-0.5 px-2 font-mono ml-2">
                    {ms.specVersion}
                  </Badge>
                </div>

                <div className="flex items-center gap-3.5 text-xs text-[#776F67]">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-[#302925] font-bold">
                      {ms.progress}% audited
                    </span>
                    <div className="w-20">
                      <Progress value={ms.progress} className="h-2 bg-[#DDD3C9]" />
                    </div>
                  </div>
                  <span className="text-[#776F67] font-mono text-xs">Due {ms.dueDate}</span>
                </div>
              </div>

              {/* Group Rows */}
              {!isCollapsed && (
                <div className="divide-y divide-[#DDD3C9]/40 bg-[#FFFCF8]">
                  {visibleCriteria.map((c, index) => {
                    const isMet = c.status === "Met"
                    const isNotMet = c.status === "Not met"

                    return (
                      <div
                        key={c.id}
                        onClick={() => onSelectCriterion(ms, c)}
                        className="grid grid-cols-12 items-center px-4 sm:px-6 py-3.5 hover:bg-[#F2EEE8] cursor-pointer transition-colors group"
                      >
                        {/* Title Column with status icon matching GitHub format */}
                        <div className="col-span-5 flex items-center gap-3 pr-2">
                          <span className="text-[#776F67] font-mono text-xs w-5 shrink-0 font-medium">
                            {c.num || index + 1}
                          </span>

                          {/* GitHub style status circle icon */}
                          {isMet ? (
                            <CheckCircle2 className="h-4 w-4 text-[#236B2B] shrink-0" />
                          ) : isNotMet ? (
                            <AlertCircle className="h-4 w-4 text-[#991B1B] shrink-0" />
                          ) : (
                            <Circle className="h-4 w-4 text-[#C28C62] shrink-0" />
                          )}

                          <span className="text-sm font-semibold text-[#302925] group-hover:text-[#7A3438] group-hover:underline truncate">
                            {c.title}
                          </span>
                          <span className="text-xs text-[#776F67] font-mono shrink-0 font-medium">
                            #{c.id.replace("CRIT-", "")}
                          </span>
                        </div>

                        {/* Status Column */}
                        <div className="col-span-2">
                          <StatusBadge status={c.status} />
                        </div>

                        {/* Assignees Column */}
                        <div className="col-span-1 flex items-center gap-2">
                          {c.assignee ? (
                            <div className="flex items-center gap-1.5 text-xs font-medium text-[#302925]">
                              <Avatar
                                fallback={c.assignee.slice(0, 2).toUpperCase()}
                                size="sm"
                                className="bg-[#EAE3D9] text-[#302925] border-[#DDD3C9]"
                              />
                              <span className="truncate max-w-[80px]">{c.assignee}</span>
                            </div>
                          ) : (
                            <span className="text-[#776F67]">-</span>
                          )}
                        </div>

                        {/* Linked PR Column */}
                        <div className="col-span-1 flex items-center">
                          {c.pr && c.pr !== "-" ? (
                            <div className="flex items-center gap-1.5 rounded bg-[#7A3438]/10 px-2 py-0.5 text-xs text-[#7A3438] border border-[#7A3438]/20 font-mono font-semibold">
                              <GitPullRequest className="h-3.5 w-3.5 text-[#7A3438]" />
                              <span>{c.pr}</span>
                            </div>
                          ) : (
                            <span className="text-[#776F67]">-</span>
                          )}
                        </div>

                        {/* Sub-issues / Verification progress bar */}
                        <div className="col-span-2 flex items-center gap-2.5 pr-4">
                          <span className="text-xs font-mono text-[#776F67] shrink-0 font-medium">
                            {c.subIssues || "1/1"}
                          </span>
                          <div className="w-full">
                            <Progress
                              value={c.subIssuesProgress || (isMet ? 100 : 0)}
                              indicatorClassName={
                                isMet
                                  ? "bg-[#7A3438]"
                                  : "bg-[#C28C62]"
                              }
                              className="h-2 bg-[#DDD3C9]"
                            />
                          </div>
                          <span className="text-xs font-mono text-[#776F67] font-medium">
                            {c.subIssuesProgress || (isMet ? "100%" : "0%")}
                          </span>
                        </div>

                        {/* Size / Escrow */}
                        <div className="col-span-1 text-right font-mono text-xs text-[#776F67]">
                          <span className="rounded bg-[#EAE3D9] px-2 py-0.5 border border-[#DDD3C9] text-[#302925] font-semibold">
                            {c.size || "M"}
                          </span>
                        </div>
                      </div>
                    )
                  })}

                  {/* Add item button at bottom of group */}
                  <div className="px-4 sm:px-6 py-3">
                    <button
                      onClick={() => onAddCriterion(ms)}
                      className="flex items-center gap-1.5 text-sm text-[#776F67] hover:text-[#7A3438] transition-colors cursor-pointer font-semibold font-manrope"
                    >
                      <Plus className="h-4 w-4" />
                      <span>Add acceptance criterion</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

import React from "react"
import { Lock, GitBranch, ArrowLeft, Shield, Sparkles, SlidersHorizontal, User, CheckCircle2 } from "lucide-react"
import { Button } from "../../ui/button"
import { Badge } from "../../ui/badge"
import { Avatar } from "../../ui/avatar"
import { HashChip } from "../../patterns/HashChip"
import { AgentStatus } from "../../patterns/AgentStatus"

export function WorkspaceHeader({
  project,
  activeRole,
  onSwitchRole,
  onBackToLanding,
  onOpenAuditHub,
}) {
  return (
    <header className="border-b border-[#DDD3C9] bg-[#FFFCF8] sticky top-0 z-30 shadow-2xs">
      {/* Top project navigation breadcrumb bar */}
      <div className="flex h-14 items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={onBackToLanding}
            className="h-8 px-2.5 text-[#776F67] hover:text-[#302925] gap-1.5 text-sm font-medium"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="hidden sm:inline">Landing</span>
          </Button>

          <div className="h-5 w-[1px] bg-[#DDD3C9]" />

          {/* Repo / Project name with lock icon */}
          <div className="flex items-center gap-2">
            <Lock className="h-4 w-4 text-[#776F67]" />
            <span className="text-sm sm:text-base font-bold text-[#302925] hover:underline cursor-pointer font-space">
              {project.name}
            </span>
            <Badge variant="secondary" className="text-xs py-0.5 px-2 font-mono">
              Private
            </Badge>
            <Badge variant="stripe" className="text-xs py-0.5 px-2">
              Two-Party Contract {project.contractVersion}
            </Badge>
          </div>
        </div>

        {/* Right action controls */}
        <div className="flex items-center gap-3">
          {/* Active agent status badge */}
          <button
            onClick={onOpenAuditHub}
            className="flex items-center gap-2 rounded-md bg-[#FFFCF8] border border-[#DDD3C9] px-3 py-1.5 text-xs sm:text-sm text-[#302925] hover:border-[#7A3438] hover:bg-[#F2EEE8] transition-all cursor-pointer shadow-2xs font-manrope font-semibold"
          >
            <AgentStatus state="solving" size={16} showLabel={false} />
            <span>
              Audit Agents (8 active)
            </span>
          </button>

          {/* Role switcher toggle */}
          <div className="flex items-center rounded-md bg-[#EAE3D9] p-0.5 border border-[#DDD3C9] text-xs">
            <button
              onClick={() => onSwitchRole("client")}
              className={`rounded px-2.5 py-1 text-xs font-semibold font-manrope transition-all cursor-pointer ${
                activeRole === "client"
                  ? "bg-[#7A3438] text-white shadow-2xs"
                  : "text-[#776F67] hover:text-[#302925]"
              }`}
            >
              Client (Sarah)
            </button>
            <button
              onClick={() => onSwitchRole("freelancer")}
              className={`rounded px-2.5 py-1 text-xs font-semibold font-manrope transition-all cursor-pointer ${
                activeRole === "freelancer"
                  ? "bg-[#7A3438] text-white shadow-2xs"
                  : "text-[#776F67] hover:text-[#302925]"
              }`}
            >
              Freelancer (Alex)
            </button>
          </div>

          {/* User avatar */}
          <Avatar
            src={activeRole === "client" ? project.client.avatar : project.freelancer.avatar}
            alt={activeRole === "client" ? project.client.name : project.freelancer.name}
            size="sm"
            className="border-[#DDD3C9]"
          />
        </div>
      </div>
    </header>
  )
}

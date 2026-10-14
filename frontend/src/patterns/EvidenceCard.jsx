import React, { useState } from "react"
import { ShieldCheck, Terminal, FileCode2, ExternalLink, ChevronDown, ChevronUp } from "lucide-react"
import { HashChip } from "./HashChip"
import { Badge } from "../ui/badge"
import { Button } from "../ui/button"
import { cn } from "../lib/utils"

export function EvidenceCard({ evidence, criterionTitle, className }) {
  const [showLog, setShowLog] = useState(false)

  if (!evidence) {
    return (
      <div className={cn("rounded-lg border border-[#DDD3C9] bg-[#F2EEE8]/60 p-4 text-center", className)}>
        <p className="text-xs text-[#776F67]">No verification evidence submitted for this criterion yet.</p>
      </div>
    )
  }

  return (
    <div className={cn("rounded-lg border border-[#DDD3C9] bg-[#FFFCF8] p-4 text-[#302925] transition-all shadow-xs", className)}>
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#DDD3C9]/80 pb-3">
        <div className="flex items-center gap-2.5">
          <div className="flex h-7 w-7 items-center justify-center rounded-md bg-[#7A3438]/10 text-[#7A3438] border border-[#7A3438]/20">
            <ShieldCheck className="h-4 w-4" />
          </div>
          <div>
            <span className="text-sm font-bold text-[#302925] font-manrope">{evidence.agent}</span>
            <span className="ml-2 text-xs text-[#776F67] font-mono">({evidence.tool})</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-[#776F67] font-medium">SHA</span>
          <HashChip hash={evidence.artifactSha} length={8} />
        </div>
      </div>

      {/* Body Metric */}
      <div className="my-3 space-y-2.5">
        <div className="rounded-md bg-[#236B2B]/10 p-3 border border-[#236B2B]/20">
          <div className="text-xs sm:text-sm font-medium text-[#236B2B] flex items-center gap-2 font-semibold">
            <div className="h-2 w-2 rounded-full bg-[#236B2B]" />
            {evidence.metric}
          </div>
        </div>

        {evidence.citation && (
          <div className="flex items-center gap-2 text-xs text-[#776F67]">
            <FileCode2 className="h-4 w-4 text-[#C28C62]" />
            <span className="text-xs font-mono text-[#302925] font-semibold">{evidence.citation}</span>
            <span className="text-xs text-[#776F67]">at commit</span>
            <HashChip hash={evidence.commitSha} length={7} showCommitIcon />
          </div>
        )}
      </div>

      {/* Expandable Logs */}
      {evidence.logSnippet && (
        <div className="mt-2.5">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowLog(!showLog)}
            className="h-7 px-2.5 text-xs text-[#776F67] hover:text-[#302925] gap-1.5 font-medium"
          >
            <Terminal className="h-3.5 w-3.5" />
            <span>{showLog ? "Hide Execution Trace" : "View Execution Trace"}</span>
            {showLog ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
          </Button>

          {showLog && (
            <div className="mt-2 rounded-md bg-[#302925] p-3.5 font-mono text-xs leading-relaxed text-[#F2EEE8] border border-[#302925] overflow-x-auto whitespace-pre shadow-inner">
              {evidence.logSnippet}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

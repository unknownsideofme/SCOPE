import React, { useState } from "react"
import { CheckCircle2, MessageSquare, AlertOctagon, Lock } from "lucide-react"
import { Button } from "../ui/button"
import { MoneyText } from "./MoneyText"
import { cn } from "../lib/utils"

export function ApprovalBar({
  milestone,
  onApprove,
  onRequestChanges,
  onDispute,
  className,
}) {
  const isReady = milestone.progress === 100

  return (
    <div
      className={cn(
        "sticky bottom-0 z-40 w-full border-t border-[#DDD3C9] bg-[#FFFCF8]/95 px-4 py-3 backdrop-blur-md transition-all shadow-lg",
        className
      )}
    >
      <div className="mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 max-w-7xl">
        {/* Left summary */}
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#7A3438]/10 text-[#7A3438] border border-[#7A3438]/20">
            <Lock className="h-4 w-4" />
          </div>
          <div>
            <div className="flex items-center gap-2.5">
              <span className="text-sm font-bold font-space text-[#302925]">{milestone.title}</span>
              <span className="rounded bg-[#EAE3D9] px-2 py-0.5 text-xs text-[#302925] font-mono border border-[#DDD3C9] font-semibold">
                {milestone.specVersion}
              </span>
            </div>
            <div className="flex items-center gap-2.5 text-xs sm:text-sm text-[#776F67] mt-0.5">
              <span>Escrow locked:</span>
              <MoneyText amountInCents={milestone.amount} className="text-[#236B2B] font-bold" />
              <span>· Verification: {milestone.progress}%</span>
            </div>
          </div>
        </div>

        {/* Right action buttons */}
        <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
          <Button
            variant="outline"
            size="sm"
            onClick={onRequestChanges}
            className="text-sm font-semibold text-[#302925] border-[#DDD3C9] hover:bg-[#F2EEE8] h-9 px-3"
          >
            <MessageSquare className="mr-1.5 h-4 w-4 text-[#776F67]" />
            Request Changes
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={onDispute}
            className="text-sm font-semibold text-[#991B1B] hover:text-[#7A1515] hover:bg-[#991B1B]/10 h-9 px-3"
          >
            <AlertOctagon className="mr-1.5 h-4 w-4" />
            Dispute
          </Button>

          <Button
            variant="default"
            size="sm"
            disabled={!isReady}
            onClick={onApprove}
            className={cn(
              "text-sm font-semibold px-4.5 h-9 shadow-sm",
              isReady
                ? "bg-[#7A3438] text-white hover:bg-[#672B2F]"
                : "opacity-60 cursor-not-allowed"
            )}
          >
            <CheckCircle2 className="mr-1.5 h-4 w-4" />
            Approve & Release Funds
          </Button>
        </div>
      </div>
    </div>
  )
}

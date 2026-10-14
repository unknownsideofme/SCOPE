import React, { useState } from "react"
import { ChevronLeft, ChevronRight, CheckCircle2, ShieldCheck, Terminal, Maximize2 } from "lucide-react"
import { Button } from "../ui/button"
import { HashChip } from "./HashChip"
import { cn } from "../lib/utils"

export function EvidenceCarousel({ items = [], className }) {
  const [currentIndex, setCurrentIndex] = useState(0)

  if (!items || items.length === 0) return null

  const currentItem = items[currentIndex]

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : items.length - 1))
  }

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < items.length - 1 ? prev + 1 : 0))
  }

  return (
    <div className={cn("relative rounded-lg border border-[#DDD3C9] bg-[#FFFCF8] overflow-hidden shadow-xs", className)}>
      {/* Top carousel toolbar */}
      <div className="flex items-center justify-between border-b border-[#DDD3C9] px-3 py-2 bg-[#EAE3D9]/60 text-xs text-[#302925]">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-[#302925]">Evidence Artifact</span>
          <span className="text-[11px] text-[#776F67] font-mono">
            ({currentIndex + 1} of {items.length})
          </span>
        </div>
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            onClick={handlePrev}
            className="h-6 w-6 text-[#776F67] hover:text-[#302925]"
          >
            <ChevronLeft className="h-3.5 w-3.5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleNext}
            className="h-6 w-6 text-[#776F67] hover:text-[#302925]"
          >
            <ChevronRight className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>

      {/* Slide body */}
      <div className="p-4 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="rounded bg-[#7A3438]/10 px-2 py-0.5 text-[11px] font-semibold text-[#7A3438] border border-[#7A3438]/25">
              {currentItem.type || "Automated Test Run"}
            </span>
            <span className="text-xs text-[#302925] font-medium">{currentItem.title}</span>
          </div>
          {currentItem.sha && <HashChip hash={currentItem.sha} length={8} />}
        </div>

        {/* Preview block */}
        <div className="rounded-md bg-[#302925] border border-[#302925] p-3 font-mono text-[11px] text-[#F2EEE8] whitespace-pre overflow-x-auto max-h-48 shadow-inner">
          {currentItem.content}
        </div>

        <div className="flex items-center justify-between text-[11px] text-[#776F67] pt-1">
          <span>Agent: {currentItem.agent}</span>
          <span>Verified at: {currentItem.timestamp}</span>
        </div>
      </div>

      {/* Dots indicator */}
      <div className="flex justify-center gap-1.5 pb-2">
        {items.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={cn(
              "h-1 rounded-full transition-all duration-200",
              idx === currentIndex ? "w-4 bg-[#7A3438]" : "w-1.5 bg-[#DDD3C9] hover:bg-[#C28C62]"
            )}
          />
        ))}
      </div>
    </div>
  )
}

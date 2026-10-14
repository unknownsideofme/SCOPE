import React from "react"
import { Check, CircleDot, Clock } from "lucide-react"
import { cn } from "../lib/utils"

const STEPS = [
  { id: "draft", label: "Spec Drafted" },
  { id: "signed", label: "Two-Party Signed" },
  { id: "funded", label: "Escrow Funded" },
  { id: "audited", label: "Multi-Agent Audit" },
  { id: "released", label: "Funds Released" },
]

export function MilestoneStepper({ currentStep = 3, className }) {
  return (
    <div className={cn("w-full py-2", className)}>
      <div className="flex items-center justify-between relative">
        {/* Background track line */}
        <div className="absolute top-1/2 left-0 right-0 h-[2px] -translate-y-1/2 bg-slate-200 -z-0" />
        {/* Filled track line */}
        <div
          className="absolute top-1/2 left-0 h-[2px] -translate-y-1/2 bg-[#635bff] transition-all duration-300 -z-0"
          style={{ width: `${((currentStep - 1) / (STEPS.length - 1)) * 100}%` }}
        />

        {STEPS.map((step, idx) => {
          const stepNumber = idx + 1
          const isDone = stepNumber < currentStep
          const isCurrent = stepNumber === currentStep

          return (
            <div key={step.id} className="relative z-10 flex flex-col items-center">
              <div
                className={cn(
                  "flex h-6 w-6 items-center justify-center rounded-full border text-[11px] font-medium transition-all duration-200",
                  isDone
                    ? "border-emerald-600 bg-emerald-600 text-white shadow-xs"
                    : isCurrent
                    ? "border-[#635bff] bg-[#635bff] text-white ring-4 ring-[#635bff]/20 shadow-xs"
                    : "border-slate-300 bg-slate-100 text-slate-500"
                )}
              >
                {isDone ? <Check className="h-3 w-3 stroke-[3]" /> : stepNumber}
              </div>
              <span
                className={cn(
                  "mt-1.5 text-[10px] whitespace-nowrap hidden sm:block",
                  isCurrent ? "font-semibold text-slate-900" : isDone ? "text-slate-600" : "text-slate-400"
                )}
              >
                {step.label}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

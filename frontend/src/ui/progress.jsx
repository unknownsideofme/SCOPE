import React from "react"
import { cn } from "../lib/utils"

export function Progress({ value = 0, max = 100, className, indicatorClassName, ...props }) {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100)

  return (
    <div
      className={cn(
        "relative h-1.5 w-full overflow-hidden rounded-full bg-[#EAE3D9]",
        className
      )}
      {...props}
    >
      <div
        className={cn(
          "h-full bg-gradient-to-r from-[#7A3438] to-[#C28C62] transition-all duration-300 ease-out",
          indicatorClassName
        )}
        style={{ width: `${percentage}%` }}
      />
    </div>
  )
}

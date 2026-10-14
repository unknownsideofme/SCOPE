import React from "react"
import { cn } from "../lib/utils"

export const Input = React.forwardRef(
  ({ className, type = "text", ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-9 w-full rounded-md border border-[#DDD3C9] bg-[#FFFCF8] px-3.5 py-1.5 text-sm font-inter text-[#302925] placeholder:text-[#776F67] shadow-2xs transition-colors focus-visible:outline-none focus-visible:border-[#7A3438] focus-visible:ring-2 focus-visible:ring-[#7A3438]/20 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

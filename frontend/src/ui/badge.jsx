import React from "react"
import { cva } from "class-variance-authority"
import { cn } from "../lib/utils"

export const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors focus:outline-none border tracking-tight",
  {
    variants: {
      variant: {
        default:
          "border-[#7A3438]/30 bg-[#7A3438]/10 text-[#7A3438] font-semibold",
        secondary:
          "border-[#DDD3C9] bg-[#EAE3D9] text-[#776F67]",
        outline:
          "border-[#DDD3C9] bg-[#FFFCF8] text-[#302925]",
        met:
          "border-[#236B2B]/30 bg-[#236B2B]/10 text-[#236B2B] font-semibold",
        notMet:
          "border-[#991B1B]/30 bg-[#991B1B]/10 text-[#991B1B] font-semibold",
        unverified:
          "border-[#B45309]/30 bg-[#B45309]/10 text-[#B45309] font-semibold",
        needsHuman:
          "border-[#7A3438]/30 bg-[#7A3438]/10 text-[#7A3438] font-semibold",
        stripe:
          "border-[#7A3438]/30 bg-[#7A3438]/10 text-[#7A3438] font-semibold",
        copper:
          "border-[#C28C62]/40 bg-[#C28C62]/15 text-[#97643E] font-semibold",
        backlog:
          "border-[#DDD3C9] bg-[#EAE3D9] text-[#776F67]",
        inProgress:
          "border-[#C28C62]/40 bg-[#C28C62]/15 text-[#97643E] font-semibold",
        done:
          "border-[#7A3438]/30 bg-[#7A3438]/10 text-[#7A3438] font-semibold",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export function Badge({ className, variant, ...props }) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

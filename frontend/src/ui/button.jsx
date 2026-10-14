import React from "react"
import { cva } from "class-variance-authority"
import { cn } from "../lib/utils"

export const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md font-manrope text-sm font-semibold transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7A3438]/30 disabled:pointer-events-none disabled:opacity-50 cursor-pointer select-none active:scale-[0.98] tracking-tight",
  {
    variants: {
      variant: {
        default:
          "bg-[#7A3438] text-white shadow-xs hover:bg-[#672B2F] active:bg-[#562327] border border-[#7A3438]",
        secondary:
          "bg-[#EAE3D9] text-[#302925] border border-[#DDD3C9] hover:bg-[#DDD3C9] hover:text-[#302925]",
        copper:
          "bg-[#C28C62] text-white hover:bg-[#AC774E] active:bg-[#97643E] shadow-xs border border-[#C28C62]",
        outline:
          "border border-[#DDD3C9] bg-[#FFFCF8] text-[#302925] hover:bg-[#F2EEE8] hover:border-[#C28C62] shadow-2xs",
        ghost:
          "text-[#776F67] hover:text-[#302925] hover:bg-[#EAE3D9]/50",
        destructive:
          "bg-[#991B1B] text-white hover:bg-[#831818] shadow-xs",
        success:
          "bg-[#2E7D32] text-white hover:bg-[#256629] shadow-xs",
        link:
          "text-[#7A3438] underline-offset-4 hover:underline p-0 h-auto font-medium",
        stripeDark:
          "bg-[#302925] text-white hover:bg-[#221D1A] shadow-xs",
      },
      size: {
        default: "h-8.5 px-3.5 py-1.5 text-sm",
        sm: "h-7.5 rounded px-2.5 text-xs font-medium",
        lg: "h-10 rounded-md px-5 text-base font-semibold",
        icon: "h-8 w-8",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export const Button = React.forwardRef(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

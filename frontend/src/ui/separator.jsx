import React from "react"
import { cn } from "../lib/utils"

export function Separator({ className, orientation = "horizontal", ...props }) {
  return (
    <div
      className={cn(
        "shrink-0 bg-slate-800/80",
        orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]",
        className
      )}
      {...props}
    />
  )
}

export function Avatar({ src, alt, fallback, className, size = "md" }) {
  const sizeClasses = {
    xs: "h-4 w-4 text-[9px]",
    sm: "h-5 w-5 text-[10px]",
    md: "h-7 w-7 text-xs",
    lg: "h-9 w-9 text-sm",
  }

  const [hasError, setHasError] = React.useState(false)

  return (
    <div
      className={cn(
        "relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full border border-slate-700/60 bg-slate-800 font-medium text-slate-300",
        sizeClasses[size] || sizeClasses.md,
        className
      )}
    >
      {src && !hasError ? (
        <img
          src={src}
          alt={alt || ""}
          className="h-full w-full object-cover"
          onError={() => setHasError(true)}
        />
      ) : (
        <span>{fallback || (alt ? alt.slice(0, 2).toUpperCase() : "?")}</span>
      )}
    </div>
  )
}

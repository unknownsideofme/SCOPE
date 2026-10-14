import React from "react"
import { formatCurrency, cn } from "../lib/utils"

export function MoneyText({ amountInCents = 0, currency = "USD", size = "default", className }) {
  const formatted = formatCurrency(amountInCents, currency)

  const sizeClasses = {
    sm: "text-sm font-medium",
    default: "text-base font-semibold",
    lg: "text-xl font-bold tracking-tight",
    xl: "text-3xl font-extrabold tracking-tight",
  }

  return (
    <span
      className={cn(
        "font-mono text-[#302925] tabular-nums tracking-tight",
        sizeClasses[size] || sizeClasses.default,
        className
      )}
    >
      {formatted}
    </span>
  )
}

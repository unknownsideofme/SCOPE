import React from "react"
import { CheckCircle2, XCircle, AlertTriangle, HelpCircle, Clock, Check } from "lucide-react"
import { Badge } from "../ui/badge"
import { cn } from "../lib/utils"

export function StatusBadge({ status, className }) {
  const normStatus = (status || "").toLowerCase().trim()

  switch (normStatus) {
    case "met":
    case "passed":
      return (
        <Badge variant="met" className={cn("gap-1.5 font-inter text-xs font-semibold", className)}>
          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
          <span>Met</span>
        </Badge>
      )
    case "not met":
    case "failed":
      return (
        <Badge variant="notMet" className={cn("gap-1.5 font-inter text-xs font-semibold", className)}>
          <XCircle className="h-3.5 w-3.5 text-rose-600" />
          <span>Not met</span>
        </Badge>
      )
    case "unverified":
    case "pending":
      return (
        <Badge variant="unverified" className={cn("gap-1.5 font-inter text-xs font-semibold", className)}>
          <AlertTriangle className="h-3.5 w-3.5 text-amber-600" />
          <span>Unverified</span>
        </Badge>
      )
    case "needs human":
    case "needs_human":
      return (
        <Badge variant="needsHuman" className={cn("gap-1.5 font-inter text-xs font-semibold", className)}>
          <HelpCircle className="h-3.5 w-3.5 text-sky-600" />
          <span>Needs human</span>
        </Badge>
      )
    case "in progress":
    case "in_progress":
      return (
        <Badge variant="inProgress" className={cn("gap-1.5 font-inter text-xs font-semibold", className)}>
          <Clock className="h-3.5 w-3.5 text-amber-600" />
          <span>In progress</span>
        </Badge>
      )
    case "ready for approval":
      return (
        <Badge variant="met" className={cn("gap-1.5 font-inter text-xs font-semibold", className)}>
          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
          <span>Ready for Approval</span>
        </Badge>
      )
    case "backlog":
      return (
        <Badge variant="backlog" className={cn("gap-1.5 font-inter text-xs font-semibold", className)}>
          <Clock className="h-3.5 w-3.5 text-slate-500" />
          <span>Backlog</span>
        </Badge>
      )
    case "done":
    case "released":
      return (
        <Badge variant="done" className={cn("gap-1.5 font-inter text-xs font-semibold", className)}>
          <Check className="h-3.5 w-3.5 text-purple-600" />
          <span>Done</span>
        </Badge>
      )
    default:
      return (
        <Badge variant="default" className={cn("font-inter text-xs font-semibold", className)}>
          <span>{status}</span>
        </Badge>
      )
  }
}

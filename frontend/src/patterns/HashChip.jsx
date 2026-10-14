import React, { useState } from "react"
import { Copy, Check, GitCommit } from "lucide-react"
import { cn, formatShortHash } from "../lib/utils"

export function HashChip({ hash, length = 7, showCommitIcon = false, className }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = (e) => {
    e.stopPropagation()
    if (!hash) return
    navigator.clipboard?.writeText(hash)
    setCopied(true)
    setTimeout(() => setCopied(false), 1600)
  }

  if (!hash || hash === "-") return <span className="text-[#776F67] font-mono text-sm">-</span>

  const display = formatShortHash(hash, length)

  return (
    <button
      type="button"
      onClick={handleCopy}
      title={`Click to copy: ${hash}`}
      className={cn(
        "inline-flex items-center gap-1.5 rounded bg-[#EAE3D9] px-2 py-0.5 font-mono text-xs font-medium text-[#302925] border border-[#DDD3C9] hover:border-[#C28C62] hover:bg-[#DDD3C9] transition-all cursor-pointer group shadow-2xs",
        className
      )}
    >
      {showCommitIcon && <GitCommit className="h-3.5 w-3.5 text-[#776F67] group-hover:text-[#7A3438]" />}
      <span>{display}</span>
      {copied ? (
        <Check className="h-3 w-3 text-[#236B2B]" />
      ) : (
        <Copy className="h-3 w-3 text-[#776F67] opacity-0 group-hover:opacity-100 transition-opacity" />
      )}
    </button>
  )
}

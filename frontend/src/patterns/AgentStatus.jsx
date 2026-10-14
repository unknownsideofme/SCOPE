import React, { Component } from "react"
import { ThinkingOrb } from "thinking-orbs"
import { cn } from "../lib/utils"

const STATE_MAP = {
  verifying: "solving",
  solving: "solving",
  testing: "solving",
  searching: "searching",
  fetching: "searching",
  composing: "composing",
  reporting: "composing",
  shaping: "shaping",
  drafting: "shaping",
  working: "working",
  waiting: "working",
  listening: "listening",
  connecting: "connecting",
  weaving: "weaving",
  breathing: "breathing",
}

class OrbErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error, info) {
    console.warn("ThinkingOrb fallback engaged:", error)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex h-5 w-5 items-center justify-center">
          <span className="h-2.5 w-2.5 rounded-full bg-[#7A3438] animate-ping" />
        </div>
      )
    }
    return this.props.children
  }
}

export function AgentStatus({
  state = "solving",
  label,
  sublabel,
  size = 20,
  speed = 1.2,
  className,
  showLabel = true,
}) {
  const resolvedState = STATE_MAP[state] || "solving"

  // thinking-orbs only supports 20 or 64 as presets.
  const nativePreset = size > 40 ? 64 : 20
  const scale = size / nativePreset

  return (
    <div
      className={cn("inline-flex items-center gap-2", className)}
      role="status"
      aria-live="polite"
    >
      <div
        className="relative shrink-0 flex items-center justify-center overflow-visible"
        style={{
          width: size,
          height: size,
        }}
      >
        <div
          style={{
            width: nativePreset,
            height: nativePreset,
            transform: scale !== 1 ? `scale(${scale})` : undefined,
            transformOrigin: "center center",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <OrbErrorBoundary>
            <ThinkingOrb
              state={resolvedState}
              size={nativePreset}
              speed={speed}
              theme="light"
              aria-label={label || `Agent status: ${resolvedState}`}
            />
          </OrbErrorBoundary>
        </div>
      </div>

      {showLabel && (label || sublabel) && (
        <div className="flex flex-col text-left">
          {label && (
            <span className="text-sm font-semibold text-[#302925] tracking-tight leading-snug">
              {label}
            </span>
          )}
          {sublabel && (
            <span className="text-xs text-[#776F67] font-mono mt-0.5 leading-snug">
              {sublabel}
            </span>
          )}
        </div>
      )}
    </div>
  )
}

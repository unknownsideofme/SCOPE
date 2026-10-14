import React, { useState } from "react"
import { Cpu, CheckCircle2, Sparkles, Shield, ArrowRight } from "lucide-react"
import { AgentStatus } from "../../patterns/AgentStatus"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../../ui/card"
import { Badge } from "../../ui/badge"

const ORB_CONFIGS = [
  {
    state: "solving",
    name: "Solving",
    useCase: "A2 Requirement Coverage & A4 Mutation Testing",
    description: "Evaluates AST abstract syntax trees, compiles mutation test runs, and calculates surviving mutants.",
  },
  {
    state: "searching",
    name: "Searching",
    useCase: "Artifact Ingestion & Repository Sync",
    description: "Fetches pinned Git commit trees, CI test reports, and Cobertura/Istanbul coverage maps.",
  },
  {
    state: "composing",
    name: "Composing",
    useCase: "A9 Adjudication & Evidence Bundle Generation",
    description: "Synthesizes deterministic results into cryptographic SHA-256 evidence records with exact citations.",
  },
  {
    state: "shaping",
    name: "Shaping",
    useCase: "A1 Spec Compiler & Ambiguity Detection",
    description: "Analyzes natural language milestone deliverables and compiles bounded, testable acceptance criteria.",
  },
  {
    state: "working",
    name: "Working",
    useCase: "A8 Provenance Audit & CI Webhook Gating",
    description: "Continuous health check and runner execution in isolated zero-trust sandbox containers.",
  },
]

export function AgentOrbShowcase() {
  const [activeOrbState, setActiveOrbState] = useState("solving")

  return (
    <section id="orbs" className="py-20 border-t border-[#DDD3C9] bg-[#F2EEE8]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* Section title */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <Badge variant="stripe" className="mb-3 text-xs font-semibold py-1 px-3">
            https://libraries.dev/orbs Integration
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#302925] font-space">
            Visual agent status powered by Thinking Orbs
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#776F67] leading-relaxed font-dmsans">
            Canvas-rendered dotted orbs communicating exact agent activity without generic spinners. Strictly wrapped in a decoupled pattern.
          </p>
        </div>

        {/* Interactive Orb Display Card */}
        <div className="mx-auto max-w-4xl rounded-2xl border border-[#DDD3C9] bg-[#FFFCF8] p-6 sm:p-8 shadow-sm">
          <div className="flex flex-col md:flex-row items-center gap-8 justify-between">
            {/* Left large orb visual */}
            <div className="flex flex-col items-center justify-center p-6 rounded-xl bg-[#F2EEE8] border border-[#DDD3C9] w-full md:w-64 h-64 shrink-0 shadow-inner">
              <AgentStatus
                state={activeOrbState}
                size={72}
                speed={1.4}
                showLabel={false}
              />
              <span className="mt-4 font-mono text-sm uppercase tracking-wider text-[#7A3438] font-bold">
                state: "{activeOrbState}"
              </span>
            </div>

            {/* Right state switchers */}
            <div className="flex-1 space-y-3.5 w-full font-inter">
              <div className="text-sm font-bold text-[#302925] mb-2 font-manrope">
                Select Semantic Agent State:
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {ORB_CONFIGS.map((orb) => {
                  const isSelected = activeOrbState === orb.state
                  return (
                    <button
                      key={orb.state}
                      onClick={() => setActiveOrbState(orb.state)}
                      className={`flex items-start gap-3 p-3.5 rounded-lg border text-left text-xs transition-all cursor-pointer ${
                        isSelected
                          ? "bg-[#7A3438]/10 border-[#7A3438] shadow-2xs font-medium"
                          : "bg-[#FFFCF8] border-[#DDD3C9] hover:bg-[#F2EEE8] hover:border-[#C28C62]"
                      }`}
                    >
                      <AgentStatus state={orb.state} size={18} showLabel={false} />
                      <div>
                        <div className="font-bold text-sm text-[#302925] capitalize font-manrope">
                          {orb.name}
                        </div>
                        <div className="text-xs text-[#776F67] mt-1 line-clamp-1">
                          {orb.useCase}
                        </div>
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

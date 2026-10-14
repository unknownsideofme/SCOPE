import React, { useState } from "react"
import { ArrowRight, Play, ShieldCheck, CheckCircle2, Terminal, ExternalLink, Sparkles, Layers } from "lucide-react"
import { Button } from "../../ui/button"
import { Badge } from "../../ui/badge"
import { AgentStatus } from "../../patterns/AgentStatus"
import { HashChip } from "../../patterns/HashChip"

export function HeroSection({ onOpenWorkspace, onOpenAuth }) {
  const [demoState, setDemoState] = useState("solving")
  const [demoStep, setDemoStep] = useState("Running AST Coverage & Stryker Mutation Checks...")

  const cycleDemo = () => {
    setDemoState("searching")
    setDemoStep("Fetching pinned commit tree & CI test artifacts...")
    setTimeout(() => {
      setDemoState("solving")
      setDemoStep("Running Stryker mutation engine on touched modules...")
    }, 1400)
    setTimeout(() => {
      setDemoState("composing")
      setDemoStep("Generating tamper-evident evidence bundle (SHA-256 verified)...")
    }, 2800)
  }

  return (
    <section className="relative overflow-hidden pt-14 pb-20 md:pt-20 md:pb-28 bg-gradient-to-b from-[#F2EEE8] via-[#FFFCF8] to-[#FFFCF8]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 text-center">
        {/* Linear style announcement pill */}
        <div className="inline-flex items-center gap-2.5 rounded-full border border-[#DDD3C9] bg-[#FFFCF8] px-4 py-1.5 text-xs sm:text-sm text-[#302925] shadow-xs mb-8 hover:border-[#C28C62] transition-colors cursor-pointer font-manrope font-medium">
          <span className="flex h-2 w-2 rounded-full bg-[#7A3438]" />
          <span>Independent Acceptance-Audit Platform</span>
          <span className="text-[#DDD3C9]">·</span>
          <span className="text-[#7A3438] font-bold flex items-center gap-1">
            Read Architecture Guide <ArrowRight className="h-3.5 w-3.5" />
          </span>
        </div>

        {/* Headline with Space Grotesk matching reference */}
        <h1 className="mx-auto max-w-4xl text-4xl font-extrabold tracking-tight text-[#302925] sm:text-6xl md:text-7xl leading-[1.08] font-space">
          Deliver on{" "}
          <span className="text-[#7A3438]">
            what was agreed.
          </span>
        </h1>

        {/* Subtitle with DM Sans */}
        <p className="mx-auto mt-6 max-w-2xl text-base sm:text-lg md:text-xl text-[#776F67] leading-relaxed font-dmsans font-normal">
          A shared record of requirements, evidence and approval. Two-party signed milestone specs with autonomous auditing agents for deterministic code, test mutation, and runtime proof.
        </p>

        {/* Primary Call to Action Buttons */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Button
            size="lg"
            onClick={onOpenWorkspace}
            className="bg-[#7A3438] hover:bg-[#672B2F] text-white font-manrope font-semibold px-6 h-11 gap-2.5 text-sm sm:text-base shadow-md cursor-pointer"
          >
            <span>Launch Milestone Workspace</span>
            <span className="rounded bg-black/20 px-1.5 py-0.5 text-xs font-mono text-white">
              ⌘K
            </span>
          </Button>

          <Button
            variant="outline"
            size="lg"
            onClick={() => onOpenAuth("signup")}
            className="border-[#DDD3C9] bg-[#FFFCF8] text-[#302925] hover:bg-[#F2EEE8] font-manrope font-semibold text-sm sm:text-base px-6 h-11 cursor-pointer"
          >
            Connect Repository & Spec
          </Button>
        </div>

        {/* Interactive Hero Preview Card */}
        <div className="mx-auto mt-14 max-w-4xl rounded-xl border border-[#DDD3C9] bg-[#FFFCF8] p-2 sm:p-3 shadow-xl text-left">
          {/* Card browser chrome bar */}
          <div className="flex items-center justify-between border-b border-[#DDD3C9] px-3 py-2 text-xs bg-[#F2EEE8] rounded-t-lg">
            <div className="flex items-center gap-2">
              <div className="flex gap-1.5">
                <div className="h-2.5 w-2.5 rounded-full bg-[#DDD3C9]" />
                <div className="h-2.5 w-2.5 rounded-full bg-[#DDD3C9]" />
                <div className="h-2.5 w-2.5 rounded-full bg-[#DDD3C9]" />
              </div>
              <span className="ml-2 font-mono text-xs text-[#776F67]">
                scopeflow.dev/workspace/node-dep-resolver
              </span>
            </div>

            <div className="flex items-center gap-2.5">
              <Button
                variant="ghost"
                size="sm"
                onClick={cycleDemo}
                className="h-7 text-xs text-[#776F67] hover:text-[#302925] gap-1.5 font-medium"
              >
                <Play className="h-3 w-3 text-[#7A3438]" />
                Cycle Agent States
              </Button>
              <Badge variant="stripe" className="text-xs font-mono py-0.5 px-2">
                Verified v1.2
              </Badge>
            </div>
          </div>

          {/* Interactive Hero Content */}
          <div className="p-4 sm:p-5 space-y-4 bg-[#FFFCF8] font-inter">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#F2EEE8]/60 p-4 rounded-lg border border-[#DDD3C9]">
              <div className="flex items-center gap-3">
                {/* Thinking Orb */}
                <AgentStatus
                  state={demoState}
                  size={32}
                  showLabel={false}
                />
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-[#302925] font-manrope">
                      Criterion 1: Deterministic lockfile graph resolver
                    </span>
                    <span className="rounded bg-[#236B2B]/10 text-[#236B2B] border border-[#236B2B]/20 px-2 py-0.5 text-xs font-semibold">
                      Met
                    </span>
                  </div>
                  <p className="text-xs text-[#776F67] font-mono mt-1">{demoStep}</p>
                </div>
              </div>

              <div className="flex items-center gap-2 font-mono text-xs">
                <span className="text-[#776F67] font-medium">Evidence SHA:</span>
                <HashChip hash="sha256:4a8b7c9d0e1f2a3b4c5d" length={8} />
              </div>
            </div>

            {/* Quick stats grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div className="rounded-md bg-[#F2EEE8]/60 p-3 border border-[#DDD3C9]">
                <span className="text-xs text-[#776F67] block mb-0.5 font-medium">Diff Coverage</span>
                <span className="font-mono font-bold text-sm sm:text-base text-[#236B2B]">96.4% Line</span>
              </div>
              <div className="rounded-md bg-[#F2EEE8]/60 p-3 border border-[#DDD3C9]">
                <span className="text-xs text-[#776F67] block mb-0.5 font-medium">Mutation Score</span>
                <span className="font-mono font-bold text-sm sm:text-base text-[#302925]">84.2% Stryker</span>
              </div>
              <div className="rounded-md bg-[#F2EEE8]/60 p-3 border border-[#DDD3C9]">
                <span className="text-xs text-[#776F67] block mb-0.5 font-medium">Anti-Gaming Check</span>
                <span className="font-mono font-bold text-sm sm:text-base text-[#236B2B]">0 Mock Bypasses</span>
              </div>
              <div className="rounded-md bg-[#F2EEE8]/60 p-3 border border-[#DDD3C9]">
                <span className="text-xs text-[#776F67] block mb-0.5 font-medium">Escrow Status</span>
                <span className="font-mono font-bold text-sm sm:text-base text-[#7A3438]">$4,500 Approved</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

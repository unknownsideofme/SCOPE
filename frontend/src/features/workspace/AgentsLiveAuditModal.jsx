import React, { useState } from "react"
import { Shield, Play, Terminal, CheckCircle2, RotateCw, X, Layers, Cpu } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "../../ui/dialog"
import { Button } from "../../ui/button"
import { Badge } from "../../ui/badge"
import { AgentStatus } from "../../patterns/AgentStatus"
import { mockAuditAgents } from "../../lib/mockData"

export function AgentsLiveAuditModal({ open, onClose }) {
  const [agents, setAgents] = useState(mockAuditAgents)
  const [isRunningAll, setIsRunningAll] = useState(false)
  const [activeConsoleLog, setActiveConsoleLog] = useState(
    `[ORCHESTRATOR] ScopeFlow multi-agent sandbox initialized.
[A2 Coverage] AST graph indexed 142 functions across 8 modules.
[A3 Istanbul] Diff coverage computed: 96.4% on touched lines.
[A4 Stryker] 57 mutants spawned in test container -> 48 killed (84.2%).
[A7 Anti-Gaming] AST scanner completed: 0 mock bypasses or skipped assertions.
[STATUS] Ready to trigger interactive re-verification.`
  )

  const handleRunAll = () => {
    setIsRunningAll(true)
    setActiveConsoleLog((prev) => `${prev}\n\n[DISPATCH] Spawning isolated sandboxes for A1-A8...`)

    setAgents((prev) =>
      prev.map((a) => ({ ...a, status: "running", orbState: "solving" }))
    )

    setTimeout(() => {
      setActiveConsoleLog((prev) => `${prev}\n[A1 Spec Compiler] Rubric verified. All criteria bounded.`)
    }, 1200)

    setTimeout(() => {
      setActiveConsoleLog((prev) => `${prev}\n[A3 Istanbul] Coverage re-checked: diff-coverage 96.4% OK.`)
    }, 2400)

    setTimeout(() => {
      setActiveConsoleLog((prev) => `${prev}\n[A7 Anti-Gaming] Zero assertions bypassed.`)
      setAgents((prev) =>
        prev.map((a) => ({ ...a, status: "completed", orbState: "working" }))
      )
      setIsRunningAll(false)
    }, 3800)
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent onClose={onClose} className="max-w-3xl bg-[#FFFCF8] border-[#DDD3C9] text-[#302925]">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-md bg-[#7A3438]/10 text-[#7A3438] border border-[#7A3438]/20">
                <Cpu className="h-4 w-4" />
              </div>
              <div>
                <DialogTitle>Multi-Agent Acceptance Auditing Sandbox</DialogTitle>
                <DialogDescription>
                  Autonomous auditing agents gathering deterministic code and runtime evidence.
                </DialogDescription>
              </div>
            </div>

            <Button
              variant="default"
              size="sm"
              onClick={handleRunAll}
              disabled={isRunningAll}
              className="text-sm font-semibold font-manrope bg-[#7A3438] hover:bg-[#672B2F] text-white gap-2 h-9 px-3.5 cursor-pointer"
            >
              <RotateCw className={`h-3.5 w-3.5 ${isRunningAll ? "animate-spin" : ""}`} />
              <span>{isRunningAll ? "Running Audits..." : "Run All 8 Agents"}</span>
            </Button>
          </div>
        </DialogHeader>

        {/* 8 Agent Cards with Thinking Orbs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 my-4 max-h-[420px] overflow-y-auto pr-1 font-inter">
          {agents.map((agent) => (
            <div
              key={agent.id}
              className="rounded-lg border border-[#DDD3C9] bg-[#F2EEE8]/60 p-3.5 text-xs space-y-2.5 hover:border-[#C28C62] transition-colors"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-[#7A3438] bg-[#7A3438]/10 px-1.5 py-0.5 rounded">
                    {agent.id}
                  </span>
                  <span className="font-bold text-sm text-[#302925] font-manrope">{agent.name}</span>
                </div>
                {/* Thinking Orb */}
                <AgentStatus
                  state={agent.orbState}
                  size={20}
                  showLabel={false}
                />
              </div>

              <p className="text-xs sm:text-sm text-[#776F67] leading-snug">
                "{agent.question}"
              </p>

              <div className="flex items-center justify-between pt-1.5 border-t border-[#DDD3C9] text-xs text-[#776F67]">
                <span className="font-mono font-medium">{agent.method}</span>
                <span className="text-[#236B2B] font-bold">{agent.badge}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Console Log Terminal */}
        <div className="rounded-md bg-[#302925] border border-[#302925] p-3.5 font-mono text-xs text-[#F2EEE8] whitespace-pre max-h-36 overflow-y-auto shadow-inner leading-relaxed">
          {activeConsoleLog}
        </div>
      </DialogContent>
    </Dialog>
  )
}

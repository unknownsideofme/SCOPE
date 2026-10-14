import React, { useState } from "react"
import {
  X,
  ShieldCheck,
  CheckCircle2,
  FileText,
  Clock,
  GitCommit,
  Lock,
  MessageSquare,
  AlertTriangle,
  Play,
  Share2,
} from "lucide-react"
import { Button } from "../../ui/button"
import { Badge } from "../../ui/badge"
import { StatusBadge } from "../../patterns/StatusBadge"
import { HashChip } from "../../patterns/HashChip"
import { MoneyText } from "../../patterns/MoneyText"
import { AgentStatus } from "../../patterns/AgentStatus"
import { EvidenceCard } from "../../patterns/EvidenceCard"
import { ApprovalBar } from "../../patterns/ApprovalBar"
import { EvidenceCarousel } from "../../patterns/EvidenceCarousel"
import { cn } from "../../lib/utils"

export function MilestoneDetailDrawer({
  milestone,
  selectedCriterion,
  onClose,
  onApproveRelease,
  onRequestChanges,
  onDispute,
  activeRole,
}) {
  const [activeTab, setActiveTab] = useState("spec")
  const [currentCriterion, setCurrentCriterion] = useState(
    selectedCriterion || milestone?.criteria?.[0]
  )
  const [isSimulatingAudit, setIsSimulatingAudit] = useState(false)
  const [auditProgressState, setAuditProgressState] = useState("solving")

  if (!milestone) return null

  const handleRunAudit = () => {
    setIsSimulatingAudit(true)
    setAuditProgressState("searching")
    setTimeout(() => setAuditProgressState("solving"), 1500)
    setTimeout(() => setAuditProgressState("composing"), 3200)
    setTimeout(() => {
      setIsSimulatingAudit(false)
      if (currentCriterion) {
        currentCriterion.status = "Met"
      }
    }, 4500)
  }

  const carouselItems = [
    {
      title: "Playwright E2E Trace: Retry & Backoff",
      type: "Browser Trace Frame",
      agent: "A5 Behaviour Auditor",
      sha: "sha256:9f8a2c1e",
      timestamp: "18:22:10 UTC",
      content: `[RUNNER] Launching Chromium in isolated sandbox...
[E2E] Navigating to http://staging.internal:8080/v1/packages
[NET] Injecting 429 Too Many Requests header...
[ASSERT] Verified backoff interval: 2012ms +/- 50ms (PASS)
[ASSERT] Secondary registry mirror fallback initiated (PASS)
Screenshot frame captured: #trace-frame-004.png`,
    },
    {
      title: "Istanbul Diff Coverage Report",
      type: "Coverage Artifact",
      agent: "A3 Test Coverage Auditor",
      sha: "sha256:4a8b7c9d",
      timestamp: "18:24:45 UTC",
      content: `File: src/resolver/graph.ts
Lines changed in commit: 142
Lines covered by tests: 137
Diff coverage: 96.47% (Threshold: 85.00%)
Uncovered lines: 88, 102-104 (Non-critical error handling)`,
    },
  ]

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-[#302925]/40 backdrop-blur-xs animate-in fade-in duration-150">
      <div
        className="fixed inset-0 -z-10"
        onClick={onClose}
      />

      {/* Two-Pane Drawer Panel */}
      <div className="flex h-full w-full max-w-5xl flex-col bg-[#FFFCF8] border-l border-[#DDD3C9] text-[#302925] shadow-2xl">
        {/* Top Drawer Header */}
        <div className="flex items-center justify-between border-b border-[#DDD3C9] px-6 py-4 bg-[#F2EEE8]">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-[#7A3438]/10 text-[#7A3438] border border-[#7A3438]/20">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-2.5">
                <h2 className="text-base sm:text-lg font-bold font-space text-[#302925]">{milestone.title}</h2>
                <Badge variant="stripe" className="text-xs font-mono py-0.5 px-2">
                  {milestone.specVersion}
                </Badge>
              </div>
              <p className="text-xs sm:text-sm text-[#776F67] mt-0.5">
                Two-Party Milestone Agreement & Evidence Audit
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={handleRunAudit}
              disabled={isSimulatingAudit}
              className="text-xs sm:text-sm font-semibold font-manrope gap-2 border-[#DDD3C9] bg-[#FFFCF8] hover:bg-[#F2EEE8] text-[#302925] h-9 px-3"
            >
              {isSimulatingAudit ? (
                <>
                  <AgentStatus state={auditProgressState} size={16} showLabel={false} />
                  <span>Auditing...</span>
                </>
              ) : (
                <>
                  <Play className="h-3.5 w-3.5 text-[#7A3438] fill-[#7A3438]" />
                  <span>Trigger Multi-Agent Re-Audit</span>
                </>
              )}
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="h-8.5 w-8.5 text-[#776F67] hover:text-[#302925] cursor-pointer"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Content Body: Two Pane Layout */}
        <div className="grid flex-1 grid-cols-1 md:grid-cols-12 overflow-hidden font-inter">
          {/* Left Pane: Agreed Spec & Criteria List */}
          <div className="md:col-span-5 border-r border-[#DDD3C9] p-5 overflow-y-auto space-y-4 bg-[#F2EEE8]/50">
            {/* Signed Two-Party Contract Card */}
            <div className="rounded-lg border border-[#DDD3C9] bg-[#FFFCF8] p-4 space-y-3 shadow-2xs">
              <div className="flex items-center justify-between text-sm">
                <span className="font-bold text-[#302925] font-manrope">Contract Integrity</span>
                <span className="text-[#236B2B] font-mono text-xs flex items-center gap-1.5 font-semibold">
                  <CheckCircle2 className="h-3.5 w-3.5" /> Signed & Immutable
                </span>
              </div>

              <div className="space-y-2 text-xs text-[#776F67] border-t border-[#DDD3C9]/60 pt-2.5">
                <div className="flex items-center justify-between">
                  <span>Client Signature:</span>
                  <span className="text-[#302925] font-semibold">Sarah Chen (Signed)</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Developer Signature:</span>
                  <span className="text-[#302925] font-semibold">Alex Rivera (Signed)</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Spec SHA256:</span>
                  <HashChip hash="sha256:7e8d2c94a5b06f...3e91" length={10} />
                </div>
              </div>
            </div>

            {/* Criteria Selector List */}
            <div>
              <div className="flex items-center justify-between mb-2.5">
                <span className="text-sm font-bold text-[#302925] font-manrope">
                  Acceptance Criteria ({milestone.criteria.length})
                </span>
                <span className="text-xs text-[#776F67] font-mono">Click to inspect</span>
              </div>

              <div className="space-y-2.5">
                {milestone.criteria.map((c) => {
                  const isSelected = currentCriterion?.id === c.id
                  return (
                    <div
                      key={c.id}
                      onClick={() => setCurrentCriterion(c)}
                      className={cn(
                        "rounded-lg border p-3.5 cursor-pointer transition-all text-xs",
                        isSelected
                          ? "border-[#7A3438] bg-[#7A3438]/5 shadow-2xs font-medium"
                          : "border-[#DDD3C9] bg-[#FFFCF8] hover:bg-[#EAE3D9]/50 hover:border-[#C28C62]"
                      )}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-mono text-xs text-[#776F67] font-medium">#{c.id}</span>
                        <StatusBadge status={c.status} />
                      </div>
                      <p className="text-[#302925] text-sm font-semibold leading-snug line-clamp-2">
                        {c.title}
                      </p>
                      <div className="mt-2.5 flex items-center justify-between text-xs text-[#776F67] border-t border-[#DDD3C9]/60 pt-2">
                        <span className="font-medium">{c.method}</span>
                        <span className="font-mono">{c.blocking ? "Blocking" : "Optional"}</span>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Right Pane: Evidence & Live Agent Status */}
          <div className="md:col-span-7 p-6 overflow-y-auto space-y-6 bg-[#FFFCF8]">
            {isSimulatingAudit && (
              <div className="rounded-lg border border-[#7A3438]/30 bg-[#7A3438]/5 p-4 flex items-center justify-between shadow-2xs">
                <AgentStatus
                  state={auditProgressState}
                  label="Multi-Agent Audit Running"
                  sublabel="Auditing code, coverage, AST integrity, and container traces..."
                  size={32}
                />
                <span className="text-xs font-mono text-[#7A3438] font-bold animate-pulse">Running checks</span>
              </div>
            )}

            {currentCriterion ? (
              <div className="space-y-5">
                {/* Criterion Header */}
                <div className="rounded-lg border border-[#DDD3C9] bg-[#F2EEE8]/60 p-5 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="rounded bg-[#EAE3D9] px-2.5 py-1 font-mono text-xs text-[#302925] font-bold border border-[#DDD3C9]">
                      {currentCriterion.id}
                    </span>
                    <StatusBadge status={currentCriterion.status} />
                  </div>

                  <h3 className="text-base sm:text-lg font-bold font-space text-[#302925] leading-tight">
                    {currentCriterion.title}
                  </h3>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-3 border-t border-[#DDD3C9] text-xs text-[#776F67]">
                    <div>
                      <span className="text-xs text-[#776F67] block mb-0.5">Verification Method</span>
                      <span className="font-semibold text-[#302925] text-sm">{currentCriterion.method}</span>
                    </div>
                    <div>
                      <span className="text-xs text-[#776F67] block mb-0.5">Severity</span>
                      <span className="font-semibold text-[#302925] text-sm">{currentCriterion.severity}</span>
                    </div>
                    <div>
                      <span className="text-xs text-[#776F67] block mb-0.5">Linked PR</span>
                      <span className="font-mono text-[#7A3438] font-bold text-sm">{currentCriterion.pr || "-"}</span>
                    </div>
                  </div>
                </div>

                {/* Evidence Card */}
                <div>
                  <h4 className="text-xs font-bold text-[#776F67] uppercase tracking-wider mb-2.5 font-manrope">
                    Neutral Verification Evidence
                  </h4>
                  <EvidenceCard
                    evidence={currentCriterion.evidence}
                    criterionTitle={currentCriterion.title}
                  />
                </div>

                {/* Evidence Carousel: Traces and Screen Captures */}
                <div>
                  <h4 className="text-xs font-bold text-[#776F67] uppercase tracking-wider mb-2.5 font-manrope">
                    Execution Traces & Visual Captures
                  </h4>
                  <EvidenceCarousel items={carouselItems} />
                </div>
              </div>
            ) : (
              <div className="flex h-64 items-center justify-center text-sm text-[#776F67]">
                Select an acceptance criterion on the left to inspect evidence.
              </div>
            )}
          </div>
        </div>

        {/* Sticky Approval Bar at Bottom */}
        <ApprovalBar
          milestone={milestone}
          onApprove={onApproveRelease}
          onRequestChanges={onRequestChanges}
          onDispute={onDispute}
        />
      </div>
    </div>
  )
}

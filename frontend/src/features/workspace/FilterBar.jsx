import React from "react"
import { Search, SlidersHorizontal, CheckCircle2, AlertTriangle, Layers, Filter } from "lucide-react"
import { Input } from "../../ui/input"
import { Button } from "../../ui/button"

export function FilterBar({ searchQuery, onSearchChange, activeFilter, onFilterChange }) {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-3 border-b border-[#DDD3C9] bg-[#F2EEE8] px-4 sm:px-6 py-2">
      {/* Search Input matching GitHub projects format */}
      <div className="relative w-full sm:w-[520px]">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#776F67]" />
        <Input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Filter by keyword or by field (e.g. status:open is:met pr:#18)..."
          className="pl-9 bg-[#FFFCF8] border-[#DDD3C9] text-[#302925] text-sm h-9 rounded-md placeholder:text-[#776F67] shadow-2xs font-inter"
        />
      </div>

      {/* Quick Filter chips and View settings */}
      <div className="flex items-center gap-2.5 w-full sm:w-auto justify-between sm:justify-end">
        <div className="flex items-center gap-1.5">
          {["all", "met", "in_progress", "unverified"].map((f) => (
            <button
              key={f}
              onClick={() => onFilterChange(f)}
              className={`rounded px-2.5 py-1 text-xs font-inter font-medium transition-all cursor-pointer ${
                activeFilter === f
                  ? "bg-[#EAE3D9] text-[#302925] border border-[#DDD3C9] shadow-2xs font-semibold"
                  : "text-[#776F67] hover:text-[#302925] hover:bg-[#DDD3C9]/50"
              }`}
            >
              {f === "all" ? "All" : f === "met" ? "Met" : f === "in_progress" ? "In Progress" : "Unverified"}
            </button>
          ))}
        </div>

        <div className="h-5 w-[1px] bg-[#DDD3C9]" />

        <Button variant="outline" size="sm" className="h-8.5 text-sm text-[#302925] gap-2 border-[#DDD3C9] bg-[#FFFCF8] font-manrope">
          <SlidersHorizontal className="h-3.5 w-3.5 text-[#776F67]" />
          <span>View</span>
        </Button>
      </div>
    </div>
  )
}

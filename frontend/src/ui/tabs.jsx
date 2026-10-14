import React, { createContext, useContext } from "react"
import { cn } from "../lib/utils"

const TabsContext = createContext({
  activeTab: "",
  setActiveTab: () => {},
})

export function Tabs({ defaultValue, value, onValueChange, className, children, ...props }) {
  const [currentTab, setCurrentTab] = React.useState(defaultValue || "")
  const activeTab = value !== undefined ? value : currentTab

  const handleTabChange = (val) => {
    if (value === undefined) {
      setCurrentTab(val)
    }
    onValueChange?.(val)
  }

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab: handleTabChange }}>
      <div className={cn("w-full", className)} {...props}>
        {children}
      </div>
    </TabsContext.Provider>
  )
}

export function TabsList({ className, children, ...props }) {
  return (
    <div
      className={cn(
        "inline-flex h-10 items-center justify-start rounded-md bg-[#EAE3D9] p-1 text-[#776F67] border border-[#DDD3C9]",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export function TabsTrigger({ value, className, children, ...props }) {
  const { activeTab, setActiveTab } = useContext(TabsContext)
  const isActive = activeTab === value

  return (
    <button
      type="button"
      onClick={() => setActiveTab(value)}
      className={cn(
        "inline-flex items-center justify-center whitespace-nowrap rounded font-manrope px-3.5 py-1 text-sm font-medium transition-all duration-150 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 cursor-pointer tracking-tight",
        isActive
          ? "bg-[#FFFCF8] text-[#302925] shadow-2xs border border-[#DDD3C9] font-semibold"
          : "text-[#776F67] hover:text-[#302925] hover:bg-[#DDD3C9]/50",
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}

export function TabsContent({ value, className, children, ...props }) {
  const { activeTab } = useContext(TabsContext)
  if (activeTab !== value) return null

  return (
    <div
      className={cn("mt-2 focus-visible:outline-none", className)}
      {...props}
    >
      {children}
    </div>
  )
}

"use client"

import { usePathname } from "next/navigation"
import { Menu } from "lucide-react"
import { Input } from "@/components/ui/input"
import { NotificationBell } from "@/features/notifications/components/notification-bell"
import { AvatarMenu } from "@/components/dashboard/avatar-menu"
import { useDashboardNav } from "@/components/dashboard/dashboard-nav-context"
import { navItems } from "@/components/dashboard/nav-items"

/** The current section's name, from the same list the sidebar renders. */
function usePageTitle() {
  const pathname = usePathname()
  return navItems.find((item) => !item.href.includes("#") && item.href === pathname)?.label ?? "Dashboard"
}

export function Topbar({
  name,
  email,
}: {
  name?: string | null
  email?: string | null
}) {
  const { setMobileNavOpen } = useDashboardNav()
  const title = usePageTitle()

  return (
    <header className="flex h-14 shrink-0 items-center gap-4 border-b bg-background px-4 print:hidden">
      <button
        type="button"
        aria-label="Toggle navigation"
        onClick={() => setMobileNavOpen(true)}
        className="inline-flex size-8 items-center justify-center rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground sm:hidden"
      >
        <Menu className="size-5" />
      </button>

      <h1 className="font-heading text-lg font-semibold">{title}</h1>

      <div className="flex-1">
        <Input
          type="search"
          placeholder="Search bookings, customers, stylists..."
          className="hidden max-w-sm sm:flex"
        />
      </div>

      <div className="flex items-center gap-3">
        <NotificationBell />
        <AvatarMenu name={name} email={email} />
      </div>
    </header>
  )
}

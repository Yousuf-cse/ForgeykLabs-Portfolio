import type { ReactNode } from "react"
import PageTransition from "@/components/page-transition"

export default function PortfolioLayout({ children }: { children: ReactNode }) {
  return (
    <PageTransition>
      {children}
    </PageTransition>
  )
}

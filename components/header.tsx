import Link from "next/link"
import { FlaskRoundIcon as Flask } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "./mode-toggle"

export default function Header() {
  return (
    <header className="border-b">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Flask className="h-6 w-6 text-primary" />
          <Link href="/" className="text-xl font-bold">
            Drug Discovery Assistant
          </Link>
        </div>
        <nav className="hidden md:flex items-center gap-6">
          <Link href="/" className="text-sm font-medium hover:underline underline-offset-4">
            Home
          </Link>
          <Link href="/about" className="text-sm font-medium hover:underline underline-offset-4">
            About
          </Link>
          <Link href="/help" className="text-sm font-medium hover:underline underline-offset-4">
            Help/FAQs
          </Link>
        </nav>
        <div className="flex items-center gap-2">
          <ModeToggle />
          <Button variant="outline" size="sm" asChild className="hidden md:inline-flex">
            <Link href="/login">Login</Link>
          </Button>
        </div>
      </div>
    </header>
  )
}


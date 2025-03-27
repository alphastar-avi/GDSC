import Link from "next/link"

export default function Footer() {
  return (
    <footer className="border-t py-6 md:py-8">
      <div className="container flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} Drug Discovery Assistant. All rights reserved.
        </div>
        <nav className="flex flex-wrap gap-4 text-sm">
          <Link href="/terms" className="text-muted-foreground hover:underline">
            Terms of Service
          </Link>
          <Link href="/privacy" className="text-muted-foreground hover:underline">
            Privacy Policy
          </Link>
          <Link href="/contact" className="text-muted-foreground hover:underline">
            Contact
          </Link>
          <Link href="/documentation" className="text-muted-foreground hover:underline">
            Documentation
          </Link>
        </nav>
      </div>
    </footer>
  )
}


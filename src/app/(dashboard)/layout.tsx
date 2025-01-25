"use client"
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle } from "~/components/ui/sheet"
import { Button } from "~/components/ui/button"
import { Menu } from "lucide-react"
import Link from "next/link"
import dynamic from "next/dynamic"

const ThemeToggle = dynamic(() => import("~/components/theme-toogle").then((mod) => mod.ThemeToggle), {
  ssr: false,
})

const categories = [
  { name: "All Products", href: "/" },
  { name: "Hats", href: "/?category=hats" },
  { name: "T-Shirts", href: "/?category=t-shirts" },
  { name: "Accessories", href: "/?category=accessories" },
]

function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="w-full flex h-16 items-center px-4">
        {/* Mobile Menu */}
        <Sheet>
          <SheetTrigger asChild>
            <button className="md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </button>
          </SheetTrigger>
          <SheetContent side="left">
            <SheetHeader>
              <SheetTitle className="font-mono">Menu</SheetTitle>
            </SheetHeader>
            <div className="mt-4">
              <nav className="flex flex-col space-y-4">
                {categories.map((category) => (
                  <Link key={category.href} href={category.href} className="text-sm font-mono group">
                    {category.name}
                  </Link>
                ))}
              </nav>
              <hr className="border-t border-border my-4" />
              <div className="flex flex-col space-y-2">
                <Link href="/login" className="text-sm hover:text-accent">
                  Log in
                </Link>
                <Link href="/signup" className="text-sm hover:text-accent">
                  Sign up
                </Link>
              </div>
            </div>
          </SheetContent>
        </Sheet>
        {/* Logo and Desktop Menu */}
        <div className="flex w-full items-center justify-between gap-4">
          <div className="flex items-center space-x-4 ml-3">
            <Link href="/" className="font-bold font-mono text-2xl">
              @wqstore | tech bro
            </Link>
            <nav className="hidden md:flex items-center space-x-6">
              {categories.map((category) => (
                <Link key={category.href} href={category.href} className="text-sm font-mono relative group text-primary">
                  <span className="relative z-10 transition-colors duration-200 ease-in-out ">
                    {category.name}
                  </span>
                  <span className="absolute inset-x-0 bottom-0 h-0.5 bg-primary transform scale-x-0 transition-transform duration-200 ease-in-out origin-left group-hover:scale-x-100"></span>
                </Link>
              ))}
            </nav>
          </div>
          {/* Desktop Auth Buttons */}
          <div className="flex gap-4">
            <div className="hidden md:flex gap-2 items-center">
              <Button variant="ghost" size="sm">
                Log in
              </Button>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <section className="flex flex-col min-h-screen">
      <Header />
      {children}
    </section>
  )
}



"use client"
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle } from "~/components/ui/sheet"
import { Button } from "~/components/ui/button"
import { Menu } from "lucide-react"
import Link from "next/link"
import dynamic from "next/dynamic"
import CartSheet from "~/components/cart-sheet"

const ThemeToggle = dynamic(() => import("~/components/theme-toogle").then((mod) => mod.ThemeToggle), {
  ssr: false,
})

const categories = [
  { name: "all products", href: "/" },
  { name: "hats", href: "/?category=hats" },
  { name: "t-shirts", href: "/?category=t-shirts" },
  { name: "accessories", href: "/?category=accessories" },
]

function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 py-2">
      <div className="w-full flex h-14 items-center justify-between px-4 mx-auto">
        <div className="flex items-center gap-2 md:gap-12">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px]">
              <SheetHeader>
                <SheetTitle className="font-mono">Menu</SheetTitle>
              </SheetHeader>
              <nav className="mt-4 flex flex-col space-y-3">
                {categories.map((category) => (
                  <Link
                    key={category.href}
                    href={category.href}
                    className="text-sm font-mono transition-colors hover:text-foreground/80"
                  >
                    {category.name}
                  </Link>
                ))}
                <hr className="border-t" />
                <Link href="/login" className="text-sm transition-colors hover:text-foreground/80">
                  Log in
                </Link>
                <Link href="/signup" className="text-sm transition-colors hover:text-foreground/80">
                  Sign up
                </Link>
              </nav>
            </SheetContent>
          </Sheet>

          <Link href="/" className="flex items-center space-x-1 font-mono text-xl font-bold">
            <span>@wqstore | tech bro</span>
          </Link>
          <nav className="hidden md:flex items-center">
            {categories.map((category) => (
              <Link
                key={category.href}
                href={category.href}
                className="group relative font-mono text-foreground/70 transition-colors hover:text-foreground px-4"
              >
                <span className="relative text-base">
                  {category.name}
                  <span className="absolute inset-x-0 -bottom-0.5 h-px bg-foreground origin-left scale-x-0 transition-transform duration-200 group-hover:scale-x-100" />
                </span>
              </Link>
            ))}
          </nav>
        </div>



        <div className="flex items-center space-x-3">
          <CartSheet />
          <ThemeToggle />
          <Link href="/sign-in">
            <Button variant="ghost" className="hidden sm:block font-mono">
              sign in
            </Button>
          </Link>
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
      <footer className="border-t border-border/40 py-6 mt-12">
        <div className="container mx-auto flex flex-col items-center gap-4 px-4">
          <nav className="flex flex-row items-center gap-3 font-mono text-sm text-muted-foreground">
            <Link href="#">
              About
            </Link>
            <a href="#">
              Terms
            </a>
            <a href="#">
              Privacy
            </a>
            <a href="#">
              Contact
            </a>
          </nav>
          <p className="text-center font-mono text-sm text-muted-foreground">
            © 2025 @wqstore. All rights reserved.
          </p>

        </div>
      </footer>
    </section>
  )
}



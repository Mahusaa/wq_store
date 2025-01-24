'use client';

import Link from 'next/link';
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetDescription, SheetTitle } from '~/components/ui/sheet';
import { Button } from '~/components/ui/button';
import { CircleIcon, Home, LogOut, Menu } from 'lucide-react';


const categories = [
  { name: "All Products", href: "/" },
  { name: "Hats", href: "/?category=hats" },
  { name: "T-Shirts", href: "/?category=t-shirts" },
  { name: "Accessories", href: "/?category=accessories" },
]
function Header() {
  // const [isMenuOpen, setIsMenuOpen] = useState(false);
  // const { user, setUser } = useUser();
  // const router = useRouter();

  // async function handleSignOut() {
  //   setUser(null);
  //   await signOut();
  //   router.push('/');
  // }
  //
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
              <SheetDescription>
                <nav className="flex flex-col space-y-4">
                  {categories.map((category) => (
                    <Link
                      key={category.href}
                      href={category.href}
                      className="text-sm font-mono hover:text-accent"
                    >
                      {category.name}
                    </Link>
                  ))}
                </nav>
                {/* Horizontal rule separated outside of <p> */}
                <hr className="border-t border-border my-2" />
                <div>
                  <button className="justify-start p-0">
                    <Link href="/login" className="text-sm hover:text-accent">
                      Log in
                    </Link>
                  </button>
                  <button className="justify-start p-0">
                    <Link href="/signup" className="text-sm hover:text-accent">
                      Sign up
                    </Link>
                  </button>
                </div>
              </SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>
        {/* Logo and Desktop Menu */}
        <div className="flex w-full items-center justify-between gap-4">
          <div className="flex items-center space-x-4 ml-3">
            <Link href="/" className="text-xl font-bold font-mono">
              @wqstore
            </Link>
            <nav className="hidden md:flex items-center space-x-6">
              {categories.map((category) => (
                <Link
                  key={category.href}
                  href={category.href}
                  className="text-sm font-mono hover:text-accent"
                >
                  {category.name}
                </Link>
              ))}
            </nav>
          </div>
          {/* Desktop Auth Buttons */}
          <div className="flex gap-4">
            <div className="hidden md:flex gap-2">
              <Button variant="ghost" size="sm">
                Log in
              </Button>
              <Button size="sm">Sign up</Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <section className="flex flex-col min-h-screen">
      <Header />
      {children}
    </section>
  );
}

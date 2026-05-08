"use client";

import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-gradient-to-br from-indigo-500 to-purple-600">
              <span className="text-xs font-bold text-white">SS</span>
            </div>
            <span className="text-lg font-semibold">ShadowStack</span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              href="#features"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Features
            </Link>
            <Link
              href="#how-it-works"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              How It Works
            </Link>
            <Link
              href="#faq"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              FAQ
            </Link>
          </div>

          {/* CTA and Theme Toggle */}
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Link
              href="/audit"
              className="hidden sm:inline-flex px-4 py-2 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-sm font-medium transition-all hover:shadow-lg hover:shadow-indigo-500/20"
            >
              Audit Your Stack
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

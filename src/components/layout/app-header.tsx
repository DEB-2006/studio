
// src/components/layout/app-header.tsx
"use client";

import Link from 'next/link';
import { ChefHat, Heart, Home, LogIn, UserPlus } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

export function AppHeader() {
  const pathname = usePathname();

  // For now, we assume the user is not logged in.
  // In a real app, you'd have a state to check if the user is authenticated.
  const isAuthenticated = false; 

  const navItems = [
    { href: '/', label: 'Home', icon: Home, showAlways: true },
    { href: '/favorites', label: 'Favorites', icon: Heart, showAlways: true },
  ];

  const authNavItems = [
    { href: '/auth/login', label: 'Login', icon: LogIn, showIfUnauthenticated: true },
    { href: '/auth/register', label: 'Sign Up', icon: UserPlus, showIfUnauthenticated: true },
    // Example: Add a Logout button if authenticated
    // { href: '#', label: 'Logout', icon: LogOut, showIfAuthenticated: true, onClick: () => {} },
  ];

  return (
    <header className="bg-card border-b border-border sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" aria-label="SnapRecipe Home" className="flex items-center text-primary hover:text-accent transition-colors">
          <ChefHat size={32} />
        </Link>
        <nav className="flex items-center gap-1 sm:gap-2">
          {navItems.map((item) => (
            <Button
              key={item.href}
              variant={pathname === item.href ? 'default' : 'ghost'}
              asChild
              className={cn(
                "transition-all",
                pathname === item.href ? "bg-primary text-primary-foreground hover:bg-primary/90" : "hover:bg-accent/10"
              )}
              size="sm"
            >
              <Link href={item.href} className="flex items-center gap-1.5 sm:gap-2">
                <item.icon size={18} />
                <span className="hidden sm:inline">{item.label}</span>
              </Link>
            </Button>
          ))}

          {authNavItems.map((item) => {
            if (isAuthenticated && item.showIfUnauthenticated) return null;
            if (!isAuthenticated && !item.showIfUnauthenticated) return null;
            // Add similar logic for showIfAuthenticated if you have logout etc.

            return (
              <Button
                key={item.href}
                variant={pathname === item.href ? 'default' : 'ghost'}
                asChild
                className={cn(
                  "transition-all",
                  pathname === item.href ? "bg-primary text-primary-foreground hover:bg-primary/90" : "hover:bg-accent/10"
                )}
                size="sm"
              >
                <Link href={item.href} className="flex items-center gap-1.5 sm:gap-2">
                  <item.icon size={18} />
                  <span className="hidden sm:inline">{item.label}</span>
                </Link>
              </Button>
            );
          })}
        </nav>
      </div>
    </header>
  );
}

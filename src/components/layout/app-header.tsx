
// src/components/layout/app-header.tsx
"use client";

import Link from 'next/link';
import { ChefHat, Heart, Home, LogIn, UserPlus, DollarSign } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '@/lib/firebase-config';
import React, { useEffect, useState } from 'react';

export function AppHeader() {
  const pathname = usePathname();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setIsLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await auth.signOut();
      // You might want to redirect the user to the homepage or login page
      // router.push('/auth/login');
    } catch (error) {
      console.error("Logout error:", error);
      // Handle logout error (e.g., show a toast)
    }
  };

  const navItems = [
    { href: '/', label: 'Home', icon: Home },
    { href: '/favorites', label: 'Favorites', icon: Heart },
    { href: '/donation', label: 'Donate', icon: DollarSign },
  ];

  const authNavItems = [
    { href: '/auth/login', label: 'Login', icon: LogIn, showIfUnauthenticated: true },
    { href: '/auth/register', label: 'Sign Up', icon: UserPlus, showIfUnauthenticated: true },
  ];

  if (isLoading) {
    return (
      <header className="bg-card border-b border-border sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <Link href="/" aria-label="SnapRecipe Home" className="flex items-center text-primary hover:text-accent transition-colors">
            <ChefHat size={32} />
          </Link>
          <div className="animate-pulse flex items-center gap-2">
            <div className="h-8 w-20 bg-muted rounded-md"></div>
            <div className="h-8 w-20 bg-muted rounded-md"></div>
            <div className="h-8 w-20 bg-muted rounded-md"></div>
          </div>
        </div>
      </header>
    );
  }

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

          {user ? (
             <Button
                variant={'ghost'}
                onClick={handleLogout}
                className={cn(
                  "transition-all",
                  "hover:bg-accent/10"
                )}
                size="sm"
              >
              <LogIn size={18} className="mr-1.5 sm:mr-2" /> {/* Using LogIn as a placeholder for LogOut */}
              <span className="hidden sm:inline">Logout</span>
            </Button>
          ) : (
            authNavItems.map((item) => (
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
            ))
          )}
        </nav>
      </div>
    </header>
  );
}

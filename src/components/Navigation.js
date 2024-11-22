'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import LocaleSwitcher from "@/components/LocaleSwitcher"
import {useLocale} from 'next-intl';



export function Navigation() {
  const locale = useLocale();
  const navItems = [
    { path: '/'+locale, label: 'Home' },
    { path: '/'+locale+'/resource', label: 'Resources' },
    { path: '/'+locale+'/articles', label: 'Articles' },
    { path: '/'+locale+'/posts', label: 'posts' },
    { path: '/'+locale+'/pricing', label: 'Pricing' },

    
  ]
  const pathname = usePathname()
  const router = useRouter()
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let isMounted = true;
    const checkLoginStatus = async () => {
      if (!isMounted) return;
      setIsLoading(true);
      try {
        const response = await fetch('/api/check-auth');
        const data = await response.json();
        if (isMounted) setIsLoggedIn(data.isLoggedIn);
      } catch (error) {
        console.error('Failed to check auth status:', error);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    checkLoginStatus();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleLogout = async () => {
    try {
      await fetch('/api/logout', { method: 'POST' });
      setIsLoggedIn(false);
      router.push('/');
    } catch (error) {
      console.error('Failed to logout:', error);
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex gap-6 md:gap-10">
          <Link href="/" className="flex items-center space-x-2">
            <span className="inline-block font-bold">nextjs</span>
          </Link>
          <nav className="hidden md:flex gap-6">
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className={cn(
                  "flex items-center text-sm font-medium text-muted-foreground",
                  item.path === pathname && "text-foreground"
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <LocaleSwitcher />
          {!isLoading && (
            isLoggedIn ? (
              <>
                <Link href={"/"+locale+"/admin"}>
                  <Button variant="ghost">Admin</Button>
                </Link>
                <Button onClick={handleLogout} variant="outline">Logout</Button>
              </>
            ) : (
              <Link href={"/"+locale+"/login"}>
                <Button>Login</Button>
              </Link>
            )
          )}
        </div>
      </div>
    </header>
  )
}
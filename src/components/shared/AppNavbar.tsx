'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Zap, LayoutDashboard, Trophy, History, User, Bell,
  Flame, ChevronDown, Sparkles, BookOpen, Menu, X
} from 'lucide-react';

export const AppNavbar: React.FC = () => {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/scenarios', label: 'Problems', icon: BookOpen },
    { href: '/leaderboard', label: 'Leaderboard', icon: Trophy },
    { href: '/history', label: 'My Progress', icon: History },
  ];

  return (
    <nav className="top-nav sticky top-0 z-50 w-full px-4 sm:px-6">
      <div className="max-w-7xl mx-auto flex items-center justify-between h-16">
        {/* Brand */}
        <Link href="/dashboard" className="flex items-center space-x-2.5 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-indigo to-brand-purple flex items-center justify-center shadow-game-md group-hover:shadow-game-indigo transition-all">
            <Zap className="w-5 h-5 text-white fill-white" />
          </div>
          <div>
            <span className="text-base font-black text-text-game tracking-tight">BizSim</span>
            <span className="text-[10px] font-bold text-brand-indigo ml-1 bg-brand-indigo/10 px-1.5 py-0.5 rounded-full">PRO</span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-1">
          {navLinks.map(({ href, label, icon: Icon }) => {
            const active = pathname === href || pathname.startsWith(href + '/');
            return (
              <Link
                key={href}
                href={href}
                className={`flex items-center space-x-1.5 px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                  active
                    ? 'bg-brand-indigo/10 text-brand-indigo'
                    : 'text-text-game-2 hover:text-text-game hover:bg-game-bg'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{label}</span>
              </Link>
            );
          })}
        </div>

        {/* Right side */}
        <div className="flex items-center space-x-3">
          {/* Daily Streak */}
          <div className="hidden sm:flex items-center space-x-1.5 bg-orange-50 border border-orange-200 px-3 py-1.5 rounded-xl">
            <Flame className="w-3.5 h-3.5 text-orange-500" />
            <span className="text-xs font-black text-orange-600">7 day streak</span>
          </div>

          {/* XP Badge */}
          <div className="hidden sm:flex items-center space-x-1.5 bg-brand-indigo/10 border border-brand-indigo/20 px-3 py-1.5 rounded-xl">
            <Sparkles className="w-3.5 h-3.5 text-brand-indigo" />
            <span className="text-xs font-black text-brand-indigo">1,240 XP</span>
          </div>

          {/* Notification bell */}
          <button className="relative w-9 h-9 rounded-xl bg-game-bg border border-game-border flex items-center justify-center hover:border-brand-indigo/40 transition-all">
            <Bell className="w-4 h-4 text-text-game-2" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-brand-pink rounded-full" />
          </button>

          {/* Profile */}
          <Link href="/profile" className="flex items-center space-x-2 pl-2">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-pink to-brand-purple flex items-center justify-center text-white font-black text-sm shadow-game">
              S
            </div>
          </Link>

          {/* Mobile Menu */}
          <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden w-9 h-9 rounded-xl bg-game-bg border border-game-border flex items-center justify-center">
            {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileOpen && (
        <div className="md:hidden border-t border-game-border bg-white py-3 px-4 space-y-1">
          {navLinks.map(({ href, label, icon: Icon }) => (
            <Link key={href} href={href} onClick={() => setMobileOpen(false)}
              className="flex items-center space-x-3 px-4 py-2.5 rounded-xl text-sm font-bold text-text-game-2 hover:bg-game-bg hover:text-brand-indigo transition-all">
              <Icon className="w-4 h-4" />
              <span>{label}</span>
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
};

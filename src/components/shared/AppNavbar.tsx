'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Layers,
  LayoutDashboard,
  Compass,
  Trophy,
  User,
  History,
  ArrowRight,
  Shield,
  Sparkles,
} from 'lucide-react';

export const AppNavbar: React.FC = () => {
  const pathname = usePathname();

  const navLinks = [
    { href: '/dashboard', label: 'Command Deck', icon: LayoutDashboard },
    { href: '/scenarios', label: 'Simulations', icon: Compass },
    { href: '/leaderboard', label: 'Leaderboard', icon: Trophy },
    { href: '/history', label: 'Audit History', icon: History },
    { href: '/profile', label: 'Executive Profile', icon: User },
  ];

  return (
    <header className="w-full bg-[#101722]/90 backdrop-blur-md border-b border-[#263447] sticky top-0 z-40 px-4 lg:px-8 py-3 flex items-center justify-between select-none shadow-card-industrial">
      {/* Brand */}
      <div className="flex items-center space-x-6">
        <Link href="/" className="flex items-center space-x-3 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#28D7F2] to-[#9875FF] flex items-center justify-center text-[#080B12] font-black text-sm shadow-glow-cyan group-hover:scale-105 transition-transform">
            CP
          </div>
          <div>
            <span className="font-black text-[#F3F7FC] text-sm tracking-tight block">
              Career Progression
            </span>
            <span className="text-[10px] font-mono text-[#28D7F2] block -mt-0.5 tracking-wider">
              SIMULATOR • 1.0
            </span>
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center space-x-1 pl-4">
          {navLinks.map(link => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all ${
                  isActive
                    ? 'bg-[#28D7F2]/15 text-[#28D7F2] border border-[#28D7F2]/40 shadow-glow-cyan'
                    : 'text-[#9AA9BB] hover:text-[#F3F7FC] hover:bg-[#151F2D]'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{link.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Action CTA */}
      <div className="flex items-center space-x-3">
        <Link
          href="/scenarios/apex-beverages"
          className="flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl bg-[#28D7F2] hover:bg-[#28D7F2]/90 text-[#080B12] font-black text-xs transition-all shadow-glow-cyan hover:scale-105"
        >
          <span>Launch Apex Beverages</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </header>
  );
};

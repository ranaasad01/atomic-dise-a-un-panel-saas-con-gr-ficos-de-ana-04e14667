"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Menu, X, Sparkles, Bell, User } from 'lucide-react';
import { navLinks, APP_NAME } from "@/lib/data";
import { useTranslations } from "next-intl";

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const t = useTranslations();

  const renderLink = (
    href: string,
    type: "route" | "anchor",
    label: string,
    className: string,
    onClick?: () => void
  ) => {
    if (type === "anchor") {
      const resolvedHref = pathname === "/" ? href : "/" + href;
      const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        if (pathname === "/") {
          e.preventDefault();
          document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
        }
        onClick?.();
      };
      return (
        <Link href={resolvedHref} className={className} onClick={handleClick}>
          {label}
        </Link>
      );
    }
    return (
      <Link href={href} className={className} onClick={onClick}>
        {label}
      </Link>
    );
  };

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <motion.header
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="sticky top-0 z-50 w-full border-b border-white/10 bg-[#0F172A]/80 backdrop-blur-xl"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0 group">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-cyan-500/20 border border-cyan-500/30 group-hover:bg-cyan-500/30 transition-all duration-300">
              <Sparkles className="h-4 w-4 text-cyan-400" />
            </div>
            <span className="text-lg font-bold tracking-tight text-white">
              {APP_NAME}
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <motion.div
                  key={link.href}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  {renderLink(
                    link.href,
                    link.type,
                    t(`nav.${link.label.toLowerCase().replace(/\s/g, "_")}`) || link.label,
                    `relative px-3 py-1.5 text-sm font-medium rounded-lg transition-all duration-200 ${
                      active
                        ? "text-cyan-300 bg-cyan-500/15 border border-cyan-500/25"
                        : "text-slate-400 hover:text-slate-100 hover:bg-white/5"
                    }`
                  )}
                </motion.div>
              );
            })}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative hidden sm:flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-slate-400 hover:text-slate-100 hover:bg-white/10 transition-all duration-200"
              aria-label="Notificaciones"
            >
              <Bell className="h-4 w-4" />
              <span className="absolute top-1 right-1 h-1.5 w-1.5 rounded-full bg-cyan-400" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="hidden sm:flex items-center gap-2 h-8 px-3 rounded-lg border border-white/10 bg-white/5 text-slate-400 hover:text-slate-100 hover:bg-white/10 transition-all duration-200"
              aria-label="Perfil de usuario"
            >
              <User className="h-3.5 w-3.5" />
              <span className="text-xs font-medium">Ana García</span>
            </motion.button>

            {/* Mobile toggle */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setMobileOpen((v) => !v)}
              className="md:hidden flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-slate-400 hover:text-slate-100 transition-all duration-200"
              aria-label="Menú"
            >
              {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="md:hidden overflow-hidden border-t border-white/10 bg-[#0F172A]/95 backdrop-blur-xl"
          >
            <nav className="flex flex-col gap-1 px-4 py-3">
              {navLinks.map((link) => {
                const active = isActive(link.href);
                return (
                  <div key={link.href}>
                    {renderLink(
                      link.href,
                      link.type,
                      link.label,
                      `block px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                        active
                          ? "text-cyan-300 bg-cyan-500/15 border border-cyan-500/25"
                          : "text-slate-400 hover:text-slate-100 hover:bg-white/5"
                      }`,
                      () => setMobileOpen(false)
                    )}
                  </div>
                );
              })}
              <div className="mt-2 pt-2 border-t border-white/10 flex items-center gap-2 px-3 py-2">
                <User className="h-4 w-4 text-slate-400" />
                <span className="text-sm text-slate-400">Ana García</span>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
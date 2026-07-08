"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Sparkles, Code2 as Github, MessageCircle as Twitter, Briefcase as Linkedin } from 'lucide-react';
import { navLinks, APP_NAME, APP_TAGLINE } from "@/lib/data";
import { fadeInUp, staggerContainer } from "@/lib/motion";
import { useTranslations } from "next-intl";

const socialLinks = [
  { icon: Github, href: "https://github.com", label: "GitHub" },
  { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
  { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
];

export default function Footer() {
  const pathname = usePathname();
  const t = useTranslations();

  const renderLink = (
    href: string,
    type: "route" | "anchor",
    label: string,
    className: string
  ) => {
    if (type === "anchor") {
      const resolvedHref = pathname === "/" ? href : "/" + href;
      const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        if (pathname === "/") {
          e.preventDefault();
          document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
        }
      };
      return (
        <Link href={resolvedHref} className={className} onClick={handleClick}>
          {label}
        </Link>
      );
    }
    return (
      <Link href={href} className={className}>
        {label}
      </Link>
    );
  };

  return (
    <motion.footer
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      className="border-t border-white/10 bg-[#0F172A]/80 backdrop-blur-xl"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <motion.div variants={fadeInUp} className="space-y-3">
            <Link href="/" className="flex items-center gap-2 group w-fit">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-cyan-500/20 border border-cyan-500/30 group-hover:bg-cyan-500/30 transition-all duration-300">
                <Sparkles className="h-3.5 w-3.5 text-cyan-400" />
              </div>
              <span className="text-base font-bold tracking-tight text-white">
                {APP_NAME}
              </span>
            </Link>
            <p className="text-sm text-slate-500 leading-relaxed max-w-xs">
              {APP_TAGLINE}. Toma decisiones basadas en datos con confianza.
            </p>
            <div className="flex items-center gap-2 pt-1">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  whileHover={{ scale: 1.1, y: -1 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex h-7 w-7 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-slate-500 hover:text-slate-200 hover:bg-white/10 transition-all duration-200"
                >
                  <Icon className="h-3.5 w-3.5" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Navigation */}
          <motion.div variants={fadeInUp} className="space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-slate-500">
              {t("footer.navigation") || "Navegación"}
            </h3>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  {renderLink(
                    link.href,
                    link.type,
                    link.label,
                    "text-sm text-slate-400 hover:text-cyan-300 transition-colors duration-200"
                  )}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Legal / Info */}
          <motion.div variants={fadeInUp} className="space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-slate-500">
              {t("footer.legal") || "Legal"}
            </h3>
            <ul className="space-y-2">
              {[
                { label: "Privacidad", href: "/" },
                { label: "Términos de uso", href: "/" },
                { label: "Cookies", href: "/" },
                { label: "Soporte", href: "/" },
              ].map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-sm text-slate-400 hover:text-cyan-300 transition-colors duration-200"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        <motion.div
          variants={fadeInUp}
          className="mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3"
        >
          <p className="text-xs text-slate-600">
            &copy; {new Date().getFullYear()} {APP_NAME}. Todos los derechos reservados.
          </p>
          <p className="text-xs text-slate-600">
            Construido con Next.js 14 y Recharts
          </p>
        </motion.div>
      </div>
    </motion.footer>
  );
}
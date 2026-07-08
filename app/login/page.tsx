"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { Sparkles, Mail, Lock, Eye, EyeOff, ArrowRight, Globe, Code2 } from 'lucide-react';
import { fadeInUp, scaleIn, staggerContainer } from "@/lib/motion";
import { APP_NAME } from "@/lib/data";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // No real auth logic needed
  };

  return (
    <div className="relative min-h-screen bg-[#0F172A] flex items-center justify-center px-4 py-16 overflow-hidden">
      {/* Background blobs */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute w-96 h-96 rounded-full bg-indigo-600/20 blur-3xl -top-32 -left-32"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute w-96 h-96 rounded-full bg-cyan-400/10 blur-3xl -bottom-32 -right-32"
      />

      {/* Card */}
      <motion.div
        variants={scaleIn}
        initial="hidden"
        animate="visible"
        className="relative z-10 max-w-md w-full mx-auto bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl"
      >
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="flex flex-col gap-6"
        >
          {/* Logo */}
          <motion.div variants={fadeInUp} className="flex flex-col items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-500/20 border border-amber-500/30">
              <Sparkles className="h-5 w-5 text-amber-400" />
            </div>
            <span className="text-lg font-bold text-white tracking-tight">{APP_NAME}</span>
          </motion.div>

          {/* Heading */}
          <motion.div variants={fadeInUp} className="text-center">
            <h1 className="text-2xl font-bold text-white">Iniciar Sesión</h1>
            <p className="mt-1 text-sm text-slate-400">Bienvenido de nuevo. Ingresa tus credenciales.</p>
          </motion.div>

          {/* Form */}
          <motion.form
            variants={fadeInUp}
            onSubmit={handleSubmit}
            className="flex flex-col gap-4"
          >
            {/* Email field */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="email" className="text-sm font-medium text-slate-300">
                Correo electrónico
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500 pointer-events-none" />
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  placeholder="tu@correo.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 pl-11 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500/60 focus:ring-1 focus:ring-indigo-500/40 transition-all text-sm"
                />
              </div>
            </div>

            {/* Password field */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="password" className="text-sm font-medium text-slate-300">
                Contraseña
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500 pointer-events-none" />
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 pl-11 pr-11 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500/60 focus:ring-1 focus:ring-indigo-500/40 transition-all text-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
                  aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {/* Forgot password */}
              <div className="flex justify-end">
                <Link
                  href="#"
                  className="text-xs text-indigo-400 hover:text-indigo-300 transition-colors"
                >
                  ¿Olvidaste tu contraseña?
                </Link>
              </div>
            </div>

            {/* Submit button */}
            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3 rounded-xl flex items-center justify-center gap-2 transition-all duration-200 text-sm"
            >
              Entrar
              <ArrowRight className="h-4 w-4" />
            </button>
          </motion.form>

          {/* Divider */}
          <motion.div variants={fadeInUp} className="flex items-center gap-3">
            <div className="flex-1 h-px bg-white/10" />
            <span className="text-xs text-slate-500">o continúa con</span>
            <div className="flex-1 h-px bg-white/10" />
          </motion.div>

          {/* Social login buttons */}
          <motion.div variants={fadeInUp} className="flex gap-3">
            <button
              type="button"
              className="flex-1 flex items-center justify-center gap-2 border border-white/10 bg-white/5 hover:bg-white/10 rounded-xl py-2.5 text-sm text-slate-300 transition-all"
            >
              <Globe className="h-4 w-4" />
              Google
            </button>
            <button
              type="button"
              className="flex-1 flex items-center justify-center gap-2 border border-white/10 bg-white/5 hover:bg-white/10 rounded-xl py-2.5 text-sm text-slate-300 transition-all"
            >
              <Code2 className="h-4 w-4" />
              GitHub
            </button>
          </motion.div>

          {/* Bottom text */}
          <motion.p variants={fadeInUp} className="text-center text-sm text-slate-500">
            ¿No tienes cuenta?{" "}
            <Link
              href="/"
              className="text-indigo-400 hover:text-indigo-300 transition-colors font-medium"
            >
              Solicitar acceso
            </Link>
          </motion.p>
        </motion.div>
      </motion.div>
    </div>
  );
}

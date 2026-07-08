"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Sparkles, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react';
import { fadeInUp, scaleIn, staggerContainer } from "@/lib/motion";
import { APP_NAME } from "@/lib/data";

const HARDCODED_PASSWORD = "rao123";

export default function LoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setTimeout(() => {
      if (password === HARDCODED_PASSWORD) {
        router.push("/dashboard");
      } else {
        setError("Contraseña incorrecta. Inténtalo de nuevo.");
        setLoading(false);
      }
    }, 400);
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
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-sky-500/20 border border-sky-500/30">
              <Sparkles className="h-5 w-5 text-sky-400" />
            </div>
            <span className="text-lg font-bold text-white tracking-tight">{APP_NAME}</span>
          </motion.div>

          {/* Heading */}
          <motion.div variants={fadeInUp} className="text-center">
            <h1 className="text-2xl font-bold text-white">Bienvenido a {APP_NAME}</h1>
            <p className="mt-1 text-sm text-slate-400">Ingresa la contraseña para continuar.</p>
          </motion.div>

          {/* Form */}
          <motion.form
            variants={fadeInUp}
            onSubmit={handleSubmit}
            className="flex flex-col gap-4"
          >
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
                  placeholder="Ingresa tu contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-10 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all duration-200"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
                  aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {/* Error message */}
            {error && (
              <motion.p
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-sm text-sky-400 text-center"
              >
                {error}
              </motion.p>
            )}

            {/* Submit */}
            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center justify-center gap-2 w-full bg-indigo-600 hover:bg-indigo-500 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold py-2.5 rounded-xl transition-all duration-200 shadow-lg shadow-indigo-500/20"
            >
              {loading ? (
                <span className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  Entrar
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </motion.button>
          </motion.form>
        </motion.div>
      </motion.div>
    </div>
  );
}

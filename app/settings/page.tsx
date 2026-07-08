"use client";

import { useState } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { User, Bell, Palette, CreditCard, Camera, Check, Mail, Phone, Globe, Lock, Shield, Zap, Star, ChevronRight, AlertCircle, Save } from 'lucide-react';
import { fadeInUp, staggerContainer, scaleIn } from "@/lib/motion";
import { useTranslations } from "next-intl";

// ─── Types ────────────────────────────────────────────────────────────────────

type Tab = "perfil" | "notificaciones" | "apariencia" | "facturacion";

interface NotificationSetting {
  id: string;
  label: string;
  description: string;
  enabled: boolean;
}

interface AccentColor {
  name: string;
  value: string;
  class: string;
}

// ─── Mock data ────────────────────────────────────────────────────────────────

const TABS: { id: Tab; label: string; icon: React.ElementType }[] = [
  { id: "perfil", label: "Perfil", icon: User },
  { id: "notificaciones", label: "Notificaciones", icon: Bell },
  { id: "apariencia", label: "Apariencia", icon: Palette },
  { id: "facturacion", label: "Facturación", icon: CreditCard },
];

const ACCENT_COLORS: AccentColor[] = [
  { name: "Índigo", value: "#6366F1", class: "bg-rose-500" },
  { name: "Violeta", value: "#8B5CF6", class: "bg-violet-500" },
  { name: "Cian", value: "#06B6D4", class: "bg-rose-500" },
  { name: "Esmeralda", value: "#10B981", class: "bg-rose-500" },
  { name: "Rosa", value: "#EC4899", class: "bg-pink-500" },
  { name: "Ámbar", value: "#F59E0B", class: "bg-amber-500" },
];

const INITIAL_NOTIFICATIONS: NotificationSetting[] = [
  {
    id: "email_reports",
    label: "Reportes por correo",
    description: "Recibe resúmenes semanales de tus métricas clave.",
    enabled: true,
  },
  {
    id: "alerts_threshold",
    label: "Alertas de umbral",
    description: "Notificaciones cuando una métrica supera el límite definido.",
    enabled: true,
  },
  {
    id: "new_users",
    label: "Nuevos usuarios",
    description: "Aviso cuando un nuevo usuario se registra en tu plataforma.",
    enabled: false,
  },
  {
    id: "billing_updates",
    label: "Actualizaciones de facturación",
    description: "Confirmaciones de pago y avisos de renovación.",
    enabled: true,
  },
  {
    id: "product_news",
    label: "Novedades del producto",
    description: "Entérate de nuevas funciones y mejoras de NovaDash.",
    enabled: false,
  },
  {
    id: "security_alerts",
    label: "Alertas de seguridad",
    description: "Avisos sobre accesos sospechosos o cambios de contraseña.",
    enabled: true,
  },
];

const PLANS = [
  {
    id: "starter",
    name: "Starter",
    price: "Gratis",
    period: "",
    features: ["Hasta 3 proyectos", "1 usuario", "Analíticas básicas", "Soporte por correo"],
    current: false,
    highlight: false,
  },
  {
    id: "pro",
    name: "Pro",
    price: "$29",
    period: "/mes",
    features: [
      "Proyectos ilimitados",
      "Hasta 10 usuarios",
      "Analíticas avanzadas",
      "Exportación de datos",
      "Soporte prioritario",
    ],
    current: true,
    highlight: true,
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: "$99",
    period: "/mes",
    features: [
      "Todo en Pro",
      "Usuarios ilimitados",
      "SLA garantizado",
      "Integración SSO",
      "Gerente de cuenta dedicado",
    ],
    current: false,
    highlight: false,
  },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function Toggle({
  enabled,
  onChange,
}: {
  enabled: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={enabled}
      onClick={() => onChange(!enabled)}
      className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0F172A] ${
        enabled ? "bg-rose-500" : "bg-white/10"
      }`}
    >
      <span
        className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${
          enabled ? "translate-x-5" : "translate-x-0"
        }`}
      />
    </button>
  );
}

function SectionCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      variants={scaleIn}
      className={`rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-6 shadow-[0_1px_2px_rgba(0,0,0,0.12),0_8px_24px_-8px_rgba(0,0,0,0.3)] ${className}`}
    >
      {children}
    </motion.div>
  );
}

// ─── Tab panels ───────────────────────────────────────────────────────────────

function PerfilTab() {
  const [name, setName] = useState("Alejandro Ruiz");
  const [email, setEmail] = useState("alejandro@novadash.io");
  const [phone, setPhone] = useState("+34 612 345 678");
  const [website, setWebsite] = useState("https://novadash.io");
  const [bio, setBio] = useState(
    "Fundador y CEO de NovaDash. Apasionado por los datos y la toma de decisiones basada en evidencia."
  );
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const inputClass =
    "w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-rose-500/60 focus:border-rose-500/40 transition-all duration-200";

  const labelClass = "block text-xs font-semibold uppercase tracking-widest text-slate-500 mb-1.5";

  return (
    <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="space-y-6">
      {/* Avatar */}
      <SectionCard>
        <h2 className="text-sm font-semibold text-slate-200 mb-4">Foto de perfil</h2>
        <div className="flex items-center gap-5">
          <div className="relative shrink-0">
            <div className="h-20 w-20 rounded-2xl bg-gradient-to-br from-rose-500/40 to-violet-600/40 border border-rose-500/30 flex items-center justify-center text-2xl font-bold text-rose-300 select-none">
              AR
            </div>
            <button
              type="button"
              className="absolute -bottom-1.5 -right-1.5 flex h-7 w-7 items-center justify-center rounded-full bg-rose-500 border-2 border-[#0F172A] text-white hover:bg-rose-400 transition-colors duration-200"
              aria-label="Cambiar foto"
            >
              <Camera className="h-3.5 w-3.5" />
            </button>
          </div>
          <div>
            <p className="text-sm font-medium text-slate-200">Alejandro Ruiz</p>
            <p className="text-xs text-slate-500 mt-0.5">PNG, JPG o GIF. Máximo 2 MB.</p>
            <button
              type="button"
              className="mt-2 text-xs font-medium text-rose-400 hover:text-rose-300 transition-colors duration-200"
            >
              Subir nueva imagen
            </button>
          </div>
        </div>
      </SectionCard>

      {/* Info personal */}
      <SectionCard>
        <h2 className="text-sm font-semibold text-slate-200 mb-5">Información personal</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Nombre completo</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={`${inputClass} pl-9`}
                placeholder="Tu nombre"
              />
            </div>
          </div>
          <div>
            <label className={labelClass}>Correo electrónico</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`${inputClass} pl-9`}
                placeholder="tu@correo.com"
              />
            </div>
          </div>
          <div>
            <label className={labelClass}>Teléfono</label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className={`${inputClass} pl-9`}
                placeholder="+34 600 000 000"
              />
            </div>
          </div>
          <div>
            <label className={labelClass}>Sitio web</label>
            <div className="relative">
              <Globe className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
              <input
                type="url"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                className={`${inputClass} pl-9`}
                placeholder="https://tudominio.com"
              />
            </div>
          </div>
          <div className="sm:col-span-2">
            <label className={labelClass}>Biografía</label>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              rows={3}
              className={`${inputClass} resize-none`}
              placeholder="Cuéntanos sobre ti..."
            />
          </div>
        </div>
      </SectionCard>

      {/* Seguridad */}
      <SectionCard>
        <h2 className="text-sm font-semibold text-slate-200 mb-5">Seguridad</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/8">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-rose-500/15 border border-rose-500/25">
                <Lock className="h-4 w-4 text-rose-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-200">Contraseña</p>
                <p className="text-xs text-slate-500">Última actualización hace 3 meses</p>
              </div>
            </div>
            <button
              type="button"
              className="text-xs font-medium text-rose-400 hover:text-rose-300 transition-colors duration-200 flex items-center gap-1"
            >
              Cambiar <ChevronRight className="h-3.5 w-3.5" />
            </button>
          </div>
          <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/8">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-rose-500/15 border border-rose-500/25">
                <Shield className="h-4 w-4 text-rose-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-200">Autenticación en dos pasos</p>
                <p className="text-xs text-slate-500">Protege tu cuenta con 2FA</p>
              </div>
            </div>
            <span className="text-xs font-semibold text-rose-400 bg-rose-500/10 border border-rose-500/20 px-2.5 py-1 rounded-full">
              Activo
            </span>
          </div>
        </div>
      </SectionCard>

      {/* Save button */}
      <div className="flex justify-end">
        <motion.button
          type="button"
          onClick={handleSave}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${
            saved
              ? "bg-rose-500/20 border border-rose-500/30 text-rose-300"
              : "bg-rose-500 hover:bg-rose-400 text-white shadow-[0_0_20px_rgba(99,102,241,0.35)]"
          }`}
        >
          {saved ? (
            <>
              <Check className="h-4 w-4" /> Guardado
            </>
          ) : (
            <>
              <Save className="h-4 w-4" /> Guardar cambios
            </>
          )}
        </motion.button>
      </div>
    </motion.div>
  );
}

function NotificacionesTab() {
  const [settings, setSettings] = useState<NotificationSetting[]>(INITIAL_NOTIFICATIONS);

  const toggle = (id: string) => {
    setSettings((prev) =>
      prev.map((s) => (s.id === id ? { ...s, enabled: !s.enabled } : s))
    );
  };

  return (
    <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="space-y-6">
      <SectionCard>
        <div className="flex items-center gap-3 mb-6">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-rose-500/15 border border-rose-500/25">
            <Bell className="h-4.5 w-4.5 text-rose-400" />
          </div>
          <div>
            <h2 className="text-sm font-semibold text-slate-200">Preferencias de notificación</h2>
            <p className="text-xs text-slate-500">Controla qué alertas recibes y cuándo.</p>
          </div>
        </div>
        <div className="space-y-1">
          {settings.map((setting, i) => (
            <motion.div
              key={setting.id}
              variants={fadeInUp}
              className={`flex items-center justify-between p-4 rounded-xl transition-colors duration-200 hover:bg-white/5 ${
                i < settings.length - 1 ? "border-b border-white/5" : ""
              }`}
            >
              <div className="flex-1 pr-4">
                <p className="text-sm font-medium text-slate-200">{setting.label}</p>
                <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">{setting.description}</p>
              </div>
              <Toggle enabled={setting.enabled} onChange={() => toggle(setting.id)} />
            </motion.div>
          ))}
        </div>
      </SectionCard>

      <SectionCard>
        <h2 className="text-sm font-semibold text-slate-200 mb-4">Frecuencia de resúmenes</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {["Tiempo real", "Diario", "Semanal", "Mensual"].map((freq, i) => (
            <button
              key={freq}
              type="button"
              className={`px-3 py-2 rounded-xl text-xs font-medium border transition-all duration-200 ${
                i === 2
                  ? "bg-rose-500/20 border-rose-500/40 text-rose-300"
                  : "bg-white/5 border-white/10 text-slate-400 hover:text-slate-200 hover:bg-white/10"
              }`}
            >
              {freq}
            </button>
          ))}
        </div>
      </SectionCard>
    </motion.div>
  );
}

function AparienciaTab() {
  const [selectedColor, setSelectedColor] = useState("#6366F1");
  const [theme, setTheme] = useState<"dark" | "light" | "system">("dark");
  const [density, setDensity] = useState<"compacto" | "normal" | "espacioso">("normal");
  const [fontSize, setFontSize] = useState(14);

  return (
    <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="space-y-6">
      {/* Theme */}
      <SectionCard>
        <h2 className="text-sm font-semibold text-slate-200 mb-4">Tema de la interfaz</h2>
        <div className="grid grid-cols-3 gap-3">
          {(["dark", "light", "system"] as const).map((t) => {
            const labels: Record<string, string> = { dark: "Oscuro", light: "Claro", system: "Sistema" };
            const active = theme === t;
            return (
              <button
                key={t}
                type="button"
                onClick={() => setTheme(t)}
                className={`relative flex flex-col items-center gap-2 p-4 rounded-xl border transition-all duration-200 ${
                  active
                    ? "border-rose-500/50 bg-rose-500/10"
                    : "border-white/10 bg-white/5 hover:bg-white/8"
                }`}
              >
                <div
                  className={`h-10 w-full rounded-lg border ${
                    t === "dark"
                      ? "bg-slate-900 border-slate-700"
                      : t === "light"
                      ? "bg-slate-100 border-slate-300"
                      : "bg-gradient-to-r from-slate-900 to-slate-100 border-slate-500"
                  }`}
                />
                <span className={`text-xs font-medium ${active ? "text-rose-300" : "text-slate-400"}`}>
                  {labels[t]}
                </span>
                {active && (
                  <span className="absolute top-2 right-2 flex h-4 w-4 items-center justify-center rounded-full bg-rose-500">
                    <Check className="h-2.5 w-2.5 text-white" />
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </SectionCard>

      {/* Accent color */}
      <SectionCard>
        <h2 className="text-sm font-semibold text-slate-200 mb-1">Color de acento</h2>
        <p className="text-xs text-slate-500 mb-4">Personaliza el color principal de la interfaz.</p>
        <div className="flex flex-wrap gap-3">
          {ACCENT_COLORS.map((color) => {
            const active = selectedColor === color.value;
            return (
              <motion.button
                key={color.value}
                type="button"
                onClick={() => setSelectedColor(color.value)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                title={color.name}
                className={`relative h-9 w-9 rounded-full ${color.class} transition-all duration-200 ${
                  active ? "ring-2 ring-white/60 ring-offset-2 ring-offset-[#0F172A]" : "opacity-70 hover:opacity-100"
                }`}
              >
                {active && (
                  <span className="absolute inset-0 flex items-center justify-center">
                    <Check className="h-4 w-4 text-white drop-shadow" />
                  </span>
                )}
              </motion.button>
            );
          })}
        </div>
        <div className="mt-4 flex items-center gap-3">
          <div
            className="h-8 w-8 rounded-lg border border-white/20"
            style={{ backgroundColor: selectedColor }}
          />
          <span className="text-xs font-mono text-slate-400">{selectedColor}</span>
          <span className="text-xs text-slate-500">
            {ACCENT_COLORS.find((c) => c.value === selectedColor)?.name ?? "Personalizado"}
          </span>
        </div>
      </SectionCard>

      {/* Density & font */}
      <SectionCard>
        <h2 className="text-sm font-semibold text-slate-200 mb-4">Densidad y tipografía</h2>
        <div className="space-y-5">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-2">
              Densidad de la interfaz
            </p>
            <div className="flex gap-2">
              {(["compacto", "normal", "espacioso"] as const).map((d) => (
                <button
                  key={d}
                  type="button"
                  onClick={() => setDensity(d)}
                  className={`flex-1 py-2 rounded-xl text-xs font-medium border capitalize transition-all duration-200 ${
                    density === d
                      ? "bg-rose-500/20 border-rose-500/40 text-rose-300"
                      : "bg-white/5 border-white/10 text-slate-400 hover:text-slate-200"
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">
                Tamaño de fuente
              </p>
              <span className="text-xs font-mono text-rose-400">{fontSize}px</span>
            </div>
            <input
              type="range"
              min={12}
              max={18}
              step={1}
              value={fontSize}
              onChange={(e) => setFontSize(Number(e.target.value))}
              className="w-full accent-rose-500 cursor-pointer"
            />
            <div className="flex justify-between mt-1">
              <span className="text-xs text-slate-600">12px</span>
              <span className="text-xs text-slate-600">18px</span>
            </div>
          </div>
        </div>
      </SectionCard>
    </motion.div>
  );
}

function FacturacionTab() {
  const [billingCycle, setBillingCycle] = useState<"mensual" | "anual">("mensual");

  return (
    <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="space-y-6">
      {/* Current plan banner */}
      <motion.div
        variants={fadeInUp}
        className="relative overflow-hidden rounded-2xl border border-rose-500/30 bg-gradient-to-br from-rose-500/10 via-violet-500/5 to-transparent p-6"
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(99,102,241,0.15),transparent_60%)]" />
        <div className="relative flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Zap className="h-4 w-4 text-rose-400" />
              <span className="text-xs font-semibold uppercase tracking-widest text-rose-400">
                Plan actual
              </span>
            </div>
            <h2 className="text-2xl font-bold text-white tracking-tight">Pro</h2>
            <p className="text-sm text-slate-400 mt-1">
              Facturado mensualmente. Próxima renovación el 15 de agosto de 2025.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-3xl font-bold text-white">$29</span>
            <span className="text-slate-400 text-sm">/mes</span>
          </div>
        </div>
      </motion.div>

      {/* Billing cycle toggle */}
      <SectionCard>
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-sm font-semibold text-slate-200">Planes disponibles</h2>
          <div className="flex items-center gap-1 p-1 rounded-xl bg-white/5 border border-white/10">
            {(["mensual", "anual"] as const).map((cycle) => (
              <button
                key={cycle}
                type="button"
                onClick={() => setBillingCycle(cycle)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-all duration-200 ${
                  billingCycle === cycle
                    ? "bg-rose-500 text-white shadow"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                {cycle}
                {cycle === "anual" && (
                  <span className="ml-1.5 text-[10px] font-semibold text-rose-400">-20%</span>
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {PLANS.map((plan) => {
            const annualPrice =
              plan.price !== "Gratis"
                ? `$${Math.round(parseInt(plan.price.replace("$", "")) * 0.8)}`
                : "Gratis";
            const displayPrice = billingCycle === "anual" ? annualPrice : plan.price;

            return (
              <motion.div
                key={plan.id}
                variants={scaleIn}
                whileHover={{ y: -2 }}
                className={`relative flex flex-col rounded-2xl border p-5 transition-all duration-300 ${
                  plan.highlight
                    ? "border-rose-500/50 bg-rose-500/10 shadow-[0_0_30px_rgba(99,102,241,0.15)]"
                    : "border-white/10 bg-white/5"
                }`}
              >
                {plan.current && (
                  <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 text-[10px] font-bold uppercase tracking-widest bg-rose-500 text-white px-3 py-0.5 rounded-full">
                    Actual
                  </span>
                )}
                {plan.highlight && !plan.current && (
                  <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 text-[10px] font-bold uppercase tracking-widest bg-violet-500 text-white px-3 py-0.5 rounded-full flex items-center gap-1">
                    <Star className="h-2.5 w-2.5" /> Popular
                  </span>
                )}
                <div className="mb-4">
                  <h3 className="text-base font-bold text-white">{plan.name}</h3>
                  <div className="flex items-end gap-1 mt-1">
                    <span className="text-2xl font-bold text-white">{displayPrice}</span>
                    {plan.period && (
                      <span className="text-slate-400 text-sm mb-0.5">
                        {billingCycle === "anual" ? "/mes" : plan.period}
                      </span>
                    )}
                  </div>
                </div>
                <ul className="space-y-2 flex-1 mb-5">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-xs text-slate-300">
                      <Check className="h-3.5 w-3.5 text-rose-400 shrink-0 mt-0.5" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <button
                  type="button"
                  className={`w-full py-2 rounded-xl text-xs font-semibold transition-all duration-200 ${
                    plan.current
                      ? "bg-white/10 border border-white/15 text-slate-300 cursor-default"
                      : plan.highlight
                      ? "bg-rose-500 hover:bg-rose-400 text-white shadow-[0_0_16px_rgba(99,102,241,0.4)]"
                      : "bg-white/5 border border-white/10 text-slate-300 hover:bg-white/10"
                  }`}
                >
                  {plan.current ? "Plan activo" : `Cambiar a ${plan.name}`}
                </button>
              </motion.div>
            );
          })}
        </div>
      </SectionCard>

      {/* Payment method */}
      <SectionCard>
        <h2 className="text-sm font-semibold text-slate-200 mb-4">Método de pago</h2>
        <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-14 items-center justify-center rounded-lg bg-slate-800 border border-white/10 text-xs font-bold text-slate-300">
              VISA
            </div>
            <div>
              <p className="text-sm font-medium text-slate-200">Visa terminada en 4242</p>
              <p className="text-xs text-slate-500">Vence 09/2027</p>
            </div>
          </div>
          <button
            type="button"
            className="text-xs font-medium text-rose-400 hover:text-rose-300 transition-colors duration-200"
          >
            Cambiar
          </button>
        </div>
        <div className="mt-3 flex items-center gap-2 text-xs text-slate-500">
          <AlertCircle className="h-3.5 w-3.5 shrink-0" />
          <span>Tus datos de pago están cifrados y protegidos con TLS 1.3.</span>
        </div>
      </SectionCard>

      {/* Invoice history */}
      <SectionCard>
        <h2 className="text-sm font-semibold text-slate-200 mb-4">Historial de facturas</h2>
        <div className="space-y-1">
          {[
            { date: "1 jul 2025", amount: "$29.00", status: "Pagado", id: "INV-2025-007" },
            { date: "1 jun 2025", amount: "$29.00", status: "Pagado", id: "INV-2025-006" },
            { date: "1 may 2025", amount: "$29.00", status: "Pagado", id: "INV-2025-005" },
            { date: "1 abr 2025", amount: "$29.00", status: "Pagado", id: "INV-2025-004" },
          ].map((inv, i, arr) => (
            <div
              key={inv.id}
              className={`flex items-center justify-between py-3 px-1 ${
                i < arr.length - 1 ? "border-b border-white/5" : ""
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono text-slate-500">{inv.id}</span>
                <span className="text-xs text-slate-400">{inv.date}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs font-semibold text-slate-200">{inv.amount}</span>
                <span className="text-[10px] font-semibold text-rose-400 bg-rose-500/10 border border-rose-500/20 px-2 py-0.5 rounded-full">
                  {inv.status}
                </span>
                <button
                  type="button"
                  className="text-xs text-rose-400 hover:text-rose-300 transition-colors duration-200"
                >
                  PDF
                </button>
              </div>
            </div>
          ))}
        </div>
      </SectionCard>
    </motion.div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

const tabContentVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: "easeOut" },
  },
};

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<Tab>("perfil");

  const renderTab = () => {
    switch (activeTab) {
      case "perfil":
        return <PerfilTab />;
      case "notificaciones":
        return <NotificacionesTab />;
      case "apariencia":
        return <AparienciaTab />;
      case "facturacion":
        return <FacturacionTab />;
      default:
        return null;
    }
  };

  return (
    <main className="min-h-screen bg-[#0F172A] pt-8 pb-24">
      {/* Ambient glow */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 h-[500px] w-[700px] rounded-full bg-rose-600/8 blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          className="mb-8"
        >
          <h1 className="text-3xl font-bold tracking-tight text-white">
            Configuración
          </h1>
          <p className="mt-1.5 text-sm text-slate-400">
            Gestiona tu perfil, preferencias y plan de suscripción.
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar tabs */}
          <motion.aside
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="lg:w-52 shrink-0"
          >
            <nav className="flex lg:flex-col gap-1">
              {TABS.map((tab) => {
                const Icon = tab.icon;
                const active = activeTab === tab.id;
                return (
                  <motion.button
                    key={tab.id}
                    variants={fadeInUp}
                    type="button"
                    onClick={() => setActiveTab(tab.id)}
                    whileHover={{ x: active ? 0 : 3 }}
                    whileTap={{ scale: 0.97 }}
                    className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-sm font-medium w-full text-left transition-all duration-200 ${
                      active
                        ? "bg-rose-500/15 border border-rose-500/30 text-rose-300"
                        : "text-slate-400 hover:text-slate-200 hover:bg-white/5 border border-transparent"
                    }`}
                  >
                    <Icon className={`h-4 w-4 shrink-0 ${active ? "text-rose-400" : "text-slate-500"}`} />
                    {tab.label}
                  </motion.button>
                );
              })}
            </nav>
          </motion.aside>

          {/* Tab content */}
          <div className="flex-1 min-w-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                variants={tabContentVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
              >
                {renderTab()}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </main>
  );
}
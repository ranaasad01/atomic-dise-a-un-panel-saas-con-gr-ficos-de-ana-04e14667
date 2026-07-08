"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { User, Bell, Lock, Settings, Mail, Globe, Moon, Sun, Shield, Smartphone, Eye, EyeOff, Check, AlertCircle, Save, Trash2, Upload, ChevronRight } from 'lucide-react';
import { fadeInUp, staggerContainer, scaleIn } from "@/lib/motion";
import { useTranslations } from "next-intl";

type Tab = "perfil" | "notificaciones" | "seguridad" | "apariencia" | "integraciones";

const TABS: { id: Tab; label: string; icon: React.ElementType }[] = [
  { id: "perfil", label: "Perfil", icon: User },
  { id: "notificaciones", label: "Notificaciones", icon: Bell },
  { id: "seguridad", label: "Seguridad", icon: Lock },
  { id: "apariencia", label: "Apariencia", icon: Sun },
  { id: "integraciones", label: "Integraciones", icon: Settings },
];

const TIMEZONES = [
  "America/Mexico_City",
  "America/Bogota",
  "America/Lima",
  "America/Santiago",
  "America/Buenos_Aires",
  "Europe/Madrid",
  "UTC",
];

const LANGUAGES = [
  { value: "es", label: "Español" },
  { value: "en", label: "English" },
  { value: "pt", label: "Português" },
  { value: "fr", label: "Français" },
];

interface Integration {
  id: string;
  name: string;
  description: string;
  connected: boolean;
  icon: string;
  category: string;
}

const INTEGRATIONS: Integration[] = [
  { id: "slack", name: "Slack", description: "Recibe alertas y reportes directamente en tus canales.", connected: true, icon: "S", category: "Comunicación" },
  { id: "stripe", name: "Stripe", description: "Sincroniza datos de pagos y suscripciones.", connected: true, icon: "St", category: "Pagos" },
  { id: "hubspot", name: "HubSpot", description: "Conecta tu CRM para unificar datos de clientes.", connected: false, icon: "H", category: "CRM" },
  { id: "google", name: "Google Analytics", description: "Importa métricas de tráfico web.", connected: false, icon: "G", category: "Analíticas" },
  { id: "zapier", name: "Zapier", description: "Automatiza flujos de trabajo con miles de apps.", connected: false, icon: "Z", category: "Automatización" },
  { id: "notion", name: "Notion", description: "Exporta reportes a tus páginas de Notion.", connected: false, icon: "N", category: "Productividad" },
];

function SaveBanner({ visible }: { visible: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 16 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-xl border border-sky-500/30 bg-sky-500/20 px-5 py-3 shadow-[0_8px_32px_rgba(99,102,241,0.25)] backdrop-blur-xl"
    >
      <Check className="h-4 w-4 text-sky-300" />
      <span className="text-sm font-medium text-sky-200">Cambios guardados correctamente</span>
    </motion.div>
  );
}

function SectionHeader({ title, description }: { title: string; description: string }) {
  return (
    <div className="mb-6">
      <h2 className="text-lg font-semibold text-white tracking-tight">{title}</h2>
      <p className="mt-1 text-sm text-slate-400 leading-relaxed">{description}</p>
    </div>
  );
}

function FieldGroup({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-1 gap-2 sm:grid-cols-3 sm:gap-6 py-5 border-b border-white/5 last:border-0">
      <div>
        <label className="block text-sm font-medium text-slate-300">{label}</label>
        {hint && <p className="mt-0.5 text-xs text-slate-500 leading-relaxed">{hint}</p>}
      </div>
      <div className="sm:col-span-2">{children}</div>
    </div>
  );
}

function InputField({
  value,
  onChange,
  type = "text",
  placeholder,
  disabled,
}: {
  value: string;
  onChange: (v: string) => void;
  type?: string;
  placeholder?: string;
  disabled?: boolean;
}) {
  return (
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      disabled={disabled}
      className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-200 placeholder-slate-500 outline-none transition-all duration-200 focus:border-sky-500/50 focus:ring-2 focus:ring-sky-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
    />
  );
}

function Toggle({ checked, onChange, label }: { checked: boolean; onChange: (v: boolean) => void; label?: string }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onChange(!checked)}
      className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 ${
        checked ? "bg-sky-500" : "bg-white/10"
      }`}
    >
      <span
        className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-lg transition-transform duration-200 ${
          checked ? "translate-x-4" : "translate-x-0"
        }`}
      />
    </button>
  );
}

function SelectField({
  value,
  onChange,
  options,
}: {
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full rounded-lg border border-white/10 bg-[#1E293B] px-3 py-2 text-sm text-slate-200 outline-none transition-all duration-200 focus:border-sky-500/50 focus:ring-2 focus:ring-sky-500/20"
    >
      {options.map((o) => (
        <option key={o.value} value={o.value}>
          {o.label}
        </option>
      ))}
    </select>
  );
}

// ─── Tab Panels ────────────────────────────────────────────────────────────────

function PerfilTab({ onSave }: { onSave: () => void }) {
  const [nombre, setNombre] = useState("Alejandro Reyes");
  const [email, setEmail] = useState("alejandro@novadash.io");
  const [empresa, setEmpresa] = useState("NovaDash Inc.");
  const [cargo, setCargo] = useState("Director de Producto");
  const [bio, setBio] = useState("Apasionado por los datos y la toma de decisiones basada en evidencia.");
  const [timezone, setTimezone] = useState("America/Mexico_City");
  const [language, setLanguage] = useState("es");

  return (
    <motion.div variants={staggerContainer} initial="hidden" animate="visible">
      <motion.div variants={fadeInUp}>
        <SectionHeader
          title="Información de perfil"
          description="Actualiza tu información personal y preferencias de cuenta."
        />
      </motion.div>

      {/* Avatar */}
      <motion.div variants={fadeInUp} className="mb-6 flex items-center gap-5 rounded-xl border border-white/8 bg-white/3 p-5">
        <div className="relative">
          <div className="h-16 w-16 rounded-full bg-gradient-to-br from-sky-500 to-sky-600 flex items-center justify-center text-xl font-bold text-white shadow-[0_0_0_3px_rgba(99,102,241,0.3)]">
            AR
          </div>
          <div className="absolute -bottom-1 -right-1 h-5 w-5 rounded-full bg-sky-500 border-2 border-[#0F172A]" />
        </div>
        <div className="flex-1">
          <p className="text-sm font-medium text-slate-200">Foto de perfil</p>
          <p className="text-xs text-slate-500 mt-0.5">JPG, PNG o GIF. Máximo 2 MB.</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300 hover:bg-white/10 transition-all duration-200"
        >
          <Upload className="h-3.5 w-3.5" />
          Subir foto
        </motion.button>
      </motion.div>

      {/* Fields */}
      <motion.div variants={fadeInUp} className="rounded-xl border border-white/8 bg-white/3 px-5 divide-y divide-white/5">
        <FieldGroup label="Nombre completo" hint="Aparece en reportes y notificaciones.">
          <InputField value={nombre} onChange={setNombre} placeholder="Tu nombre" />
        </FieldGroup>
        <FieldGroup label="Correo electrónico" hint="Usado para iniciar sesión y alertas.">
          <InputField value={email} onChange={setEmail} type="email" placeholder="correo@empresa.com" />
        </FieldGroup>
        <FieldGroup label="Empresa" hint="Nombre de tu organización.">
          <InputField value={empresa} onChange={setEmpresa} placeholder="Nombre de empresa" />
        </FieldGroup>
        <FieldGroup label="Cargo" hint="Tu rol dentro de la organización.">
          <InputField value={cargo} onChange={setCargo} placeholder="Ej. CEO, Analista de datos" />
        </FieldGroup>
        <FieldGroup label="Biografía" hint="Breve descripción visible en tu perfil público.">
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            rows={3}
            className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-200 placeholder-slate-500 outline-none transition-all duration-200 focus:border-sky-500/50 focus:ring-2 focus:ring-sky-500/20 resize-none"
          />
        </FieldGroup>
        <FieldGroup label="Zona horaria" hint="Afecta la visualización de fechas y horas.">
          <SelectField
            value={timezone}
            onChange={setTimezone}
            options={TIMEZONES.map((tz) => ({ value: tz, label: tz }))}
          />
        </FieldGroup>
        <FieldGroup label="Idioma" hint="Idioma de la interfaz.">
          <SelectField value={language} onChange={setLanguage} options={LANGUAGES} />
        </FieldGroup>
      </motion.div>

      <motion.div variants={fadeInUp} className="mt-5 flex justify-end">
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={onSave}
          className="flex items-center gap-2 rounded-lg bg-sky-500 px-5 py-2.5 text-sm font-semibold text-white shadow-[0_0_20px_rgba(99,102,241,0.35)] hover:bg-sky-400 transition-all duration-200"
        >
          <Save className="h-4 w-4" />
          Guardar cambios
        </motion.button>
      </motion.div>
    </motion.div>
  );
}

function NotificacionesTab({ onSave }: { onSave: () => void }) {
  const [emailDigest, setEmailDigest] = useState(true);
  const [alertasKPI, setAlertasKPI] = useState(true);
  const [reporteSemanal, setReporteSemanal] = useState(true);
  const [nuevoUsuario, setNuevoUsuario] = useState(false);
  const [fallosPago, setFallosPago] = useState(true);
  const [pushBrowser, setPushBrowser] = useState(false);
  const [slackAlerts, setSlackAlerts] = useState(true);
  const [digestFreq, setDigestFreq] = useState("diario");

  const groups = [
    {
      title: "Correo electrónico",
      icon: Mail,
      items: [
        { label: "Resumen de actividad", hint: "Recibe un resumen periódico de tus métricas clave.", value: emailDigest, onChange: setEmailDigest },
        { label: "Alertas de KPI", hint: "Notificación cuando un indicador supera o baja del umbral.", value: alertasKPI, onChange: setAlertasKPI },
        { label: "Reporte semanal", hint: "Informe completo cada lunes con el rendimiento de la semana.", value: reporteSemanal, onChange: setReporteSemanal },
        { label: "Nuevo usuario registrado", hint: "Alerta cuando un nuevo usuario se une a tu workspace.", value: nuevoUsuario, onChange: setNuevoUsuario },
        { label: "Fallos de pago", hint: "Notificación inmediata ante cualquier error de cobro.", value: fallosPago, onChange: setFallosPago },
      ],
    },
    {
      title: "Push y otros canales",
      icon: Smartphone,
      items: [
        { label: "Notificaciones push en navegador", hint: "Alertas en tiempo real directamente en tu escritorio.", value: pushBrowser, onChange: setPushBrowser },
        { label: "Alertas en Slack", hint: "Envía notificaciones críticas a tu canal de Slack.", value: slackAlerts, onChange: setSlackAlerts },
      ],
    },
  ];

  return (
    <motion.div variants={staggerContainer} initial="hidden" animate="visible">
      <motion.div variants={fadeInUp}>
        <SectionHeader
          title="Preferencias de notificación"
          description="Controla qué alertas recibes y por qué canales."
        />
      </motion.div>

      {groups.map((group) => (
        <motion.div key={group.title} variants={fadeInUp} className="mb-5 rounded-xl border border-white/8 bg-white/3 overflow-hidden">
          <div className="flex items-center gap-2.5 px-5 py-3.5 border-b border-white/5 bg-white/2">
            <group.icon className="h-4 w-4 text-sky-400" />
            <span className="text-sm font-semibold text-slate-200">{group.title}</span>
          </div>
          <div className="divide-y divide-white/5">
            {group.items.map((item) => (
              <div key={item.label} className="flex items-center justify-between px-5 py-4">
                <div>
                  <p className="text-sm font-medium text-slate-200">{item.label}</p>
                  <p className="text-xs text-slate-500 mt-0.5">{item.hint}</p>
                </div>
                <Toggle checked={item.value} onChange={item.onChange} label={item.label} />
              </div>
            ))}
          </div>
        </motion.div>
      ))}

      <motion.div variants={fadeInUp} className="rounded-xl border border-white/8 bg-white/3 px-5 divide-y divide-white/5">
        <FieldGroup label="Frecuencia del resumen" hint="Con qué periodicidad recibes el digest de actividad.">
          <SelectField
            value={digestFreq}
            onChange={setDigestFreq}
            options={[
              { value: "diario", label: "Diario" },
              { value: "semanal", label: "Semanal" },
              { value: "mensual", label: "Mensual" },
            ]}
          />
        </FieldGroup>
      </motion.div>

      <motion.div variants={fadeInUp} className="mt-5 flex justify-end">
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={onSave}
          className="flex items-center gap-2 rounded-lg bg-sky-500 px-5 py-2.5 text-sm font-semibold text-white shadow-[0_0_20px_rgba(99,102,241,0.35)] hover:bg-sky-400 transition-all duration-200"
        >
          <Save className="h-4 w-4" />
          Guardar preferencias
        </motion.button>
      </motion.div>
    </motion.div>
  );
}

function SeguridadTab({ onSave }: { onSave: () => void }) {
  const [currentPwd, setCurrentPwd] = useState("");
  const [newPwd, setNewPwd] = useState("");
  const [confirmPwd, setConfirmPwd] = useState("");
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [twoFA, setTwoFA] = useState(true);
  const [sessionTimeout, setSessionTimeout] = useState("30");

  const pwdStrength = newPwd.length === 0 ? 0 : newPwd.length < 6 ? 1 : newPwd.length < 10 ? 2 : 3;
  const strengthLabel = ["", "Débil", "Moderada", "Fuerte"][pwdStrength];
  const strengthColor = ["", "bg-sky-500", "bg-sky-500", "bg-sky-500"][pwdStrength];

  const sessions = [
    { device: "Chrome en macOS", location: "Ciudad de México, MX", time: "Activa ahora", current: true },
    { device: "Safari en iPhone 15", location: "Guadalajara, MX", time: "Hace 2 horas", current: false },
    { device: "Firefox en Windows", location: "Madrid, ES", time: "Hace 3 días", current: false },
  ];

  return (
    <motion.div variants={staggerContainer} initial="hidden" animate="visible">
      <motion.div variants={fadeInUp}>
        <SectionHeader
          title="Seguridad de la cuenta"
          description="Gestiona tu contraseña, autenticación de dos factores y sesiones activas."
        />
      </motion.div>

      {/* Password */}
      <motion.div variants={fadeInUp} className="mb-5 rounded-xl border border-white/8 bg-white/3 overflow-hidden">
        <div className="flex items-center gap-2.5 px-5 py-3.5 border-b border-white/5 bg-white/2">
          <Lock className="h-4 w-4 text-sky-400" />
          <span className="text-sm font-semibold text-slate-200">Cambiar contraseña</span>
        </div>
        <div className="px-5 divide-y divide-white/5">
          <FieldGroup label="Contraseña actual">
            <div className="relative">
              <InputField value={currentPwd} onChange={setCurrentPwd} type={showCurrent ? "text" : "password"} placeholder="••••••••" />
              <button
                type="button"
                onClick={() => setShowCurrent(!showCurrent)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
              >
                {showCurrent ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </FieldGroup>
          <FieldGroup label="Nueva contraseña" hint="Mínimo 8 caracteres, incluye números y símbolos.">
            <div className="space-y-2">
              <div className="relative">
                <InputField value={newPwd} onChange={setNewPwd} type={showNew ? "text" : "password"} placeholder="••••••••" />
                <button
                  type="button"
                  onClick={() => setShowNew(!showNew)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
                >
                  {showNew ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {newPwd.length > 0 && (
                <div className="flex items-center gap-2">
                  <div className="flex gap-1 flex-1">
                    {[1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className={`h-1 flex-1 rounded-full transition-all duration-300 ${i <= pwdStrength ? strengthColor : "bg-white/10"}`}
                      />
                    ))}
                  </div>
                  <span className="text-xs text-slate-400">{strengthLabel}</span>
                </div>
              )}
            </div>
          </FieldGroup>
          <FieldGroup label="Confirmar contraseña">
            <div className="space-y-1">
              <InputField value={confirmPwd} onChange={setConfirmPwd} type="password" placeholder="••••••••" />
              {confirmPwd.length > 0 && confirmPwd !== newPwd && (
                <p className="flex items-center gap-1 text-xs text-sky-400">
                  <AlertCircle className="h-3 w-3" /> Las contraseñas no coinciden
                </p>
              )}
            </div>
          </FieldGroup>
        </div>
      </motion.div>

      {/* 2FA */}
      <motion.div variants={fadeInUp} className="mb-5 rounded-xl border border-white/8 bg-white/3 overflow-hidden">
        <div className="flex items-center gap-2.5 px-5 py-3.5 border-b border-white/5 bg-white/2">
          <Shield className="h-4 w-4 text-sky-400" />
          <span className="text-sm font-semibold text-slate-200">Autenticación de dos factores</span>
        </div>
        <div className="px-5 py-4 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-slate-200">Activar 2FA</p>
            <p className="text-xs text-slate-500 mt-0.5">Protege tu cuenta con una capa adicional de seguridad mediante una app autenticadora.</p>
          </div>
          <Toggle checked={twoFA} onChange={setTwoFA} label="Autenticación de dos factores" />
        </div>
        {twoFA && (
          <div className="mx-5 mb-4 rounded-lg border border-sky-500/20 bg-sky-500/10 px-4 py-3 flex items-center gap-2">
            <Check className="h-4 w-4 text-sky-400 shrink-0" />
            <p className="text-xs text-sky-300">2FA activado. Tu cuenta está protegida con Google Authenticator.</p>
          </div>
        )}
        <div className="px-5 pb-4">
          <FieldGroup label="Tiempo de sesión" hint="Cierre automático de sesión por inactividad.">
            <SelectField
              value={sessionTimeout}
              onChange={setSessionTimeout}
              options={[
                { value: "15", label: "15 minutos" },
                { value: "30", label: "30 minutos" },
                { value: "60", label: "1 hora" },
                { value: "480", label: "8 horas" },
                { value: "never", label: "Nunca" },
              ]}
            />
          </FieldGroup>
        </div>
      </motion.div>

      {/* Sessions */}
      <motion.div variants={fadeInUp} className="mb-5 rounded-xl border border-white/8 bg-white/3 overflow-hidden">
        <div className="flex items-center gap-2.5 px-5 py-3.5 border-b border-white/5 bg-white/2">
          <Globe className="h-4 w-4 text-sky-400" />
          <span className="text-sm font-semibold text-slate-200">Sesiones activas</span>
        </div>
        <div className="divide-y divide-white/5">
          {sessions.map((s) => (
            <div key={s.device} className="flex items-center justify-between px-5 py-4">
              <div className="flex items-center gap-3">
                <div className={`h-2 w-2 rounded-full ${s.current ? "bg-sky-400" : "bg-slate-600"}`} />
                <div>
                  <p className="text-sm font-medium text-slate-200">{s.device}</p>
                  <p className="text-xs text-slate-500">{s.location} · {s.time}</p>
                </div>
              </div>
              {!s.current && (
                <button className="text-xs text-sky-400 hover:text-sky-300 transition-colors font-medium">
                  Cerrar
                </button>
              )}
              {s.current && (
                <span className="text-xs text-sky-400 font-medium">Esta sesión</span>
              )}
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div variants={fadeInUp} className="flex justify-end">
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={onSave}
          className="flex items-center gap-2 rounded-lg bg-sky-500 px-5 py-2.5 text-sm font-semibold text-white shadow-[0_0_20px_rgba(99,102,241,0.35)] hover:bg-sky-400 transition-all duration-200"
        >
          <Save className="h-4 w-4" />
          Guardar seguridad
        </motion.button>
      </motion.div>
    </motion.div>
  );
}

function AparienciaTab({ onSave }: { onSave: () => void }) {
  const [theme, setTheme] = useState<"dark" | "light" | "system">("dark");
  const [accentColor, setAccentColor] = useState("indigo");
  const [compactMode, setCompactMode] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [animaciones, setAnimaciones] = useState(true);
  const [fontSize, setFontSize] = useState("medium");

  const themes: { id: "dark" | "light" | "system"; label: string; icon: React.ElementType }[] = [
    { id: "dark", label: "Oscuro", icon: Moon },
    { id: "light", label: "Claro", icon: Sun },
    { id: "system", label: "Sistema", icon: Settings },
  ];

  const accents = [
    { id: "indigo", color: "bg-sky-500", label: "Índigo" },
    { id: "violet", color: "bg-sky-500", label: "Violeta" },
    { id: "cyan", color: "bg-sky-500", label: "Cian" },
    { id: "emerald", color: "bg-sky-500", label: "Esmeralda" },
    { id: "rose", color: "bg-sky-500", label: "Rosa" },
    { id: "amber", color: "bg-sky-500", label: "Ámbar" },
  ];

  return (
    <motion.div variants={staggerContainer} initial="hidden" animate="visible">
      <motion.div variants={fadeInUp}>
        <SectionHeader
          title="Apariencia"
          description="Personaliza el aspecto visual del panel según tus preferencias."
        />
      </motion.div>

      {/* Theme */}
      <motion.div variants={fadeInUp} className="mb-5 rounded-xl border border-white/8 bg-white/3 overflow-hidden">
        <div className="flex items-center gap-2.5 px-5 py-3.5 border-b border-white/5 bg-white/2">
          <Moon className="h-4 w-4 text-sky-400" />
          <span className="text-sm font-semibold text-slate-200">Tema</span>
        </div>
        <div className="px-5 py-4">
          <div className="grid grid-cols-3 gap-3">
            {themes.map((t) => (
              <motion.button
                key={t.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setTheme(t.id)}
                className={`flex flex-col items-center gap-2 rounded-xl border p-4 transition-all duration-200 ${
                  theme === t.id
                    ? "border-sky-500/50 bg-sky-500/15 text-sky-300"
                    : "border-white/8 bg-white/3 text-slate-400 hover:border-white/15 hover:bg-white/5"
                }`}
              >
                <t.icon className="h-5 w-5" />
                <span className="text-xs font-medium">{t.label}</span>
                {theme === t.id && <Check className="h-3 w-3 text-sky-400" />}
              </motion.button>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Accent */}
      <motion.div variants={fadeInUp} className="mb-5 rounded-xl border border-white/8 bg-white/3 overflow-hidden">
        <div className="flex items-center gap-2.5 px-5 py-3.5 border-b border-white/5 bg-white/2">
          <span className="text-sm font-semibold text-slate-200">Color de acento</span>
        </div>
        <div className="px-5 py-4 flex flex-wrap gap-3">
          {accents.map((a) => (
            <motion.button
              key={a.id}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setAccentColor(a.id)}
              title={a.label}
              className={`relative h-8 w-8 rounded-full ${a.color} transition-all duration-200 ${
                accentColor === a.id ? "ring-2 ring-white/50 ring-offset-2 ring-offset-[#0F172A]" : ""
              }`}
            >
              {accentColor === a.id && (
                <Check className="absolute inset-0 m-auto h-4 w-4 text-white" />
              )}
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Options */}
      <motion.div variants={fadeInUp} className="mb-5 rounded-xl border border-white/8 bg-white/3 overflow-hidden">
        <div className="flex items-center gap-2.5 px-5 py-3.5 border-b border-white/5 bg-white/2">
          <span className="text-sm font-semibold text-slate-200">Opciones de visualización</span>
        </div>
        <div className="divide-y divide-white/5">
          {[
            { label: "Modo compacto", hint: "Reduce el espaciado para mostrar más información.", value: compactMode, onChange: setCompactMode },
            { label: "Barra lateral colapsada", hint: "Inicia con la barra lateral minimizada.", value: sidebarCollapsed, onChange: setSidebarCollapsed },
            { label: "Animaciones de interfaz", hint: "Activa transiciones y efectos de movimiento.", value: animaciones, onChange: setAnimaciones },
          ].map((item) => (
            <div key={item.label} className="flex items-center justify-between px-5 py-4">
              <div>
                <p className="text-sm font-medium text-slate-200">{item.label}</p>
                <p className="text-xs text-slate-500 mt-0.5">{item.hint}</p>
              </div>
              <Toggle checked={item.value} onChange={item.onChange} label={item.label} />
            </div>
          ))}
        </div>
        <div className="px-5 pb-4 border-t border-white/5">
          <FieldGroup label="Tamaño de fuente" hint="Ajusta el tamaño del texto en la interfaz.">
            <SelectField
              value={fontSize}
              onChange={setFontSize}
              options={[
                { value: "small", label: "Pequeño" },
                { value: "medium", label: "Mediano" },
                { value: "large", label: "Grande" },
              ]}
            />
          </FieldGroup>
        </div>
      </motion.div>

      <motion.div variants={fadeInUp} className="flex justify-end">
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={onSave}
          className="flex items-center gap-2 rounded-lg bg-sky-500 px-5 py-2.5 text-sm font-semibold text-white shadow-[0_0_20px_rgba(99,102,241,0.35)] hover:bg-sky-400 transition-all duration-200"
        >
          <Save className="h-4 w-4" />
          Guardar apariencia
        </motion.button>
      </motion.div>
    </motion.div>
  );
}

function IntegracionesTab() {
  const [integrations, setIntegrations] = useState<Integration[]>(INTEGRATIONS);

  const toggle = (id: string) => {
    setIntegrations((prev) =>
      prev.map((i) => (i.id === id ? { ...i, connected: !i.connected } : i))
    );
  };

  const categories = Array.from(new Set(integrations.map((i) => i.category)));

  return (
    <motion.div variants={staggerContainer} initial="hidden" animate="visible">
      <motion.div variants={fadeInUp}>
        <SectionHeader
          title="Integraciones"
          description="Conecta NovaDash con tus herramientas favoritas para centralizar tus datos."
        />
      </motion.div>

      <motion.div variants={fadeInUp} className="mb-5 rounded-xl border border-sky-500/20 bg-sky-500/8 px-5 py-4 flex items-start gap-3">
        <AlertCircle className="h-4 w-4 text-sky-400 mt-0.5 shrink-0" />
        <p className="text-sm text-sky-300 leading-relaxed">
          Las integraciones activas sincronizan datos automáticamente cada 15 minutos. Puedes pausarlas en cualquier momento sin perder la configuración.
        </p>
      </motion.div>

      {categories.map((cat) => (
        <motion.div key={cat} variants={fadeInUp} className="mb-5">
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-3">{cat}</p>
          <div className="space-y-3">
            {integrations
              .filter((i) => i.category === cat)
              .map((integration) => (
                <motion.div
                  key={integration.id}
                  whileHover={{ scale: 1.005 }}
                  className="flex items-center justify-between rounded-xl border border-white/8 bg-white/3 px-5 py-4 transition-all duration-200 hover:border-white/12 hover:bg-white/5"
                >
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-slate-700 to-slate-800 border border-white/10 flex items-center justify-center text-sm font-bold text-slate-200">
                      {integration.icon}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-semibold text-slate-200">{integration.name}</p>
                        {integration.connected && (
                          <span className="inline-flex items-center gap-1 rounded-full bg-sky-500/15 border border-sky-500/25 px-2 py-0.5 text-xs font-medium text-sky-400">
                            <span className="h-1.5 w-1.5 rounded-full bg-sky-400" />
                            Conectado
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-500 mt-0.5">{integration.description}</p>
                    </div>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    onClick={() => toggle(integration.id)}
                    className={`flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-semibold transition-all duration-200 ${
                      integration.connected
                        ? "border-sky-500/25 bg-sky-500/10 text-sky-400 hover:bg-sky-500/20"
                        : "border-sky-500/30 bg-sky-500/15 text-sky-300 hover:bg-sky-500/25"
                    }`}
                  >
                    {integration.connected ? (
                      <>
                        <Trash2 className="h-3 w-3" />
                        Desconectar
                      </>
                    ) : (
                      <>
                        <ChevronRight className="h-3 w-3" />
                        Conectar
                      </>
                    )}
                  </motion.button>
                </motion.div>
              ))}
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}

// ─── Main Page ─────────────────────────────────────────────────────────────────

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<Tab>("perfil");
  const [showSaved, setShowSaved] = useState(false);

  const handleSave = () => {
    setShowSaved(true);
    setTimeout(() => setShowSaved(false), 3000);
  };

  return (
    <div className="min-h-screen bg-[#0F172A]">
      {/* Ambient glow */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 h-96 w-96 rounded-full bg-sky-500/6 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 h-64 w-64 rounded-full bg-sky-500/5 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10">
        {/* Page header */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          className="mb-8"
        >
          <h1 className="text-2xl font-bold tracking-tight text-white">Configuración</h1>
          <p className="mt-1 text-sm text-slate-400">Gestiona tu cuenta, seguridad y preferencias del panel.</p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar tabs */}
          <motion.aside
            variants={scaleIn}
            initial="hidden"
            animate="visible"
            className="lg:w-56 shrink-0"
          >
            <nav className="rounded-xl border border-white/8 bg-white/3 overflow-hidden">
              {TABS.map((tab, i) => {
                const active = activeTab === tab.id;
                return (
                  <motion.button
                    key={tab.id}
                    whileHover={{ x: 2 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium transition-all duration-200 ${
                      i < TABS.length - 1 ? "border-b border-white/5" : ""
                    } ${
                      active
                        ? "bg-sky-500/15 text-sky-300 border-l-2 border-l-indigo-500"
                        : "text-slate-400 hover:text-slate-200 hover:bg-white/5 border-l-2 border-l-transparent"
                    }`}
                  >
                    <tab.icon className="h-4 w-4 shrink-0" />
                    {tab.label}
                  </motion.button>
                );
              })}
            </nav>

            {/* Danger zone */}
            <motion.div
              variants={fadeInUp}
              className="mt-4 rounded-xl border border-sky-500/15 bg-sky-500/5 p-4"
            >
              <p className="text-xs font-semibold text-sky-400 mb-2">Zona de peligro</p>
              <p className="text-xs text-slate-500 mb-3 leading-relaxed">Esta acción eliminará permanentemente tu cuenta y todos los datos asociados.</p>
              <button className="w-full flex items-center justify-center gap-1.5 rounded-lg border border-sky-500/25 bg-sky-500/10 px-3 py-2 text-xs font-semibold text-sky-400 hover:bg-sky-500/20 transition-all duration-200">
                <Trash2 className="h-3 w-3" />
                Eliminar cuenta
              </button>
            </motion.div>
          </motion.aside>

          {/* Content panel */}
          <motion.main
            key={activeTab}
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="flex-1 min-w-0"
          >
            {activeTab === "perfil" && <PerfilTab onSave={handleSave} />}
            {activeTab === "notificaciones" && <NotificacionesTab onSave={handleSave} />}
            {activeTab === "seguridad" && <SeguridadTab onSave={handleSave} />}
            {activeTab === "apariencia" && <AparienciaTab onSave={handleSave} />}
            {activeTab === "integraciones" && <IntegracionesTab />}
          </motion.main>
        </div>
      </div>

      <SaveBanner visible={showSaved} />
    </div>
  );
}
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, Users, DollarSign, ShoppingCart, Activity, ArrowUpRight, ArrowDownRight, MoreHorizontal, Download, RefreshCw, Eye, Star, Clock } from 'lucide-react';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import { fadeInUp, fadeIn, staggerContainer, scaleIn } from "@/lib/motion";
import { APP_NAME, PERIODS, type Period } from "@/lib/data";
import { useTranslations } from "next-intl";

// ─── Mock Data ────────────────────────────────────────────────────────────────

const kpiCards = [
  {
    id: "revenue",
    label: "Ingresos Totales",
    value: "€124,580",
    rawValue: 124580,
    change: 12.4,
    icon: DollarSign,
    color: "indigo",
    description: "vs. mes anterior",
  },
  {
    id: "users",
    label: "Usuarios Activos",
    value: "8,342",
    rawValue: 8342,
    change: 7.1,
    icon: Users,
    color: "violet",
    description: "vs. mes anterior",
  },
  {
    id: "orders",
    label: "Pedidos",
    value: "2,891",
    rawValue: 2891,
    change: -3.2,
    icon: ShoppingCart,
    color: "sky",
    description: "vs. mes anterior",
  },
  {
    id: "conversion",
    label: "Tasa de Conversión",
    value: "3.68%",
    rawValue: 3.68,
    change: 0.9,
    icon: Activity,
    color: "emerald",
    description: "vs. mes anterior",
  },
];

const areaDataByPeriod: Record<Period, { name: string; ingresos: number; usuarios: number; conversiones: number }[]> = {
  diario: [
    { name: "Lun", ingresos: 3200, usuarios: 420, conversiones: 38 },
    { name: "Mar", ingresos: 4100, usuarios: 510, conversiones: 52 },
    { name: "Mié", ingresos: 3800, usuarios: 480, conversiones: 44 },
    { name: "Jue", ingresos: 5200, usuarios: 620, conversiones: 61 },
    { name: "Vie", ingresos: 6100, usuarios: 710, conversiones: 74 },
    { name: "Sáb", ingresos: 4700, usuarios: 540, conversiones: 55 },
    { name: "Dom", ingresos: 3900, usuarios: 460, conversiones: 42 },
  ],
  semanal: [
    { name: "Sem 1", ingresos: 22000, usuarios: 2800, conversiones: 280 },
    { name: "Sem 2", ingresos: 28500, usuarios: 3400, conversiones: 340 },
    { name: "Sem 3", ingresos: 31200, usuarios: 3900, conversiones: 390 },
    { name: "Sem 4", ingresos: 42800, usuarios: 4200, conversiones: 420 },
  ],
  mensual: [
    { name: "Ene", ingresos: 68000, usuarios: 5200, conversiones: 520 },
    { name: "Feb", ingresos: 74000, usuarios: 5800, conversiones: 580 },
    { name: "Mar", ingresos: 82000, usuarios: 6400, conversiones: 640 },
    { name: "Abr", ingresos: 79000, usuarios: 6100, conversiones: 610 },
    { name: "May", ingresos: 91000, usuarios: 7200, conversiones: 720 },
    { name: "Jun", ingresos: 98000, usuarios: 7800, conversiones: 780 },
    { name: "Jul", ingresos: 105000, usuarios: 8100, conversiones: 810 },
    { name: "Ago", ingresos: 112000, usuarios: 8400, conversiones: 840 },
    { name: "Sep", ingresos: 108000, usuarios: 8200, conversiones: 820 },
    { name: "Oct", ingresos: 118000, usuarios: 8600, conversiones: 860 },
    { name: "Nov", ingresos: 124000, usuarios: 8900, conversiones: 890 },
    { name: "Dic", ingresos: 131000, usuarios: 9200, conversiones: 920 },
  ],
  anual: [
    { name: "2020", ingresos: 480000, usuarios: 32000, conversiones: 3200 },
    { name: "2021", ingresos: 620000, usuarios: 45000, conversiones: 4500 },
    { name: "2022", ingresos: 810000, usuarios: 61000, conversiones: 6100 },
    { name: "2023", ingresos: 1050000, usuarios: 78000, conversiones: 7800 },
    { name: "2024", ingresos: 1240000, usuarios: 92000, conversiones: 9200 },
  ],
};

const channelData = [
  { name: "Orgánico", value: 38, color: "#6366F1" },
  { name: "Directo", value: 24, color: "#8B5CF6" },
  { name: "Social", value: 19, color: "#06B6D4" },
  { name: "Email", value: 12, color: "#10B981" },
  { name: "Referidos", value: 7, color: "#F59E0B" },
];

const topProducts = [
  { id: "p1", name: "Plan Pro Anual", category: "Suscripción", revenue: "€42,800", units: 214, trend: 18.2, rating: 4.9 },
  { id: "p2", name: "Plan Business", category: "Suscripción", revenue: "€31,200", units: 156, trend: 12.5, rating: 4.7 },
  { id: "p3", name: "Add-on Analytics", category: "Complemento", revenue: "€18,600", units: 310, trend: 24.1, rating: 4.8 },
  { id: "p4", name: "Plan Starter", category: "Suscripción", revenue: "€14,900", units: 298, trend: -2.3, rating: 4.5 },
  { id: "p5", name: "Consultoría Premium", category: "Servicio", revenue: "€11,400", units: 38, trend: 8.7, rating: 5.0 },
];

const recentActivity = [
  { id: "a1", user: "María García", action: "Actualizó a Plan Pro", time: "hace 3 min", avatar: "MG", color: "indigo" },
  { id: "a2", user: "Carlos López", action: "Nuevo registro completado", time: "hace 11 min", avatar: "CL", color: "violet" },
  { id: "a3", user: "Ana Martínez", action: "Exportó informe mensual", time: "hace 28 min", avatar: "AM", color: "sky" },
  { id: "a4", user: "Pedro Sánchez", action: "Canceló suscripción", time: "hace 45 min", avatar: "PS", color: "rose" },
  { id: "a5", user: "Laura Fernández", action: "Añadió método de pago", time: "hace 1 h", avatar: "LF", color: "emerald" },
  { id: "a6", user: "Javier Ruiz", action: "Abrió ticket de soporte", time: "hace 2 h", avatar: "JR", color: "amber" },
];

const barData = [
  { name: "Ene", nuevos: 420, recurrentes: 820 },
  { name: "Feb", nuevos: 380, recurrentes: 910 },
  { name: "Mar", nuevos: 510, recurrentes: 980 },
  { name: "Abr", nuevos: 470, recurrentes: 1020 },
  { name: "May", nuevos: 620, recurrentes: 1150 },
  { name: "Jun", nuevos: 580, recurrentes: 1240 },
];

// ─── Color helpers ────────────────────────────────────────────────────────────

const colorMap: Record<string, { bg: string; border: string; text: string; icon: string }> = {
  indigo: {
    bg: "bg-indigo-500/10",
    border: "border-indigo-500/20",
    text: "text-indigo-400",
    icon: "text-indigo-400",
  },
  violet: {
    bg: "bg-violet-500/10",
    border: "border-violet-500/20",
    text: "text-violet-400",
    icon: "text-violet-400",
  },
  sky: {
    bg: "bg-sky-500/10",
    border: "border-sky-500/20",
    text: "text-sky-400",
    icon: "text-sky-400",
  },
  emerald: {
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/20",
    text: "text-emerald-400",
    icon: "text-emerald-400",
  },
  rose: {
    bg: "bg-rose-500/10",
    border: "border-rose-500/20",
    text: "text-rose-400",
    icon: "text-rose-400",
  },
  amber: {
    bg: "bg-amber-500/10",
    border: "border-amber-500/20",
    text: "text-amber-400",
    icon: "text-amber-400",
  },
};

// ─── Custom Tooltip ───────────────────────────────────────────────────────────

const CustomTooltip = ({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: { name: string; value: number; color: string }[];
  label?: string;
}) => {
  if (!active || !payload || payload.length === 0) return null;
  return (
    <div className="rounded-xl border border-white/10 bg-[#1E293B]/95 backdrop-blur-xl px-4 py-3 shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-400">{label}</p>
      {payload.map((entry) => (
        <div key={entry.name} className="flex items-center gap-2 text-sm">
          <span className="h-2 w-2 rounded-full" style={{ backgroundColor: entry.color }} />
          <span className="text-slate-300 capitalize">{entry.name}:</span>
          <span className="font-semibold text-white">
            {entry.name === "ingresos" || entry.name === "nuevos" || entry.name === "recurrentes"
              ? `€${(entry.value ?? 0).toLocaleString("es-ES")}`
              : (entry.value ?? 0).toLocaleString("es-ES")}
          </span>
        </div>
      ))}
    </div>
  );
};

// ─── Main Component ───────────────────────────────────────────────────────────

export default function DashboardPage() {
  const [activePeriod, setActivePeriod] = useState<Period>("mensual");
  const t = useTranslations();

  const chartData = areaDataByPeriod[activePeriod] ?? areaDataByPeriod["mensual"];

  return (
    <div className="min-h-screen bg-[#0F172A] text-white">
      {/* Ambient glow */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-40 left-1/4 h-[500px] w-[500px] rounded-full bg-indigo-600/8 blur-[120px]" />
        <div className="absolute top-1/3 right-1/4 h-[400px] w-[400px] rounded-full bg-violet-600/6 blur-[100px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">

        {/* ── Page Header ── */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
        >
          <motion.div variants={fadeInUp}>
            <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-indigo-400">
              {APP_NAME}
            </p>
            <h1 className="text-3xl font-bold tracking-tight text-white text-balance">
              Panel Principal
            </h1>
            <p className="mt-1 text-sm text-slate-400">
              Resumen de rendimiento y métricas clave del negocio.
            </p>
          </motion.div>

          <motion.div variants={fadeInUp} className="flex items-center gap-2">
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-300 hover:bg-white/10 transition-all duration-200"
            >
              <RefreshCw className="h-3.5 w-3.5" />
              Actualizar
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="flex items-center gap-2 rounded-lg bg-indigo-500 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-400 transition-all duration-200 shadow-[0_0_20px_rgba(99,102,241,0.3)]"
            >
              <Download className="h-3.5 w-3.5" />
              Exportar
            </motion.button>
          </motion.div>
        </motion.div>

        {/* ── KPI Cards ── */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4"
        >
          {kpiCards.map((card) => {
            const Icon = card.icon;
            const colors = colorMap[card.color] ?? colorMap["indigo"];
            const isPositive = card.change >= 0;
            return (
              <motion.div
                key={card.id}
                variants={scaleIn}
                whileHover={{ y: -3, scale: 1.01 }}
                className="group relative overflow-hidden rounded-2xl border border-white/8 bg-[#1E293B]/60 backdrop-blur-sm p-5 shadow-[0_1px_2px_rgba(0,0,0,0.08),0_8px_24px_-8px_rgba(0,0,0,0.24)] transition-all duration-300 hover:border-white/15 hover:shadow-[0_1px_2px_rgba(0,0,0,0.08),0_16px_40px_-12px_rgba(0,0,0,0.32)]"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs font-medium text-slate-400">{card.label}</p>
                    <p className="mt-2 text-2xl font-bold tracking-tight text-white">{card.value}</p>
                  </div>
                  <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${colors.bg} border ${colors.border}`}>
                    <Icon className={`h-5 w-5 ${colors.icon}`} />
                  </div>
                </div>
                <div className="mt-3 flex items-center gap-1.5">
                  {isPositive ? (
                    <ArrowUpRight className="h-3.5 w-3.5 text-emerald-400" />
                  ) : (
                    <ArrowDownRight className="h-3.5 w-3.5 text-rose-400" />
                  )}
                  <span className={`text-xs font-semibold ${isPositive ? "text-emerald-400" : "text-rose-400"}`}>
                    {isPositive ? "+" : ""}{card.change}%
                  </span>
                  <span className="text-xs text-slate-500">{card.description}</span>
                </div>
                {/* Subtle gradient accent */}
                <div className={`pointer-events-none absolute bottom-0 right-0 h-20 w-20 rounded-full ${colors.bg} blur-2xl opacity-40 group-hover:opacity-70 transition-opacity duration-500`} />
              </motion.div>
            );
          })}
        </motion.div>

        {/* ── Main Chart + Channel Breakdown ── */}
        <div className="mb-8 grid grid-cols-1 gap-6 xl:grid-cols-3">

          {/* Area Chart — spans 2 cols */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="xl:col-span-2 rounded-2xl border border-white/8 bg-[#1E293B]/60 backdrop-blur-sm p-6 shadow-[0_1px_2px_rgba(0,0,0,0.08),0_8px_24px_-8px_rgba(0,0,0,0.24)]"
          >
            <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-base font-semibold text-white">Evolución de Ingresos</h2>
                <p className="text-xs text-slate-400 mt-0.5">Ingresos, usuarios y conversiones por período</p>
              </div>
              <div className="flex items-center gap-1 rounded-xl border border-white/8 bg-white/5 p-1">
                {PERIODS.map((p) => (
                  <button
                    key={p.value}
                    onClick={() => setActivePeriod(p.value)}
                    className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-all duration-200 ${
                      activePeriod === p.value
                        ? "bg-indigo-500 text-white shadow-[0_0_12px_rgba(99,102,241,0.4)]"
                        : "text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>
            <ResponsiveContainer width="100%" height={260}>
              <AreaChart data={chartData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="gradIngresos" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366F1" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#6366F1" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="gradUsuarios" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="name" tick={{ fill: "#64748B", fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "#64748B", fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type="monotone"
                  dataKey="ingresos"
                  stroke="#6366F1"
                  strokeWidth={2}
                  fill="url(#gradIngresos)"
                  dot={false}
                  activeDot={{ r: 5, fill: "#6366F1", stroke: "#fff", strokeWidth: 2 }}
                />
                <Area
                  type="monotone"
                  dataKey="usuarios"
                  stroke="#8B5CF6"
                  strokeWidth={2}
                  fill="url(#gradUsuarios)"
                  dot={false}
                  activeDot={{ r: 5, fill: "#8B5CF6", stroke: "#fff", strokeWidth: 2 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Pie Chart — channel breakdown */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="rounded-2xl border border-white/8 bg-[#1E293B]/60 backdrop-blur-sm p-6 shadow-[0_1px_2px_rgba(0,0,0,0.08),0_8px_24px_-8px_rgba(0,0,0,0.24)]"
          >
            <h2 className="mb-1 text-base font-semibold text-white">Canales de Tráfico</h2>
            <p className="mb-4 text-xs text-slate-400">Distribución por fuente</p>
            <ResponsiveContainer width="100%" height={180}>
              <PieChart>
                <Pie
                  data={channelData}
                  cx="50%"
                  cy="50%"
                  innerRadius={52}
                  outerRadius={78}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {channelData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} stroke="transparent" />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value: number) => [`${value}%`, "Participación"]}
                  contentStyle={{
                    background: "rgba(30,41,59,0.95)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: "12px",
                    color: "#fff",
                    fontSize: "12px",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
            <ul className="mt-2 space-y-2">
              {channelData.map((ch) => (
                <li key={ch.name} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full" style={{ backgroundColor: ch.color }} />
                    <span className="text-slate-300">{ch.name}</span>
                  </div>
                  <span className="font-semibold text-white">{ch.value}%</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* ── Bar Chart + Activity Feed ── */}
        <div className="mb-8 grid grid-cols-1 gap-6 xl:grid-cols-5">

          {/* Bar Chart — user types */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="xl:col-span-3 rounded-2xl border border-white/8 bg-[#1E293B]/60 backdrop-blur-sm p-6 shadow-[0_1px_2px_rgba(0,0,0,0.08),0_8px_24px_-8px_rgba(0,0,0,0.24)]"
          >
            <div className="mb-5 flex items-center justify-between">
              <div>
                <h2 className="text-base font-semibold text-white">Usuarios por Tipo</h2>
                <p className="text-xs text-slate-400 mt-0.5">Nuevos vs. recurrentes (últimos 6 meses)</p>
              </div>
              <div className="flex items-center gap-3 text-xs text-slate-400">
                <span className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-indigo-400" />
                  Nuevos
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-violet-400" />
                  Recurrentes
                </span>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={barData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }} barGap={4}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis dataKey="name" tick={{ fill: "#64748B", fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "#64748B", fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="nuevos" fill="#6366F1" radius={[4, 4, 0, 0]} maxBarSize={28} />
                <Bar dataKey="recurrentes" fill="#8B5CF6" radius={[4, 4, 0, 0]} maxBarSize={28} />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Activity Feed */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="xl:col-span-2 rounded-2xl border border-white/8 bg-[#1E293B]/60 backdrop-blur-sm p-6 shadow-[0_1px_2px_rgba(0,0,0,0.08),0_8px_24px_-8px_rgba(0,0,0,0.24)]"
          >
            <div className="mb-5 flex items-center justify-between">
              <div>
                <h2 className="text-base font-semibold text-white">Actividad Reciente</h2>
                <p className="text-xs text-slate-400 mt-0.5">Últimas acciones de usuarios</p>
              </div>
              <button className="rounded-lg border border-white/10 bg-white/5 p-1.5 text-slate-400 hover:text-slate-200 hover:bg-white/10 transition-all duration-200">
                <MoreHorizontal className="h-4 w-4" />
              </button>
            </div>
            <motion.ul
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="space-y-3"
            >
              {recentActivity.map((item) => {
                const colors = colorMap[item.color] ?? colorMap["indigo"];
                return (
                  <motion.li
                    key={item.id}
                    variants={fadeInUp}
                    className="flex items-start gap-3"
                  >
                    <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold ${colors.bg} ${colors.text} border ${colors.border}`}>
                      {item.avatar}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-slate-200">{item.user}</p>
                      <p className="truncate text-xs text-slate-400">{item.action}</p>
                    </div>
                    <div className="flex shrink-0 items-center gap-1 text-xs text-slate-500">
                      <Clock className="h-3 w-3" />
                      <span className="whitespace-nowrap">{item.time}</span>
                    </div>
                  </motion.li>
                );
              })}
            </motion.ul>
          </motion.div>
        </div>

        {/* ── Top Products Table ── */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="rounded-2xl border border-white/8 bg-[#1E293B]/60 backdrop-blur-sm shadow-[0_1px_2px_rgba(0,0,0,0.08),0_8px_24px_-8px_rgba(0,0,0,0.24)] overflow-hidden"
        >
          <div className="flex items-center justify-between px-6 py-5 border-b border-white/8">
            <div>
              <h2 className="text-base font-semibold text-white">Productos Destacados</h2>
              <p className="text-xs text-slate-400 mt-0.5">Rendimiento por producto este mes</p>
            </div>
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-slate-300 hover:bg-white/10 transition-all duration-200"
            >
              <Eye className="h-3.5 w-3.5" />
              Ver todos
            </motion.button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/5">
                  <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Producto</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Categoría</th>
                  <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wider text-slate-500">Ingresos</th>
                  <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wider text-slate-500">Unidades</th>
                  <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wider text-slate-500">Tendencia</th>
                  <th className="px-6 py-3 text-right text-xs font-semibold uppercase tracking-wider text-slate-500">Valoración</th>
                </tr>
              </thead>
              <tbody>
                {topProducts.map((product, idx) => {
                  const isPositiveTrend = product.trend >= 0;
                  return (
                    <motion.tr
                      key={product.id}
                      initial={{ opacity: 0, x: -12 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: idx * 0.07, ease: "easeOut" }}
                      className="border-b border-white/5 hover:bg-white/3 transition-colors duration-150 group"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-xs font-bold text-indigo-400">
                            {idx + 1}
                          </div>
                          <span className="font-medium text-slate-200 group-hover:text-white transition-colors">{product.name}</span>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-xs text-slate-400">
                          {product.category}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-right font-semibold text-white">{product.revenue}</td>
                      <td className="px-4 py-4 text-right text-slate-300">{(product.units ?? 0).toLocaleString("es-ES")}</td>
                      <td className="px-4 py-4 text-right">
                        <span className={`inline-flex items-center gap-1 text-xs font-semibold ${isPositiveTrend ? "text-emerald-400" : "text-rose-400"}`}>
                          {isPositiveTrend ? (
                            <TrendingUp className="h-3.5 w-3.5" />
                          ) : (
                            <TrendingDown className="h-3.5 w-3.5" />
                          )}
                          {isPositiveTrend ? "+" : ""}{product.trend}%
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <span className="inline-flex items-center gap-1 text-xs font-semibold text-amber-400">
                          <Star className="h-3.5 w-3.5 fill-amber-400" />
                          {product.rating.toFixed(1)}
                        </span>
                      </td>
                    </motion.tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
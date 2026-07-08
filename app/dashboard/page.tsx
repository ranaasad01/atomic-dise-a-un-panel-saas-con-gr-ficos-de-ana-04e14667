"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, Users, DollarSign, Target, UserMinus, ArrowUpRight, ArrowDownRight, MoreHorizontal, CheckCircle, Clock, XCircle, AlertCircle } from 'lucide-react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useTranslations } from "next-intl";
import { fadeInUp, fadeIn, staggerContainer, scaleIn } from "@/lib/motion";

// ─── Mock Data ────────────────────────────────────────────────────────────────

const kpiCards = [
  {
    id: "ingresos",
    label: "Ingresos Totales",
    value: "$124,580",
    rawValue: 124580,
    change: 12.4,
    icon: DollarSign,
    color: "indigo",
    sparkline: [40, 55, 48, 62, 70, 65, 80, 75, 90, 88, 95, 100],
  },
  {
    id: "usuarios",
    label: "Usuarios Activos",
    value: "38,492",
    rawValue: 38492,
    change: 8.1,
    icon: Users,
    color: "violet",
    sparkline: [30, 38, 35, 45, 50, 48, 60, 58, 65, 70, 72, 80],
  },
  {
    id: "conversiones",
    label: "Conversiones",
    value: "4.67%",
    rawValue: 4.67,
    change: -1.2,
    icon: Target,
    color: "emerald",
    sparkline: [55, 50, 60, 52, 58, 62, 55, 60, 50, 48, 52, 46],
  },
  {
    id: "churn",
    label: "Tasa de Churn",
    value: "2.3%",
    rawValue: 2.3,
    change: -0.4,
    icon: UserMinus,
    color: "rose",
    sparkline: [30, 28, 32, 25, 27, 24, 26, 22, 20, 23, 21, 18],
  },
];

const monthlyData = [
  { name: "Ene", ingresos: 68000, usuarios: 22000, conversiones: 4.1 },
  { name: "Feb", ingresos: 72000, usuarios: 24500, conversiones: 4.3 },
  { name: "Mar", ingresos: 78000, usuarios: 26000, conversiones: 4.0 },
  { name: "Abr", ingresos: 74000, usuarios: 27800, conversiones: 4.5 },
  { name: "May", ingresos: 85000, usuarios: 29500, conversiones: 4.8 },
  { name: "Jun", ingresos: 91000, usuarios: 31000, conversiones: 4.6 },
  { name: "Jul", ingresos: 88000, usuarios: 32400, conversiones: 4.4 },
  { name: "Ago", ingresos: 96000, usuarios: 33900, conversiones: 4.7 },
  { name: "Sep", ingresos: 103000, usuarios: 35200, conversiones: 4.9 },
  { name: "Oct", ingresos: 110000, usuarios: 36800, conversiones: 4.6 },
  { name: "Nov", ingresos: 118000, usuarios: 37900, conversiones: 4.8 },
  { name: "Dic", ingresos: 124580, usuarios: 38492, conversiones: 4.67 },
];

const barData = [
  { mes: "Sep", actual: 103000, anterior: 88000 },
  { mes: "Oct", actual: 110000, anterior: 96000 },
  { mes: "Nov", actual: 118000, anterior: 103000 },
  { mes: "Dic", actual: 124580, anterior: 110000 },
];

const donutData = [
  { name: "Búsqueda orgánica", value: 38, color: "#6366F1" },
  { name: "Redes sociales", value: 27, color: "#8B5CF6" },
  { name: "Email marketing", value: 18, color: "#06B6D4" },
  { name: "Referidos", value: 11, color: "#10B981" },
  { name: "Directo", value: 6, color: "#F59E0B" },
];

const transactions = [
  {
    id: "TXN-8821",
    customer: "Empresa Soluciones SA",
    email: "contacto@soluciones.com",
    amount: 4200,
    plan: "Enterprise",
    status: "completado",
    date: "15 Dic 2024",
  },
  {
    id: "TXN-8820",
    customer: "Grupo Innovar",
    email: "admin@innovar.mx",
    amount: 1800,
    plan: "Pro",
    status: "completado",
    date: "14 Dic 2024",
  },
  {
    id: "TXN-8819",
    customer: "StartupHub LATAM",
    email: "billing@startuphub.io",
    amount: 890,
    plan: "Starter",
    status: "pendiente",
    date: "14 Dic 2024",
  },
  {
    id: "TXN-8818",
    customer: "Digital Ventures",
    email: "finance@digitalv.co",
    amount: 3600,
    plan: "Enterprise",
    status: "completado",
    date: "13 Dic 2024",
  },
  {
    id: "TXN-8817",
    customer: "Agencia Creativa MX",
    email: "pagos@agenciacreativa.mx",
    amount: 1800,
    plan: "Pro",
    status: "fallido",
    date: "13 Dic 2024",
  },
  {
    id: "TXN-8816",
    customer: "TechForce Colombia",
    email: "ops@techforce.co",
    amount: 4200,
    plan: "Enterprise",
    status: "completado",
    date: "12 Dic 2024",
  },
  {
    id: "TXN-8815",
    customer: "Retail Analytics",
    email: "cfo@retailanalytics.com",
    amount: 890,
    plan: "Starter",
    status: "pendiente",
    date: "12 Dic 2024",
  },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

const colorMap: Record<string, { bg: string; border: string; text: string; glow: string }> = {
  indigo: {
    bg: "bg-amber-500/15",
    border: "border-amber-500/25",
    text: "text-amber-400",
    glow: "shadow-indigo-500/10",
  },
  violet: {
    bg: "bg-red-500/15",
    border: "border-red-500/25",
    text: "text-red-400",
    glow: "shadow-violet-500/10",
  },
  emerald: {
    bg: "bg-amber-500/15",
    border: "border-amber-500/25",
    text: "text-amber-400",
    glow: "shadow-emerald-500/10",
  },
  rose: {
    bg: "bg-amber-500/15",
    border: "border-amber-500/25",
    text: "text-amber-400",
    glow: "shadow-rose-500/10",
  },
};

function MiniSparkline({ data, positive }: { data: number[]; positive: boolean }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const h = 32;
  const w = 80;
  const pts = data
    .map((v, i) => {
      const x = (i / (data.length - 1)) * w;
      const y = h - ((v - min) / range) * h;
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} className="overflow-visible">
      <polyline
        points={pts}
        fill="none"
        stroke={positive ? "#6366F1" : "#F43F5E"}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity={0.8}
      />
    </svg>
  );
}

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, { icon: React.ReactNode; label: string; cls: string }> = {
    completado: {
      icon: <CheckCircle className="h-3 w-3" />,
      label: "Completado",
      cls: "bg-amber-500/15 text-amber-400 border-amber-500/25",
    },
    pendiente: {
      icon: <Clock className="h-3 w-3" />,
      label: "Pendiente",
      cls: "bg-amber-500/15 text-amber-400 border-amber-500/25",
    },
    fallido: {
      icon: <XCircle className="h-3 w-3" />,
      label: "Fallido",
      cls: "bg-amber-500/15 text-amber-400 border-amber-500/25",
    },
  };
  const s = map[status] ?? {
    icon: <AlertCircle className="h-3 w-3" />,
    label: status,
    cls: "bg-slate-500/15 text-slate-400 border-slate-500/25",
  };
  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium border ${s.cls}`}
    >
      {s.icon}
      {s.label}
    </span>
  );
}

function PlanBadge({ plan }: { plan: string }) {
  const cls =
    plan === "Enterprise"
      ? "bg-amber-500/15 text-amber-300 border-amber-500/25"
      : plan === "Pro"
      ? "bg-red-500/15 text-red-300 border-red-500/25"
      : "bg-slate-500/15 text-slate-400 border-slate-500/25";
  return (
    <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium border ${cls}`}>
      {plan}
    </span>
  );
}

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
    <div className="rounded-xl border border-white/10 bg-[#1E293B]/95 backdrop-blur-xl p-3 shadow-xl text-xs">
      <p className="text-slate-400 mb-2 font-medium">{label}</p>
      {payload.map((p) => (
        <div key={p.name} className="flex items-center gap-2 mb-1">
          <span className="h-2 w-2 rounded-full" style={{ background: p.color }} />
          <span className="text-slate-300">{p.name}:</span>
          <span className="text-white font-semibold">
            {p.name === "ingresos" || p.name === "actual" || p.name === "anterior"
              ? `$${(p.value ?? 0).toLocaleString("es-MX")}`
              : p.name === "usuarios"
              ? (p.value ?? 0).toLocaleString("es-MX")
              : p.value}
          </span>
        </div>
      ))}
    </div>
  );
};

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function DashboardPage() {
  const [activePeriod, setActivePeriod] = useState<string>("mensual");
  const t = useTranslations();

  const periods = [
    { label: "Diario", value: "diario" },
    { label: "Semanal", value: "semanal" },
    { label: "Mensual", value: "mensual" },
    { label: "Anual", value: "anual" },
  ];

  return (
    <div className="min-h-screen bg-[#0A0F1E] text-white">
      {/* Background glow */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-40 left-1/4 h-[500px] w-[500px] rounded-full bg-amber-600/8 blur-[120px]" />
        <div className="absolute top-1/3 right-1/4 h-[400px] w-[400px] rounded-full bg-red-600/6 blur-[100px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* ── Header ── */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
        >
          <motion.div variants={fadeInUp}>
            <p className="text-xs font-semibold uppercase tracking-widest text-amber-400 mb-1">
              {t("dashboard.overview") || "Resumen general"}
            </p>
            <h1 className="text-3xl font-bold tracking-tight text-white text-balance">
              {t("dashboard.title") || "Dashboard Principal"}
            </h1>
            <p className="mt-1 text-sm text-slate-400">
              {t("dashboard.subtitle") || "Diciembre 2024 — datos actualizados hace 3 minutos"}
            </p>
          </motion.div>

          {/* Period selector */}
          <motion.div
            variants={fadeIn}
            className="flex items-center gap-1 rounded-xl border border-white/10 bg-white/5 p-1 self-start sm:self-auto"
          >
            {periods.map((p) => (
              <button
                key={p.value}
                onClick={() => setActivePeriod(p.value)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ${
                  activePeriod === p.value
                    ? "bg-amber-500/25 text-amber-300 border border-amber-500/30"
                    : "text-slate-400 hover:text-slate-200 hover:bg-white/5"
                }`}
              >
                {p.label}
              </button>
            ))}
          </motion.div>
        </motion.div>

        {/* ── KPI Cards ── */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4"
        >
          {kpiCards.map((card) => {
            const Icon = card.icon;
            const colors = colorMap[card.color] ?? colorMap.indigo;
            const isPositive = card.change >= 0;
            const isChurn = card.id === "churn";
            const goodChange = isChurn ? !isPositive : isPositive;

            return (
              <motion.div
                key={card.id}
                variants={scaleIn}
                whileHover={{ y: -3, scale: 1.01 }}
                className={`relative rounded-2xl border border-white/8 bg-white/4 backdrop-blur-sm p-5 shadow-[0_1px_2px_rgba(0,0,0,0.1),0_8px_24px_-8px_rgba(0,0,0,0.3)] hover:border-white/15 transition-all duration-300 overflow-hidden`}
              >
                {/* Subtle top gradient */}
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />

                <div className="flex items-start justify-between mb-4">
                  <div
                    className={`flex h-9 w-9 items-center justify-center rounded-xl ${colors.bg} border ${colors.border}`}
                  >
                    <Icon className={`h-4.5 w-4.5 ${colors.text}`} style={{ width: 18, height: 18 }} />
                  </div>
                  <span
                    className={`inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full text-xs font-semibold border ${
                      goodChange
                        ? "bg-amber-500/15 text-amber-400 border-amber-500/25"
                        : "bg-amber-500/15 text-amber-400 border-amber-500/25"
                    }`}
                  >
                    {goodChange ? (
                      <ArrowUpRight className="h-3 w-3" />
                    ) : (
                      <ArrowDownRight className="h-3 w-3" />
                    )}
                    {Math.abs(card.change)}%
                  </span>
                </div>

                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-xs text-slate-500 mb-1">{card.label}</p>
                    <p className="text-2xl font-bold tracking-tight text-white">{card.value}</p>
                  </div>
                  <div className="opacity-70">
                    <MiniSparkline data={card.sparkline} positive={goodChange} />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* ── Main Line Chart ── */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="rounded-2xl border border-white/8 bg-white/4 backdrop-blur-sm p-6 shadow-[0_1px_2px_rgba(0,0,0,0.1),0_8px_24px_-8px_rgba(0,0,0,0.3)]"
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
            <div>
              <h2 className="text-base font-semibold text-white">
                {t("dashboard.revenueChart") || "Ingresos y Usuarios — 12 meses"}
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                {t("dashboard.revenueChartSub") || "Evolución acumulada enero — diciembre 2024"}
              </p>
            </div>
            <div className="flex items-center gap-4 text-xs text-slate-400">
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-4 rounded-full bg-amber-400 inline-block" />
                Ingresos
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-4 rounded-full bg-red-400 inline-block" />
                Usuarios
              </span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={monthlyData} margin={{ top: 4, right: 8, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="ingresoGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366F1" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#6366F1" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
              <XAxis
                dataKey="name"
                tick={{ fill: "#64748B", fontSize: 11 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                yAxisId="left"
                tick={{ fill: "#64748B", fontSize: 11 }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
              />
              <YAxis
                yAxisId="right"
                orientation="right"
                tick={{ fill: "#64748B", fontSize: 11 }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="ingresos"
                stroke="#6366F1"
                strokeWidth={2.5}
                dot={false}
                activeDot={{ r: 5, fill: "#6366F1", strokeWidth: 0 }}
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="usuarios"
                stroke="#8B5CF6"
                strokeWidth={2.5}
                dot={false}
                activeDot={{ r: 5, fill: "#8B5CF6", strokeWidth: 0 }}
                strokeDasharray="5 3"
              />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        {/* ── Bar + Donut Row ── */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 lg:grid-cols-5 gap-4"
        >
          {/* Bar Chart — 3/5 */}
          <motion.div
            variants={fadeInUp}
            className="lg:col-span-3 rounded-2xl border border-white/8 bg-white/4 backdrop-blur-sm p-6 shadow-[0_1px_2px_rgba(0,0,0,0.1),0_8px_24px_-8px_rgba(0,0,0,0.3)]"
          >
            <div className="mb-6">
              <h2 className="text-base font-semibold text-white">
                {t("dashboard.barChart") || "Comparativa mensual de ingresos"}
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                {t("dashboard.barChartSub") || "Últimos 4 meses vs período anterior"}
              </p>
            </div>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={barData} barGap={4} margin={{ top: 4, right: 4, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis
                  dataKey="mes"
                  tick={{ fill: "#64748B", fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fill: "#64748B", fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="actual" name="actual" fill="#6366F1" radius={[6, 6, 0, 0]} maxBarSize={36} />
                <Bar dataKey="anterior" name="anterior" fill="#334155" radius={[6, 6, 0, 0]} maxBarSize={36} />
              </BarChart>
            </ResponsiveContainer>
            <div className="flex items-center gap-4 mt-4 text-xs text-slate-400">
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-4 rounded-full bg-amber-500 inline-block" />
                Período actual
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-4 rounded-full bg-slate-600 inline-block" />
                Período anterior
              </span>
            </div>
          </motion.div>

          {/* Donut Chart — 2/5 */}
          <motion.div
            variants={fadeInUp}
            className="lg:col-span-2 rounded-2xl border border-white/8 bg-white/4 backdrop-blur-sm p-6 shadow-[0_1px_2px_rgba(0,0,0,0.1),0_8px_24px_-8px_rgba(0,0,0,0.3)]"
          >
            <div className="mb-4">
              <h2 className="text-base font-semibold text-white">
                {t("dashboard.donutChart") || "Distribución de canales"}
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                {t("dashboard.donutChartSub") || "Fuentes de tráfico — Dic 2024"}
              </p>
            </div>
            <ResponsiveContainer width="100%" height={180}>
              <PieChart>
                <Pie
                  data={donutData}
                  cx="50%"
                  cy="50%"
                  innerRadius={52}
                  outerRadius={80}
                  paddingAngle={3}
                  dataKey="value"
                  strokeWidth={0}
                >
                  {donutData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} opacity={0.9} />
                  ))}
                </Pie>
                <Tooltip
                  content={({ active, payload }) => {
                    if (!active || !payload || payload.length === 0) return null;
                    const d = payload[0];
                    return (
                      <div className="rounded-xl border border-white/10 bg-[#1E293B]/95 backdrop-blur-xl p-2.5 shadow-xl text-xs">
                        <p className="text-white font-semibold">{d?.name}</p>
                        <p className="text-slate-400">{d?.value}% del tráfico</p>
                      </div>
                    );
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
            <ul className="space-y-2 mt-2">
              {donutData.map((item) => (
                <li key={item.name} className="flex items-center justify-between text-xs">
                  <span className="flex items-center gap-2 text-slate-400">
                    <span
                      className="h-2 w-2 rounded-full shrink-0"
                      style={{ background: item.color }}
                    />
                    {item.name}
                  </span>
                  <span className="font-semibold text-slate-200">{item.value}%</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>

        {/* ── Transactions Table ── */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="rounded-2xl border border-white/8 bg-white/4 backdrop-blur-sm shadow-[0_1px_2px_rgba(0,0,0,0.1),0_8px_24px_-8px_rgba(0,0,0,0.3)] overflow-hidden"
        >
          {/* Table header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-6 py-5 border-b border-white/8">
            <div>
              <h2 className="text-base font-semibold text-white">
                {t("dashboard.transactions") || "Transacciones recientes"}
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                {t("dashboard.transactionsSub") || "Últimas 7 operaciones registradas"}
              </p>
            </div>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="self-start sm:self-auto px-3 py-1.5 rounded-lg border border-amber-500/30 bg-amber-500/15 text-amber-300 text-xs font-medium hover:bg-amber-500/25 transition-all duration-200"
            >
              Ver todas
            </motion.button>
          </div>

          {/* Desktop table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/5">
                  {["ID", "Cliente", "Monto", "Plan", "Estado", "Fecha", ""].map((h) => (
                    <th
                      key={h}
                      className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {(transactions ?? []).map((tx, i) => (
                  <motion.tr
                    key={tx.id}
                    initial={{ opacity: 0, x: -8 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05, duration: 0.3, ease: "easeOut" }}
                    whileHover={{ backgroundColor: "rgba(255,255,255,0.02)" }}
                    className="transition-colors duration-150"
                  >
                    <td className="px-6 py-4 text-xs font-mono text-slate-500">{tx.id}</td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="text-sm font-medium text-slate-200">{tx.customer}</p>
                        <p className="text-xs text-slate-500">{tx.email}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm font-semibold text-white">
                        ${(tx.amount ?? 0).toLocaleString("es-MX")}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <PlanBadge plan={tx.plan} />
                    </td>
                    <td className="px-6 py-4">
                      <StatusBadge status={tx.status} />
                    </td>
                    <td className="px-6 py-4 text-xs text-slate-500">{tx.date}</td>
                    <td className="px-6 py-4">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="flex h-7 w-7 items-center justify-center rounded-lg border border-white/8 bg-white/5 text-slate-500 hover:text-slate-200 hover:bg-white/10 transition-all duration-200"
                        aria-label="Opciones"
                      >
                        <MoreHorizontal className="h-3.5 w-3.5" />
                      </motion.button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile cards */}
          <div className="md:hidden divide-y divide-white/5">
            {(transactions ?? []).map((tx) => (
              <div key={tx.id} className="px-4 py-4 space-y-2">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-200">{tx.customer}</p>
                    <p className="text-xs text-slate-500 font-mono">{tx.id}</p>
                  </div>
                  <span className="text-sm font-bold text-white">
                    ${(tx.amount ?? 0).toLocaleString("es-MX")}
                  </span>
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  <StatusBadge status={tx.status} />
                  <PlanBadge plan={tx.plan} />
                  <span className="text-xs text-slate-500">{tx.date}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="px-6 py-4 border-t border-white/5 flex items-center justify-between">
            <p className="text-xs text-slate-500">
              Mostrando <span className="text-slate-300 font-medium">7</span> de{" "}
              <span className="text-slate-300 font-medium">248</span> transacciones
            </p>
            <div className="flex items-center gap-1">
              {[1, 2, 3].map((n) => (
                <button
                  key={n}
                  className={`h-7 w-7 rounded-lg text-xs font-medium transition-all duration-200 ${
                    n === 1
                      ? "bg-amber-500/25 text-amber-300 border border-amber-500/30"
                      : "text-slate-500 hover:text-slate-200 hover:bg-white/5"
                  }`}
                >
                  {n}
                </button>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
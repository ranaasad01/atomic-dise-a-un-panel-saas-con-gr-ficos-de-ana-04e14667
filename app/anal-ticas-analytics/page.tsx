"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { TrendingUp, TrendingDown, Users, DollarSign, ShoppingCart, Eye, ArrowUpRight, ArrowDownRight, Calendar, Download, Filter } from 'lucide-react';
import { fadeInUp, fadeIn, staggerContainer, scaleIn } from "@/lib/motion";
import { PERIODS } from "@/lib/data";
import { useTranslations } from "next-intl";

// ── Mock data ──────────────────────────────────────────────────────────────────

const monthlyData = [
  { name: "Ene", ingresos: 42000, usuarios: 1200, conversiones: 340 },
  { name: "Feb", ingresos: 51000, usuarios: 1450, conversiones: 410 },
  { name: "Mar", ingresos: 47000, usuarios: 1380, conversiones: 390 },
  { name: "Abr", ingresos: 63000, usuarios: 1720, conversiones: 520 },
  { name: "May", ingresos: 58000, usuarios: 1650, conversiones: 480 },
  { name: "Jun", ingresos: 72000, usuarios: 2010, conversiones: 610 },
  { name: "Jul", ingresos: 68000, usuarios: 1890, conversiones: 570 },
  { name: "Ago", ingresos: 81000, usuarios: 2200, conversiones: 690 },
  { name: "Sep", ingresos: 76000, usuarios: 2080, conversiones: 640 },
  { name: "Oct", ingresos: 89000, usuarios: 2450, conversiones: 760 },
  { name: "Nov", ingresos: 95000, usuarios: 2680, conversiones: 830 },
  { name: "Dic", ingresos: 112000, usuarios: 3100, conversiones: 980 },
];

const weeklyData = [
  { name: "Lun", ingresos: 8200, usuarios: 310, conversiones: 88 },
  { name: "Mar", ingresos: 9400, usuarios: 360, conversiones: 102 },
  { name: "Mié", ingresos: 7800, usuarios: 290, conversiones: 79 },
  { name: "Jue", ingresos: 11200, usuarios: 420, conversiones: 130 },
  { name: "Vie", ingresos: 13500, usuarios: 510, conversiones: 158 },
  { name: "Sáb", ingresos: 6100, usuarios: 220, conversiones: 61 },
  { name: "Dom", ingresos: 4800, usuarios: 180, conversiones: 48 },
];

const dailyData = [
  { name: "00h", ingresos: 320, usuarios: 12, conversiones: 3 },
  { name: "03h", ingresos: 180, usuarios: 7, conversiones: 1 },
  { name: "06h", ingresos: 540, usuarios: 21, conversiones: 6 },
  { name: "09h", ingresos: 1800, usuarios: 68, conversiones: 19 },
  { name: "12h", ingresos: 2400, usuarios: 92, conversiones: 27 },
  { name: "15h", ingresos: 2100, usuarios: 80, conversiones: 23 },
  { name: "18h", ingresos: 1600, usuarios: 61, conversiones: 17 },
  { name: "21h", ingresos: 900, usuarios: 34, conversiones: 9 },
];

const annualData = [
  { name: "2020", ingresos: 380000, usuarios: 9800, conversiones: 2900 },
  { name: "2021", ingresos: 520000, usuarios: 14200, conversiones: 4100 },
  { name: "2022", ingresos: 710000, usuarios: 19600, conversiones: 5800 },
  { name: "2023", ingresos: 940000, usuarios: 26400, conversiones: 8200 },
  { name: "2024", ingresos: 1180000, usuarios: 34100, conversiones: 10900 },
];

const trafficSources = [
  { name: "Búsqueda orgánica", value: 38, color: "#6366F1" },
  { name: "Redes sociales", value: 24, color: "#8B5CF6" },
  { name: "Email marketing", value: 18, color: "#A78BFA" },
  { name: "Referidos", value: 12, color: "#C4B5FD" },
  { name: "Directo", value: 8, color: "#DDD6FE" },
];

const topPages = [
  { page: "/inicio", visitas: 48320, rebote: "32%", duracion: "3m 42s", tendencia: "up" },
  { page: "/precios", visitas: 31450, rebote: "41%", duracion: "2m 18s", tendencia: "up" },
  { page: "/funciones", visitas: 24180, rebote: "38%", duracion: "4m 05s", tendencia: "down" },
  { page: "/blog/guia-analiticas", visitas: 19760, rebote: "28%", duracion: "5m 31s", tendencia: "up" },
  { page: "/contacto", visitas: 14230, rebote: "55%", duracion: "1m 47s", tendencia: "down" },
  { page: "/demo", visitas: 11890, rebote: "22%", duracion: "6m 12s", tendencia: "up" },
];

const kpis = [
  {
    id: "ingresos",
    label: "Ingresos totales",
    value: "$112,400",
    change: 18.4,
    icon: DollarSign,
    color: "indigo",
    sub: "vs. mes anterior",
  },
  {
    id: "usuarios",
    label: "Usuarios activos",
    value: "34,100",
    change: 12.7,
    icon: Users,
    color: "violet",
    sub: "vs. mes anterior",
  },
  {
    id: "conversiones",
    label: "Conversiones",
    value: "10,900",
    change: -3.2,
    icon: ShoppingCart,
    color: "purple",
    sub: "vs. mes anterior",
  },
  {
    id: "vistas",
    label: "Vistas de página",
    value: "1.48M",
    change: 22.1,
    icon: Eye,
    color: "fuchsia",
    sub: "vs. mes anterior",
  },
];

const colorMap: Record<string, string> = {
  indigo: "bg-cyan-500/15 border-cyan-500/25 text-cyan-400",
  violet: "bg-violet-500/15 border-violet-500/25 text-violet-400",
  purple: "bg-purple-500/15 border-purple-500/25 text-purple-400",
  fuchsia: "bg-fuchsia-500/15 border-fuchsia-500/25 text-fuchsia-400",
};

// ── Custom Tooltip ─────────────────────────────────────────────────────────────

function CustomTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: { name: string; value: number; color: string }[];
  label?: string;
}) {
  if (!active || !payload || payload.length === 0) return null;
  return (
    <div className="rounded-xl border border-white/10 bg-[#1E293B]/95 backdrop-blur-xl p-3 shadow-[0_8px_32px_rgba(0,0,0,0.4)] text-xs">
      <p className="mb-2 font-semibold text-slate-300">{label}</p>
      {payload.map((entry) => (
        <div key={entry.name} className="flex items-center gap-2 py-0.5">
          <span
            className="h-2 w-2 rounded-full"
            style={{ backgroundColor: entry.color }}
          />
          <span className="text-slate-400 capitalize">{entry.name}:</span>
          <span className="font-medium text-white">
            {(entry.value ?? 0).toLocaleString("es-ES")}
          </span>
        </div>
      ))}
    </div>
  );
}

// ── Main Page ──────────────────────────────────────────────────────────────────

export default function AnalyticsPage() {
  const t = useTranslations();
  const [activePeriod, setActivePeriod] = useState<string>("mensual");
  const [activeMetric, setActiveMetric] = useState<string>("ingresos");

  const chartData =
    activePeriod === "diario"
      ? dailyData
      : activePeriod === "semanal"
      ? weeklyData
      : activePeriod === "anual"
      ? annualData
      : monthlyData;

  const metrics = [
    { key: "ingresos", label: "Ingresos", color: "#6366F1" },
    { key: "usuarios", label: "Usuarios", color: "#8B5CF6" },
    { key: "conversiones", label: "Conversiones", color: "#A78BFA" },
  ];

  const activeColor =
    metrics.find((m) => m.key === activeMetric)?.color ?? "#6366F1";

  return (
    <main className="min-h-screen bg-[#0F172A] text-white">
      {/* ── Page header ── */}
      <motion.section
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="border-b border-white/8 bg-gradient-to-b from-cyan-950/30 to-transparent px-4 py-10 sm:px-6 lg:px-8"
      >
        <div className="mx-auto max-w-7xl">
          <motion.div
            variants={fadeInUp}
            className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"
          >
            <div>
              <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-cyan-400">
                {t("analytics.label") || "Analíticas"}
              </p>
              <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                {t("analytics.title") || "Rendimiento del negocio"}
              </h1>
              <p className="mt-2 text-sm text-slate-400 leading-relaxed">
                {t("analytics.subtitle") ||
                  "Métricas en tiempo real. Última actualización hace 2 minutos."}
              </p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs font-medium text-slate-300 hover:bg-white/10 transition-all duration-200"
              >
                <Filter className="h-3.5 w-3.5" />
                {t("analytics.filter") || "Filtrar"}
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs font-medium text-slate-300 hover:bg-white/10 transition-all duration-200"
              >
                <Calendar className="h-3.5 w-3.5" />
                {t("analytics.dateRange") || "Dic 2024"}
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center gap-1.5 rounded-lg bg-cyan-600 px-3 py-2 text-xs font-semibold text-white hover:bg-cyan-500 transition-all duration-200 shadow-[0_0_16px_rgba(99,102,241,0.3)]"
              >
                <Download className="h-3.5 w-3.5" />
                {t("analytics.export") || "Exportar"}
              </motion.button>
            </div>
          </motion.div>
        </div>
      </motion.section>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-8">
        {/* ── KPI Cards ── */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4"
        >
          {kpis.map((kpi) => {
            const Icon = kpi.icon;
            const isPositive = kpi.change >= 0;
            return (
              <motion.div
                key={kpi.id}
                variants={scaleIn}
                whileHover={{ y: -3, scale: 1.01 }}
                className="relative overflow-hidden rounded-2xl border border-white/8 bg-[#1E293B]/60 p-5 shadow-[0_1px_2px_rgba(0,0,0,0.08),0_8px_24px_-8px_rgba(0,0,0,0.3)] backdrop-blur-sm"
              >
                <div className="flex items-start justify-between">
                  <div
                    className={`flex h-9 w-9 items-center justify-center rounded-xl border ${colorMap[kpi.color]}`}
                  >
                    <Icon className="h-4 w-4" />
                  </div>
                  <span
                    className={`flex items-center gap-0.5 rounded-full px-2 py-0.5 text-xs font-semibold ${
                      isPositive
                        ? "bg-emerald-500/15 text-emerald-400"
                        : "bg-rose-500/15 text-rose-400"
                    }`}
                  >
                    {isPositive ? (
                      <ArrowUpRight className="h-3 w-3" />
                    ) : (
                      <ArrowDownRight className="h-3 w-3" />
                    )}
                    {Math.abs(kpi.change)}%
                  </span>
                </div>
                <div className="mt-4">
                  <p className="text-2xl font-bold tracking-tight text-white">
                    {kpi.value}
                  </p>
                  <p className="mt-0.5 text-sm font-medium text-slate-400">
                    {kpi.label}
                  </p>
                  <p className="mt-1 text-xs text-slate-600">{kpi.sub}</p>
                </div>
                {/* subtle glow */}
                <div className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full bg-cyan-500/5 blur-2xl" />
              </motion.div>
            );
          })}
        </motion.div>

        {/* ── Main chart ── */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="rounded-2xl border border-white/8 bg-[#1E293B]/60 p-6 shadow-[0_1px_2px_rgba(0,0,0,0.08),0_8px_24px_-8px_rgba(0,0,0,0.3)] backdrop-blur-sm"
        >
          {/* Chart header */}
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-base font-semibold text-white">
                {t("analytics.chartTitle") || "Evolución de métricas"}
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                {t("analytics.chartSub") || "Comparativa por período seleccionado"}
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              {/* Metric selector */}
              <div className="flex rounded-lg border border-white/10 bg-white/5 p-0.5">
                {metrics.map((m) => (
                  <button
                    key={m.key}
                    onClick={() => setActiveMetric(m.key)}
                    className={`rounded-md px-3 py-1 text-xs font-medium transition-all duration-200 ${
                      activeMetric === m.key
                        ? "bg-cyan-600 text-white shadow-sm"
                        : "text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    {m.label}
                  </button>
                ))}
              </div>
              {/* Period selector */}
              <div className="flex rounded-lg border border-white/10 bg-white/5 p-0.5">
                {PERIODS.map((p) => (
                  <button
                    key={p.value}
                    onClick={() => setActivePeriod(p.value)}
                    className={`rounded-md px-3 py-1 text-xs font-medium transition-all duration-200 ${
                      activePeriod === p.value
                        ? "bg-cyan-600 text-white shadow-sm"
                        : "text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={chartData} margin={{ top: 4, right: 4, left: -16, bottom: 0 }}>
              <defs>
                <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={activeColor} stopOpacity={0.25} />
                  <stop offset="95%" stopColor={activeColor} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis
                dataKey="name"
                tick={{ fill: "#64748B", fontSize: 11 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fill: "#64748B", fontSize: 11 }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(v: number) =>
                  v >= 1000000
                    ? `${(v / 1000000).toFixed(1)}M`
                    : v >= 1000
                    ? `${(v / 1000).toFixed(0)}k`
                    : String(v)
                }
              />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey={activeMetric}
                stroke={activeColor}
                strokeWidth={2}
                fill="url(#areaGrad)"
                dot={false}
                activeDot={{ r: 5, fill: activeColor, strokeWidth: 0 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* ── Bar chart + Pie chart ── */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
          {/* Bar chart — 3 cols */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="lg:col-span-3 rounded-2xl border border-white/8 bg-[#1E293B]/60 p-6 shadow-[0_1px_2px_rgba(0,0,0,0.08),0_8px_24px_-8px_rgba(0,0,0,0.3)] backdrop-blur-sm"
          >
            <h2 className="mb-1 text-base font-semibold text-white">
              {t("analytics.barTitle") || "Comparativa mensual"}
            </h2>
            <p className="mb-5 text-xs text-slate-500">
              {t("analytics.barSub") || "Ingresos vs. conversiones por mes"}
            </p>
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={monthlyData} margin={{ top: 4, right: 4, left: -16, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis
                  dataKey="name"
                  tick={{ fill: "#64748B", fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fill: "#64748B", fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(v: number) =>
                    v >= 1000 ? `${(v / 1000).toFixed(0)}k` : String(v)
                  }
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend
                  wrapperStyle={{ fontSize: "11px", color: "#94A3B8", paddingTop: "12px" }}
                />
                <Bar dataKey="ingresos" fill="#6366F1" radius={[4, 4, 0, 0]} maxBarSize={18} />
                <Bar dataKey="conversiones" fill="#A78BFA" radius={[4, 4, 0, 0]} maxBarSize={18} />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Pie chart — 2 cols */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="lg:col-span-2 rounded-2xl border border-white/8 bg-[#1E293B]/60 p-6 shadow-[0_1px_2px_rgba(0,0,0,0.08),0_8px_24px_-8px_rgba(0,0,0,0.3)] backdrop-blur-sm"
          >
            <h2 className="mb-1 text-base font-semibold text-white">
              {t("analytics.pieTitle") || "Fuentes de tráfico"}
            </h2>
            <p className="mb-4 text-xs text-slate-500">
              {t("analytics.pieSub") || "Distribución por canal de adquisición"}
            </p>
            <ResponsiveContainer width="100%" height={160}>
              <PieChart>
                <Pie
                  data={trafficSources}
                  cx="50%"
                  cy="50%"
                  innerRadius={48}
                  outerRadius={72}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {trafficSources.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value: number) => [`${value}%`, "Participación"]}
                  contentStyle={{
                    background: "#1E293B",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: "12px",
                    fontSize: "12px",
                    color: "#fff",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
            <ul className="mt-3 space-y-2">
              {trafficSources.map((src) => (
                <li key={src.name} className="flex items-center justify-between text-xs">
                  <span className="flex items-center gap-2 text-slate-400">
                    <span
                      className="h-2 w-2 rounded-full shrink-0"
                      style={{ backgroundColor: src.color }}
                    />
                    {src.name}
                  </span>
                  <span className="font-semibold text-slate-200">{src.value}%</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* ── Top pages table ── */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="rounded-2xl border border-white/8 bg-[#1E293B]/60 shadow-[0_1px_2px_rgba(0,0,0,0.08),0_8px_24px_-8px_rgba(0,0,0,0.3)] backdrop-blur-sm overflow-hidden"
        >
          <div className="flex items-center justify-between px-6 py-5 border-b border-white/8">
            <div>
              <h2 className="text-base font-semibold text-white">
                {t("analytics.tableTitle") || "Páginas con más tráfico"}
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                {t("analytics.tableSub") || "Rendimiento individual por URL"}
              </p>
            </div>
            <span className="rounded-full bg-cyan-500/15 border border-cyan-500/25 px-2.5 py-0.5 text-xs font-semibold text-cyan-300">
              {topPages.length} páginas
            </span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/5">
                  <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                    {t("analytics.colPage") || "Página"}
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wider text-slate-500">
                    {t("analytics.colVisits") || "Visitas"}
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wider text-slate-500">
                    {t("analytics.colBounce") || "Rebote"}
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wider text-slate-500">
                    {t("analytics.colDuration") || "Duración"}
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wider text-slate-500">
                    {t("analytics.colTrend") || "Tendencia"}
                  </th>
                </tr>
              </thead>
              <tbody>
                {(topPages ?? []).map((row, i) => (
                  <motion.tr
                    key={row.page}
                    initial={{ opacity: 0, x: -8 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.06, duration: 0.35, ease: "easeOut" }}
                    className="border-b border-white/5 hover:bg-white/3 transition-colors duration-150"
                  >
                    <td className="px-6 py-3.5">
                      <span className="font-mono text-xs text-cyan-300 bg-cyan-500/10 rounded-md px-2 py-0.5">
                        {row.page}
                      </span>
                    </td>
                    <td className="px-4 py-3.5 text-right font-semibold text-white">
                      {(row.visitas ?? 0).toLocaleString("es-ES")}
                    </td>
                    <td className="px-4 py-3.5 text-right text-slate-400">
                      {row.rebote}
                    </td>
                    <td className="px-4 py-3.5 text-right text-slate-400">
                      {row.duracion}
                    </td>
                    <td className="px-4 py-3.5 text-right">
                      {row.tendencia === "up" ? (
                        <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-400">
                          <TrendingUp className="h-3.5 w-3.5" />
                          Subiendo
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-xs font-medium text-rose-400">
                          <TrendingDown className="h-3.5 w-3.5" />
                          Bajando
                        </span>
                      )}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* ── Bottom spacer ── */}
        <div className="h-4" />
      </div>
    </main>
  );
}
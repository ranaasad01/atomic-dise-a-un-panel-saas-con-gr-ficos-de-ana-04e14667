"use client";

import { useEffect, useRef, useState } from "react";
import { motion, type Variants } from "framer-motion";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  ZAxis,
} from "recharts";
import { TrendingUp, TrendingDown, Users, DollarSign, MousePointerClick, Clock, Calendar, ArrowUpRight, Filter, Download } from 'lucide-react';
import { useTranslations } from "next-intl";
import { PERIODS, type Period } from "@/lib/data";
import { fadeInUp, fadeIn, staggerContainer, scaleIn } from "@/lib/motion";

// ─── Mock data ────────────────────────────────────────────────────────────────

const trendDataByPeriod: Record<string, { name: string; ingresos: number; usuarios: number; conversiones: number }[]> = {
  diario: [
    { name: "Lun", ingresos: 4200, usuarios: 310, conversiones: 42 },
    { name: "Mar", ingresos: 5800, usuarios: 420, conversiones: 61 },
    { name: "Mié", ingresos: 4900, usuarios: 380, conversiones: 53 },
    { name: "Jue", ingresos: 7100, usuarios: 510, conversiones: 78 },
    { name: "Vie", ingresos: 8300, usuarios: 620, conversiones: 95 },
    { name: "Sáb", ingresos: 6200, usuarios: 450, conversiones: 67 },
    { name: "Dom", ingresos: 3900, usuarios: 290, conversiones: 38 },
  ],
  semanal: [
    { name: "Sem 1", ingresos: 28000, usuarios: 2100, conversiones: 310 },
    { name: "Sem 2", ingresos: 34500, usuarios: 2600, conversiones: 390 },
    { name: "Sem 3", ingresos: 31200, usuarios: 2350, conversiones: 355 },
    { name: "Sem 4", ingresos: 41800, usuarios: 3100, conversiones: 480 },
    { name: "Sem 5", ingresos: 38600, usuarios: 2900, conversiones: 440 },
    { name: "Sem 6", ingresos: 45200, usuarios: 3400, conversiones: 520 },
  ],
  mensual: [
    { name: "Ene", ingresos: 112000, usuarios: 8400, conversiones: 1240 },
    { name: "Feb", ingresos: 98000, usuarios: 7200, conversiones: 1080 },
    { name: "Mar", ingresos: 134000, usuarios: 9800, conversiones: 1520 },
    { name: "Abr", ingresos: 121000, usuarios: 9100, conversiones: 1380 },
    { name: "May", ingresos: 158000, usuarios: 11600, conversiones: 1840 },
    { name: "Jun", ingresos: 143000, usuarios: 10500, conversiones: 1650 },
    { name: "Jul", ingresos: 172000, usuarios: 12800, conversiones: 2010 },
    { name: "Ago", ingresos: 165000, usuarios: 12100, conversiones: 1920 },
    { name: "Sep", ingresos: 189000, usuarios: 14200, conversiones: 2240 },
    { name: "Oct", ingresos: 201000, usuarios: 15100, conversiones: 2380 },
    { name: "Nov", ingresos: 224000, usuarios: 16800, conversiones: 2650 },
    { name: "Dic", ingresos: 248000, usuarios: 18600, conversiones: 2940 },
  ],
  anual: [
    { name: "2020", ingresos: 820000, usuarios: 62000, conversiones: 9200 },
    { name: "2021", ingresos: 1140000, usuarios: 86000, conversiones: 12800 },
    { name: "2022", ingresos: 1580000, usuarios: 118000, conversiones: 17600 },
    { name: "2023", ingresos: 2100000, usuarios: 158000, conversiones: 23400 },
    { name: "2024", ingresos: 2740000, usuarios: 206000, conversiones: 30600 },
  ],
};

const trafficSources = [
  { source: "Búsqueda orgánica", visitas: 48200, color: "#6366F1" },
  { source: "Redes sociales", visitas: 31500, color: "#8B5CF6" },
  { source: "Email marketing", visitas: 24800, color: "#A78BFA" },
  { source: "Tráfico directo", visitas: 19600, color: "#C4B5FD" },
  { source: "Referidos", visitas: 14200, color: "#DDD6FE" },
  { source: "Publicidad pagada", visitas: 11800, color: "#EDE9FE" },
];

const scatterData = [
  { duracion: 12, conversion: 8.2, sesiones: 1200 },
  { duracion: 25, conversion: 14.5, sesiones: 980 },
  { duracion: 38, conversion: 22.1, sesiones: 760 },
  { duracion: 45, conversion: 28.4, sesiones: 640 },
  { duracion: 60, conversion: 35.7, sesiones: 520 },
  { duracion: 72, conversion: 41.2, sesiones: 410 },
  { duracion: 85, conversion: 48.9, sesiones: 320 },
  { duracion: 95, conversion: 54.3, sesiones: 240 },
  { duracion: 110, conversion: 61.8, sesiones: 180 },
  { duracion: 125, conversion: 67.4, sesiones: 130 },
  { duracion: 140, conversion: 72.1, sesiones: 90 },
  { duracion: 155, conversion: 76.8, sesiones: 60 },
];

const kpiStats = [
  {
    id: "ingresos",
    label: "Ingresos totales",
    value: 2740000,
    prefix: "$",
    suffix: "",
    change: 30.5,
    icon: DollarSign,
    color: "indigo",
  },
  {
    id: "usuarios",
    label: "Usuarios activos",
    value: 206000,
    prefix: "",
    suffix: "",
    change: 30.4,
    icon: Users,
    color: "violet",
  },
  {
    id: "conversiones",
    label: "Tasa de conversión",
    value: 14.8,
    prefix: "",
    suffix: "%",
    change: 2.3,
    icon: MousePointerClick,
    color: "purple",
  },
  {
    id: "sesion",
    label: "Duración media sesión",
    value: 4.7,
    prefix: "",
    suffix: " min",
    change: -0.8,
    icon: Clock,
    color: "fuchsia",
  },
];

// ─── Animated counter hook ────────────────────────────────────────────────────

function useAnimatedCounter(target: number, duration = 1400, started = false) {
  const [count, setCount] = useState(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (!started) return;
    const startTime = performance.now();
    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(target * eased * 100) / 100);
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate);
      }
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [target, duration, started]);

  return count;
}

// ─── KPI Card ─────────────────────────────────────────────────────────────────

interface KPIProps {
  id: string;
  label: string;
  value: number;
  prefix: string;
  suffix: string;
  change: number;
  icon: React.ElementType;
  color: string;
}

const colorMap: Record<string, { bg: string; border: string; text: string; glow: string }> = {
  indigo: {
    bg: "bg-sky-500/10",
    border: "border-sky-500/20",
    text: "text-sky-400",
    glow: "shadow-indigo-500/10",
  },
  violet: {
    bg: "bg-sky-500/10",
    border: "border-sky-500/20",
    text: "text-sky-400",
    glow: "shadow-violet-500/10",
  },
  purple: {
    bg: "bg-purple-500/10",
    border: "border-purple-500/20",
    text: "text-purple-400",
    glow: "shadow-purple-500/10",
  },
  fuchsia: {
    bg: "bg-fuchsia-500/10",
    border: "border-fuchsia-500/20",
    text: "text-fuchsia-400",
    glow: "shadow-fuchsia-500/10",
  },
};

function KPIStatCard({ id, label, value, prefix, suffix, change, icon: Icon, color }: KPIProps) {
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const animated = useAnimatedCounter(value, 1400, inView);
  const c = colorMap[color] ?? colorMap.indigo;
  const isPositive = change >= 0;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const displayValue =
    value >= 1000000
      ? `${(animated / 1000000).toFixed(1)}M`
      : value >= 1000
      ? `${(animated / 1000).toFixed(0)}K`
      : animated % 1 !== 0
      ? animated.toFixed(1)
      : Math.round(animated).toString();

  return (
    <motion.div
      ref={ref}
      variants={scaleIn}
      whileHover={{ y: -3, transition: { duration: 0.2 } }}
      className={`relative rounded-2xl border ${c.border} bg-[#0F172A]/60 backdrop-blur-sm p-5 shadow-[0_1px_2px_rgba(0,0,0,0.2),0_8px_24px_-8px_rgba(0,0,0,0.4)] ${c.glow} overflow-hidden`}
    >
      <div
        className={`absolute inset-0 ${c.bg} opacity-30 pointer-events-none`}
        data-atomic-id="a8lovcc" />
      <div
        className="relative flex items-start justify-between gap-3"
        data-atomic-id="a8n3pgu">
        <div className="space-y-1" data-atomic-id="a1m930hd">
          <p
            className="text-xs font-medium text-slate-500 uppercase tracking-wider"
            data-atomic-id="a1w29hgh">{label}</p>
          <p
            className="text-2xl font-bold tracking-tight text-white"
            data-atomic-id="a1w29j4z">
            {prefix}{displayValue}{suffix}
          </p>
          <div
            className={`flex items-center gap-1 text-xs font-medium ${isPositive ? "text-sky-400" : "text-sky-400"}`}
            data-atomic-id="azb9byw">
            {isPositive ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
            <span data-atomic-id="ajruyuk">{isPositive ? "+" : ""}{change}% vs período anterior</span>
          </div>
        </div>
        <div
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${c.bg} border ${c.border}`}
          data-atomic-id="a1mahulv">
          <Icon className={`h-5 w-5 ${c.text}`} />
        </div>
      </div>
    </motion.div>
  );
}

// ─── Custom Tooltip ───────────────────────────────────────────────────────────

function CustomTooltip({ active, payload, label }: { active?: boolean; payload?: { name: string; value: number; color: string }[]; label?: string }) {
  if (!active || !payload || payload.length === 0) return null;
  return (
    <div
      className="rounded-xl border border-white/10 bg-[#1E293B]/95 backdrop-blur-xl p-3 shadow-xl text-xs"
      data-atomic-id="a1xjx3dw">
      <p className="mb-2 font-semibold text-slate-300" data-atomic-id="aklh5pw">{label}</p>
      {payload.map((entry, __atomicIdx) => (<div
        key={entry.name}
        className="flex items-center gap-2 py-0.5"
        data-atomic-id="ay19y6s"
        data-atomic-instance={__atomicIdx}>
        <span
          className="h-2 w-2 rounded-full"
          style={{ background: entry.color }}
          data-atomic-id="adyzig6"
          data-atomic-instance={__atomicIdx} />
        <span
          className="text-slate-400 capitalize"
          data-atomic-id="af9l4ko"
          data-atomic-instance={__atomicIdx}>{entry.name}:</span>
        <span
          className="font-medium text-white"
          data-atomic-id="agk6qp6"
          data-atomic-instance={__atomicIdx}>
          {entry.name === "ingresos"
            ? `$${(entry.value ?? 0).toLocaleString("es-ES")}`
            : (entry.value ?? 0).toLocaleString("es-ES")}
        </span>
      </div>))}
    </div>
  );
}

function BarTooltip({ active, payload }: { active?: boolean; payload?: { value: number }[] }) {
  if (!active || !payload || payload.length === 0) return null;
  return (
    <div
      className="rounded-xl border border-white/10 bg-[#1E293B]/95 backdrop-blur-xl p-3 shadow-xl text-xs"
      data-atomic-id="ablmp39">
      <span className="font-medium text-white" data-atomic-id="aanodsn">{(payload[0]?.value ?? 0).toLocaleString("es-ES")} visitas</span>
    </div>
  );
}

function ScatterTooltip({ active, payload }: { active?: boolean; payload?: { name: string; value: number }[] }) {
  if (!active || !payload || payload.length === 0) return null;
  const dur = payload.find((p) => p.name === "duracion");
  const conv = payload.find((p) => p.name === "conversion");
  return (
    <div
      className="rounded-xl border border-white/10 bg-[#1E293B]/95 backdrop-blur-xl p-3 shadow-xl text-xs space-y-1"
      data-atomic-id="a1lk4ve0">
      <div className="flex gap-2" data-atomic-id="ayr7tbf"><span className="text-slate-400" data-atomic-id="ae8gct8">Duración:</span><span className="text-white font-medium" data-atomic-id="aevr5vh">{dur?.value ?? 0}s</span></div>
      <div className="flex gap-2" data-atomic-id="aysmnfx"><span className="text-slate-400" data-atomic-id="aop1uce">Conversión:</span><span className="text-white font-medium" data-atomic-id="apccnen">{conv?.value ?? 0}%</span></div>
    </div>
  );
}

// ─── Section wrapper ──────────────────────────────────────────────────────────

const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
};

function Section({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.section
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      className={className}
    >
      {children}
    </motion.section>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function AnalyticsPage() {
  const t = useTranslations();
  const [period, setPeriod] = useState<Period>("mensual");
  const [dateRange, setDateRange] = useState("2024-01-01");
  const [dateRangeEnd, setDateRangeEnd] = useState("2024-12-31");
  const [activeMetrics, setActiveMetrics] = useState<Record<string, boolean>>({
    ingresos: true,
    usuarios: true,
    conversiones: true,
  });

  const trendData = trendDataByPeriod[period] ?? trendDataByPeriod.mensual;

  const toggleMetric = (key: string) => {
    setActiveMetrics((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const metricConfig = [
    { key: "ingresos", label: "Ingresos", color: "#6366F1", stroke: "#6366F1", fill: "url(#gradIngresos)" },
    { key: "usuarios", label: "Usuarios", color: "#8B5CF6", stroke: "#8B5CF6", fill: "url(#gradUsuarios)" },
    { key: "conversiones", label: "Conversiones", color: "#A78BFA", stroke: "#A78BFA", fill: "url(#gradConversiones)" },
  ];

  return (
    <main
      className="min-h-screen bg-[#0A0F1E] text-white"
      data-atomic-id="a1qy5l8e">
      {/* Ambient glow */}
      <div
        className="pointer-events-none fixed inset-0 overflow-hidden"
        data-atomic-id="ahaimld">
        <div
          className="absolute -top-40 left-1/4 h-96 w-96 rounded-full bg-sky-600/10 blur-3xl"
          data-atomic-id="a4rkcck" />
        <div
          className="absolute top-1/3 right-1/4 h-80 w-80 rounded-full bg-sky-600/8 blur-3xl"
          data-atomic-id="a4sz6h2" />
      </div>
      <div
        className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 space-y-10"
        data-atomic-id="ahbxgpv">

        {/* ── Header ── */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between"
        >
          <motion.div variants={fadeInUp} className="space-y-1">
            <div className="flex items-center gap-2 mb-2" data-atomic-id="a14s4f72">
              <span
                className="inline-flex items-center gap-1.5 rounded-full border border-sky-500/30 bg-sky-500/10 px-3 py-1 text-xs font-medium text-sky-300"
                data-atomic-id="ah4x9z4">
                <ArrowUpRight className="h-3 w-3" />
                Analíticas avanzadas
              </span>
            </div>
            <h1
              className="text-3xl font-bold tracking-tight text-white text-balance"
              data-atomic-id="a5jia9y">
              Panel de Analíticas
            </h1>
            <p
              className="text-slate-400 text-sm leading-relaxed max-w-lg"
              data-atomic-id="ad2z5mn">
              Explora el rendimiento de tu negocio con métricas detalladas, tendencias y fuentes de tráfico en un solo lugar.
            </p>
          </motion.div>

          <motion.div variants={fadeInUp} className="flex items-center gap-2 shrink-0">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-slate-300 hover:bg-white/10 hover:text-white transition-all duration-200"
            >
              <Filter className="h-4 w-4" />
              Filtros
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-2 rounded-xl bg-sky-600 hover:bg-sky-500 px-4 py-2 text-sm font-medium text-white transition-all duration-200 shadow-[0_0_20px_rgba(99,102,241,0.3)]"
            >
              <Download className="h-4 w-4" />
              Exportar
            </motion.button>
          </motion.div>
        </motion.div>

        {/* ── Filter bar ── */}
        <Section>
          <div
            className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between rounded-2xl border border-white/8 bg-[#0F172A]/60 backdrop-blur-sm p-4"
            data-atomic-id="asxk3yn">
            {/* Date range */}
            <div className="flex items-center gap-3" data-atomic-id="a1qfkrn8">
              <Calendar className="h-4 w-4 text-slate-500 shrink-0" />
              <div className="flex items-center gap-2" data-atomic-id="axvmih">
                <input
                  type="date"
                  value={dateRange}
                  onChange={(e) => setDateRange(e.target.value)}
                  className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-slate-300 focus:border-sky-500/50 focus:outline-none focus:ring-1 focus:ring-sky-500/30 transition-all"
                  data-atomic-id="a1eupqkp" />
                <span className="text-slate-600 text-xs" data-atomic-id="autn03x">hasta</span>
                <input
                  type="date"
                  value={dateRangeEnd}
                  onChange={(e) => setDateRangeEnd(e.target.value)}
                  className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-slate-300 focus:border-sky-500/50 focus:outline-none focus:ring-1 focus:ring-sky-500/30 transition-all"
                  data-atomic-id="a1t988ul" />
              </div>
            </div>

            {/* Period toggle */}
            <div
              className="flex items-center gap-1 rounded-xl border border-white/8 bg-white/5 p-1"
              data-atomic-id="a1qiefw8">
              {PERIODS.map((p) => (
                <motion.button
                  key={p.value}
                  onClick={() => setPeriod(p.value)}
                  whileTap={{ scale: 0.96 }}
                  className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-all duration-200 ${
                    period === p.value
                      ? "bg-sky-600 text-white shadow-[0_0_12px_rgba(99,102,241,0.4)]"
                      : "text-slate-400 hover:text-slate-200"
                  }`}
                >
                  {p.label}
                </motion.button>
              ))}
            </div>
          </div>
        </Section>

        {/* ── KPI Stats grid ── */}
        <Section>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4"
          >
            {kpiStats.map((stat) => (
              <KPIStatCard key={stat.id} {...stat} />
            ))}
          </motion.div>
        </Section>

        {/* ── Stacked area chart ── */}
        <Section>
          <div
            className="rounded-2xl border border-white/8 bg-[#0F172A]/60 backdrop-blur-sm p-6 shadow-[0_1px_2px_rgba(0,0,0,0.2),0_8px_32px_-8px_rgba(0,0,0,0.5)]"
            data-atomic-id="apapsgu">
            <div
              className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-6"
              data-atomic-id="ak36cip">
              <div data-atomic-id="a1wiu9hg">
                <h2 className="text-base font-semibold text-white" data-atomic-id="acur56m">Tendencias de métricas</h2>
                <p className="text-xs text-slate-500 mt-0.5" data-atomic-id="afgfwt2">Evolución de ingresos, usuarios y conversiones</p>
              </div>
              {/* Metric toggles */}
              <div className="flex items-center gap-2 flex-wrap" data-atomic-id="a1wlnxqg">
                {metricConfig.map((m, __atomicIdx) => (<button
                  key={m.key}
                  onClick={() => toggleMetric(m.key)}
                  className={`flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium transition-all duration-200 ${
                    activeMetrics[m.key]
                      ? "border-transparent text-white"
                      : "border-white/10 text-slate-500 bg-transparent"
                  }`}
                  style={activeMetrics[m.key] ? { background: m.color + "33", borderColor: m.color + "55" } : {}}
                  data-atomic-id="a159ll67"
                  data-atomic-instance={__atomicIdx}>
                  <span
                    className="h-2 w-2 rounded-full"
                    style={{ background: activeMetrics[m.key] ? m.color : "#475569" }}
                    data-atomic-id="anwv0so"
                    data-atomic-instance={__atomicIdx} />
                  {m.label}
                </button>))}
              </div>
            </div>

            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={trendData} margin={{ top: 4, right: 4, left: 0, bottom: 0 }}>
                <defs data-atomic-id="a6nzsy0">
                  <linearGradient id="gradIngresos" x1="0" y1="0" x2="0" y2="1" data-atomic-id="awthbv6">
                    <stop
                      offset="5%"
                      stopColor="#6366F1"
                      stopOpacity={0.35}
                      data-atomic-id="a1v9t4ia" />
                    <stop
                      offset="95%"
                      stopColor="#6366F1"
                      stopOpacity={0.02}
                      data-atomic-id="a1wkeqms" />
                  </linearGradient>
                  <linearGradient id="gradUsuarios" x1="0" y1="0" x2="0" y2="1" data-atomic-id="a13lcw7o">
                    <stop
                      offset="5%"
                      stopColor="#8B5CF6"
                      stopOpacity={0.3}
                      data-atomic-id="a6pak2c" />
                    <stop
                      offset="95%"
                      stopColor="#8B5CF6"
                      stopOpacity={0.02}
                      data-atomic-id="a7zw66u" />
                  </linearGradient>
                  <linearGradient
                    id="gradConversiones"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                    data-atomic-id="a1ad8gk6">
                    <stop
                      offset="5%"
                      stopColor="#A78BFA"
                      stopOpacity={0.25}
                      data-atomic-id="ah5w1li" />
                    <stop
                      offset="95%"
                      stopColor="#A78BFA"
                      stopOpacity={0.02}
                      data-atomic-id="aighnq0" />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" vertical={false} />
                <XAxis dataKey="name" tick={{ fill: "#64748B", fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "#64748B", fontSize: 11 }} axisLine={false} tickLine={false} width={48} />
                <Tooltip content={<CustomTooltip />} />
                {metricConfig.map((m) =>
                  activeMetrics[m.key] ? (
                    <Area
                      key={m.key}
                      type="monotone"
                      dataKey={m.key}
                      stroke={m.stroke}
                      strokeWidth={2}
                      fill={m.fill}
                      dot={false}
                      activeDot={{ r: 4, fill: m.color, strokeWidth: 0 }}
                    />
                  ) : null
                )}
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Section>

        {/* ── Bottom two charts ── */}
        <div
          className="grid grid-cols-1 lg:grid-cols-5 gap-6"
          data-atomic-id="aq25pmn">

          {/* Horizontal bar — traffic sources (3/5) */}
          <Section className="lg:col-span-3">
            <div
              className="h-full rounded-2xl border border-white/8 bg-[#0F172A]/60 backdrop-blur-sm p-6 shadow-[0_1px_2px_rgba(0,0,0,0.2),0_8px_32px_-8px_rgba(0,0,0,0.5)]"
              data-atomic-id="a1ch3f6v"
              style={{
                color: "#f59e0b"
              }}>
              <div className="mb-6" data-atomic-id="a18yf2x6">
                <h2 className="text-base font-semibold text-white" data-atomic-id="a1mpr7us">Fuentes de tráfico</h2>
                <p className="text-xs text-slate-500 mt-0.5" data-atomic-id="aae09ss">Visitas por canal de adquisición</p>
              </div>
              <ResponsiveContainer width="100%" height={260}>
                <BarChart
                  data={trafficSources}
                  layout="vertical"
                  margin={{ top: 0, right: 16, left: 0, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" horizontal={false} />
                  <XAxis
                    type="number"
                    tick={{ fill: "#64748B", fontSize: 10 }}
                    axisLine={false}
                    tickLine={false}
                    tickFormatter={(v: number) => `${(v / 1000).toFixed(0)}K`}
                  />
                  <YAxis
                    type="category"
                    dataKey="source"
                    tick={{ fill: "#94A3B8", fontSize: 11 }}
                    axisLine={false}
                    tickLine={false}
                    width={130}
                  />
                  <Tooltip content={<BarTooltip />} cursor={{ fill: "rgba(255,255,255,0.03)" }} />
                  <Bar dataKey="visitas" radius={[0, 6, 6, 0]} fill="#6366F1" opacity={0.85} />
                </BarChart>
              </ResponsiveContainer>

              {/* Source legend with percentages */}
              <div className="mt-4 space-y-2" data-atomic-id="a192nlao">
                {trafficSources.slice(0, 3).map((s, __atomicIdx) => {
                  const total = trafficSources.reduce((acc, x) => acc + x.visitas, 0);
                  const pct = ((s.visitas / total) * 100).toFixed(1);
                  return (
                    <div
                      key={s.source}
                      className="flex items-center justify-between text-xs"
                      data-atomic-id="a13rc1ax"
                      data-atomic-instance={__atomicIdx}>
                      <div
                        className="flex items-center gap-2"
                        data-atomic-id="ahzl070"
                        data-atomic-instance={__atomicIdx}>
                        <span
                          className="h-1.5 w-1.5 rounded-full bg-sky-400"
                          data-atomic-id="a17kuoem"
                          data-atomic-instance={__atomicIdx} />
                        <span
                          className="text-slate-400"
                          data-atomic-id="a18vgaj4"
                          data-atomic-instance={__atomicIdx}>{s.source}</span>
                      </div>
                      <div
                        className="flex items-center gap-3"
                        data-atomic-id="ai0zubi"
                        data-atomic-instance={__atomicIdx}>
                        <span
                          className="text-slate-500"
                          data-atomic-id="a1i1g5xs"
                          data-atomic-instance={__atomicIdx}>{s.visitas.toLocaleString("es-ES")}</span>
                        <span
                          className="font-medium text-sky-300 w-10 text-right"
                          data-atomic-id="a1jc1s2a"
                          data-atomic-instance={__atomicIdx}>{pct}%</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </Section>

          {/* Scatter plot — conversion vs session (2/5) */}
          <Section className="lg:col-span-2">
            <div
              className="h-full rounded-2xl border border-white/8 bg-[#0F172A]/60 backdrop-blur-sm p-6 shadow-[0_1px_2px_rgba(0,0,0,0.2),0_8px_32px_-8px_rgba(0,0,0,0.5)]"
              data-atomic-id="a1q0ujvv">
              <div className="mb-6" data-atomic-id="a1ukgl8u">
                <h2 className="text-base font-semibold text-white" data-atomic-id="a14gcnt4">Conversión vs. Duración</h2>
                <p className="text-xs text-slate-500 mt-0.5" data-atomic-id="agaju3k">Correlación entre tiempo en sesión y tasa de conversión</p>
              </div>
              <ResponsiveContainer width="100%" height={260}>
                <ScatterChart margin={{ top: 4, right: 4, left: -16, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" />
                  <XAxis
                    type="number"
                    dataKey="duracion"
                    name="duracion"
                    tick={{ fill: "#64748B", fontSize: 10 }}
                    axisLine={false}
                    tickLine={false}
                    label={{ value: "Duración (s)", position: "insideBottom", offset: -2, fill: "#475569", fontSize: 10 }}
                  />
                  <YAxis
                    type="number"
                    dataKey="conversion"
                    name="conversion"
                    tick={{ fill: "#64748B", fontSize: 10 }}
                    axisLine={false}
                    tickLine={false}
                    tickFormatter={(v: number) => `${v}%`}
                  />
                  <ZAxis type="number" dataKey="sesiones" range={[40, 200]} />
                  <Tooltip content={<ScatterTooltip />} cursor={{ strokeDasharray: "3 3", stroke: "#334155" }} />
                  <Scatter data={scatterData} fill="#6366F1" fillOpacity={0.7} />
                </ScatterChart>
              </ResponsiveContainer>

              <div
                className="mt-4 rounded-xl border border-sky-500/15 bg-sky-500/5 p-3"
                data-atomic-id="a1una9hu">
                <p
                  className="text-xs text-slate-400 leading-relaxed"
                  data-atomic-id="ab0sroi">
                  Las sesiones de más de 60 segundos tienen una tasa de conversión promedio del
                  <span className="font-semibold text-sky-300" data-atomic-id="a1re3fmv"> 58.4%</span>, frente al
                  <span className="font-semibold text-sky-400" data-atomic-id="a1sop1rd"> 18.3%</span> de las sesiones cortas.
                </p>
              </div>
            </div>
          </Section>
        </div>

        {/* ── Summary stats row ── */}
        <Section>
          <div
            className="rounded-2xl border border-white/8 bg-[#0F172A]/60 backdrop-blur-sm p-6"
            data-atomic-id="a1n9ozvh">
            <h2
              className="text-base font-semibold text-white mb-5"
              data-atomic-id="a1lccrpz">Resumen del período</h2>
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-40px" }}
              className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4"
            >
              {[
                { label: "Páginas vistas", value: "4.2M", delta: "+18%" },
                { label: "Rebote", value: "34.7%", delta: "-3.2%" },
                { label: "Nuevos usuarios", value: "89.4K", delta: "+24%" },
                { label: "Sesiones", value: "1.8M", delta: "+21%" },
                { label: "Ingresos/usuario", value: "$13.30", delta: "+7.6%" },
                { label: "Retención 30d", value: "62.1%", delta: "+4.8%" },
              ].map((item, __atomicIdx) => {
                const isPos = item.delta.startsWith("+");
                return (
                  <motion.div
                    key={item.label}
                    variants={fadeInUp}
                    whileHover={{ y: -2, transition: { duration: 0.15 } }}
                    className="rounded-xl border border-white/6 bg-white/3 p-4 text-center"
                  >
                    <p
                      className="text-xl font-bold text-white tracking-tight"
                      data-atomic-id="audq4a"
                      data-atomic-instance={__atomicIdx}>{item.value}</p>
                    <p
                      className="text-xs text-slate-500 mt-1 leading-tight"
                      data-atomic-id="audrss"
                      data-atomic-instance={__atomicIdx}>{item.label}</p>
                    <p
                      className={`text-xs font-medium mt-2 ${isPos ? "text-sky-400" : "text-sky-400"}`}
                      data-atomic-id="audtha"
                      data-atomic-instance={__atomicIdx}>
                      {item.delta}
                    </p>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </Section>

        {/* ── Top pages table ── */}
        <Section>
          <div
            className="rounded-2xl border border-white/8 bg-[#0F172A]/60 backdrop-blur-sm overflow-hidden shadow-[0_1px_2px_rgba(0,0,0,0.2),0_8px_32px_-8px_rgba(0,0,0,0.5)]"
            data-atomic-id="a1sc2ld">
            <div
              className="flex items-center justify-between px-6 py-4 border-b border-white/8"
              data-atomic-id="a1v4tfwk">
              <div data-atomic-id="a1xmy1s7">
                <h2 className="text-base font-semibold text-white" data-atomic-id="a1myun5t">Páginas más visitadas</h2>
                <p className="text-xs text-slate-500 mt-0.5" data-atomic-id="ay2njnd">Rendimiento por URL en el período seleccionado</p>
              </div>
              <span className="text-xs text-slate-500" data-atomic-id="aqcj74o">Top 6</span>
            </div>
            <div className="overflow-x-auto" data-atomic-id="a1v68a12">
              <table className="w-full text-sm" data-atomic-id="azi2c3y">
                <thead data-atomic-id="a1c7be3z">
                  <tr className="border-b border-white/5" data-atomic-id="a6tmywi">
                    {["Página", "Visitas", "Tiempo medio", "Rebote", "Conversión"].map((h, __atomicIdx) => (<th
                      key={h}
                      className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider whitespace-nowrap"
                      data-atomic-id="ad5k1rq"
                      data-atomic-instance={__atomicIdx}>
                      {h}
                    </th>))}
                  </tr>
                </thead>
                <tbody data-atomic-id="ajvw8dp">
                  {[
                    { page: "/inicio", visitas: 48200, tiempo: "3m 42s", rebote: "28.4%", conv: "12.8%" },
                    { page: "/precios", visitas: 31500, tiempo: "5m 18s", rebote: "19.2%", conv: "24.6%" },
                    { page: "/funciones", visitas: 24800, tiempo: "4m 05s", rebote: "32.1%", conv: "9.4%" },
                    { page: "/blog/guia-analiticas", visitas: 19600, tiempo: "6m 51s", rebote: "14.7%", conv: "7.2%" },
                    { page: "/casos-de-uso", visitas: 14200, tiempo: "4m 33s", rebote: "36.8%", conv: "11.1%" },
                    { page: "/contacto", visitas: 11800, tiempo: "2m 17s", rebote: "41.3%", conv: "38.9%" },
                  ].map((row, i) => (
                    <motion.tr
                      key={row.page}
                      initial={{ opacity: 0, x: -12 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.06, duration: 0.4, ease: "easeOut" }}
                      className="border-b border-white/5 hover:bg-white/3 transition-colors duration-150"
                    >
                      <td
                        className="px-6 py-3.5 font-mono text-xs text-sky-300"
                        data-atomic-id="a5fft90"
                        data-atomic-instance={i}>{row.page}</td>
                      <td
                        className="px-6 py-3.5 text-slate-300 font-medium"
                        data-atomic-id="a5fhcpi"
                        data-atomic-instance={i}>{row.visitas.toLocaleString("es-ES")}</td>
                      <td
                        className="px-6 py-3.5 text-slate-400"
                        data-atomic-id="a5fiw60"
                        data-atomic-instance={i}>{row.tiempo}</td>
                      <td className="px-6 py-3.5" data-atomic-id="a5fkfmi" data-atomic-instance={i}>
                        <span
                          className={`text-xs font-medium ${parseFloat(row.rebote) < 30 ? "text-sky-400" : parseFloat(row.rebote) < 38 ? "text-sky-400" : "text-sky-400"}`}
                          data-atomic-id="aebhmt3"
                          data-atomic-instance={i}>
                          {row.rebote}
                        </span>
                      </td>
                      <td className="px-6 py-3.5" data-atomic-id="a5flz30" data-atomic-instance={i}>
                        <div
                          className="flex items-center gap-2"
                          data-atomic-id="ahyxg7e"
                          data-atomic-instance={i}>
                          <div
                            className="h-1.5 w-20 rounded-full bg-white/10 overflow-hidden"
                            data-atomic-id="a1xd4v9p"
                            data-atomic-instance={i}>
                            <div
                              className="h-full rounded-full bg-sky-500"
                              style={{ width: row.conv }}
                              data-atomic-id="ag97rzk"
                              data-atomic-instance={i} />
                          </div>
                          <span
                            className="text-xs text-slate-300 font-medium"
                            data-atomic-id="ahcs866"
                            data-atomic-instance={i}>{row.conv}</span>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </Section>

      </div>
    </main>
  );
}
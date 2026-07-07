"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Filter, Download, User, Mail, Calendar, Star, Eye, Edit, Trash2, Check, X, ArrowUp, ArrowDown, ChevronDown, Activity, Users, Heart, Clock } from 'lucide-react';
import {
  AreaChart,
  Area,
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
import { useTranslations } from "next-intl";

const kpiData = [
  {
    id: "total",
    label: "Total Usuarios",
    value: "24,831",
    change: 12.4,
    icon: Users,
    color: "indigo",
  },
  {
    id: "active",
    label: "Usuarios Activos",
    value: "18,204",
    change: 8.1,
    icon: Activity,
    color: "emerald",
  },
  {
    id: "new",
    label: "Nuevos este Mes",
    value: "1,429",
    change: 23.7,
    icon: Star,
    color: "violet",
  },
  {
    id: "churn",
    label: "Tasa de Abandono",
    value: "2.3%",
    change: -0.8,
    icon: Heart,
    color: "rose",
  },
];

const growthData = [
  { name: "Ene", usuarios: 18200, activos: 13400 },
  { name: "Feb", usuarios: 19100, activos: 14200 },
  { name: "Mar", usuarios: 20400, activos: 15100 },
  { name: "Abr", usuarios: 21300, activos: 15800 },
  { name: "May", usuarios: 22100, activos: 16400 },
  { name: "Jun", usuarios: 22900, activos: 17000 },
  { name: "Jul", usuarios: 23500, activos: 17400 },
  { name: "Ago", usuarios: 24831, activos: 18204 },
];

const segmentData = [
  { name: "Plan Pro", value: 42, color: "#6366F1" },
  { name: "Plan Básico", value: 31, color: "#8B5CF6" },
  { name: "Plan Enterprise", value: 18, color: "#06B6D4" },
  { name: "Gratuito", value: 9, color: "#334155" },
];

const usersData = [
  {
    id: "u001",
    name: "Sofía Martínez",
    email: "sofia.martinez@empresa.com",
    plan: "Enterprise",
    status: "activo",
    joined: "12 Ene 2024",
    lastSeen: "Hace 2 min",
    sessions: 284,
    avatar: "SM",
    avatarColor: "indigo",
  },
  {
    id: "u002",
    name: "Carlos Rodríguez",
    email: "carlos.rodriguez@startup.io",
    plan: "Pro",
    status: "activo",
    joined: "03 Feb 2024",
    lastSeen: "Hace 1 hora",
    sessions: 197,
    avatar: "CR",
    avatarColor: "violet",
  },
  {
    id: "u003",
    name: "Ana García",
    email: "ana.garcia@consultora.es",
    plan: "Pro",
    status: "activo",
    joined: "18 Feb 2024",
    lastSeen: "Hace 3 horas",
    sessions: 143,
    avatar: "AG",
    avatarColor: "emerald",
  },
  {
    id: "u004",
    name: "Miguel Torres",
    email: "miguel.torres@agencia.com",
    plan: "Básico",
    status: "inactivo",
    joined: "25 Feb 2024",
    lastSeen: "Hace 5 días",
    sessions: 62,
    avatar: "MT",
    avatarColor: "amber",
  },
  {
    id: "u005",
    name: "Laura Sánchez",
    email: "laura.sanchez@tech.co",
    plan: "Enterprise",
    status: "activo",
    joined: "01 Mar 2024",
    lastSeen: "Hace 30 min",
    sessions: 311,
    avatar: "LS",
    avatarColor: "rose",
  },
  {
    id: "u006",
    name: "Javier López",
    email: "javier.lopez@freelance.net",
    plan: "Gratuito",
    status: "pendiente",
    joined: "14 Mar 2024",
    lastSeen: "Hace 2 días",
    sessions: 18,
    avatar: "JL",
    avatarColor: "cyan",
  },
  {
    id: "u007",
    name: "Elena Fernández",
    email: "elena.fernandez@corp.es",
    plan: "Pro",
    status: "activo",
    joined: "22 Mar 2024",
    lastSeen: "Hace 15 min",
    sessions: 229,
    avatar: "EF",
    avatarColor: "indigo",
  },
  {
    id: "u008",
    name: "Pablo Díaz",
    email: "pablo.diaz@innovate.io",
    plan: "Básico",
    status: "inactivo",
    joined: "05 Abr 2024",
    lastSeen: "Hace 12 días",
    sessions: 34,
    avatar: "PD",
    avatarColor: "violet",
  },
];

const avatarColorMap: Record<string, string> = {
  indigo: "bg-indigo-500/20 text-indigo-300 border-indigo-500/30",
  violet: "bg-violet-500/20 text-violet-300 border-violet-500/30",
  emerald: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
  amber: "bg-amber-500/20 text-amber-300 border-amber-500/30",
  rose: "bg-rose-500/20 text-rose-300 border-rose-500/30",
  cyan: "bg-cyan-500/20 text-cyan-300 border-cyan-500/30",
};

const kpiColorMap: Record<string, { bg: string; text: string; border: string; glow: string }> = {
  indigo: {
    bg: "bg-indigo-500/10",
    text: "text-indigo-400",
    border: "border-indigo-500/20",
    glow: "shadow-indigo-500/10",
  },
  emerald: {
    bg: "bg-emerald-500/10",
    text: "text-emerald-400",
    border: "border-emerald-500/20",
    glow: "shadow-emerald-500/10",
  },
  violet: {
    bg: "bg-violet-500/10",
    text: "text-violet-400",
    border: "border-violet-500/20",
    glow: "shadow-violet-500/10",
  },
  rose: {
    bg: "bg-rose-500/10",
    text: "text-rose-400",
    border: "border-rose-500/20",
    glow: "shadow-rose-500/10",
  },
};

const planBadgeMap: Record<string, string> = {
  Enterprise: "bg-indigo-500/15 text-indigo-300 border-indigo-500/25",
  Pro: "bg-violet-500/15 text-violet-300 border-violet-500/25",
  Básico: "bg-slate-500/15 text-slate-300 border-slate-500/25",
  Gratuito: "bg-slate-700/40 text-slate-400 border-slate-600/25",
};

const statusBadgeMap: Record<string, string> = {
  activo: "bg-emerald-500/15 text-emerald-300 border-emerald-500/25",
  inactivo: "bg-slate-600/20 text-slate-400 border-slate-600/25",
  pendiente: "bg-amber-500/15 text-amber-300 border-amber-500/25",
};

const statusDotMap: Record<string, string> = {
  activo: "bg-emerald-400",
  inactivo: "bg-slate-500",
  pendiente: "bg-amber-400",
};

type SortKey = "name" | "sessions" | "joined";
type SortDir = "asc" | "desc";

export default function UsersPage() {
  const t = useTranslations();
  const [search, setSearch] = useState("");
  const [filterPlan, setFilterPlan] = useState("todos");
  const [filterStatus, setFilterStatus] = useState("todos");
  const [sortKey, setSortKey] = useState<SortKey>("sessions");
  const [sortDir, setSortDir] = useState<SortDir>("desc");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("desc");
    }
  };

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const toggleAll = () => {
    if (selectedIds.length === filtered.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filtered.map((u) => u.id));
    }
  };

  const filtered = (usersData ?? [])
    .filter((u) => {
      const q = search.toLowerCase();
      const matchSearch =
        !q ||
        (u.name ?? "").toLowerCase().includes(q) ||
        (u.email ?? "").toLowerCase().includes(q);
      const matchPlan = filterPlan === "todos" || u.plan === filterPlan;
      const matchStatus = filterStatus === "todos" || u.status === filterStatus;
      return matchSearch && matchPlan && matchStatus;
    })
    .sort((a, b) => {
      let cmp = 0;
      if (sortKey === "name") {
        cmp = (a.name ?? "").localeCompare(b.name ?? "");
      } else if (sortKey === "sessions") {
        cmp = (a.sessions ?? 0) - (b.sessions ?? 0);
      } else if (sortKey === "joined") {
        cmp = (a.joined ?? "").localeCompare(b.joined ?? "");
      }
      return sortDir === "asc" ? cmp : -cmp;
    });

  const SortIcon = ({ col }: { col: SortKey }) => {
    if (sortKey !== col)
      return <ArrowDown className="h-3 w-3 text-slate-600 ml-1" />;
    return sortDir === "asc" ? (
      <ArrowUp className="h-3 w-3 text-indigo-400 ml-1" />
    ) : (
      <ArrowDown className="h-3 w-3 text-indigo-400 ml-1" />
    );
  };

  return (
    <main className="min-h-screen bg-[#0B1120] text-white">
      {/* Page header */}
      <div className="border-b border-white/5 bg-[#0F172A]/60 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
          >
            <motion.div variants={fadeInUp}>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-semibold uppercase tracking-widest text-indigo-400">
                  {t("users.breadcrumb") || "Gestión"}
                </span>
              </div>
              <h1 className="text-3xl font-bold tracking-tight text-white text-balance">
                {t("users.title") || "Usuarios"}
              </h1>
              <p className="mt-1 text-sm text-slate-400">
                {t("users.subtitle") ||
                  "Gestiona y analiza tu base de usuarios en tiempo real."}
              </p>
            </motion.div>
            <motion.div variants={fadeInUp} className="flex items-center gap-2">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center gap-2 px-4 py-2 rounded-xl border border-white/10 bg-white/5 text-sm text-slate-300 hover:bg-white/10 hover:text-white transition-all duration-200"
              >
                <Download className="h-4 w-4" />
                {t("users.export") || "Exportar"}
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-500 hover:bg-indigo-400 text-sm font-semibold text-white shadow-[0_0_20px_rgba(99,102,241,0.3)] transition-all duration-200"
              >
                <User className="h-4 w-4" />
                {t("users.invite") || "Invitar Usuario"}
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* KPI Cards */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {kpiData.map((kpi) => {
            const colors = kpiColorMap[kpi.color] ?? kpiColorMap["indigo"];
            const Icon = kpi.icon;
            const isPositive = kpi.change >= 0;
            return (
              <motion.div
                key={kpi.id}
                variants={scaleIn}
                whileHover={{ y: -2, scale: 1.01 }}
                className={`relative rounded-2xl border border-white/8 bg-[#0F172A]/80 p-5 shadow-[0_1px_2px_rgba(0,0,0,0.2),0_8px_24px_-8px_rgba(0,0,0,0.4)] overflow-hidden`}
              >
                <div
                  className={`absolute inset-0 opacity-30 rounded-2xl`}
                  style={{
                    background: `radial-gradient(ellipse at top right, ${
                      kpi.color === "indigo"
                        ? "rgba(99,102,241,0.12)"
                        : kpi.color === "emerald"
                        ? "rgba(16,185,129,0.12)"
                        : kpi.color === "violet"
                        ? "rgba(139,92,246,0.12)"
                        : "rgba(244,63,94,0.12)"
                    } 0%, transparent 70%)`,
                  }}
                />
                <div className="relative">
                  <div className="flex items-start justify-between mb-3">
                    <div
                      className={`flex h-9 w-9 items-center justify-center rounded-xl border ${colors.border} ${colors.bg}`}
                    >
                      <Icon className={`h-4 w-4 ${colors.text}`} />
                    </div>
                    <span
                      className={`flex items-center gap-0.5 text-xs font-semibold ${
                        isPositive ? "text-emerald-400" : "text-rose-400"
                      }`}
                    >
                      {isPositive ? (
                        <ArrowUp className="h-3 w-3" />
                      ) : (
                        <ArrowDown className="h-3 w-3" />
                      )}
                      {Math.abs(kpi.change)}%
                    </span>
                  </div>
                  <p className="text-2xl font-bold tracking-tight text-white">
                    {kpi.value}
                  </p>
                  <p className="mt-0.5 text-xs text-slate-500">{kpi.label}</p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Charts row */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-6"
        >
          {/* Growth chart */}
          <motion.div
            variants={fadeInUp}
            className="lg:col-span-2 rounded-2xl border border-white/8 bg-[#0F172A]/80 p-6 shadow-[0_1px_2px_rgba(0,0,0,0.2),0_8px_24px_-8px_rgba(0,0,0,0.4)]"
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-base font-semibold text-white">
                  {t("users.chart.growth") || "Crecimiento de Usuarios"}
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  {t("users.chart.growth_sub") || "Total vs. activos — últimos 8 meses"}
                </p>
              </div>
              <div className="flex items-center gap-3 text-xs text-slate-500">
                <span className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-indigo-400" />
                  Total
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-emerald-400" />
                  Activos
                </span>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={220}>
              <AreaChart data={growthData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="gradUsuarios" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366F1" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#6366F1" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="gradActivos" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
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
                    v >= 1000 ? `${(v / 1000).toFixed(0)}k` : `${v}`
                  }
                />
                <Tooltip
                  contentStyle={{
                    background: "#1E293B",
                    border: "1px solid rgba(255,255,255,0.08)",
                    borderRadius: "12px",
                    color: "#F1F5F9",
                    fontSize: "12px",
                  }}
                  cursor={{ stroke: "rgba(255,255,255,0.08)" }}
                />
                <Area
                  type="monotone"
                  dataKey="usuarios"
                  stroke="#6366F1"
                  strokeWidth={2}
                  fill="url(#gradUsuarios)"
                  name="Total"
                />
                <Area
                  type="monotone"
                  dataKey="activos"
                  stroke="#10B981"
                  strokeWidth={2}
                  fill="url(#gradActivos)"
                  name="Activos"
                />
              </AreaChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Segment pie */}
          <motion.div
            variants={fadeInUp}
            className="rounded-2xl border border-white/8 bg-[#0F172A]/80 p-6 shadow-[0_1px_2px_rgba(0,0,0,0.2),0_8px_24px_-8px_rgba(0,0,0,0.4)]"
          >
            <div className="mb-6">
              <h2 className="text-base font-semibold text-white">
                {t("users.chart.segments") || "Segmentos de Plan"}
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                {t("users.chart.segments_sub") || "Distribución por tipo de suscripción"}
              </p>
            </div>
            <ResponsiveContainer width="100%" height={160}>
              <PieChart>
                <Pie
                  data={segmentData}
                  cx="50%"
                  cy="50%"
                  innerRadius={48}
                  outerRadius={72}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {segmentData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    background: "#1E293B",
                    border: "1px solid rgba(255,255,255,0.08)",
                    borderRadius: "12px",
                    color: "#F1F5F9",
                    fontSize: "12px",
                  }}
                  formatter={(value: number) => [`${value}%`, ""]}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-4 space-y-2">
              {segmentData.map((seg) => (
                <div key={seg.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span
                      className="h-2 w-2 rounded-full flex-shrink-0"
                      style={{ background: seg.color }}
                    />
                    <span className="text-xs text-slate-400">{seg.name}</span>
                  </div>
                  <span className="text-xs font-semibold text-slate-300">
                    {seg.value}%
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Table section */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="rounded-2xl border border-white/8 bg-[#0F172A]/80 shadow-[0_1px_2px_rgba(0,0,0,0.2),0_8px_24px_-8px_rgba(0,0,0,0.4)] overflow-hidden"
        >
          {/* Table toolbar */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 p-5 border-b border-white/5">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={t("users.search") || "Buscar por nombre o email..."}
                className="w-full pl-9 pr-4 py-2 rounded-xl border border-white/8 bg-white/5 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-indigo-500/50 focus:bg-white/8 transition-all duration-200"
              />
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <div className="relative">
                <select
                  value={filterPlan}
                  onChange={(e) => setFilterPlan(e.target.value)}
                  className="appearance-none pl-3 pr-8 py-2 rounded-xl border border-white/8 bg-white/5 text-sm text-slate-300 focus:outline-none focus:border-indigo-500/50 transition-all duration-200 cursor-pointer"
                >
                  <option value="todos">Todos los planes</option>
                  <option value="Enterprise">Enterprise</option>
                  <option value="Pro">Pro</option>
                  <option value="Básico">Básico</option>
                  <option value="Gratuito">Gratuito</option>
                </select>
                <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-500 pointer-events-none" />
              </div>
              <div className="relative">
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="appearance-none pl-3 pr-8 py-2 rounded-xl border border-white/8 bg-white/5 text-sm text-slate-300 focus:outline-none focus:border-indigo-500/50 transition-all duration-200 cursor-pointer"
                >
                  <option value="todos">Todos los estados</option>
                  <option value="activo">Activo</option>
                  <option value="inactivo">Inactivo</option>
                  <option value="pendiente">Pendiente</option>
                </select>
                <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-500 pointer-events-none" />
              </div>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-white/8 bg-white/5 text-sm text-slate-400 hover:text-slate-200 hover:bg-white/10 transition-all duration-200"
              >
                <Filter className="h-3.5 w-3.5" />
                {t("users.filter") || "Filtros"}
              </motion.button>
            </div>
            {selectedIds.length > 0 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center gap-2 ml-auto"
              >
                <span className="text-xs text-slate-400">
                  {selectedIds.length} seleccionados
                </span>
                <button className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-rose-500/15 border border-rose-500/25 text-xs text-rose-300 hover:bg-rose-500/25 transition-all duration-200">
                  <Trash2 className="h-3 w-3" />
                  Eliminar
                </button>
              </motion.div>
            )}
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/5">
                  <th className="px-5 py-3 text-left">
                    <button
                      onClick={toggleAll}
                      className={`h-4 w-4 rounded border flex items-center justify-center transition-all duration-200 ${
                        selectedIds.length === filtered.length && filtered.length > 0
                          ? "bg-indigo-500 border-indigo-500"
                          : "border-white/20 bg-white/5 hover:border-indigo-500/50"
                      }`}
                    >
                      {selectedIds.length === filtered.length && filtered.length > 0 && (
                        <Check className="h-2.5 w-2.5 text-white" />
                      )}
                    </button>
                  </th>
                  <th className="px-4 py-3 text-left">
                    <button
                      onClick={() => handleSort("name")}
                      className="flex items-center text-xs font-semibold uppercase tracking-wider text-slate-500 hover:text-slate-300 transition-colors duration-200"
                    >
                      Usuario
                      <SortIcon col="name" />
                    </button>
                  </th>
                  <th className="px-4 py-3 text-left hidden md:table-cell">
                    <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Plan
                    </span>
                  </th>
                  <th className="px-4 py-3 text-left hidden sm:table-cell">
                    <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Estado
                    </span>
                  </th>
                  <th className="px-4 py-3 text-left hidden lg:table-cell">
                    <button
                      onClick={() => handleSort("sessions")}
                      className="flex items-center text-xs font-semibold uppercase tracking-wider text-slate-500 hover:text-slate-300 transition-colors duration-200"
                    >
                      Sesiones
                      <SortIcon col="sessions" />
                    </button>
                  </th>
                  <th className="px-4 py-3 text-left hidden lg:table-cell">
                    <button
                      onClick={() => handleSort("joined")}
                      className="flex items-center text-xs font-semibold uppercase tracking-wider text-slate-500 hover:text-slate-300 transition-colors duration-200"
                    >
                      Registro
                      <SortIcon col="joined" />
                    </button>
                  </th>
                  <th className="px-4 py-3 text-left hidden xl:table-cell">
                    <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Última visita
                    </span>
                  </th>
                  <th className="px-4 py-3 text-right">
                    <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Acciones
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {(filtered ?? []).map((user, idx) => {
                  const isSelected = selectedIds.includes(user.id);
                  const avatarCls =
                    avatarColorMap[user.avatarColor] ?? avatarColorMap["indigo"];
                  const planCls =
                    planBadgeMap[user.plan] ?? planBadgeMap["Gratuito"];
                  const statusCls =
                    statusBadgeMap[user.status] ?? statusBadgeMap["inactivo"];
                  const dotCls =
                    statusDotMap[user.status] ?? statusDotMap["inactivo"];

                  return (
                    <motion.tr
                      key={user.id}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.04, duration: 0.3, ease: "easeOut" }}
                      className={`border-b border-white/4 transition-colors duration-150 ${
                        isSelected
                          ? "bg-indigo-500/5"
                          : "hover:bg-white/3"
                      }`}
                    >
                      <td className="px-5 py-4">
                        <button
                          onClick={() => toggleSelect(user.id)}
                          className={`h-4 w-4 rounded border flex items-center justify-center transition-all duration-200 ${
                            isSelected
                              ? "bg-indigo-500 border-indigo-500"
                              : "border-white/20 bg-white/5 hover:border-indigo-500/50"
                          }`}
                        >
                          {isSelected && (
                            <Check className="h-2.5 w-2.5 text-white" />
                          )}
                        </button>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-3">
                          <div
                            className={`flex h-8 w-8 items-center justify-center rounded-full border text-xs font-bold flex-shrink-0 ${avatarCls}`}
                          >
                            {user.avatar}
                          </div>
                          <div>
                            <p className="font-medium text-slate-200 text-sm leading-tight">
                              {user.name}
                            </p>
                            <p className="text-xs text-slate-500 mt-0.5 flex items-center gap-1">
                              <Mail className="h-3 w-3" />
                              {user.email}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4 hidden md:table-cell">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${planCls}`}
                        >
                          {user.plan}
                        </span>
                      </td>
                      <td className="px-4 py-4 hidden sm:table-cell">
                        <span
                          className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border ${statusCls}`}
                        >
                          <span className={`h-1.5 w-1.5 rounded-full ${dotCls}`} />
                          {user.status.charAt(0).toUpperCase() +
                            user.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-4 py-4 hidden lg:table-cell">
                        <div className="flex items-center gap-1.5 text-slate-300 text-sm">
                          <Activity className="h-3.5 w-3.5 text-slate-600" />
                          {(user.sessions ?? 0).toLocaleString("es-ES")}
                        </div>
                      </td>
                      <td className="px-4 py-4 hidden lg:table-cell">
                        <div className="flex items-center gap-1.5 text-slate-400 text-xs">
                          <Calendar className="h-3.5 w-3.5 text-slate-600" />
                          {user.joined}
                        </div>
                      </td>
                      <td className="px-4 py-4 hidden xl:table-cell">
                        <div className="flex items-center gap-1.5 text-slate-400 text-xs">
                          <Clock className="h-3.5 w-3.5 text-slate-600" />
                          {user.lastSeen}
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center justify-end gap-1">
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="h-7 w-7 flex items-center justify-center rounded-lg border border-white/8 bg-white/5 text-slate-500 hover:text-indigo-300 hover:bg-indigo-500/10 hover:border-indigo-500/25 transition-all duration-200"
                            aria-label="Ver usuario"
                          >
                            <Eye className="h-3.5 w-3.5" />
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="h-7 w-7 flex items-center justify-center rounded-lg border border-white/8 bg-white/5 text-slate-500 hover:text-slate-200 hover:bg-white/10 transition-all duration-200"
                            aria-label="Editar usuario"
                          >
                            <Edit className="h-3.5 w-3.5" />
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="h-7 w-7 flex items-center justify-center rounded-lg border border-white/8 bg-white/5 text-slate-500 hover:text-rose-300 hover:bg-rose-500/10 hover:border-rose-500/25 transition-all duration-200"
                            aria-label="Eliminar usuario"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </motion.button>
                        </div>
                      </td>
                    </motion.tr>
                  );
                })}
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={8} className="px-5 py-16 text-center">
                      <div className="flex flex-col items-center gap-3">
                        <div className="h-12 w-12 rounded-2xl border border-white/8 bg-white/5 flex items-center justify-center">
                          <Search className="h-5 w-5 text-slate-600" />
                        </div>
                        <p className="text-sm text-slate-500">
                          No se encontraron usuarios con esos filtros.
                        </p>
                        <button
                          onClick={() => {
                            setSearch("");
                            setFilterPlan("todos");
                            setFilterStatus("todos");
                          }}
                          className="text-xs text-indigo-400 hover:text-indigo-300 transition-colors duration-200"
                        >
                          Limpiar filtros
                        </button>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Table footer */}
          <div className="flex items-center justify-between px-5 py-4 border-t border-white/5">
            <p className="text-xs text-slate-500">
              Mostrando{" "}
              <span className="text-slate-300 font-medium">{filtered.length}</span>{" "}
              de{" "}
              <span className="text-slate-300 font-medium">{usersData.length}</span>{" "}
              usuarios
            </p>
            <div className="flex items-center gap-1">
              {[1, 2, 3].map((page) => (
                <button
                  key={page}
                  className={`h-7 w-7 rounded-lg text-xs font-medium transition-all duration-200 ${
                    page === 1
                      ? "bg-indigo-500/20 border border-indigo-500/30 text-indigo-300"
                      : "border border-white/8 bg-white/5 text-slate-500 hover:text-slate-300 hover:bg-white/10"
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
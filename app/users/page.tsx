"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ChevronDown, ChevronRight, ArrowUp, ArrowDown, ArrowUpDown, User, Mail, Calendar, Star, Check, X, Eye, Filter, Download } from 'lucide-react';
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { fadeInUp, fadeIn, staggerContainer, scaleIn } from "@/lib/motion";
import { useTranslations } from "next-intl";

// ─── Mock Data ────────────────────────────────────────────────────────────────

type Plan = "Free" | "Pro" | "Business" | "Enterprise";
type Estado = "activo" | "inactivo" | "pendiente";

interface UserRow {
  id: string;
  nombre: string;
  email: string;
  plan: Plan;
  estado: Estado;
  fechaRegistro: string;
  mrr: number;
  avatar: string;
}

const MOCK_USERS: UserRow[] = [
  { id: "u1", nombre: "Alejandro Reyes", email: "a.reyes@empresa.mx", plan: "Enterprise", estado: "activo", fechaRegistro: "2023-01-15", mrr: 1200, avatar: "AR" },
  { id: "u2", nombre: "Sofía Martínez", email: "sofia.m@startup.io", plan: "Business", estado: "activo", fechaRegistro: "2023-02-08", mrr: 499, avatar: "SM" },
  { id: "u3", nombre: "Carlos Vega", email: "cvega@tech.com", plan: "Pro", estado: "activo", fechaRegistro: "2023-03-22", mrr: 99, avatar: "CV" },
  { id: "u4", nombre: "Valentina Cruz", email: "vcruz@design.co", plan: "Pro", estado: "inactivo", fechaRegistro: "2023-04-10", mrr: 99, avatar: "VC" },
  { id: "u5", nombre: "Miguel Ángel Torres", email: "miguel@agencia.net", plan: "Business", estado: "activo", fechaRegistro: "2023-05-03", mrr: 499, avatar: "MT" },
  { id: "u6", nombre: "Isabella Flores", email: "iflores@corp.com", plan: "Enterprise", estado: "activo", fechaRegistro: "2023-05-19", mrr: 1200, avatar: "IF" },
  { id: "u7", nombre: "Diego Ramírez", email: "d.ramirez@freelance.dev", plan: "Free", estado: "pendiente", fechaRegistro: "2023-06-01", mrr: 0, avatar: "DR" },
  { id: "u8", nombre: "Camila Herrera", email: "camila.h@studio.mx", plan: "Pro", estado: "activo", fechaRegistro: "2023-06-14", mrr: 99, avatar: "CH" },
  { id: "u9", nombre: "Andrés Jiménez", email: "ajimenez@saas.io", plan: "Business", estado: "activo", fechaRegistro: "2023-07-07", mrr: 499, avatar: "AJ" },
  { id: "u10", nombre: "Lucía Morales", email: "lucia.m@ventures.co", plan: "Enterprise", estado: "activo", fechaRegistro: "2023-07-22", mrr: 1200, avatar: "LM" },
  { id: "u11", nombre: "Sebastián Ortiz", email: "sortiz@digital.mx", plan: "Free", estado: "inactivo", fechaRegistro: "2023-08-05", mrr: 0, avatar: "SO" },
  { id: "u12", nombre: "Natalia Vargas", email: "nvargas@media.com", plan: "Pro", estado: "activo", fechaRegistro: "2023-08-18", mrr: 99, avatar: "NV" },
  { id: "u13", nombre: "Emilio Castillo", email: "ecastillo@labs.io", plan: "Business", estado: "pendiente", fechaRegistro: "2023-09-02", mrr: 499, avatar: "EC" },
  { id: "u14", nombre: "Daniela Ríos", email: "d.rios@agency.net", plan: "Pro", estado: "activo", fechaRegistro: "2023-09-15", mrr: 99, avatar: "DR" },
  { id: "u15", nombre: "Rodrigo Mendoza", email: "rmendoza@enterprise.com", plan: "Enterprise", estado: "activo", fechaRegistro: "2023-10-01", mrr: 1200, avatar: "RM" },
  { id: "u16", nombre: "Fernanda López", email: "flopez@startup.mx", plan: "Free", estado: "activo", fechaRegistro: "2023-10-20", mrr: 0, avatar: "FL" },
  { id: "u17", nombre: "Javier Sánchez", email: "jsanchez@tech.io", plan: "Business", estado: "activo", fechaRegistro: "2023-11-08", mrr: 499, avatar: "JS" },
  { id: "u18", nombre: "Paola Gutiérrez", email: "pgutierrez@design.co", plan: "Pro", estado: "inactivo", fechaRegistro: "2023-11-25", mrr: 99, avatar: "PG" },
  { id: "u19", nombre: "Tomás Aguilar", email: "taguilar@corp.net", plan: "Enterprise", estado: "activo", fechaRegistro: "2023-12-10", mrr: 1200, avatar: "TA" },
  { id: "u20", nombre: "Valeria Peña", email: "vpena@freelance.com", plan: "Free", estado: "pendiente", fechaRegistro: "2024-01-05", mrr: 0, avatar: "VP" },
];

const GROWTH_DATA = [
  { name: "Ene", value: 120 },
  { name: "Feb", value: 185 },
  { name: "Mar", value: 240 },
  { name: "Abr", value: 310 },
  { name: "May", value: 398 },
  { name: "Jun", value: 470 },
  { name: "Jul", value: 560 },
  { name: "Ago", value: 620 },
  { name: "Sep", value: 710 },
  { name: "Oct", value: 790 },
  { name: "Nov", value: 870 },
  { name: "Dic", value: 940 },
];

const PLAN_COLORS: Record<Plan, string> = {
  Free: "#64748b",
  Pro: "#6366f1",
  Business: "#8b5cf6",
  Enterprise: "#a78bfa",
};

const ESTADO_CONFIG: Record<Estado, { label: string; color: string; bg: string }> = {
  activo: { label: "Activo", color: "text-rose-400", bg: "bg-rose-400/10 border-rose-400/20" },
  inactivo: { label: "Inactivo", color: "text-slate-400", bg: "bg-slate-400/10 border-slate-400/20" },
  pendiente: { label: "Pendiente", color: "text-amber-400", bg: "bg-amber-400/10 border-amber-400/20" },
};

type SortKey = "nombre" | "plan" | "estado" | "fechaRegistro" | "mrr";
type SortDir = "asc" | "desc";

const PAGE_SIZE = 8;

// ─── Helpers ──────────────────────────────────────────────────────────────────

function avatarColor(initials: string): string {
  const colors = [
    "from-rose-500 to-violet-600",
    "from-violet-500 to-purple-600",
    "from-purple-500 to-fuchsia-600",
    "from-fuchsia-500 to-pink-600",
    "from-sky-500 to-rose-600",
    "from-teal-500 to-rose-600",
  ];
  const idx = (initials.charCodeAt(0) + (initials.charCodeAt(1) ?? 0)) % colors.length;
  return colors[idx] ?? "from-rose-500 to-violet-600";
}

function formatMRR(val: number): string {
  if (val === 0) return "$0";
  return `$${val.toLocaleString("es-MX")}`;
}

function formatDate(dateStr: string): string {
  const parts = dateStr.split("-");
  if (parts.length < 3) return dateStr;
  const months = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];
  const month = parseInt(parts[1] ?? "1", 10) - 1;
  const day = parseInt(parts[2] ?? "1", 10);
  const year = parts[0] ?? "2024";
  return `${day} ${months[month] ?? "Ene"} ${year}`;
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function StatBadge({ value, label, accent }: { value: string; label: string; accent: string }) {
  return (
    <div className="flex flex-col items-center gap-0.5">
      <span className="text-xl font-bold tracking-tight" style={{ color: accent }}>{value}</span>
      <span className="text-xs text-slate-500">{label}</span>
    </div>
  );
}

interface DonutChartProps {
  data: { name: string; value: number; color: string }[];
}

function DonutChart({ data }: DonutChartProps) {
  return (
    <ResponsiveContainer width="100%" height={180}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={52}
          outerRadius={76}
          paddingAngle={3}
          dataKey="value"
          strokeWidth={0}
        >
          {data.map((entry) => (
            <Cell key={entry.name} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip
          contentStyle={{
            background: "#1e293b",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: "8px",
            color: "#e2e8f0",
            fontSize: "12px",
          }}
          formatter={(value: number) => [`${value} usuarios`, ""]}
        />
      </PieChart>
    </ResponsiveContainer>
  );
}

interface GrowthBarProps {
  data: { name: string; value: number }[];
}

function GrowthBar({ data }: GrowthBarProps) {
  return (
    <ResponsiveContainer width="100%" height={140}>
      <BarChart data={data} barSize={10} margin={{ top: 4, right: 4, left: -24, bottom: 0 }}>
        <XAxis dataKey="name" tick={{ fill: "#64748b", fontSize: 10 }} axisLine={false} tickLine={false} />
        <YAxis tick={{ fill: "#64748b", fontSize: 10 }} axisLine={false} tickLine={false} />
        <Tooltip
          contentStyle={{
            background: "#1e293b",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: "8px",
            color: "#e2e8f0",
            fontSize: "12px",
          }}
          cursor={{ fill: "rgba(99,102,241,0.08)" }}
        />
        <Bar dataKey="value" fill="#6366f1" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function UsersPage() {
  const t = useTranslations();

  // Filters
  const [search, setSearch] = useState("");
  const [planFilter, setPlanFilter] = useState<Plan | "Todos">("Todos");
  const [estadoFilter, setEstadoFilter] = useState<Estado | "Todos">("Todos");

  // Sort
  const [sortKey, setSortKey] = useState<SortKey>("fechaRegistro");
  const [sortDir, setSortDir] = useState<SortDir>("desc");

  // Pagination
  const [page, setPage] = useState(1);

  // Side panel
  const [selectedUser, setSelectedUser] = useState<UserRow | null>(null);

  function handleSort(key: SortKey) {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
    setPage(1);
  }

  const filtered = useMemo(() => {
    let rows = [...MOCK_USERS];
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      rows = rows.filter(
        (u) =>
          u.nombre.toLowerCase().includes(q) ||
          u.email.toLowerCase().includes(q)
      );
    }
    if (planFilter !== "Todos") rows = rows.filter((u) => u.plan === planFilter);
    if (estadoFilter !== "Todos") rows = rows.filter((u) => u.estado === estadoFilter);

    rows.sort((a, b) => {
      let cmp = 0;
      if (sortKey === "nombre") cmp = a.nombre.localeCompare(b.nombre);
      else if (sortKey === "plan") cmp = a.plan.localeCompare(b.plan);
      else if (sortKey === "estado") cmp = a.estado.localeCompare(b.estado);
      else if (sortKey === "fechaRegistro") cmp = a.fechaRegistro.localeCompare(b.fechaRegistro);
      else if (sortKey === "mrr") cmp = a.mrr - b.mrr;
      return sortDir === "asc" ? cmp : -cmp;
    });
    return rows;
  }, [search, planFilter, estadoFilter, sortKey, sortDir]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  // Summary stats
  const totalUsers = MOCK_USERS.length;
  const activeUsers = MOCK_USERS.filter((u) => u.estado === "activo").length;
  const totalMRR = MOCK_USERS.reduce((s, u) => s + u.mrr, 0);

  const planCounts: Record<Plan, number> = { Free: 0, Pro: 0, Business: 0, Enterprise: 0 };
  MOCK_USERS.forEach((u) => { planCounts[u.plan] = (planCounts[u.plan] ?? 0) + 1; });

  const donutData = (Object.keys(planCounts) as Plan[]).map((p) => ({
    name: p,
    value: planCounts[p] ?? 0,
    color: PLAN_COLORS[p],
  }));

  function SortIcon({ col }: { col: SortKey }) {
    if (sortKey !== col) return <ArrowUpDown className="h-3 w-3 text-slate-600" />;
    return sortDir === "asc"
      ? <ArrowUp className="h-3 w-3 text-rose-400" />
      : <ArrowDown className="h-3 w-3 text-rose-400" />;
  }

  return (
    <div className="min-h-screen bg-[#0A0F1E] text-slate-100">
      {/* Ambient glow */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-40 left-1/4 h-96 w-96 rounded-full bg-rose-600/10 blur-3xl" />
        <div className="absolute top-1/3 right-1/4 h-64 w-64 rounded-full bg-violet-600/8 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">

        {/* ── Header ── */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="mb-8"
        >
          <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-rose-400 mb-1">
                {t("users.section_label") || "Gestión de Usuarios"}
              </p>
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
                {t("users.title") || "Usuarios"}
              </h1>
              <p className="mt-1.5 text-slate-400 text-sm leading-relaxed">
                {t("users.subtitle") || "Administra cuentas, planes y actividad de tus clientes."}
              </p>
            </div>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-rose-500/20 border border-rose-500/30 text-rose-300 text-sm font-medium hover:bg-rose-500/30 transition-all duration-200 self-start sm:self-auto"
            >
              <Download className="h-4 w-4" />
              {t("users.export") || "Exportar CSV"}
            </motion.button>
          </motion.div>

          {/* KPI strip */}
          <motion.div
            variants={staggerContainer}
            className="mt-6 grid grid-cols-3 gap-3 sm:gap-4"
          >
            {[
              { label: t("users.kpi_total") || "Total usuarios", value: totalUsers.toString(), accent: "#6366f1" },
              { label: t("users.kpi_active") || "Activos", value: activeUsers.toString(), accent: "#34d399" },
              { label: t("users.kpi_mrr") || "MRR total", value: `$${(totalMRR).toLocaleString("es-MX")}`, accent: "#a78bfa" },
            ].map((kpi) => (
              <motion.div
                key={kpi.label}
                variants={scaleIn}
                className="flex flex-col gap-1 rounded-2xl border border-white/8 bg-white/4 px-4 py-4 backdrop-blur-sm shadow-[0_1px_2px_rgba(0,0,0,0.2),0_8px_24px_-8px_rgba(0,0,0,0.3)]"
              >
                <span className="text-2xl font-bold tracking-tight" style={{ color: kpi.accent }}>
                  {kpi.value}
                </span>
                <span className="text-xs text-slate-500">{kpi.label}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* ── Main layout: table + side panel ── */}
        <div className="flex gap-5 items-start">

          {/* ── Left: Table section ── */}
          <motion.div
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            className="flex-1 min-w-0"
          >
            {/* Toolbar */}
            <div className="mb-4 flex flex-col sm:flex-row gap-3">
              {/* Search */}
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                  placeholder={t("users.search_placeholder") || "Buscar por nombre o email..."}
                  className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-white/10 bg-white/5 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-rose-500/50 focus:bg-white/8 transition-all duration-200"
                />
              </div>

              {/* Plan filter */}
              <div className="relative">
                <select
                  value={planFilter}
                  onChange={(e) => { setPlanFilter(e.target.value as Plan | "Todos"); setPage(1); }}
                  className="appearance-none pl-3 pr-8 py-2.5 rounded-xl border border-white/10 bg-white/5 text-sm text-slate-300 focus:outline-none focus:border-rose-500/50 transition-all duration-200 cursor-pointer"
                >
                  <option value="Todos">Todos los planes</option>
                  <option value="Free">Free</option>
                  <option value="Pro">Pro</option>
                  <option value="Business">Business</option>
                  <option value="Enterprise">Enterprise</option>
                </select>
                <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-500" />
              </div>

              {/* Estado filter */}
              <div className="relative">
                <select
                  value={estadoFilter}
                  onChange={(e) => { setEstadoFilter(e.target.value as Estado | "Todos"); setPage(1); }}
                  className="appearance-none pl-3 pr-8 py-2.5 rounded-xl border border-white/10 bg-white/5 text-sm text-slate-300 focus:outline-none focus:border-rose-500/50 transition-all duration-200 cursor-pointer"
                >
                  <option value="Todos">Todos los estados</option>
                  <option value="activo">Activo</option>
                  <option value="inactivo">Inactivo</option>
                  <option value="pendiente">Pendiente</option>
                </select>
                <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-500" />
              </div>
            </div>

            {/* Table */}
            <div className="rounded-2xl border border-white/8 bg-white/3 backdrop-blur-sm overflow-hidden shadow-[0_1px_2px_rgba(0,0,0,0.2),0_12px_32px_-8px_rgba(0,0,0,0.4)]">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/8">
                      {[
                        { key: "nombre" as SortKey, label: "Usuario" },
                        { key: "plan" as SortKey, label: "Plan" },
                        { key: "estado" as SortKey, label: "Estado" },
                        { key: "fechaRegistro" as SortKey, label: "Registro" },
                        { key: "mrr" as SortKey, label: "MRR" },
                      ].map((col) => (
                        <th
                          key={col.key}
                          onClick={() => handleSort(col.key)}
                          className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 cursor-pointer hover:text-slate-300 transition-colors duration-150 select-none"
                        >
                          <span className="flex items-center gap-1.5">
                            {col.label}
                            <SortIcon col={col.key} />
                          </span>
                        </th>
                      ))}
                      <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                        Acción
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <AnimatePresence mode="wait">
                      {paginated.map((user, idx) => {
                        const estado = ESTADO_CONFIG[user.estado];
                        const isSelected = selectedUser?.id === user.id;
                        return (
                          <motion.tr
                            key={user.id}
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.25, delay: idx * 0.03 }}
                            className={`border-b border-white/5 transition-colors duration-150 ${
                              isSelected
                                ? "bg-rose-500/10"
                                : "hover:bg-white/4"
                            }`}
                          >
                            {/* Usuario */}
                            <td className="px-4 py-3">
                              <div className="flex items-center gap-3">
                                <div
                                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${avatarColor(user.avatar)} text-white text-xs font-bold`}
                                >
                                  {user.avatar}
                                </div>
                                <div className="min-w-0">
                                  <p className="font-medium text-slate-100 truncate">{user.nombre}</p>
                                  <p className="text-xs text-slate-500 truncate">{user.email}</p>
                                </div>
                              </div>
                            </td>

                            {/* Plan */}
                            <td className="px-4 py-3">
                              <span
                                className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold border"
                                style={{
                                  color: PLAN_COLORS[user.plan],
                                  borderColor: `${PLAN_COLORS[user.plan]}40`,
                                  backgroundColor: `${PLAN_COLORS[user.plan]}15`,
                                }}
                              >
                                {user.plan}
                              </span>
                            </td>

                            {/* Estado */}
                            <td className="px-4 py-3">
                              <span
                                className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium border ${estado.bg} ${estado.color}`}
                              >
                                <span className="h-1.5 w-1.5 rounded-full bg-current" />
                                {estado.label}
                              </span>
                            </td>

                            {/* Fecha */}
                            <td className="px-4 py-3 text-slate-400 text-xs whitespace-nowrap">
                              {formatDate(user.fechaRegistro)}
                            </td>

                            {/* MRR */}
                            <td className="px-4 py-3 font-semibold text-slate-200 tabular-nums">
                              {formatMRR(user.mrr)}
                            </td>

                            {/* Acción */}
                            <td className="px-4 py-3">
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => setSelectedUser(isSelected ? null : user)}
                                className={`flex h-7 w-7 items-center justify-center rounded-lg border transition-all duration-200 ${
                                  isSelected
                                    ? "border-rose-500/50 bg-rose-500/20 text-rose-300"
                                    : "border-white/10 bg-white/5 text-slate-400 hover:text-rose-300 hover:border-rose-500/30"
                                }`}
                                aria-label="Ver usuario"
                              >
                                <Eye className="h-3.5 w-3.5" />
                              </motion.button>
                            </td>
                          </motion.tr>
                        );
                      })}
                    </AnimatePresence>

                    {paginated.length === 0 && (
                      <tr>
                        <td colSpan={6} className="px-4 py-12 text-center text-slate-500 text-sm">
                          No se encontraron usuarios con los filtros aplicados.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <div className="flex items-center justify-between px-4 py-3 border-t border-white/8">
                <p className="text-xs text-slate-500">
                  Mostrando {Math.min((page - 1) * PAGE_SIZE + 1, filtered.length)}–{Math.min(page * PAGE_SIZE, filtered.length)} de {filtered.length} usuarios
                </p>
                <div className="flex items-center gap-1">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={page === 1}
                    className="flex h-7 w-7 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-slate-400 hover:text-slate-100 hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200"
                  >
                    <ArrowDown className="h-3.5 w-3.5 rotate-90" />
                  </motion.button>

                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                    <motion.button
                      key={p}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setPage(p)}
                      className={`flex h-7 w-7 items-center justify-center rounded-lg text-xs font-medium transition-all duration-200 ${
                        p === page
                          ? "bg-rose-500/30 border border-rose-500/50 text-rose-300"
                          : "border border-white/10 bg-white/5 text-slate-400 hover:text-slate-100 hover:bg-white/10"
                      }`}
                    >
                      {p}
                    </motion.button>
                  ))}

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                    disabled={page === totalPages}
                    className="flex h-7 w-7 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-slate-400 hover:text-slate-100 hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200"
                  >
                    <ArrowDown className="h-3.5 w-3.5 -rotate-90" />
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* ── Right: Side Panel ── */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            className="hidden lg:flex flex-col gap-4 w-72 shrink-0"
          >
            {/* User detail card */}
            <AnimatePresence mode="wait">
              {selectedUser ? (
                <motion.div
                  key={selectedUser.id}
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 16 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="rounded-2xl border border-white/8 bg-white/4 backdrop-blur-sm p-5 shadow-[0_1px_2px_rgba(0,0,0,0.2),0_12px_32px_-8px_rgba(0,0,0,0.4)]"
                >
                  <div className="flex items-start justify-between mb-4">
                    <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">
                      Detalle de usuario
                    </p>
                    <button
                      onClick={() => setSelectedUser(null)}
                      className="text-slate-500 hover:text-slate-300 transition-colors"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>

                  <div className="flex flex-col items-center text-center gap-2 mb-5">
                    <div
                      className={`flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br ${avatarColor(selectedUser.avatar)} text-white text-lg font-bold shadow-lg`}
                    >
                      {selectedUser.avatar}
                    </div>
                    <div>
                      <p className="font-semibold text-slate-100">{selectedUser.nombre}</p>
                      <p className="text-xs text-slate-500">{selectedUser.email}</p>
                    </div>
                    <span
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border"
                      style={{
                        color: PLAN_COLORS[selectedUser.plan],
                        borderColor: `${PLAN_COLORS[selectedUser.plan]}40`,
                        backgroundColor: `${PLAN_COLORS[selectedUser.plan]}15`,
                      }}
                    >
                      {selectedUser.plan}
                    </span>
                  </div>

                  <div className="space-y-3 text-sm">
                    {[
                      { icon: Star, label: "Estado", value: ESTADO_CONFIG[selectedUser.estado].label, color: ESTADO_CONFIG[selectedUser.estado].color },
                      { icon: Calendar, label: "Registro", value: formatDate(selectedUser.fechaRegistro), color: "text-slate-300" },
                      { icon: Mail, label: "Email", value: selectedUser.email, color: "text-slate-300" },
                    ].map(({ icon: Icon, label, value, color }) => (
                      <div key={label} className="flex items-center gap-3">
                        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-white/5 border border-white/8">
                          <Icon className="h-3.5 w-3.5 text-slate-400" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs text-slate-500">{label}</p>
                          <p className={`text-xs font-medium truncate ${color}`}>{value}</p>
                        </div>
                      </div>
                    ))}

                    <div className="pt-2 border-t border-white/8">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-slate-500">MRR mensual</span>
                        <span className="text-base font-bold text-rose-300">{formatMRR(selectedUser.mrr)}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="rounded-2xl border border-dashed border-white/10 bg-white/2 p-6 text-center"
                >
                  <User className="h-8 w-8 text-slate-600 mx-auto mb-2" />
                  <p className="text-xs text-slate-500">Selecciona un usuario para ver su detalle</p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Donut: plan distribution */}
            <motion.div
              variants={scaleIn}
              initial="hidden"
              animate="visible"
              className="rounded-2xl border border-white/8 bg-white/4 backdrop-blur-sm p-5 shadow-[0_1px_2px_rgba(0,0,0,0.2),0_12px_32px_-8px_rgba(0,0,0,0.4)]"
            >
              <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-1">
                Distribución por plan
              </p>
              <DonutChart data={donutData} />
              <div className="mt-2 space-y-1.5">
                {donutData.map((d) => (
                  <div key={d.name} className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full" style={{ backgroundColor: d.color }} />
                      <span className="text-slate-400">{d.name}</span>
                    </div>
                    <span className="font-semibold text-slate-200">{d.value}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Bar: user growth */}
            <motion.div
              variants={scaleIn}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.1 }}
              className="rounded-2xl border border-white/8 bg-white/4 backdrop-blur-sm p-5 shadow-[0_1px_2px_rgba(0,0,0,0.2),0_12px_32px_-8px_rgba(0,0,0,0.4)]"
            >
              <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-1">
                Crecimiento de usuarios
              </p>
              <p className="text-2xl font-bold text-white mb-3">940 <span className="text-sm font-normal text-rose-400">+18.4%</span></p>
              <GrowthBar data={GROWTH_DATA} />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
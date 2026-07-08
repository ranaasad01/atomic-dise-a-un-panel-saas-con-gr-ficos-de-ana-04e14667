"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { Activity, ArrowRight, BarChart2, Bell, Check, ChevronRight, Clock, Eye, GitBranch, Globe, Heart, Layout, Sparkles, Star, TrendingUp, Users, Zap } from 'lucide-react';
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
} from "recharts";
import { fadeInUp, fadeIn, staggerContainer, scaleIn, slideInLeft, slideInRight } from "@/lib/motion";
import { APP_NAME, APP_TAGLINE } from "@/lib/data";

const revenueData = [
  { name: "Ene", ingresos: 42000, usuarios: 1200 },
  { name: "Feb", ingresos: 51000, usuarios: 1450 },
  { name: "Mar", ingresos: 47000, usuarios: 1380 },
  { name: "Abr", ingresos: 63000, usuarios: 1720 },
  { name: "May", ingresos: 58000, usuarios: 1650 },
  { name: "Jun", ingresos: 74000, usuarios: 2100 },
  { name: "Jul", ingresos: 82000, usuarios: 2380 },
  { name: "Ago", ingresos: 91000, usuarios: 2650 },
];

const channelData = [
  { name: "Orgánico", value: 38 },
  { name: "Directo", value: 27 },
  { name: "Referido", value: 20 },
  { name: "Social", value: 15 },
];

const CHANNEL_COLORS = ["#6366F1", "#818CF8", "#A5B4FC", "#C7D2FE"];

const kpis = [
  { id: "revenue", label: "Ingresos Totales", value: "$91,240", change: +18.4, icon: TrendingUp, color: "indigo" },
  { id: "users", label: "Usuarios Activos", value: "26,540", change: +11.2, icon: Users, color: "violet" },
  { id: "conversion", label: "Tasa de Conversión", value: "4.73%", change: +0.8, icon: Activity, color: "indigo" },
  { id: "retention", label: "Retención Mensual", value: "87.5%", change: +2.1, icon: Heart, color: "violet" },
];

const features = [
  {
    icon: BarChart2,
    title: "Gráficos en tiempo real",
    desc: "Visualiza ingresos, usuarios y conversiones con gráficos interactivos que se actualizan al instante.",
  },
  {
    icon: Bell,
    title: "Alertas inteligentes",
    desc: "Recibe notificaciones automáticas cuando una métrica supera o cae por debajo de tus umbrales definidos.",
  },
  {
    icon: Globe,
    title: "Segmentación geográfica",
    desc: "Desglosa el rendimiento por país, región o ciudad para identificar oportunidades de crecimiento.",
  },
  {
    icon: GitBranch,
    title: "Embudos de conversión",
    desc: "Rastrea cada paso del recorrido del cliente y detecta exactamente dónde se pierden oportunidades.",
  },
  {
    icon: Clock,
    title: "Historial completo",
    desc: "Accede a datos históricos ilimitados y compara cualquier período con un solo clic.",
  },
  {
    icon: Layout,
    title: "Dashboards personalizados",
    desc: "Arrastra, suelta y configura cada widget para construir el panel que tu equipo necesita.",
  },
];

const testimonials = [
  {
    name: "Sofía Ramírez",
    role: "Directora de Producto, Finloop",
    avatar: "/images/sofia-ramirez-avatar.jpg",
    quote: "NovaDash transformó la forma en que tomamos decisiones. Ahora todo el equipo habla el mismo idioma de datos.",
    stars: 5,
  },
  {
    name: "Carlos Mendoza",
    role: "CEO, Stackly",
    avatar: "/images/carlos-mendoza-avatar.jpg",
    quote: "Pasamos de reportes semanales manuales a visibilidad total en tiempo real. El ROI fue inmediato.",
    stars: 5,
  },
  {
    name: "Valentina Torres",
    role: "Head of Growth, Mercaloop",
    avatar: "/images/valentina-torres-avatar.jpg",
    quote: "La segmentación geográfica nos ayudó a descubrir un mercado que no sabíamos que teníamos. Increíble herramienta.",
    stars: 5,
  },
];

const plans = [
  {
    name: "Starter",
    price: "$29",
    period: "/mes",
    desc: "Perfecto para equipos pequeños que empiezan con analíticas.",
    features: ["Hasta 5 usuarios", "3 dashboards", "30 días de historial", "Alertas básicas", "Soporte por email"],
    cta: "Comenzar gratis",
    highlighted: false,
  },
  {
    name: "Pro",
    price: "$89",
    period: "/mes",
    desc: "Para equipos en crecimiento que necesitan más potencia.",
    features: ["Hasta 25 usuarios", "Dashboards ilimitados", "1 año de historial", "Alertas avanzadas", "Segmentación geográfica", "Soporte prioritario"],
    cta: "Empezar con Pro",
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    desc: "Soluciones a medida para organizaciones grandes.",
    features: ["Usuarios ilimitados", "Dashboards ilimitados", "Historial ilimitado", "SLA garantizado", "SSO y permisos avanzados", "Gerente de cuenta dedicado"],
    cta: "Contactar ventas",
    highlighted: false,
  },
];

export default function HomePage() {
  const shouldReduce = useReducedMotion();

  const motionProps = (variants: object) =>
    shouldReduce
      ? {}
      : { variants, initial: "hidden", whileInView: "visible", viewport: { once: true, margin: "-80px" } };

  return (
    <main
      className="overflow-x-hidden bg-[#0F172A] text-slate-100"
      data-atomic-id="a1o3b4zn">
      {/* ── HERO ── */}
      <section
        className="relative min-h-[92vh] flex items-center"
        data-atomic-id="a1dy22go">
        {/* Background glow */}
        <div
          className="pointer-events-none absolute inset-0 overflow-hidden"
          data-atomic-id="aa7fq3v">
          <div
            className="absolute -top-32 left-1/2 -translate-x-1/2 h-[600px] w-[900px] rounded-full bg-rose-600/10 blur-[120px]"
            data-atomic-id="a4f0c3y" />
          <div
            className="absolute top-1/3 -right-40 h-[400px] w-[400px] rounded-full bg-violet-600/8 blur-[100px]"
            data-atomic-id="a4gf68g" />
          {/* Subtle grid */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(99,102,241,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.5) 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
            data-atomic-id="a4j8uhg" />
        </div>

        <div
          className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 md:py-32 grid lg:grid-cols-2 gap-16 items-center"
          data-atomic-id="aa8uk8d">
          {/* Left copy */}
          <motion.div
            {...(shouldReduce ? {} : { variants: staggerContainer, initial: "hidden", animate: "visible" })}
            className="space-y-8"
          >
            <motion.div variants={fadeIn} className="inline-flex items-center gap-2 rounded-full border border-rose-500/30 bg-rose-500/10 px-4 py-1.5 text-xs font-semibold tracking-widest text-rose-300 uppercase">
              <Sparkles className="h-3 w-3" />
              {APP_TAGLINE}
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.05] text-balance"
            >
              Datos que{" "}
              <span
                className="bg-gradient-to-r from-rose-400 to-violet-400 bg-clip-text text-transparent"
                data-atomic-id="ad6fwkr"
                style={{
                  color: "#f59e0b"
                }}>
                impulsan
              </span>{" "}
              tu negocio
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="text-lg text-slate-400 leading-relaxed max-w-lg text-pretty"
            >
              {APP_NAME} centraliza todas tus métricas en un panel intuitivo. Visualiza ingresos, usuarios y conversiones en tiempo real y toma decisiones con confianza.
            </motion.p>

            <motion.div variants={fadeInUp} className="flex flex-wrap gap-4">
              <Link
                href="/dashboard"
                className="group inline-flex items-center gap-2 rounded-xl bg-rose-500 px-6 py-3 text-sm font-semibold text-white shadow-[0_0_24px_rgba(99,102,241,0.35)] hover:bg-rose-400 hover:shadow-[0_0_32px_rgba(99,102,241,0.5)] transition-all duration-300"
              >
                Ver el dashboard
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
              </Link>
              <Link
                href="/analytics"
                className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-slate-300 hover:bg-white/10 hover:text-white transition-all duration-300"
              >
                <Eye className="h-4 w-4" />
                Ver demo
              </Link>
            </motion.div>

            <motion.div variants={fadeIn} className="flex items-center gap-6 pt-2">
              {[
                { label: "Empresas activas", value: "2,400+" },
                { label: "Uptime garantizado", value: "99.9%" },
                { label: "Soporte", value: "24/7" },
              ].map((stat, __atomicIdx) => (<div
                key={stat.label}
                className="text-center"
                data-atomic-id="a1a63l63"
                data-atomic-instance={__atomicIdx}>
                <p
                  className="text-xl font-bold text-white"
                  data-atomic-id="aeuyly3"
                  data-atomic-instance={__atomicIdx}
                  style={__atomicIdx === 2 ? {
                    color: "#6366f1",
                    backgroundColor: "#84cc16",
                    fontSize: "64px",
                    padding: "64px",
                    borderRadius: "50%"
                  } : undefined}>{stat.value}</p>
                <p
                  className="text-xs text-slate-500 mt-0.5"
                  data-atomic-id="aeuynml"
                  data-atomic-instance={__atomicIdx}>{stat.label}</p>
              </div>))}
            </motion.div>
          </motion.div>

          {/* Right: mini dashboard preview */}
          <motion.div
            {...(shouldReduce ? {} : { variants: scaleIn, initial: "hidden", animate: "visible" })}
            className="relative"
          >
            <div
              className="rounded-2xl border border-white/10 bg-slate-900/80 backdrop-blur-xl shadow-[0_8px_64px_rgba(0,0,0,0.5)] overflow-hidden"
              data-atomic-id="a1wfhy1l">
              {/* Fake topbar */}
              <div
                className="flex items-center justify-between px-5 py-3 border-b border-white/8 bg-slate-800/60"
                data-atomic-id="ajjibem">
                <div className="flex items-center gap-2" data-atomic-id="a1a1g91d">
                  <Sparkles className="h-4 w-4 text-rose-400" />
                  <span className="text-sm font-semibold text-white" data-atomic-id="a124arth">{APP_NAME}</span>
                </div>
                <div className="flex gap-1.5" data-atomic-id="a1a2v35v">
                  <span
                    className="h-2.5 w-2.5 rounded-full bg-red-500/70"
                    data-atomic-id="a1baan85" />
                  <span
                    className="h-2.5 w-2.5 rounded-full bg-yellow-500/70"
                    data-atomic-id="a1ckw9cn" />
                  <span
                    className="h-2.5 w-2.5 rounded-full bg-green-500/70"
                    data-atomic-id="a1dvhvh5" />
                </div>
              </div>

              {/* KPI row */}
              <div className="grid grid-cols-2 gap-3 p-4" data-atomic-id="ajmbznm">
                {kpis.slice(0, 2).map((k, __atomicIdx) => (<div
                  key={k.id}
                  className="rounded-xl border border-white/8 bg-slate-800/50 p-3"
                  data-atomic-id="a1yhiq28"
                  data-atomic-instance={__atomicIdx}>
                  <p
                    className="text-xs text-slate-500 mb-1"
                    data-atomic-id="ae3o69s"
                    data-atomic-instance={__atomicIdx}>{k.label}</p>
                  <p
                    className="text-lg font-bold text-white"
                    data-atomic-id="ae3o7ya"
                    data-atomic-instance={__atomicIdx}>{k.value}</p>
                  <p
                    className="text-xs text-rose-400 mt-0.5"
                    data-atomic-id="ae3o9ms"
                    data-atomic-instance={__atomicIdx}>+{k.change}%</p>
                </div>))}
              </div>

              {/* Mini chart */}
              <div className="px-4 pb-4" data-atomic-id="a4jo0j1">
                <div
                  className="rounded-xl border border-white/8 bg-slate-800/50 p-3"
                  data-atomic-id="aszpuj4">
                  <p className="text-xs text-slate-500 mb-3" data-atomic-id="a1d3331c">Ingresos — últimos 8 meses</p>
                  <ResponsiveContainer width="100%" height={120}>
                    <AreaChart data={revenueData} margin={{ top: 0, right: 0, left: -30, bottom: 0 }}>
                      <defs data-atomic-id="azdqf5m">
                        <linearGradient id="heroGrad" x1="0" y1="0" x2="0" y2="1" data-atomic-id="asacgw4">
                          <stop
                            offset="5%"
                            stopColor="#6366F1"
                            stopOpacity={0.4}
                            data-atomic-id="a1nskubo" />
                          <stop
                            offset="95%"
                            stopColor="#6366F1"
                            stopOpacity={0}
                            data-atomic-id="a1p36gg6" />
                        </linearGradient>
                      </defs>
                      <XAxis dataKey="name" tick={{ fontSize: 9, fill: "#64748b" }} axisLine={false} tickLine={false} />
                      <YAxis tick={{ fontSize: 9, fill: "#64748b" }} axisLine={false} tickLine={false} />
                      <Area type="monotone" dataKey="ingresos" stroke="#6366F1" strokeWidth={2} fill="url(#heroGrad)" dot={false} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            {/* Floating badge */}
            <motion.div
              animate={shouldReduce ? {} : { y: [0, -6, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-4 -left-6 rounded-xl border border-white/10 bg-slate-800/90 backdrop-blur-xl px-4 py-2.5 shadow-[0_4px_24px_rgba(0,0,0,0.4)]"
            >
              <div className="flex items-center gap-2" data-atomic-id="ax1ulz4">
                <div
                  className="h-2 w-2 rounded-full bg-rose-400 animate-pulse"
                  data-atomic-id="a1ovm70j" />
                <span className="text-xs font-medium text-slate-300" data-atomic-id="alf47o4">Actualizado hace 2 min</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
      {/* ── KPI STRIP ── */}
      <section
        className="border-y border-white/8 bg-slate-900/40"
        data-atomic-id="a1160r24">
        <motion.div
          {...motionProps(staggerContainer)}
          className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {kpis.map((k, __atomicIdx) => {
            const Icon = k.icon;
            return (
              <motion.div
                key={k.id}
                variants={scaleIn}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="rounded-2xl border border-white/8 bg-slate-800/50 p-5 shadow-[0_1px_2px_rgba(0,0,0,0.1),0_8px_24px_-8px_rgba(0,0,0,0.3)] hover:border-rose-500/30 transition-all duration-300"
              >
                <div
                  className="flex items-start justify-between mb-3"
                  data-atomic-id="aa97gpk"
                  data-atomic-instance={__atomicIdx}>
                  <div
                    className="flex h-9 w-9 items-center justify-center rounded-xl bg-rose-500/15 border border-rose-500/20"
                    data-atomic-id="a158e5cr"
                    data-atomic-instance={__atomicIdx}>
                    <Icon className="h-4 w-4 text-rose-400" />
                  </div>
                  <span
                    className="text-xs font-semibold text-rose-400 bg-rose-400/10 rounded-full px-2 py-0.5"
                    data-atomic-id="acer6ng"
                    data-atomic-instance={__atomicIdx}>
                    +{k.change}%
                  </span>
                </div>
                <p
                  className="text-2xl font-bold text-white tracking-tight"
                  data-atomic-id="au2tsx3"
                  data-atomic-instance={__atomicIdx}>{k.value}</p>
                <p
                  className="text-xs text-slate-500 mt-1"
                  data-atomic-id="au2tull"
                  data-atomic-instance={__atomicIdx}>{k.label}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </section>
      {/* ── CHARTS SECTION ── */}
      <section id="features" className="py-24 md:py-32" data-atomic-id="a1uhewo7">
        <div
          className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
          data-atomic-id="a1gpjta0">
          <motion.div {...motionProps(fadeInUp)} className="mb-14 max-w-2xl">
            <p
              className="text-xs font-semibold uppercase tracking-widest text-rose-400 mb-3"
              data-atomic-id="alvu4ff">Analíticas avanzadas</p>
            <h2
              className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white text-balance mb-4"
              data-atomic-id="abvj1o7">
              Todo lo que necesitas, en un solo lugar
            </h2>
            <p
              className="text-slate-400 leading-relaxed text-pretty"
              data-atomic-id="alvu7sf">
              Desde ingresos hasta comportamiento de usuarios, NovaDash convierte datos complejos en visualizaciones claras que cualquier miembro del equipo puede entender.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-6" data-atomic-id="a1ul8chp">
            {/* Area chart — wide */}
            <motion.div
              {...motionProps(slideInLeft)}
              className="lg:col-span-2 rounded-2xl border border-white/8 bg-slate-900/60 p-6 shadow-[0_1px_2px_rgba(0,0,0,0.08),0_8px_32px_-8px_rgba(0,0,0,0.35)]"
            >
              <div
                className="flex items-center justify-between mb-6"
                data-atomic-id="ayud65h">
                <div data-atomic-id="a11wumiw">
                  <h3 className="text-base font-semibold text-white" data-atomic-id="asg1a83">Ingresos y Usuarios</h3>
                  <p className="text-xs text-slate-500 mt-0.5" data-atomic-id="adryn2y">Últimos 8 meses</p>
                </div>
                <div
                  className="flex items-center gap-4 text-xs text-slate-500"
                  data-atomic-id="a11y9gne">
                  <span className="flex items-center gap-1.5" data-atomic-id="ai2ltng"><span className="h-2 w-2 rounded-full bg-rose-400" data-atomic-id="as4u3i6" />Ingresos</span>
                  <span className="flex items-center gap-1.5" data-atomic-id="ajd7fry"><span className="h-2 w-2 rounded-full bg-violet-400" data-atomic-id="a12lfl1c" />Usuarios</span>
                </div>
              </div>
              <ResponsiveContainer width="100%" height={220}>
                <AreaChart data={revenueData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
                  <defs data-atomic-id="a91t5jg">
                    <linearGradient id="ingGrad" x1="0" y1="0" x2="0" y2="1" data-atomic-id="a1q781cm">
                      <stop
                        offset="5%"
                        stopColor="#6366F1"
                        stopOpacity={0.35}
                        data-atomic-id="a16fppue" />
                      <stop
                        offset="95%"
                        stopColor="#6366F1"
                        stopOpacity={0}
                        data-atomic-id="a17qbbyw" />
                    </linearGradient>
                    <linearGradient id="usrGrad" x1="0" y1="0" x2="0" y2="1" data-atomic-id="a1wz3lp4">
                      <stop
                        offset="5%"
                        stopColor="#8B5CF6"
                        stopOpacity={0.3}
                        data-atomic-id="a1gwb7dk" />
                      <stop
                        offset="95%"
                        stopColor="#8B5CF6"
                        stopOpacity={0}
                        data-atomic-id="a1i6wti2" />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                  <XAxis dataKey="name" tick={{ fontSize: 11, fill: "#64748b" }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 11, fill: "#64748b" }} axisLine={false} tickLine={false} />
                  <Tooltip
                    contentStyle={{ background: "#1E293B", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "12px", fontSize: "12px", color: "#e2e8f0" }}
                    cursor={{ stroke: "rgba(99,102,241,0.3)", strokeWidth: 1 }}
                  />
                  <Area type="monotone" dataKey="ingresos" stroke="#6366F1" strokeWidth={2.5} fill="url(#ingGrad)" dot={false} activeDot={{ r: 4, fill: "#6366F1" }} />
                  <Area type="monotone" dataKey="usuarios" stroke="#8B5CF6" strokeWidth={2} fill="url(#usrGrad)" dot={false} activeDot={{ r: 4, fill: "#8B5CF6" }} />
                </AreaChart>
              </ResponsiveContainer>
            </motion.div>

            {/* Pie chart */}
            <motion.div
              {...motionProps(slideInRight)}
              className="rounded-2xl border border-white/8 bg-slate-900/60 p-6 shadow-[0_1px_2px_rgba(0,0,0,0.08),0_8px_32px_-8px_rgba(0,0,0,0.35)]"
            >
              <h3
                className="text-base font-semibold text-white mb-1"
                data-atomic-id="a1rvy8o1">Canales de tráfico</h3>
              <p className="text-xs text-slate-500 mb-4" data-atomic-id="apm2fp4">Distribución actual</p>
              <ResponsiveContainer width="100%" height={160}>
                <PieChart>
                  <Pie data={channelData} cx="50%" cy="50%" innerRadius={48} outerRadius={72} paddingAngle={3} dataKey="value">
                    {channelData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={CHANNEL_COLORS[index % CHANNEL_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{ background: "#1E293B", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "10px", fontSize: "12px", color: "#e2e8f0" }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <ul className="mt-3 space-y-2" data-atomic-id="a1rw2vf1">
                {channelData.map((ch, i) => (
                  <li
                    key={ch.name}
                    className="flex items-center justify-between text-xs"
                    data-atomic-id="al3t3jj"
                    data-atomic-instance={i}>
                    <span
                      className="flex items-center gap-2 text-slate-400"
                      data-atomic-id="a644pu7"
                      data-atomic-instance={i}>
                      <span
                        className="h-2 w-2 rounded-full"
                        style={{ background: CHANNEL_COLORS[i] }}
                        data-atomic-id="a3cg0vm"
                        data-atomic-instance={i} />
                      {ch.name}
                    </span>
                    <span
                      className="font-semibold text-white"
                      data-atomic-id="a7eqbyp"
                      data-atomic-instance={i}>{ch.value}%</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Bar chart — full width */}
            <motion.div
              {...motionProps(fadeInUp)}
              className="lg:col-span-3 rounded-2xl border border-white/8 bg-slate-900/60 p-6 shadow-[0_1px_2px_rgba(0,0,0,0.08),0_8px_32px_-8px_rgba(0,0,0,0.35)]"
            >
              <div
                className="flex items-center justify-between mb-6"
                data-atomic-id="aengh6c">
                <div data-atomic-id="a19vdnzr">
                  <h3 className="text-base font-semibold text-white" data-atomic-id="aoddde">Ingresos por mes</h3>
                  <p className="text-xs text-slate-500 mt-0.5" data-atomic-id="af35obt">Comparativa mensual</p>
                </div>
                <span
                  className="text-xs font-semibold text-rose-400 bg-rose-400/10 rounded-full px-3 py-1"
                  data-atomic-id="anf35s8">
                  +18.4% vs año anterior
                </span>
              </div>
              <ResponsiveContainer width="100%" height={180}>
                <BarChart data={revenueData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }} barSize={28}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
                  <XAxis dataKey="name" tick={{ fontSize: 11, fill: "#64748b" }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 11, fill: "#64748b" }} axisLine={false} tickLine={false} />
                  <Tooltip
                    contentStyle={{ background: "#1E293B", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "12px", fontSize: "12px", color: "#e2e8f0" }}
                    cursor={{ fill: "rgba(99,102,241,0.06)" }}
                  />
                  <Bar dataKey="ingresos" fill="#6366F1" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </motion.div>
          </div>
        </div>
      </section>
      {/* ── FEATURES GRID ── */}
      <section
        id="about"
        className="py-24 md:py-32 bg-slate-900/40 border-y border-white/8"
        data-atomic-id="a1hpdl9n">
        <div
          className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
          data-atomic-id="a1u9axz0">
          <motion.div {...motionProps(fadeInUp)} className="text-center mb-16 max-w-2xl mx-auto">
            <p
              className="text-xs font-semibold uppercase tracking-widest text-rose-400 mb-3"
              data-atomic-id="arsdoq7">Funcionalidades</p>
            <h2
              className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white text-balance mb-4"
              data-atomic-id="a1sn8jln">
              Construido para equipos que escalan
            </h2>
            <p
              className="text-slate-400 leading-relaxed text-pretty"
              data-atomic-id="arsds37">
              Cada función de NovaDash fue diseñada para reducir el tiempo entre los datos y la acción.
            </p>
          </motion.div>

          <motion.div
            {...motionProps(staggerContainer)}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {features.map((f, i) => {
              const Icon = f.icon;
              const isLarge = i === 0 || i === 5;
              return (
                <motion.div
                  key={f.title}
                  variants={scaleIn}
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                  className={`rounded-2xl border border-white/8 bg-slate-800/40 p-6 shadow-[0_1px_2px_rgba(0,0,0,0.06),0_8px_24px_-8px_rgba(0,0,0,0.25)] hover:border-rose-500/25 hover:bg-slate-800/60 transition-all duration-300 ${isLarge ? "lg:col-span-1" : ""}`}
                >
                  <div
                    className="flex h-10 w-10 items-center justify-center rounded-xl bg-rose-500/15 border border-rose-500/20 mb-4"
                    data-atomic-id="aplcbal"
                    data-atomic-instance={i}>
                    <Icon className="h-5 w-5 text-rose-400" />
                  </div>
                  <h3
                    className="text-base font-semibold text-white mb-2"
                    data-atomic-id="asrb5d3"
                    data-atomic-instance={i}>{f.title}</h3>
                  <p
                    className="text-sm text-slate-400 leading-relaxed"
                    data-atomic-id="aqp8eke"
                    data-atomic-instance={i}>{f.desc}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>
      {/* ── TESTIMONIALS ── */}
      <section id="contact" className="py-24 md:py-32" data-atomic-id="a14xc9v3">
        <div
          className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
          data-atomic-id="a8ry0ow">
          <motion.div {...motionProps(fadeInUp)} className="mb-16 max-w-xl">
            <p
              className="text-xs font-semibold uppercase tracking-widest text-rose-400 mb-3"
              data-atomic-id="axox90z">Testimonios</p>
            <h2
              className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white text-balance mb-4"
              data-atomic-id="a1adtzjz">
              Equipos que ya confían en NovaDash
            </h2>
            <p className="text-slate-400 leading-relaxed" data-atomic-id="axoxcdz">
              Más de 2,400 empresas usan NovaDash para tomar decisiones más rápidas y con mayor confianza.
            </p>
          </motion.div>

          <motion.div
            {...motionProps(staggerContainer)}
            className="grid md:grid-cols-3 gap-6"
          >
            {testimonials.map((t, __atomicIdx) => (<motion.div
              key={t.name}
              variants={fadeInUp}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="rounded-2xl border border-white/8 bg-slate-900/60 p-6 shadow-[0_1px_2px_rgba(0,0,0,0.08),0_8px_32px_-8px_rgba(0,0,0,0.3)] hover:border-rose-500/20 transition-all duration-300"
            >
              <div
                className="flex gap-0.5 mb-4"
                data-atomic-id="a15nrq0m"
                data-atomic-instance={__atomicIdx}>
                {Array.from({ length: t.stars }).map((_, i) => (
                  <Star key={i} className="h-3.5 w-3.5 fill-rose-400 text-rose-400" />
                ))}
              </div>
              <p
                className="text-sm text-slate-300 leading-relaxed mb-5 text-pretty"
                data-atomic-id="a17a6rt1"
                data-atomic-instance={__atomicIdx}>
                &ldquo;{t.quote}&rdquo;
              </p>
              <div
                className="flex items-center gap-3"
                data-atomic-id="a15qle9m"
                data-atomic-instance={__atomicIdx}>
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="h-9 w-9 rounded-full object-cover border border-white/10"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(t.name)}&background=6366F1&color=fff&size=36`;
                  }}
                  data-atomic-id="ar4st9z"
                  data-atomic-instance={__atomicIdx} />
                <div data-atomic-id="ar67j3z" data-atomic-instance={__atomicIdx}>
                  <p
                    className="text-sm font-semibold text-white"
                    data-atomic-id="av33j5b"
                    data-atomic-instance={__atomicIdx}>{t.name}</p>
                  <p
                    className="text-xs text-slate-500"
                    data-atomic-id="av33ktt"
                    data-atomic-instance={__atomicIdx}>{t.role}</p>
                </div>
              </div>
            </motion.div>))}
          </motion.div>
        </div>
      </section>
      {/* ── PRICING ── */}
      <section
        id="pricing"
        className="py-24 md:py-32 bg-slate-900/40 border-y border-white/8"
        data-atomic-id="a1p7rgui">
        <div
          className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
          data-atomic-id="at763ej">
          <motion.div {...motionProps(fadeInUp)} className="text-center mb-16 max-w-xl mx-auto">
            <p
              className="text-xs font-semibold uppercase tracking-widest text-rose-400 mb-3"
              data-atomic-id="a2ih92m">Precios</p>
            <h2
              className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white text-balance mb-4"
              data-atomic-id="abwqspm">
              Planes para cada etapa
            </h2>
            <p className="text-slate-400 leading-relaxed" data-atomic-id="a2ihcfm">
              Sin sorpresas. Cancela cuando quieras. Todos los planes incluyen 14 días de prueba gratuita.
            </p>
          </motion.div>

          <motion.div
            {...motionProps(staggerContainer)}
            className="grid md:grid-cols-3 gap-6 items-start"
          >
            {plans.map((plan, __atomicIdx) => (<motion.div
              key={plan.name}
              variants={scaleIn}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className={`relative rounded-2xl border p-7 shadow-[0_1px_2px_rgba(0,0,0,0.08),0_8px_32px_-8px_rgba(0,0,0,0.35)] transition-all duration-300 ${
                plan.highlighted
                  ? "border-rose-500/50 bg-rose-500/10 shadow-[0_0_40px_rgba(99,102,241,0.15)]"
                  : "border-white/8 bg-slate-900/60 hover:border-rose-500/20"
              }`}
            >
              {plan.highlighted && (
                <div
                  className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-rose-500 px-4 py-1 text-xs font-bold text-white tracking-wide shadow-[0_0_16px_rgba(99,102,241,0.5)]"
                  data-atomic-id="a1x3r8ot"
                  data-atomic-instance={__atomicIdx}>
                  Más popular
                </div>
              )}
              <h3
                className="text-lg font-bold text-white mb-1"
                data-atomic-id="a83cggb"
                data-atomic-instance={__atomicIdx}>{plan.name}</h3>
              <p
                className="text-xs text-slate-500 mb-4"
                data-atomic-id="a1553ule"
                data-atomic-instance={__atomicIdx}>{plan.desc}</p>
              <div
                className="flex items-end gap-1 mb-6"
                data-atomic-id="a1i1wjdj"
                data-atomic-instance={__atomicIdx}>
                <span
                  className="text-4xl font-extrabold text-white tracking-tight"
                  data-atomic-id="a1t0vkvd"
                  data-atomic-instance={__atomicIdx}>{plan.price}</span>
                {plan.period && <span
                  className="text-slate-500 text-sm mb-1"
                  data-atomic-id="avf3dbr"
                  data-atomic-instance={__atomicIdx}>{plan.period}</span>}
              </div>
              <ul
                className="space-y-2.5 mb-7"
                data-atomic-id="a83h37b"
                data-atomic-instance={__atomicIdx}>
                {plan.features.map((feat, __atomicIdx) => (<li
                  key={feat}
                  className="flex items-center gap-2.5 text-sm text-slate-300"
                  data-atomic-id="a29maqh"
                  data-atomic-instance={__atomicIdx}>
                  <Check className="h-4 w-4 text-rose-400 shrink-0" />
                  {feat}
                </li>))}
              </ul>
              <Link
                href="/dashboard"
                className={`flex items-center justify-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold transition-all duration-300 ${
                  plan.highlighted
                    ? "bg-rose-500 text-white hover:bg-rose-400 shadow-[0_0_20px_rgba(99,102,241,0.35)] hover:shadow-[0_0_28px_rgba(99,102,241,0.5)]"
                    : "border border-white/10 bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white"
                }`}
              >
                {plan.cta}
                <ChevronRight className="h-4 w-4" />
              </Link>
            </motion.div>))}
          </motion.div>
        </div>
      </section>
      {/* ── CTA BANNER ── */}
      <section className="py-24 md:py-32" data-atomic-id="a1cfq5fy">
        <div
          className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
          data-atomic-id="a16qx83j">
          <motion.div
            {...motionProps(scaleIn)}
            className="relative rounded-3xl border border-rose-500/25 bg-gradient-to-br from-rose-500/10 via-slate-900/60 to-violet-500/10 p-12 md:p-16 text-center overflow-hidden shadow-[0_0_80px_rgba(99,102,241,0.12)]"
          >
            {/* Glow */}
            <div className="pointer-events-none absolute inset-0" data-atomic-id="a3hk207">
              <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[400px] w-[600px] rounded-full bg-rose-600/10 blur-[80px]"
                data-atomic-id="a1ll1zbe" />
            </div>
            <div className="relative" data-atomic-id="a3iyw4p">
              <div
                className="inline-flex items-center gap-2 rounded-full border border-rose-500/30 bg-rose-500/10 px-4 py-1.5 text-xs font-semibold tracking-widest text-rose-300 uppercase mb-6"
                data-atomic-id="a1scxjnw">
                <Zap className="h-3 w-3" />
                Empieza hoy
              </div>
              <h2
                className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white text-balance mb-5"
                data-atomic-id="acpozol">
                Tus datos merecen un panel a su altura
              </h2>
              <p
                className="text-slate-400 leading-relaxed max-w-xl mx-auto mb-8 text-pretty"
                data-atomic-id="a1dw3mot">
                Únete a más de 2,400 equipos que ya usan NovaDash para crecer con confianza. Sin tarjeta de crédito para empezar.
              </p>
              <div
                className="flex flex-wrap items-center justify-center gap-4"
                data-atomic-id="a1sh621e">
                <Link
                  href="/dashboard"
                  className="group inline-flex items-center gap-2 rounded-xl bg-rose-500 px-7 py-3.5 text-sm font-semibold text-white shadow-[0_0_24px_rgba(99,102,241,0.4)] hover:bg-rose-400 hover:shadow-[0_0_36px_rgba(99,102,241,0.55)] transition-all duration-300"
                >
                  Ir al dashboard
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
                </Link>
                <Link
                  href="/analytics"
                  className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-7 py-3.5 text-sm font-semibold text-slate-300 hover:bg-white/10 hover:text-white transition-all duration-300"
                >
                  Explorar analíticas
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
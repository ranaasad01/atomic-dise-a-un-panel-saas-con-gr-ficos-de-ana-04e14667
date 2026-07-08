export const APP_NAME = "NovaDash";
export const APP_TAGLINE = "Analíticas en tiempo real para tu negocio";
export const APP_ACCENT = "#6366F1";

export interface NavLink {
  label: string;
  href: string;
  type: "route" | "anchor";
}

export const navLinks: NavLink[] = [
  { label: "Inicio", href: "/", type: "route" },
  { label: "Dashboard", href: "/dashboard", type: "route" },
  { label: "Analíticas", href: "/analytics", type: "route" },
  { label: "Usuarios", href: "/users", type: "route" },
  { label: "Configuración", href: "/settings", type: "route" },
  { label: "Iniciar Sesión", href: "/login", type: "route" },
];

export interface KPICard {
  id: string;
  label: string;
  value: string;
  change: number;
  unit?: string;
  icon: string;
}

export interface ChartDataPoint {
  name: string;
  ingresos: number;
  usuarios: number;
  conversiones: number;
}

export type Period = "diario" | "semanal" | "mensual" | "anual";

export const PERIODS: { label: string; value: Period }[] = [
  { label: "Diario", value: "diario" },
  { label: "Semanal", value: "semanal" },
  { label: "Mensual", value: "mensual" },
  { label: "Anual", value: "anual" },
];

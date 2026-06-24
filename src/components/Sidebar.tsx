import {
  LayoutDashboard,
  LogIn,
  LogOut,
  Users,
  Package,
  Car,
  CalendarCheck,
  BarChart3,
  Bell,
  Settings,
  Building2,
  Sparkles,
  FileText,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { PalmettoLogo } from "@/components/PalmettoLogo";

export type PageId =
  | "dashboard"
  | "checkin"
  | "checkout"
  | "reportes"
  | "huespedes"
  | "paquetes"
  | "parqueadero"
  | "reservas"
  | "registros";

const items: { id: PageId; label: string; icon: typeof LayoutDashboard; badge?: string }[] = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "checkin", label: "Check-in", icon: LogIn, badge: "23" },
  { id: "checkout", label: "Check-out", icon: LogOut, badge: "18" },
  { id: "huespedes", label: "Huéspedes", icon: Users },
  { id: "paquetes", label: "Paquetes", icon: Package, badge: "12" },
  { id: "parqueadero", label: "Parqueadero", icon: Car },
  { id: "reservas", label: "Reservas", icon: CalendarCheck, badge: "6" },
  { id: "reportes", label: "Reportes", icon: BarChart3 },
  { id: "registros", label: "Registros", icon: FileText },
];

const bottom = [
  { id: "alertas", label: "Alertas", icon: Bell, badge: "5" },
  { id: "config", label: "Configuración", icon: Settings, badge: undefined },
];

interface SidebarProps {
  active: PageId;
  onSelect: (id: PageId) => void;
}

export function Sidebar({ active, onSelect }: SidebarProps) {

  return (
    <aside className="hidden lg:flex w-[248px] shrink-0 flex-col gap-1 border-r border-border/60 bg-gradient-to-b from-card/80 to-card/40 backdrop-blur-xl p-3">
      {/* Logo */}
      <div className="px-2 pt-3 pb-2 mb-2">
        <PalmettoLogo className="h-14 w-auto text-foreground" />
      </div>

      {/* Building card */}
      <div className="mx-1 mb-3 rounded-xl border border-border/60 bg-card/50 p-3">
        <div className="flex items-center gap-2 text-[12px] text-muted-foreground">
          <Building2 className="size-3.5" />
          <span>Edificio</span>
        </div>
        <div className="mt-1 text-[20px] font-semibold tracking-tight">
          130 <span className="text-muted-foreground text-[13px] font-normal">apartamentos</span>
        </div>
        <div className="mt-1 text-[11px] text-muted-foreground">Pisos 9 — 41 · Líneas 01-05</div>
      </div>

      <nav className="flex-1 space-y-1">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = active === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onSelect(item.id)}
              className={cn(
                "group relative w-full flex items-center gap-3 rounded-lg px-3 py-2 text-[13.5px] font-medium transition-all duration-300 ease-td",
                isActive
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-muted/40 hover:text-foreground"
              )}
            >
              {isActive && (
                <span className="absolute left-0 top-1.5 bottom-1.5 w-[3px] rounded-r-full bg-primary" />
              )}
              <Icon className="size-[18px] shrink-0" />
              <span className="flex-1 text-left">{item.label}</span>
              {item.badge && (
                <Badge
                  variant={isActive ? "default" : "secondary"}
                  className="rounded-full px-1.5 py-0 text-[10px]"
                >
                  {item.badge}
                </Badge>
              )}
            </button>
          );
        })}
      </nav>

      <div className="space-y-1 pt-2 border-t border-border/60">
        {bottom.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              className="group w-full flex items-center gap-3 rounded-lg px-3 py-2 text-[13.5px] font-medium text-muted-foreground hover:bg-muted/40 hover:text-foreground transition-colors"
            >
              <Icon className="size-[18px]" />
              <span className="flex-1 text-left">{item.label}</span>
              {item.badge && (
                <span className="relative">
                  <span className="t-badge" data-open="true">
                    <span className="t-badge-dot inline-block min-w-[18px] px-1 text-center text-[10px] font-semibold leading-[18px] rounded-full bg-destructive text-destructive-foreground">
                      {item.badge}
                    </span>
                  </span>
                </span>
              )}
            </button>
          );
        })}

        {/* AI Pro card */}
        <div className="mt-2 rounded-xl border border-primary/30 bg-gradient-to-br from-primary/15 via-primary/5 to-transparent p-3 relative overflow-hidden">
          <div className="absolute -top-6 -right-6 size-20 rounded-full bg-primary/20 blur-2xl" />
          <div className="flex items-center gap-2 relative">
            <Sparkles className="size-4 text-primary" />
            <span className="text-[12px] font-semibold tracking-tight">Asistente IA</span>
          </div>
          <p className="mt-1 text-[11.5px] text-muted-foreground leading-snug relative">
            Pregunta en lenguaje natural por reservas, manillas, ocupación.
          </p>
        </div>
      </div>
    </aside>
  );
}

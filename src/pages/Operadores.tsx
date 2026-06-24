import { useMemo, useState } from "react";
import {
  Briefcase,
  Building2,
  CalendarCheck,
  Download,
  ExternalLink,
  Mail,
  Moon,
  Search,
  TrendingUp,
  Users,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AnimatedNumber } from "@/components/AnimatedNumber";
import { operadoresActividad, type OperadorDetalle } from "@/data/mock";
import { cn, formatNumber } from "@/lib/utils";

type SortBy = "noches" | "reservas" | "aptos" | "alfabetico";
type Filter = "todos" | "activos" | "pausados";

const sortLabels: Record<SortBy, string> = {
  noches: "Noches",
  reservas: "Reservas",
  aptos: "Apartamentos",
  alfabetico: "Nombre (A-Z)",
};

export function OperadoresPage() {
  const [sortBy, setSortBy] = useState<SortBy>("noches");
  const [filter, setFilter] = useState<Filter>("todos");
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    let list = [...operadoresActividad];
    if (filter === "activos") list = list.filter((o) => o.estado === "activo");
    if (filter === "pausados") list = list.filter((o) => o.estado === "pausado");
    if (search) {
      const q = search.toLowerCase();
      list = list.filter(
        (o) =>
          o.operador.toLowerCase().includes(q) ||
          o.representante.toLowerCase().includes(q)
      );
    }
    if (sortBy === "alfabetico") list.sort((a, b) => a.operador.localeCompare(b.operador));
    else list.sort((a, b) => b[sortBy] - a[sortBy]);
    return list;
  }, [filter, search, sortBy]);

  const totalAptos = operadoresActividad.reduce((a, o) => a + o.aptos, 0);
  const totalReservas = operadoresActividad.reduce((a, o) => a + o.reservas, 0);
  const totalNoches = operadoresActividad.reduce((a, o) => a + o.noches, 0);
  const activos = operadoresActividad.filter((o) => o.estado === "activo").length;
  const maxNoches = Math.max(...operadoresActividad.map((o) => o.noches));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4 animate-fade-up">
        <div>
          <Badge className="mb-2">Administración · Stakeholders</Badge>
          <h1 className="text-[28px] font-bold tracking-tight">Operadores turísticos</h1>
          <p className="text-[13.5px] text-muted-foreground mt-1">
            18 operadores reciben y gestionan reservas en nombre de los propietarios del Edificio Palmetto Eliptic.
          </p>
        </div>
        <Button variant="outline" size="sm">
          <Download className="size-4" />
          Exportar listado
        </Button>
      </div>

      {/* Top KPIs */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 animate-fade-up [animation-delay:60ms]">
        <BigKpi
          icon={Briefcase}
          label="Operadores"
          value={operadoresActividad.length}
          sub={`${activos} activos`}
        />
        <BigKpi
          icon={Building2}
          label="Aptos asignados"
          value={totalAptos}
          sub={`de 130 totales`}
        />
        <BigKpi
          icon={CalendarCheck}
          label="Reservas YTD"
          value={totalReservas}
        />
        <BigKpi
          icon={Moon}
          label="Noches vendidas"
          value={totalNoches}
        />
      </section>

      {/* Filters */}
      <section className="flex flex-wrap items-center gap-3 animate-fade-up [animation-delay:120ms]">
        <div className="flex items-center gap-2 rounded-lg border border-border/60 bg-card/40 px-3 py-1.5">
          <Search className="size-3.5 text-muted-foreground" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar operador o representante…"
            className="bg-transparent text-[13px] outline-none w-64 placeholder:text-muted-foreground/70"
          />
        </div>

        <div className="flex items-center gap-1.5">
          {(["todos", "activos", "pausados"] as Filter[]).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={cn(
                "text-[12px] rounded-full border px-3 py-1 transition-colors capitalize",
                filter === f
                  ? "border-primary/60 bg-primary/15 text-primary"
                  : "border-border/60 bg-card/40 hover:bg-card/80 text-muted-foreground"
              )}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="ml-auto flex items-center gap-1.5 text-[12px]">
          <span className="text-muted-foreground">Ordenar por</span>
          {(Object.keys(sortLabels) as SortBy[]).map((s) => (
            <button
              key={s}
              onClick={() => setSortBy(s)}
              className={cn(
                "rounded-full border px-3 py-1 transition-colors",
                sortBy === s
                  ? "border-primary/60 bg-primary/15 text-primary"
                  : "border-border/60 bg-card/40 hover:bg-card/80 text-muted-foreground"
              )}
            >
              {sortLabels[s]}
            </button>
          ))}
        </div>
      </section>

      {/* Cards grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 animate-fade-up [animation-delay:200ms]">
        {filtered.map((op) => (
          <OperadorCard key={op.operador} op={op} maxNoches={maxNoches} />
        ))}
        {filtered.length === 0 && (
          <Card className="md:col-span-2 xl:col-span-3">
            <CardContent className="p-12 text-center text-[13px] text-muted-foreground">
              Ningún operador coincide con los filtros.
            </CardContent>
          </Card>
        )}
      </section>

      <div className="text-[11.5px] text-muted-foreground/70 text-center pt-4">
        Fuente:{" "}
        <a
          href="https://edificiopalmettoeliptic.com/operadores.html"
          target="_blank"
          rel="noreferrer"
          className="underline-offset-2 hover:underline hover:text-primary"
        >
          edificiopalmettoeliptic.com/operadores.html
        </a>
        {" "}· Cada operador gestiona su propia tarifa con el huésped. El edificio solo registra estancias y manillas.
      </div>
    </div>
  );
}

function OperadorCard({ op, maxNoches }: { op: OperadorDetalle; maxNoches: number }) {
  const initials = op.operador
    .split(/\s|&/)
    .filter((w) => w && /[A-Za-zÁ-Úá-ú]/.test(w[0] ?? ""))
    .slice(0, 2)
    .map((w) => w[0]!.toUpperCase())
    .join("");
  const pct = (op.noches / maxNoches) * 100;

  return (
    <Card className="group relative overflow-hidden">
      {/* Tone glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/15 via-primary/5 to-transparent opacity-60 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      <CardContent className="relative p-5">
        {/* Header: avatar + name + status */}
        <div className="flex items-start gap-3">
          <div className="shrink-0 size-12 rounded-xl bg-gradient-to-br from-primary to-primary/70 grid place-items-center text-primary-foreground font-bold text-[15px] tabular-nums shadow-glow">
            {initials || "OP"}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <h3 className="font-semibold text-[14.5px] tracking-tight leading-tight">
                {op.operador}
              </h3>
              <Badge
                variant={op.estado === "activo" ? "success" : "secondary"}
                className="shrink-0 rounded-full text-[9.5px]"
              >
                {op.estado}
              </Badge>
            </div>
            <p className="mt-0.5 text-[12px] text-muted-foreground truncate">
              {op.representante}
            </p>
            <p className="mt-1 text-[11px] text-muted-foreground/80 flex items-center gap-1 truncate">
              <Mail className="size-3 shrink-0" />
              <span className="truncate">{op.contacto}</span>
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-4 grid grid-cols-3 gap-2">
          <Stat icon={Building2} label="Aptos" value={op.aptos} />
          <Stat icon={CalendarCheck} label="Reservas" value={op.reservas} />
          <Stat icon={Moon} label="Noches" value={op.noches} />
        </div>

        {/* Activity bar */}
        <div className="mt-4">
          <div className="flex items-center justify-between text-[11px] text-muted-foreground mb-1">
            <span className="flex items-center gap-1">
              <TrendingUp className="size-3" />
              Ocupación promedio
            </span>
            <span className="font-semibold tabular-nums text-foreground">
              {op.ocupacion}%
            </span>
          </div>
          <div className="h-1.5 rounded-full bg-muted/40 overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-primary to-primary/70 transition-all duration-1000 ease-td"
              style={{ width: `${pct}%` }}
            />
          </div>
        </div>

        {/* Footer actions */}
        <div className="mt-4 flex items-center justify-between text-[11px]">
          <span className="text-muted-foreground inline-flex items-center gap-1">
            <Users className="size-3" />
            {op.rntCount} {op.rntCount === 1 ? "RNT" : "RNTs"}
          </span>
          <button className="inline-flex items-center gap-1 text-primary hover:underline">
            Ver portal
            <ExternalLink className="size-3" />
          </button>
        </div>
      </CardContent>
    </Card>
  );
}

function Stat({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Building2;
  label: string;
  value: number;
}) {
  return (
    <div className="rounded-lg bg-muted/30 px-2.5 py-2">
      <div className="flex items-center gap-1 text-[10px] uppercase tracking-wider text-muted-foreground">
        <Icon className="size-3" />
        {label}
      </div>
      <div className="mt-0.5 text-[16px] font-bold tabular-nums leading-none">
        {value}
      </div>
    </div>
  );
}

function BigKpi({
  icon: Icon,
  label,
  value,
  sub,
}: {
  icon: typeof Briefcase;
  label: string;
  value: number;
  sub?: string;
}) {
  return (
    <Card>
      <CardContent className="p-5">
        <div className="flex items-start justify-between">
          <div className="size-10 rounded-xl ring-1 ring-primary/30 bg-gradient-to-br from-primary/20 to-transparent grid place-items-center text-primary">
            <Icon className="size-5" />
          </div>
        </div>
        <div className="mt-4 text-[12px] uppercase tracking-[0.18em] text-muted-foreground font-medium">
          {label}
        </div>
        <div className="mt-1 text-[26px] font-bold tracking-tight tabular-nums leading-none">
          <AnimatedNumber value={value} format={(n) => formatNumber(Math.round(n))} />
        </div>
        {sub && <div className="mt-1 text-[11.5px] text-muted-foreground">{sub}</div>}
      </CardContent>
    </Card>
  );
}


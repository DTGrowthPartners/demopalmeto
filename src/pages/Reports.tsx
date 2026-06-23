import { useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  BarChart3,
  CalendarRange,
  Download,
  FileSpreadsheet,
  Globe2,
  Printer,
  Trophy,
  TrendingUp,
  Users,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  guestAgeBreakdown,
  monthlyOccupancy2026,
  reservationCalidad,
  reservationsByCountry,
  topApartmentsYear,
} from "@/data/mock";
import { cn, formatCOP, formatNumber } from "@/lib/utils";
import { AnimatedNumber } from "@/components/AnimatedNumber";

type Range = "30d" | "mes" | "ytd" | "anual";

export function ReportsPage() {
  const [range, setRange] = useState<Range>("ytd");

  const totalIngresos = monthlyOccupancy2026.reduce((a, m) => a + m.ingresos, 0);
  const totalNoches = monthlyOccupancy2026.reduce((a, m) => a + m.noches, 0);
  const avgOcc = Math.round(
    monthlyOccupancy2026.reduce((a, m) => a + m.ocupacion, 0) /
      monthlyOccupancy2026.length
  );
  const totalAge = guestAgeBreakdown.reduce((a, g) => a + g.total, 0);
  const sinManilla = guestAgeBreakdown
    .filter((g) => !g.paganManilla)
    .reduce((a, g) => a + g.total, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4 animate-fade-up">
        <div>
          <Badge className="mb-2">Administración · Análisis</Badge>
          <h1 className="text-[28px] font-bold tracking-tight">Reportes del edificio</h1>
          <p className="text-[13.5px] text-muted-foreground mt-1">
            Vista consolidada de ocupación, ingresos, demografía y operación. Exportable a PDF/XLS.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Tabs value={range} onValueChange={(v) => setRange(v as Range)}>
            <TabsList>
              <TabsTrigger value="30d">30d</TabsTrigger>
              <TabsTrigger value="mes">Mes</TabsTrigger>
              <TabsTrigger value="ytd">Año (YTD)</TabsTrigger>
              <TabsTrigger value="anual">Anual</TabsTrigger>
            </TabsList>
          </Tabs>
          <Button variant="outline" size="sm">
            <FileSpreadsheet className="size-4" />
            Exportar XLS
          </Button>
          <Button variant="outline" size="sm">
            <Printer className="size-4" />
            Imprimir
          </Button>
        </div>
      </div>

      {/* Top KPIs */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 animate-fade-up [animation-delay:60ms]">
        <BigKpi
          label="Ingresos YTD"
          value={totalIngresos}
          format={(n) => formatCOP(n)}
          icon={TrendingUp}
          tone="primary"
        />
        <BigKpi
          label="Noches vendidas"
          value={totalNoches}
          format={(n) => formatNumber(Math.round(n))}
          icon={CalendarRange}
          tone="success"
        />
        <BigKpi
          label="Ocupación promedio"
          value={avgOcc}
          format={(n) => `${Math.round(n)}%`}
          icon={BarChart3}
          tone="warning"
        />
        <BigKpi
          label="Sin manilla (0-6)"
          value={sinManilla}
          format={(n) => `${formatNumber(Math.round(n))} pax`}
          icon={Users}
          tone="primary"
        />
      </section>

      {/* Monthly occupation + revenue */}
      <section className="grid grid-cols-1 xl:grid-cols-3 gap-6 animate-fade-up [animation-delay:140ms]">
        <Card className="xl:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="size-4 text-primary" />
              Ocupación e ingresos por mes · 2026
            </CardTitle>
            <CardDescription>
              Barras de ingresos en COP · línea de ocupación mensual.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={320}>
              <BarChart data={monthlyOccupancy2026} margin={{ left: -16, right: 8 }}>
                <defs>
                  <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="hsl(188 92% 60%)" stopOpacity={0.85} />
                    <stop offset="100%" stopColor="hsl(220 96% 60%)" stopOpacity={0.45} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis
                  dataKey="mes"
                  tick={{ fontSize: 11, fill: "hsl(215 20% 65%)" }}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  yAxisId="rev"
                  tick={{ fontSize: 11, fill: "hsl(215 20% 65%)" }}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(v) => `$${(v / 1_000_000).toFixed(0)}M`}
                />
                <YAxis
                  yAxisId="occ"
                  orientation="right"
                  tick={{ fontSize: 11, fill: "hsl(39 96% 60%)" }}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(v) => `${v}%`}
                  domain={[0, 100]}
                />
                <Tooltip
                  contentStyle={{
                    background: "hsl(215 50% 9%)",
                    border: "1px solid hsl(215 30% 20%)",
                    borderRadius: 10,
                    fontSize: 12,
                  }}
                  formatter={(value: number, name: string) =>
                    name === "Ingresos" ? formatCOP(value) : `${value}%`
                  }
                />
                <Legend wrapperStyle={{ fontSize: 12 }} />
                <Bar
                  yAxisId="rev"
                  dataKey="ingresos"
                  name="Ingresos"
                  fill="url(#revGrad)"
                  radius={[8, 8, 0, 0]}
                  animationDuration={1200}
                />
                <Line
                  yAxisId="occ"
                  type="monotone"
                  dataKey="ocupacion"
                  name="Ocupación %"
                  stroke="hsl(39 96% 60%)"
                  strokeWidth={2.5}
                  dot={{ fill: "hsl(39 96% 60%)", r: 4 }}
                  animationDuration={1400}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe2 className="size-4 text-primary" />
              Procedencia internacional
            </CardTitle>
            <CardDescription>Reservas por país del huésped titular</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2.5">
            {reservationsByCountry.map((c) => {
              const max = reservationsByCountry[0].value;
              const pct = (c.value / max) * 100;
              return (
                <div key={c.pais}>
                  <div className="flex items-center justify-between text-[12.5px] mb-1">
                    <span className="flex items-center gap-2">
                      <span className="text-base">{c.flag}</span>
                      <span>{c.pais}</span>
                    </span>
                    <span className="font-semibold tabular-nums">{c.value}</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-muted/40 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-500 transition-all duration-1000 ease-td"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>
      </section>

      {/* Age + quality + Top apartments */}
      <section className="grid grid-cols-1 xl:grid-cols-3 gap-6 animate-fade-up [animation-delay:220ms]">
        {/* Age breakdown */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="size-4 text-primary" />
              Edad de los huéspedes
            </CardTitle>
            <CardDescription>
              {totalAge} pax · niños 0-6 no consumen manilla
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <ResponsiveContainer width="100%" height={180}>
              <BarChart data={guestAgeBreakdown} layout="vertical" margin={{ left: 16 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                <XAxis type="number" tick={{ fontSize: 11, fill: "hsl(215 20% 65%)" }} axisLine={false} tickLine={false} />
                <YAxis
                  type="category"
                  dataKey="rango"
                  tick={{ fontSize: 11, fill: "hsl(215 20% 65%)" }}
                  axisLine={false}
                  tickLine={false}
                  width={40}
                />
                <Tooltip
                  contentStyle={{
                    background: "hsl(215 50% 9%)",
                    border: "1px solid hsl(215 30% 20%)",
                    borderRadius: 10,
                    fontSize: 12,
                  }}
                />
                <Bar dataKey="total" radius={[0, 6, 6, 0]} animationDuration={1200}>
                  {guestAgeBreakdown.map((g, i) => (
                    <Cell key={i} fill={g.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
            <div className="space-y-1.5 text-[12px]">
              {guestAgeBreakdown.map((g) => (
                <div key={g.rango} className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <span className="size-2.5 rounded-full" style={{ background: g.color }} />
                    {g.rango} años
                  </span>
                  <span className="flex items-center gap-2">
                    {!g.paganManilla && (
                      <Badge variant="secondary" className="rounded-md text-[10px]">sin manilla</Badge>
                    )}
                    <span className="font-semibold tabular-nums">{g.total}</span>
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Calidad */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="size-4 text-primary" />
              Calidad de huésped
            </CardTitle>
            <CardDescription>Familiar, residente, primera estancia</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Tooltip
                    contentStyle={{
                      background: "hsl(215 50% 9%)",
                      border: "1px solid hsl(215 30% 20%)",
                      borderRadius: 10,
                      fontSize: 12,
                    }}
                  />
                  <Pie
                    data={reservationCalidad}
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={3}
                    dataKey="value"
                    stroke="hsl(215 50% 9%)"
                    strokeWidth={2}
                    animationDuration={1200}
                  >
                    {reservationCalidad.map((_, i) => (
                      <Cell
                        key={i}
                        fill={
                          ["hsl(188 92% 60%)", "hsl(220 96% 65%)", "hsl(39 96% 60%)"][i]
                        }
                      />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
                <div className="text-[24px] font-bold tabular-nums">
                  {reservationCalidad.reduce((a, r) => a + r.value, 0)}
                </div>
                <div className="text-[10px] uppercase tracking-wider text-muted-foreground">total</div>
              </div>
            </div>
            <div className="mt-3 space-y-1.5 text-[12.5px]">
              {reservationCalidad.map((r, i) => (
                <div key={r.calidad} className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <span
                      className="size-2.5 rounded-full"
                      style={{
                        background: ["hsl(188 92% 60%)", "hsl(220 96% 65%)", "hsl(39 96% 60%)"][i],
                      }}
                    />
                    {r.calidad}
                  </span>
                  <span className="font-semibold tabular-nums">{r.value}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top apartments year */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="size-4 text-amber-400" />
              Top aptos del año
            </CardTitle>
            <CardDescription>Por noches reservadas e ingresos</CardDescription>
          </CardHeader>
          <CardContent>
            <ol className="space-y-2.5">
              {topApartmentsYear.slice(0, 6).map((a, i) => {
                const max = topApartmentsYear[0].noches;
                const pct = (a.noches / max) * 100;
                return (
                  <li key={a.apto}>
                    <div className="flex items-center justify-between text-[12.5px] mb-1">
                      <span className="flex items-center gap-2">
                        <span
                          className={cn(
                            "size-5 rounded grid place-items-center text-[10px] font-bold tabular-nums",
                            i === 0
                              ? "bg-amber-400 text-slate-900"
                              : "bg-muted/40 text-foreground"
                          )}
                        >
                          {i + 1}
                        </span>
                        <span className="font-semibold tabular-nums">Apto {a.apto}</span>
                      </span>
                      <span className="text-muted-foreground tabular-nums text-[11.5px]">
                        {a.noches} noches · {formatCOP(a.ingresos)}
                      </span>
                    </div>
                    <div className="h-1.5 rounded-full bg-muted/40 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-sky-500 transition-all duration-1000 ease-td"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </li>
                );
              })}
            </ol>
            <Button variant="ghost" size="sm" className="mt-3 w-full gap-1">
              <Download className="size-3.5" />
              Descargar reporte completo
            </Button>
          </CardContent>
        </Card>
      </section>

      {/* Footer note */}
      <div className="text-[11.5px] text-muted-foreground/70 text-center">
        Datos al cierre del periodo {range.toUpperCase()} · Reportes pueden exportarse a PDF y XLS
        para Migración Colombia, contabilidad y propietarios.
      </div>
    </div>
  );
}

function BigKpi({
  label,
  value,
  format,
  icon: Icon,
  tone,
}: {
  label: string;
  value: number;
  format: (n: number) => string;
  icon: typeof BarChart3;
  tone: "primary" | "success" | "warning";
}) {
  const palette = {
    primary: "text-cyan-300 ring-cyan-400/30 from-cyan-400/20",
    success: "text-emerald-300 ring-emerald-400/30 from-emerald-400/20",
    warning: "text-amber-300 ring-amber-400/30 from-amber-400/20",
  } as const;
  return (
    <Card>
      <CardContent className="p-5">
        <div className="flex items-start justify-between">
          <div className={cn("size-10 rounded-xl ring-1 bg-gradient-to-br to-transparent grid place-items-center", palette[tone])}>
            <Icon className="size-5" />
          </div>
        </div>
        <div className="mt-4 text-[12px] uppercase tracking-[0.18em] text-muted-foreground font-medium">
          {label}
        </div>
        <div className="mt-1 text-[26px] font-bold tracking-tight tabular-nums leading-none">
          <AnimatedNumber value={value} format={format} />
        </div>
      </CardContent>
    </Card>
  );
}

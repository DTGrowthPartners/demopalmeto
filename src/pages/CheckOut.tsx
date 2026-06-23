import { useMemo, useState } from "react";
import {
  CheckCircle2,
  ClipboardList,
  Clock,
  LogOut,
  Search,
  User,
  Watch,
  Sparkles,
  Bed,
  ArrowRight,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { activeStays } from "@/data/mock";
import { cn, formatCOP } from "@/lib/utils";

type Filter = "todos" | "hoy" | "manana" | "vencidos";

export function CheckOutPage() {
  const [selected, setSelected] = useState<string>(activeStays[0].folio);
  const [filter, setFilter] = useState<Filter>("todos");
  const [search, setSearch] = useState("");
  const [confirming, setConfirming] = useState(false);
  const [confirmed, setConfirmed] = useState<string | null>(null);

  const filtered = useMemo(() => {
    return activeStays.filter((s) => {
      const txt = `${s.folio} ${s.apartment} ${s.guestName}`.toLowerCase();
      if (search && !txt.includes(search.toLowerCase())) return false;
      if (filter === "hoy" && !s.scheduledOut.startsWith("Hoy")) return false;
      if (filter === "manana" && !s.scheduledOut.startsWith("Mañana")) return false;
      if (filter === "vencidos") return s.scheduledOut.startsWith("Hoy");
      return true;
    });
  }, [filter, search]);

  const active = activeStays.find((s) => s.folio === selected) ?? activeStays[0];

  const todayCount = activeStays.filter((s) => s.scheduledOut.startsWith("Hoy")).length;
  const tomorrowCount = activeStays.filter((s) => s.scheduledOut.startsWith("Mañana")).length;
  const totalRevenue = activeStays.reduce((acc, s) => acc + s.total, 0);

  const submit = () => {
    setConfirming(true);
    setTimeout(() => {
      setConfirming(false);
      setConfirmed(active.folio);
    }, 1100);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4 animate-fade-up">
        <div>
          <Badge className="mb-2">Recepción · Lobby</Badge>
          <h1 className="text-[28px] font-bold tracking-tight">Check-out de huéspedes</h1>
          <p className="text-[13.5px] text-muted-foreground mt-1">
            Registros activos en el edificio · selecciona el folio para procesar salida.
          </p>
        </div>
        <div className="grid grid-cols-3 gap-3">
          <Stat label="Salidas hoy" value={todayCount} tone="warning" />
          <Stat label="Mañana" value={tomorrowCount} tone="primary" />
          <Stat label="Activas" value={activeStays.length} tone="success" />
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Active stays list */}
        <div className="xl:col-span-2 space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <ClipboardList className="size-4 text-primary" />
                  Registros activos
                </CardTitle>
                <CardDescription>
                  {filtered.length} de {activeStays.length} estancias visibles · ingresos totales {formatCOP(totalRevenue)}
                </CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-2 rounded-lg border border-border/60 bg-card/40 px-3 py-1.5">
                  <Search className="size-3.5 text-muted-foreground" />
                  <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Folio, apto o nombre…"
                    className="bg-transparent text-[12.5px] outline-none w-44"
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 mb-4">
                {([
                  ["todos", "Todos"],
                  ["hoy", "Salida hoy"],
                  ["manana", "Mañana"],
                ] as [Filter, string][]).map(([id, label]) => (
                  <button
                    key={id}
                    onClick={() => setFilter(id)}
                    className={cn(
                      "text-[12px] rounded-full border px-3 py-1 transition-colors",
                      filter === id
                        ? "border-primary/60 bg-primary/15 text-primary"
                        : "border-border/60 bg-card/40 hover:bg-card/80 text-muted-foreground"
                    )}
                  >
                    {label}
                  </button>
                ))}
              </div>

              <div className="space-y-2">
                {filtered.map((s) => {
                  const isSelected = s.folio === selected;
                  const isToday = s.scheduledOut.startsWith("Hoy");
                  return (
                    <button
                      key={s.folio}
                      onClick={() => setSelected(s.folio)}
                      className={cn(
                        "w-full text-left rounded-xl border p-4 transition-all duration-300 ease-td",
                        isSelected
                          ? "border-primary/60 bg-primary/10 shadow-glow"
                          : "border-border/60 bg-card/30 hover:border-border hover:bg-card/60"
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <div className="size-11 rounded-lg bg-muted/40 grid place-items-center font-bold text-[15px] tabular-nums">
                          {s.apartment}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="font-semibold tracking-tight">{s.guestName}</span>
                            <Badge variant={isToday ? "warning" : "secondary"} className="rounded-md text-[10px]">
                              {s.scheduledOut}
                            </Badge>
                            {confirmed === s.folio && (
                              <Badge variant="success" className="rounded-md text-[10px]">
                                Salida procesada
                              </Badge>
                            )}
                          </div>
                          <div className="mt-0.5 text-[12px] text-muted-foreground flex items-center gap-3 flex-wrap">
                            <span className="font-mono">{s.folio}</span>
                            <span className="flex items-center gap-1">
                              <User className="size-3" /> {s.pax} pax
                            </span>
                            <span className="flex items-center gap-1">
                              <Bed className="size-3" /> {s.nights} noches
                            </span>
                            <span className="flex items-center gap-1">
                              <Watch className="size-3" /> Manillas {s.manilla}
                            </span>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-[13px] font-semibold tabular-nums">
                            {formatCOP(s.total)}
                          </div>
                          <div className="text-[11px] text-muted-foreground">{s.operator}</div>
                        </div>
                        <ArrowRight
                          className={cn(
                            "size-4 shrink-0 transition-all duration-300",
                            isSelected ? "text-primary translate-x-0.5" : "text-muted-foreground/50"
                          )}
                        />
                      </div>
                    </button>
                  );
                })}

                {filtered.length === 0 && (
                  <div className="text-center text-[13px] text-muted-foreground py-12">
                    No hay estancias con esos filtros.
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Detail panel */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <LogOut className="size-4 text-primary" />
                Procesar check-out
              </CardTitle>
              <CardDescription>
                Folio {active.folio} · Apto {active.apartment}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="rounded-xl border border-border/60 bg-card/30 p-4">
                <div className="text-[11.5px] uppercase tracking-[0.15em] text-muted-foreground">
                  Huésped titular
                </div>
                <div className="mt-1 text-[15px] font-semibold">{active.guestName}</div>
                <div className="text-[11.5px] text-muted-foreground">Ingresó {active.checkIn}</div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-[12.5px]">
                <Tile icon={Bed} label="Noches" value={String(active.nights)} />
                <Tile icon={User} label="Pax" value={String(active.pax)} />
                <Tile icon={Watch} label="Manillas" value={active.manilla} />
                <Tile icon={Clock} label="Salida prog." value={active.scheduledOut} />
              </div>

              <Separator />

              <ul className="space-y-2 text-[13px]">
                <Check label="Manillas devueltas (todas)" defaultChecked />
                <Check label="Apto inspeccionado por housekeeping" defaultChecked />
                <Check label="Sin paquetes pendientes en lobby" defaultChecked />
                <Check label="Vehículo retirado del parqueadero" />
                <Check label="Pagos al día (sin saldo)" defaultChecked />
              </ul>

              <Separator />

              <div className="rounded-xl border border-primary/30 bg-gradient-to-br from-primary/10 to-transparent p-3 flex items-center justify-between">
                <div>
                  <div className="text-[10.5px] uppercase tracking-[0.18em] text-muted-foreground">
                    Total estancia
                  </div>
                  <div className="text-[20px] font-bold tabular-nums">{formatCOP(active.total)}</div>
                </div>
                <Badge variant="success">Saldo $0</Badge>
              </div>

              {confirmed === active.folio ? (
                <div className="rounded-xl border border-emerald-400/30 bg-emerald-400/10 p-3 flex items-center gap-2 animate-fade-up">
                  <CheckCircle2 className="size-5 text-emerald-300 shrink-0" />
                  <div className="text-[12.5px]">
                    <div className="font-semibold text-emerald-200">Check-out registrado</div>
                    <div className="text-muted-foreground">
                      Folio cerrado · manillas retornadas · apto disponible para limpieza.
                    </div>
                  </div>
                </div>
              ) : (
                <Button className="w-full" onClick={submit} disabled={confirming}>
                  {confirming ? (
                    <>
                      <span className="size-2 rounded-full bg-current animate-pulse" />
                      Procesando salida…
                    </>
                  ) : (
                    <>
                      <LogOut className="size-4" />
                      Confirmar check-out
                    </>
                  )}
                </Button>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2 text-[12.5px] font-semibold mb-2">
                <Sparkles className="size-4 text-primary" />
                Sugerencia del asistente
              </div>
              <p className="text-[12.5px] text-muted-foreground leading-snug">
                Esta semana se proyectan <strong className="text-foreground">38 check-outs</strong>.
                Tienes 3 plazas de parqueadero que se liberan tras esta salida; el Apto 1502 las usa el viernes.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

function Stat({ label, value, tone }: { label: string; value: number; tone: "primary" | "success" | "warning" }) {
  const palette: Record<typeof tone, string> = {
    primary: "from-cyan-400/30 via-cyan-500/10 ring-cyan-400/30 text-cyan-200",
    success: "from-emerald-400/30 via-emerald-500/10 ring-emerald-400/30 text-emerald-200",
    warning: "from-amber-400/30 via-amber-500/10 ring-amber-400/30 text-amber-200",
  } as any;
  return (
    <div className={cn(
      "rounded-xl border border-border/60 bg-gradient-to-br to-transparent ring-1 px-4 py-3",
      palette[tone],
    )}>
      <div className="text-[11px] uppercase tracking-[0.15em] text-muted-foreground">{label}</div>
      <div className="text-[22px] font-bold tabular-nums">{value}</div>
    </div>
  );
}

function Tile({ icon: Icon, label, value }: { icon: typeof Clock; label: string; value: string }) {
  return (
    <div className="rounded-lg bg-muted/20 px-3 py-2 flex items-center gap-2">
      <Icon className="size-4 text-primary" />
      <div>
        <div className="text-[10.5px] uppercase tracking-wider text-muted-foreground">{label}</div>
        <div className="font-semibold tabular-nums">{value}</div>
      </div>
    </div>
  );
}

function Check({ label, defaultChecked = false }: { label: string; defaultChecked?: boolean }) {
  return (
    <li className="flex items-center gap-2.5">
      <input
        type="checkbox"
        defaultChecked={defaultChecked}
        className="size-4 rounded border-border/60 bg-background/40 text-primary focus:ring-primary/40 focus:ring-offset-0"
      />
      <span className="text-foreground/85">{label}</span>
    </li>
  );
}

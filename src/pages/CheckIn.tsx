import { useEffect, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  BedDouble,
  Building,
  Car,
  CheckCircle2,
  ClipboardCheck,
  Eye,
  IdCard,
  LogIn as LogInIcon,
  MapPin,
  Plus,
  Sparkles,
  User,
  Watch,
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
import { Separator } from "@/components/ui/separator";
import {
  apartmentsList,
  mediosReserva,
  motivosViaje,
  procedencias,
} from "@/data/mock";
import { cn, formatCOP } from "@/lib/utils";

type StepId = 1 | 2 | 3 | 4 | 5;

const stepLabels = [
  { id: 1 as StepId, label: "Apartamento", icon: Building },
  { id: 2 as StepId, label: "Huéspedes", icon: User },
  { id: 3 as StepId, label: "Vehículo", icon: Car },
  { id: 4 as StepId, label: "Estancia", icon: BedDouble },
  { id: 5 as StepId, label: "Confirmar", icon: ClipboardCheck },
];

export function CheckInPage() {
  const [step, setStep] = useState<StepId>(1);
  const [aptId, setAptId] = useState<string>("3801");
  const [guestCount, setGuestCount] = useState<number>(2);
  const [adicional, setAdicional] = useState<number>(0);
  const [vehiculo, setVehiculo] = useState<boolean>(true);
  const [placa, setPlaca] = useState<string>("FQR-872");
  const [noches, setNoches] = useState<number>(5);
  const [medio, setMedio] = useState<string>("directo");
  const [procedencia, setProcedencia] = useState<string>(procedencias[0]);
  const [motivo, setMotivo] = useState<string>(motivosViaje[0]);
  const [confirmando, setConfirmando] = useState(false);
  const [confirmado, setConfirmado] = useState(false);

  const apto = apartmentsList.find((a) => a.id === aptId) ?? apartmentsList[0];
  const valorNoche = 850_000;
  const valorAdicional = 120_000;
  const total = noches * (valorNoche + adicional * valorAdicional);

  // Reset confirmed flag on step backward
  useEffect(() => {
    if (step !== 5) setConfirmado(false);
  }, [step]);

  const next = () => setStep((s) => (Math.min(5, s + 1) as StepId));
  const prev = () => setStep((s) => (Math.max(1, s - 1) as StepId));

  const submit = () => {
    setConfirmando(true);
    setTimeout(() => {
      setConfirmando(false);
      setConfirmado(true);
    }, 1100);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4 animate-fade-up">
        <div>
          <Badge className="mb-2">Recepción · Lobby</Badge>
          <h1 className="text-[28px] font-bold tracking-tight">Nuevo check-in</h1>
          <p className="text-[13.5px] text-muted-foreground mt-1">
            Flujo guiado en 5 pasos · Folio se genera al confirmar.
          </p>
        </div>
        <div className="flex items-center gap-2 rounded-xl border border-border/60 bg-card/40 px-3 py-2 text-[12px]">
          <Sparkles className="size-3.5 text-primary" />
          La asistente Marta puede sugerir un apto disponible — pídeselo desde la barra superior.
        </div>
      </div>

      {/* Stepper */}
      <Card>
        <CardContent className="p-5">
          <ol className="grid grid-cols-5 gap-2">
            {stepLabels.map((s, idx) => {
              const isActive = s.id === step;
              const isDone = s.id < step || confirmado;
              const Icon = s.icon;
              return (
                <li
                  key={s.id}
                  className="flex flex-col items-stretch"
                >
                  <button
                    onClick={() => setStep(s.id)}
                    className={cn(
                      "w-full group rounded-xl border px-3 py-3 text-left transition-all duration-300 ease-td",
                      isActive
                        ? "border-primary/50 bg-primary/10"
                        : isDone
                        ? "border-emerald-400/30 bg-emerald-400/5"
                        : "border-border/60 bg-card/40 hover:border-border"
                    )}
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className={cn(
                          "size-7 rounded-md grid place-items-center text-[11px] font-semibold",
                          isActive
                            ? "bg-primary text-primary-foreground"
                            : isDone
                            ? "bg-emerald-400 text-slate-900"
                            : "bg-muted/40 text-muted-foreground"
                        )}
                      >
                        {isDone ? <CheckCircle2 className="size-3.5" /> : idx + 1}
                      </div>
                      <Icon className="size-4 text-muted-foreground" />
                    </div>
                    <div className="mt-2 text-[12.5px] font-semibold leading-tight">
                      {s.label}
                    </div>
                  </button>
                </li>
              );
            })}
          </ol>
        </CardContent>
      </Card>

      {/* Wizard pages — transitions.dev "Page side-by-side" (snippet 08) */}
      <div
        className="t-page-slide relative"
        data-page={String(step)}
        style={{ minHeight: 460 }}
      >
        {/* PAGE 1 — Apartment selection */}
        <section className="t-page" data-page-id="1">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building className="size-4 text-primary" />
                Selecciona el apartamento
              </CardTitle>
              <CardDescription>
                Lista de aptos disponibles · capacidad y máximo de adicionales.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {apartmentsList.map((a) => {
                  const selected = a.id === aptId;
                  return (
                    <button
                      key={a.id}
                      onClick={() => setAptId(a.id)}
                      className={cn(
                        "text-left rounded-xl border p-4 transition-all duration-300 ease-td",
                        selected
                          ? "border-primary/60 bg-primary/10 shadow-glow"
                          : "border-border/60 bg-card/30 hover:border-border hover:bg-card/60"
                      )}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[20px] font-bold tracking-tight tabular-nums">
                          {a.id}
                        </span>
                        <Badge variant={selected ? "default" : "secondary"}>
                          Piso {a.piso}
                        </Badge>
                      </div>
                      <div className="mt-1 text-[12px] text-muted-foreground flex items-center gap-1">
                        <Eye className="size-3" /> Vista {a.vista}
                      </div>
                      <Separator className="my-3" />
                      <dl className="space-y-1 text-[12px]">
                        <Row label="Capacidad" value={`${a.capacidad} personas`} />
                        <Row label="Adicionales máx." value={String(a.adicionales)} />
                        <Row label="Alcobas" value={String(a.alcobas)} />
                        <Row label="Parqueaderos" value={String(a.parqueaderos)} />
                      </dl>
                      <div className="mt-3 text-[11px] text-muted-foreground/80 truncate">
                        {a.operador} · {a.rnt}
                      </div>
                    </button>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </section>

        {/* PAGE 2 — Guests */}
        <section className="t-page" data-page-id="2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="size-4 text-primary" />
                Huéspedes y ocupación
              </CardTitle>
              <CardDescription>
                Apto {apto.id} · capacidad {apto.capacidad} · máximo de adicionales{" "}
                {apto.adicionales}.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              <Counter
                label="Número de huéspedes (titulares)"
                value={guestCount}
                onChange={setGuestCount}
                max={apto.capacidad}
                min={1}
              />
              <Counter
                label="Adicionales"
                value={adicional}
                onChange={setAdicional}
                max={apto.adicionales}
                min={0}
              />
              <Separator />
              <div className="space-y-3">
                <h4 className="text-[13px] font-semibold">Huésped titular</h4>
                <div className="grid grid-cols-2 gap-3">
                  <Field icon={IdCard} placeholder="Cédula / pasaporte" defaultValue="1.045.302.118" />
                  <Field placeholder="Tipo doc" defaultValue="CC" />
                  <Field placeholder="Nombres" defaultValue="Laura" />
                  <Field placeholder="Apellidos" defaultValue="Pérez Castaño" />
                  <Field placeholder="Teléfono" defaultValue="+57 318 432 0091" />
                  <Field placeholder="Email" defaultValue="laura.perez@gmail.com" />
                  <Field icon={MapPin} placeholder="Procedencia" defaultValue={procedencia} />
                  <Field placeholder="RH / Sangre" defaultValue="O+" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[12.5px] font-medium">Procedencia</label>
                <div className="flex flex-wrap gap-2">
                  {procedencias.slice(0, 8).map((p) => {
                    const sel = p === procedencia;
                    return (
                      <button
                        key={p}
                        onClick={() => setProcedencia(p)}
                        className={cn(
                          "text-[12px] rounded-full border px-3 py-1 transition-colors",
                          sel
                            ? "border-primary/60 bg-primary/15 text-primary"
                            : "border-border/60 bg-card/40 hover:bg-card/80"
                        )}
                      >
                        {p}
                      </button>
                    );
                  })}
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* PAGE 3 — Vehicle */}
        <section className="t-page" data-page-id="3">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Car className="size-4 text-primary" />
                Vehículo y parqueadero
              </CardTitle>
              <CardDescription>
                Si el huésped trae carro, registramos placa y estado al ingreso.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="flex gap-3">
                <Toggle on={!vehiculo} onClick={() => setVehiculo(false)} label="Sin vehículo" />
                <Toggle on={vehiculo} onClick={() => setVehiculo(true)} label="Con vehículo" />
              </div>
              {vehiculo && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 animate-fade-up">
                  <Field placeholder="Placa" value={placa} onChange={(e) => setPlaca(e.target.value.toUpperCase())} />
                  <Field placeholder="Modelo y color" defaultValue="Mazda CX-5 · Plata" />
                  <Field placeholder="Plaza asignada" defaultValue={`P${apto.piso}-${Math.floor(Math.random()*5+1).toString().padStart(2,'0')}`} />
                  <Field placeholder="Conductor" defaultValue="Titular" />
                  <div className="md:col-span-2">
                    <label className="text-[12.5px] font-medium">Observaciones del estado del vehículo</label>
                    <textarea
                      className="mt-1 w-full rounded-lg border border-border/60 bg-background/40 px-3 py-2 text-[13px] min-h-[78px] outline-none focus:border-primary/60"
                      placeholder="Ej: golpe leve en defensa trasera, raspón puerta izquierda, llantas nuevas…"
                      defaultValue="Sin daños visibles al ingreso. Lateral derecho con rayón superficial."
                    />
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </section>

        {/* PAGE 4 — Estancia */}
        <section className="t-page" data-page-id="4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BedDouble className="size-4 text-primary" />
                Estancia, manillas y tarjeta de registro
              </CardTitle>
              <CardDescription>
                Las manillas se asignan automáticamente del lote activo.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <Field placeholder="Fecha ingreso" defaultValue="22 / 06 / 2026" />
                <Field placeholder="Hora ingreso" defaultValue="14:30" />
                <Field placeholder="Fecha salida" defaultValue="27 / 06 / 2026" />
              </div>
              <Counter
                label="Noches"
                value={noches}
                onChange={setNoches}
                min={1}
                max={60}
              />

              <Separator />

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <label className="text-[12.5px] font-medium">Medio de reserva</label>
                  <div className="flex flex-wrap gap-2">
                    {mediosReserva.map((m) => {
                      const sel = m.id === medio;
                      return (
                        <button
                          key={m.id}
                          onClick={() => setMedio(m.id)}
                          className={cn(
                            "text-[12px] rounded-full border px-3 py-1 transition-colors",
                            sel
                              ? "border-primary/60 bg-primary/15 text-primary"
                              : "border-border/60 bg-card/40 hover:bg-card/80"
                          )}
                        >
                          {m.label}
                        </button>
                      );
                    })}
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[12.5px] font-medium">Motivo del viaje</label>
                  <div className="flex flex-wrap gap-2">
                    {motivosViaje.map((m) => {
                      const sel = m === motivo;
                      return (
                        <button
                          key={m}
                          onClick={() => setMotivo(m)}
                          className={cn(
                            "text-[12px] rounded-full border px-3 py-1 transition-colors",
                            sel
                              ? "border-amber-400/60 bg-amber-400/15 text-amber-200"
                              : "border-border/60 bg-card/40 hover:bg-card/80"
                          )}
                        >
                          {m}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              <Separator />

              <div className="rounded-xl border border-border/60 bg-card/30 p-4">
                <div className="flex items-center gap-2 text-[12.5px] font-semibold">
                  <Watch className="size-4 text-primary" />
                  Asignación automática de manillas
                </div>
                <div className="mt-2 grid grid-cols-3 gap-2 text-[12px]">
                  <Pill label="Lote activo" value="2026-D" />
                  <Pill label="Rango asignado" value={`${3784 + 1}–${3784 + guestCount + adicional}`} />
                  <Pill label="Tarjeta de registro" value="TR-15894" />
                </div>
                <p className="mt-3 text-[11.5px] text-muted-foreground">
                  Niños de 0-6 años no consumen manilla. Aplica este check-in: {Math.min(2, adicional)} manillas en infantes.
                </p>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* PAGE 5 — Confirm */}
        <section className="t-page" data-page-id="5">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ClipboardCheck className="size-4 text-primary" />
                Resumen y confirmación
              </CardTitle>
              <CardDescription>
                Verifica antes de firmar y generar la tarjeta de registro.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <SummaryCard title="Apartamento" rows={[
                  ["Número", apto.id],
                  ["Piso · Vista", `${apto.piso} · ${apto.vista}`],
                  ["Operador", apto.operador],
                  ["RNT", apto.rnt],
                ]} />
                <SummaryCard title="Huésped titular" rows={[
                  ["Nombre", "Laura Pérez Castaño"],
                  ["Documento", "CC 1.045.302.118"],
                  ["Procedencia", procedencia],
                  ["Motivo", motivo],
                ]} />
                <SummaryCard title="Estancia" rows={[
                  ["Ingreso", "22 Jun 2026 · 14:30"],
                  ["Salida", "27 Jun 2026 · 11:00"],
                  ["Noches", String(noches)],
                  ["Huéspedes", `${guestCount} + ${adicional} adic.`],
                ]} />
                <SummaryCard title="Vehículo" rows={vehiculo ? [
                  ["Placa", placa],
                  ["Plaza", `P${apto.piso}-01`],
                  ["Modelo", "Mazda CX-5 · Plata"],
                  ["Estado", "Sin daños mayores"],
                ] : [["Vehículo", "Sin vehículo declarado"]]} />
              </div>

              <div className="rounded-xl border border-primary/30 bg-gradient-to-br from-primary/10 to-transparent p-4 flex items-center justify-between">
                <div>
                  <div className="text-[11.5px] uppercase tracking-[0.18em] text-muted-foreground">
                    Total estimado de la estancia
                  </div>
                  <div className="mt-1 text-[28px] font-bold tracking-tight tabular-nums">
                    {formatCOP(total)}
                  </div>
                  <div className="text-[11.5px] text-muted-foreground">
                    {formatCOP(valorNoche)} / noche · {adicional} adicional × {formatCOP(valorAdicional)}
                  </div>
                </div>
                <div className="text-right">
                  <Badge variant="success" className="mb-1">Listo para confirmar</Badge>
                  <div className="text-[11.5px] text-muted-foreground">Folio · F-2026-04830</div>
                </div>
              </div>

              {confirmado ? (
                <div className="rounded-xl border border-emerald-400/30 bg-emerald-400/10 p-4 flex items-center gap-3 animate-fade-up">
                  <CheckCircle2 className="size-6 text-emerald-300" />
                  <div>
                    <div className="font-semibold text-emerald-200">
                      Check-in confirmado · F-2026-04830
                    </div>
                    <div className="text-[12.5px] text-muted-foreground">
                      Tarjeta enviada a impresora. Manillas {3784 + 1}–{3784 + guestCount + adicional} entregadas. Bienvenida enviada al WhatsApp del huésped.
                    </div>
                  </div>
                </div>
              ) : null}
            </CardContent>
          </Card>
        </section>
      </div>

      {/* Footer nav */}
      <div className="flex items-center justify-between mt-2">
        <Button variant="outline" onClick={prev} disabled={step === 1}>
          <ArrowLeft className="size-4" />
          Anterior
        </Button>

        <div className="flex items-center gap-1">
          {[1, 2, 3, 4, 5].map((s) => (
            <span
              key={s}
              className={cn(
                "size-1.5 rounded-full transition-all duration-300 ease-td",
                step === s
                  ? "w-5 bg-primary"
                  : s < step
                  ? "bg-emerald-400"
                  : "bg-muted/40"
              )}
            />
          ))}
        </div>

        {step < 5 ? (
          <Button onClick={next}>
            Siguiente
            <ArrowRight className="size-4" />
          </Button>
        ) : (
          <Button onClick={submit} disabled={confirmando || confirmado} className="min-w-[180px]">
            {confirmando ? (
              <>
                <span className="size-2 rounded-full bg-current animate-pulse" />
                Confirmando…
              </>
            ) : confirmado ? (
              <>
                <CheckCircle2 className="size-4" />
                Hecho
              </>
            ) : (
              <>
                <LogInIcon className="size-4" />
                Confirmar check-in
              </>
            )}
          </Button>
        )}
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between">
      <dt className="text-muted-foreground">{label}</dt>
      <dd className="font-medium tabular-nums">{value}</dd>
    </div>
  );
}

function Counter({
  label,
  value,
  onChange,
  min,
  max,
}: {
  label: string;
  value: number;
  onChange: (n: number) => void;
  min: number;
  max: number;
}) {
  return (
    <div>
      <label className="text-[12.5px] font-medium">{label}</label>
      <div className="mt-1 flex items-center gap-2">
        <button
          onClick={() => onChange(Math.max(min, value - 1))}
          className="size-9 rounded-lg border border-border/60 bg-card/40 hover:bg-muted/40 grid place-items-center transition-colors"
        >
          −
        </button>
        <div className="flex-1 h-9 rounded-lg border border-border/60 bg-background/40 grid place-items-center text-[15px] font-semibold tabular-nums">
          {value}
        </div>
        <button
          onClick={() => onChange(Math.min(max, value + 1))}
          className="size-9 rounded-lg border border-border/60 bg-card/40 hover:bg-muted/40 grid place-items-center transition-colors"
        >
          <Plus className="size-4" />
        </button>
        <span className="text-[11.5px] text-muted-foreground ml-2">máx. {max}</span>
      </div>
    </div>
  );
}

function Field({
  icon: Icon,
  placeholder,
  defaultValue,
  value,
  onChange,
}: {
  icon?: typeof IdCard;
  placeholder: string;
  defaultValue?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div className="flex items-center gap-2 rounded-lg border border-border/60 bg-background/40 px-3 py-2 focus-within:border-primary/60 transition-colors">
      {Icon ? <Icon className="size-4 text-muted-foreground" /> : null}
      <input
        placeholder={placeholder}
        defaultValue={defaultValue}
        value={value}
        onChange={onChange}
        className="flex-1 bg-transparent text-[13px] outline-none placeholder:text-muted-foreground/60"
      />
    </div>
  );
}

function Toggle({ on, onClick, label }: { on: boolean; onClick: () => void; label: string }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "rounded-xl border px-4 py-3 text-[13px] font-semibold flex-1 transition-all duration-300 ease-td",
        on
          ? "border-primary/60 bg-primary/15 text-primary"
          : "border-border/60 bg-card/40 hover:bg-card/80 text-muted-foreground"
      )}
    >
      {label}
    </button>
  );
}

function Pill({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg bg-muted/30 px-3 py-2">
      <div className="text-[10.5px] uppercase tracking-wider text-muted-foreground">{label}</div>
      <div className="mt-0.5 font-mono text-[12.5px] tabular-nums">{value}</div>
    </div>
  );
}

function SummaryCard({
  title,
  rows,
}: {
  title: string;
  rows: [string, string][];
}) {
  return (
    <div className="rounded-xl border border-border/60 bg-card/30 p-4">
      <div className="text-[11.5px] uppercase tracking-[0.15em] text-muted-foreground mb-2">
        {title}
      </div>
      <dl className="space-y-1.5 text-[13px]">
        {rows.map(([k, v]) => (
          <div key={k} className="flex justify-between gap-3">
            <dt className="text-muted-foreground">{k}</dt>
            <dd className="font-medium tabular-nums text-right">{v}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

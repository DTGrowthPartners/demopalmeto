import { useRef } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { parking } from "@/data/mock";
import { Car, AlertTriangle, UserCheck } from "lucide-react";
import { cn } from "@/lib/utils";

const stateClasses: Record<string, string> = {
  libre: "bg-muted/30 border-border/50 text-muted-foreground",
  ocupado: "bg-cyan-500/15 border-cyan-400/40 text-cyan-200 hover:border-cyan-300",
  visitante: "bg-amber-500/15 border-amber-400/40 text-amber-200 hover:border-amber-300",
  alerta: "bg-rose-500/20 border-rose-400/50 text-rose-200 hover:border-rose-300 animate-pulse",
};

const stateLabel: Record<string, string> = {
  libre: "Libre",
  ocupado: "Asignado",
  visitante: "Visitante",
  alerta: "Alerta",
};

export function ParkingGrid() {
  const totals = parking.reduce(
    (acc, s) => {
      acc[s.state] += 1;
      return acc;
    },
    { libre: 0, ocupado: 0, visitante: 0, alerta: 0 } as Record<string, number>
  );

  const occupied = totals.ocupado + totals.visitante + totals.alerta;
  const pct = Math.round((occupied / parking.length) * 100);

  return (
    <Card>
      <CardHeader className="flex flex-row items-start justify-between space-y-0">
        <div>
          <CardTitle className="flex items-center gap-2">
            <Car className="size-4 text-primary" />
            Tablero de parqueadero
          </CardTitle>
          <CardDescription>
            {occupied}/{parking.length} plazas ocupadas · {pct}% del total
          </CardDescription>
        </div>
        <div className="flex flex-wrap items-center gap-2 text-[11px]">
          <Legend color="bg-muted/40 border-border/50" label={`Libre · ${totals.libre}`} />
          <Legend color="bg-cyan-500/30 border-cyan-400/50" label={`Ocupado · ${totals.ocupado}`} />
          <Legend color="bg-amber-500/30 border-amber-400/50" label={`Visitante · ${totals.visitante}`} />
          <Legend color="bg-rose-500/40 border-rose-400/60" label={`Alerta · ${totals.alerta}`} />
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="1" className="w-full">
          <TabsList>
            <TabsTrigger value="1">Sótano 1</TabsTrigger>
            <TabsTrigger value="2">Sótano 2</TabsTrigger>
            <TabsTrigger value="3">Sótano 3</TabsTrigger>
          </TabsList>
          {[1, 2, 3].map((level) => (
            <TabsContent key={level} value={String(level)}>
              <ParkingLevel level={level} />
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  );
}

function ParkingLevel({ level }: { level: number }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const slots = parking.filter((s) => s.level === level);

  // transitions.dev — Avatar group hover (snippet 11):
  // distance-falloff lift with direction-aware easing. We set
  // transition-timing-function inline BEFORE writing --shift /
  // --scale-active so each direction picks up its own curve.
  const setShifts = (activeIdx: number | null, phase: "in" | "out") => {
    if (!rootRef.current) return;
    const cs = getComputedStyle(document.documentElement);
    const num = (name: string, fb: number) => {
      const v = parseFloat(cs.getPropertyValue(name));
      return Number.isFinite(v) ? v : fb;
    };
    const ease = (name: string, fb: string) =>
      cs.getPropertyValue(name).trim() || fb;

    const lift = num("--avatar-lift", -6);
    const falloff = num("--avatar-falloff", 0.45);
    const scale = num("--avatar-scale", 1.06);
    const tf =
      phase === "out"
        ? ease("--avatar-ease-out", "cubic-bezier(0.34, 3.85, 0.64, 1)")
        : ease("--avatar-ease-in", "cubic-bezier(0.22, 1, 0.36, 1)");

    const items = rootRef.current.querySelectorAll<HTMLDivElement>(".t-avatar");
    items.forEach((el, i) => {
      el.style.transitionTimingFunction = tf;
      if (activeIdx == null) {
        el.style.setProperty("--shift", "0px");
        el.style.setProperty("--scale-active", "1");
        return;
      }
      // 2D falloff so neighbours both horizontal and vertical bob slightly.
      const cols = 10;
      const ax = activeIdx % cols;
      const ay = Math.floor(activeIdx / cols);
      const ix = i % cols;
      const iy = Math.floor(i / cols);
      const d = Math.max(Math.abs(ix - ax), Math.abs(iy - ay));
      el.style.setProperty("--shift", (lift * Math.pow(falloff, d)).toFixed(3) + "px");
      el.style.setProperty("--scale-active", i === activeIdx ? String(scale) : "1");
    });
  };

  return (
    <div
      ref={rootRef}
      onMouseLeave={() => setShifts(null, "out")}
      className="mt-3 grid grid-cols-10 gap-2"
    >
      {slots.map((slot, i) => (
        <div
          key={slot.id}
          className="t-avatar relative"
          onMouseEnter={() => setShifts(i, "in")}
        >
          <button
            className={cn(
              "w-full aspect-square rounded-lg border text-[10px] font-semibold uppercase tracking-wider grid place-items-center transition-colors",
              stateClasses[slot.state]
            )}
            title={`${slot.number} · ${stateLabel[slot.state]}${
              slot.apartment ? ` · Apto ${slot.apartment}` : ""
            }${slot.plate ? ` · ${slot.plate}` : ""}`}
          >
            {slot.state === "alerta" ? (
              <AlertTriangle className="size-4" />
            ) : slot.state === "visitante" ? (
              <UserCheck className="size-3.5" />
            ) : (
              slot.number.split("-")[1]
            )}
          </button>
        </div>
      ))}
    </div>
  );
}

function Legend({ color, label }: { color: string; label: string }) {
  return (
    <span className="flex items-center gap-1.5 text-muted-foreground">
      <span className={cn("size-2.5 rounded border", color)} />
      {label}
    </span>
  );
}

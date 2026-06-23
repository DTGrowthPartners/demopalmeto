import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Building2 } from "lucide-react";
import { buildingFloors } from "@/data/mock";
import { cn } from "@/lib/utils";

export function BuildingMap() {
  const totalOcc = buildingFloors.reduce(
    (acc, f) =>
      acc +
      [f.line01, f.line02, f.line03, f.line04, f.line05].filter(
        (l) => l === "ocupado"
      ).length,
    0
  );
  const totalUnits = buildingFloors.length * 5;
  const occPct = Math.round((totalOcc / totalUnits) * 100);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Building2 className="size-4 text-primary" />
          Mapa del edificio
        </CardTitle>
        <CardDescription>
          {totalOcc} / {totalUnits} aptos ocupados · {occPct}%
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center gap-1">
          <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground mb-1">
            Piso · Líneas 01-05
          </div>
          <div className="flex flex-col gap-[3px] w-full max-w-[260px]">
            {buildingFloors.map((f) => (
              <div key={f.floor} className="flex items-center gap-2">
                <span className="w-7 text-right text-[10px] tabular-nums text-muted-foreground">
                  {f.floor}
                </span>
                <div className="flex-1 flex gap-[3px]">
                  {[f.line01, f.line02, f.line03, f.line04, f.line05].map(
                    (state, idx) => (
                      <div
                        key={idx}
                        title={`Piso ${f.floor} · Línea 0${idx + 1} · ${state}`}
                        className={cn(
                          "h-2.5 flex-1 rounded-sm transition-colors hover:brightness-125",
                          state === "ocupado"
                            ? "bg-gradient-to-r from-cyan-400 to-sky-500"
                            : "bg-muted/40"
                        )}
                      />
                    )
                  )}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-3 flex items-center gap-3 text-[11px] text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <span className="size-2 rounded-sm bg-gradient-to-r from-cyan-400 to-sky-500" />
              Ocupado
            </span>
            <span className="flex items-center gap-1.5">
              <span className="size-2 rounded-sm bg-muted/40" />
              Libre
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

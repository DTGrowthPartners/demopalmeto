import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Watch } from "lucide-react";
import { manillasLotes } from "@/data/mock";
import { formatNumber } from "@/lib/utils";

export function ManillasInventory() {
  const total = manillasLotes.reduce(
    (acc, l) => ({
      usadas: acc.usadas + l.usadas,
      disponibles: acc.disponibles + l.disponibles,
    }),
    { usadas: 0, disponibles: 0 }
  );
  const stockPct = Math.round(
    (total.disponibles / (total.usadas + total.disponibles)) * 100
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Watch className="size-4 text-primary" />
          Inventario de manillas
        </CardTitle>
        <CardDescription>
          {formatNumber(total.disponibles)} disponibles · {stockPct}% del stock
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {manillasLotes.map((l) => {
          const totalLote = l.usadas + l.disponibles;
          const pct = totalLote > 0 ? (l.usadas / totalLote) * 100 : 0;
          const agotado = l.disponibles === 0;
          return (
            <div key={l.lote} className="group">
              <div className="flex items-center justify-between text-[12.5px] mb-1">
                <div className="flex items-center gap-2">
                  <span className="font-semibold">{l.lote}</span>
                  <span className="text-muted-foreground text-[11.5px]">
                    #{l.rango}
                  </span>
                </div>
                <span
                  className={
                    agotado
                      ? "text-muted-foreground tabular-nums text-[11.5px]"
                      : "text-foreground tabular-nums text-[11.5px]"
                  }
                >
                  {formatNumber(l.disponibles)} libres
                </span>
              </div>
              <div className="relative h-2 rounded-full bg-muted/40 overflow-hidden">
                <div
                  className={
                    agotado
                      ? "h-full rounded-full bg-gradient-to-r from-slate-500/60 to-slate-600/60 transition-all duration-1000 ease-td"
                      : "h-full rounded-full bg-gradient-to-r from-cyan-400 to-sky-500 transition-all duration-1000 ease-td"
                  }
                  style={{ width: `${pct}%` }}
                />
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}

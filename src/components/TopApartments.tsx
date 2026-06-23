import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { topApartments } from "@/data/mock";
import { formatCOP } from "@/lib/utils";
import { Crown, Trophy } from "lucide-react";

export function TopApartments() {
  const max = topApartments[0].renta;
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Trophy className="size-4 text-amber-400" />
          Top apartamentos del mes
        </CardTitle>
        <CardDescription>Por ingresos en renta turística</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {topApartments.map((a, i) => {
          const pct = (a.renta / max) * 100;
          return (
            <div key={a.apto} className="group">
              <div className="flex items-center gap-3 mb-1.5">
                <div className="relative size-8 rounded-lg bg-muted/50 grid place-items-center text-[12px] font-semibold tabular-nums">
                  {i === 0 ? (
                    <Crown className="size-4 text-amber-400" />
                  ) : (
                    `#${i + 1}`
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[13.5px] font-semibold tracking-tight">Apto {a.apto}</div>
                  <div className="text-[11.5px] text-muted-foreground truncate">
                    {a.operador} · {a.noches} noches
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-[13px] font-semibold tabular-nums">{formatCOP(a.renta)}</div>
                </div>
              </div>
              <div className="h-1.5 rounded-full bg-muted/40 overflow-hidden ml-11">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-500 transition-all duration-1000 ease-td group-hover:from-amber-300 group-hover:to-amber-500"
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

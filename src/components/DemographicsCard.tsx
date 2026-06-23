import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { demographics, origin } from "@/data/mock";
import { Users } from "lucide-react";
import { Progress } from "@/components/ui/progress";

export function DemographicsCard() {
  const total = demographics.reduce((acc, d) => acc + d.value, 0);
  const totalOrigin = origin.reduce((acc, d) => acc + d.value, 0);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="size-4 text-primary" />
          Huéspedes en casa
        </CardTitle>
        <CardDescription>{total} personas alojadas ahora</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="relative h-[180px]">
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
                data={demographics}
                innerRadius={55}
                outerRadius={80}
                paddingAngle={2}
                dataKey="value"
                stroke="hsl(215 50% 9%)"
                strokeWidth={2}
                animationDuration={1200}
              >
                {demographics.map((d, i) => (
                  <Cell key={i} fill={d.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
            <div className="text-[28px] font-bold tabular-nums">{total}</div>
            <div className="text-[11px] uppercase tracking-wider text-muted-foreground">total</div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 text-[12.5px]">
          {demographics.map((d) => (
            <div
              key={d.name}
              className="flex items-center gap-2 rounded-md bg-muted/30 px-2 py-1.5"
            >
              <span className="size-2.5 rounded-full" style={{ background: d.color }} />
              <span className="flex-1 truncate text-foreground/85">{d.name}</span>
              <span className="font-semibold tabular-nums">{d.value}</span>
            </div>
          ))}
        </div>

        <div className="pt-2 space-y-2">
          <div className="text-[11px] uppercase tracking-[0.15em] text-muted-foreground">
            Procedencia
          </div>
          {origin.map((o) => {
            const pct = Math.round((o.value / totalOrigin) * 100);
            return (
              <div key={o.name}>
                <div className="flex justify-between text-[12.5px] mb-1">
                  <span>{o.name}</span>
                  <span className="text-muted-foreground tabular-nums">
                    {o.value} · {pct}%
                  </span>
                </div>
                <Progress value={pct} />
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}

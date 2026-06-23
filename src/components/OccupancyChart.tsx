import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { occupancySeries } from "@/data/mock";
import { TrendingUp } from "lucide-react";

export function OccupancyChart() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-start justify-between space-y-0">
        <div>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="size-4 text-primary" />
            Ocupación últimos 30 días
          </CardTitle>
          <CardDescription>Porcentaje del edificio con estancia activa</CardDescription>
        </div>
        <Tabs defaultValue="30d">
          <TabsList>
            <TabsTrigger value="7d">7d</TabsTrigger>
            <TabsTrigger value="30d">30d</TabsTrigger>
            <TabsTrigger value="90d">90d</TabsTrigger>
          </TabsList>
        </Tabs>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={occupancySeries} margin={{ left: -16, right: 8, top: 8, bottom: 0 }}>
            <defs>
              <linearGradient id="ocupGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="hsl(188 92% 60%)" stopOpacity={0.45} />
                <stop offset="100%" stopColor="hsl(188 92% 60%)" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="resGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="hsl(39 96% 60%)" stopOpacity={0.30} />
                <stop offset="100%" stopColor="hsl(39 96% 60%)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis
              dataKey="day"
              tick={{ fontSize: 11, fill: "hsl(215 20% 65%)" }}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              tick={{ fontSize: 11, fill: "hsl(215 20% 65%)" }}
              tickLine={false}
              axisLine={false}
              tickFormatter={(v) => `${v}%`}
            />
            <Tooltip
              contentStyle={{
                background: "hsl(215 50% 9%)",
                border: "1px solid hsl(215 30% 20%)",
                borderRadius: 10,
                fontSize: 12,
              }}
              labelStyle={{ color: "hsl(210 40% 96%)", fontWeight: 600, marginBottom: 4 }}
              formatter={(value: number, name: string) =>
                [name === "Reservas activas" ? value : `${value}%`, name]
              }
            />
            <Area
              type="monotone"
              dataKey="ocupacion"
              name="Ocupación"
              stroke="hsl(188 92% 60%)"
              strokeWidth={2.5}
              fill="url(#ocupGrad)"
              animationDuration={1200}
            />
            <Area
              type="monotone"
              dataKey="reservas"
              name="Reservas activas"
              stroke="hsl(39 96% 60%)"
              strokeWidth={2}
              fill="url(#resGrad)"
              animationDuration={1400}
            />
          </AreaChart>
        </ResponsiveContainer>
        <div className="mt-3 flex flex-wrap items-center gap-4 text-[12px]">
          <span className="flex items-center gap-2">
            <span className="size-2 rounded-full bg-cyan-400" />
            <span className="text-muted-foreground">Ocupación</span>
          </span>
          <span className="flex items-center gap-2">
            <span className="size-2 rounded-full bg-amber-400" />
            <span className="text-muted-foreground">Reservas activas</span>
          </span>
        </div>
      </CardContent>
    </Card>
  );
}

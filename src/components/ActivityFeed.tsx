import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Activity, LogIn, LogOut, Package, Users, Watch } from "lucide-react";
import { activity } from "@/data/mock";
import { timeAgo, cn } from "@/lib/utils";

const iconMap = {
  checkin: { Icon: LogIn, tone: "text-emerald-300 bg-emerald-500/15" },
  checkout: { Icon: LogOut, tone: "text-sky-300 bg-sky-500/15" },
  paquete: { Icon: Package, tone: "text-amber-300 bg-amber-500/15" },
  visitante: { Icon: Users, tone: "text-violet-300 bg-violet-500/15" },
  manilla: { Icon: Watch, tone: "text-cyan-300 bg-cyan-500/15" },
  alerta: { Icon: Activity, tone: "text-rose-300 bg-rose-500/15" },
};

export function ActivityFeed() {
  return (
    <Card className="flex flex-col h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Activity className="size-4 text-primary" />
          Actividad en vivo
        </CardTitle>
        <CardDescription>Últimos eventos del edificio</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 p-0 pb-4">
        <ScrollArea className="h-[280px] px-5">
          <ol className="relative space-y-3 pr-2 pl-4">
            <span className="absolute left-[7px] top-2 bottom-2 w-px bg-border/60" />
            {activity.map((ev) => {
              const meta = iconMap[ev.kind];
              const Icon = meta.Icon;
              return (
                <li key={ev.id} className="relative flex items-start gap-3">
                  <span className={cn("absolute -left-[14px] top-1 size-3 rounded-full border-2 border-background", meta.tone.split(" ").filter((c) => c.startsWith("bg-")).join(" "))} />
                  <div className={cn("size-9 shrink-0 rounded-lg grid place-items-center", meta.tone)}>
                    <Icon className="size-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[13px] font-medium leading-snug">
                      {ev.text}
                      {ev.apartment && (
                        <span className="ml-2 inline-flex items-center rounded-md bg-muted/40 px-1.5 py-0.5 text-[11px] font-semibold tabular-nums">
                          Apto {ev.apartment}
                        </span>
                      )}
                    </div>
                    <div className="mt-0.5 text-[11.5px] text-muted-foreground">
                      {ev.user} · {timeAgo(ev.ts)}
                    </div>
                  </div>
                </li>
              );
            })}
          </ol>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}

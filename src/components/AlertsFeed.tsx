import {
  AlertTriangle,
  Info,
  ShieldAlert,
  ChevronRight,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { alerts } from "@/data/mock";
import { timeAgo, cn } from "@/lib/utils";

const iconByKind = {
  critica: ShieldAlert,
  advertencia: AlertTriangle,
  info: Info,
};

const toneByKind: Record<string, string> = {
  critica: "bg-rose-500/15 text-rose-300 border-rose-400/30",
  advertencia: "bg-amber-500/15 text-amber-300 border-amber-400/30",
  info: "bg-cyan-500/15 text-cyan-300 border-cyan-400/30",
};

export function AlertsFeed() {
  return (
    <Card className="flex flex-col h-full">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="flex items-center gap-2 relative">
            <span className="relative inline-flex">
              <ShieldAlert className="size-4 text-rose-300" />
              <span className="t-badge" data-open="true">
                <span className="t-badge-dot block size-2 rounded-full bg-rose-400 ring-2 ring-background" />
              </span>
            </span>
            Alertas activas
          </span>
          <span className="text-[12px] text-muted-foreground font-normal">{alerts.length}</span>
        </CardTitle>
        <CardDescription>Eventos que requieren atención de recepción</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 p-0 pb-4">
        <ScrollArea className="h-[420px] px-5">
          <ul className="space-y-2 pr-2">
            {alerts.map((a) => {
              const Icon = iconByKind[a.kind];
              return (
                <li
                  key={a.id}
                  className="group flex items-start gap-3 rounded-xl border border-border/60 bg-card/30 p-3 hover:bg-card/60 hover:border-border transition-all cursor-pointer"
                >
                  <div
                    className={cn(
                      "size-9 shrink-0 rounded-lg border grid place-items-center",
                      toneByKind[a.kind]
                    )}
                  >
                    <Icon className="size-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[13.5px] font-medium leading-snug">
                      {a.title}
                    </div>
                    <div className="text-[12px] text-muted-foreground leading-snug mt-0.5">
                      {a.detail}
                    </div>
                    <div className="mt-1.5 text-[11px] text-muted-foreground/70">
                      {timeAgo(a.ts)}
                    </div>
                  </div>
                  <ChevronRight className="size-4 text-muted-foreground/50 group-hover:text-foreground group-hover:translate-x-0.5 transition-transform" />
                </li>
              );
            })}
          </ul>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}

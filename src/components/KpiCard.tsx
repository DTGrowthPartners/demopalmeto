import { ArrowDownRight, ArrowUpRight, type LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { AnimatedNumber } from "@/components/AnimatedNumber";
import { cn } from "@/lib/utils";

interface KpiCardProps {
  label: string;
  value: number;
  format?: (n: number) => string;
  delta: number;
  deltaLabel?: string;
  icon: LucideIcon;
  tone?: "primary" | "success" | "warning" | "destructive";
  sparkline?: number[];
}

// Light mode: every card uses the brand primary (#015480) so the dashboard
// reads as a single product, not a rainbow. Dark mode keeps tone variety
// because contrast is easier there.
const tonePalette = {
  primary:
    "from-primary/25 via-primary/10 to-transparent text-primary ring-primary/30",
  success:
    "from-primary/20 via-primary/8 to-transparent text-primary ring-primary/25 dark:from-emerald-400/30 dark:via-emerald-500/10 dark:text-emerald-300 dark:ring-emerald-400/25",
  warning:
    "from-primary/20 via-primary/8 to-transparent text-primary ring-primary/25 dark:from-amber-400/30 dark:via-amber-500/10 dark:text-amber-300 dark:ring-amber-400/25",
  destructive:
    "from-primary/20 via-primary/8 to-transparent text-primary ring-primary/25 dark:from-rose-400/30 dark:via-rose-500/10 dark:text-rose-300 dark:ring-rose-400/25",
};

export function KpiCard({
  label,
  value,
  format,
  delta,
  deltaLabel = "vs ayer",
  icon: Icon,
  tone = "primary",
  sparkline,
}: KpiCardProps) {
  const positive = delta >= 0;
  return (
    <Card className="relative overflow-hidden group">
      {/* Tone glow */}
      <div
        className={cn(
          "absolute inset-0 bg-gradient-to-br opacity-50 pointer-events-none transition-opacity duration-500 group-hover:opacity-80",
          tonePalette[tone]
        )}
      />
      <CardContent className="relative p-5">
        <div className="flex items-start justify-between">
          <div className={cn(
            "size-9 rounded-xl ring-1 grid place-items-center bg-background/50",
            tonePalette[tone]
          )}>
            <Icon className="size-[18px]" />
          </div>
          <div
            className={cn(
              "flex items-center gap-1 rounded-full border px-2 py-0.5 text-[11px] font-semibold",
              positive
                ? "border-emerald-400/30 bg-emerald-400/10 text-emerald-300"
                : "border-rose-400/30 bg-rose-400/10 text-rose-300"
            )}
          >
            {positive ? <ArrowUpRight className="size-3" /> : <ArrowDownRight className="size-3" />}
            {Math.abs(delta).toFixed(1)}%
          </div>
        </div>

        <div className="mt-5">
          <div className="text-[12.5px] uppercase tracking-[0.18em] text-muted-foreground font-medium">{label}</div>
          <div className="mt-1 text-[36px] font-bold tracking-tight tabular-nums leading-none">
            <AnimatedNumber value={value} format={format} />
          </div>
          <div className="mt-1 text-[12px] text-muted-foreground">{deltaLabel}</div>
        </div>

        {sparkline && sparkline.length > 0 && (
          <svg
            className="mt-3 w-full h-[28px] overflow-visible"
            viewBox={`0 0 ${sparkline.length * 10} 30`}
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id={`spark-${label}`} x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="currentColor" stopOpacity="0.4" />
                <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
              </linearGradient>
            </defs>
            {(() => {
              const min = Math.min(...sparkline);
              const max = Math.max(...sparkline);
              const range = max - min || 1;
              const points = sparkline
                .map((v, i) => `${i * 10},${30 - ((v - min) / range) * 28 - 1}`)
                .join(" ");
              const area = `0,30 ${points} ${(sparkline.length - 1) * 10},30`;
              // Pass the full palette so both `text-primary` and any
              // `dark:text-*` override land — currentColor follows whichever
              // wins at render time.
              return (
                <g className={cn("transition-colors", tonePalette[tone])}>
                  <polygon fill={`url(#spark-${label})`} points={area} />
                  <polyline
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    points={points}
                  />
                </g>
              );
            })()}
          </svg>
        )}
      </CardContent>
    </Card>
  );
}

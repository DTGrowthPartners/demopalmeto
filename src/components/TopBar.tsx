import { useEffect, useState } from "react";
import { Search, Bell, MoonStar, Sparkles, Plus, Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import type { Theme } from "@/lib/useTheme";

interface TopBarProps {
  onOpenAssistant: () => void;
  theme: Theme;
  onToggleTheme: () => void;
}

export function TopBar({ onOpenAssistant, theme, onToggleTheme }: TopBarProps) {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const time = now.toLocaleTimeString("es-CO", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });
  const date = now.toLocaleDateString("es-CO", {
    weekday: "long",
    day: "2-digit",
    month: "long",
  });

  return (
    <header className="sticky top-0 z-30 flex items-center gap-3 px-6 py-3.5 border-b border-border/60 bg-background/70 backdrop-blur-xl">
      <div className="flex flex-col min-w-0">
        <div className="text-[18px] font-semibold tracking-tight">
          Hola, María <span className="text-muted-foreground font-normal">· recepción</span>
        </div>
        <div className="text-[12px] text-muted-foreground capitalize">{date}</div>
      </div>

      <div className="ml-auto flex items-center gap-3">
        {/* Live clock */}
        <div className="hidden md:flex items-center gap-2 rounded-lg border border-border/60 bg-card/40 px-3 py-1.5">
          <MoonStar className="size-3.5 text-primary" />
          <span className="font-mono tabular-nums text-[13.5px] tracking-tight">{time}</span>
          <Badge variant="success" className="rounded-full px-1.5 py-0 text-[10px]">EN VIVO</Badge>
        </div>

        {/* Search */}
        <div className="hidden lg:flex items-center gap-2 rounded-lg border border-border/60 bg-card/40 px-3 py-1.5 w-[280px]">
          <Search className="size-4 text-muted-foreground" />
          <input
            placeholder="Buscar apto, huésped, manilla…"
            className="bg-transparent text-[13px] outline-none flex-1 placeholder:text-muted-foreground/70"
          />
          <kbd className="rounded border border-border/70 px-1.5 py-0.5 text-[10px] text-muted-foreground">⌘K</kbd>
        </div>

        {/* Theme toggle */}
        <button
          onClick={onToggleTheme}
          title={`Cambiar a tema ${theme === "dark" ? "claro" : "oscuro"} (Ctrl+Shift+L)`}
          className="relative inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border/60 bg-card/40 hover:bg-muted/40 transition-colors"
          aria-label="Cambiar tema"
        >
          {theme === "dark" ? (
            <Sun className="size-4 text-amber-300" />
          ) : (
            <Moon className="size-4 text-primary" />
          )}
          <kbd className="absolute -bottom-1.5 right-0 rounded border border-border/70 bg-background px-1 py-px text-[8px] text-muted-foreground font-mono">
            ⇧⌃L
          </kbd>
        </button>

        {/* AI button */}
        <Button
          onClick={onOpenAssistant}
          variant="outline"
          className="gap-2 border-primary/40 text-primary hover:bg-primary/10 hover:text-primary"
        >
          <Sparkles className="size-4" />
          Asistente IA
        </Button>

        {/* Bell with badge */}
        <button
          className="relative inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border/60 bg-card/40 hover:bg-muted/40 transition-colors"
          aria-label="Alertas"
        >
          <Bell className="size-4" />
          <span className="t-badge" data-open="true">
            <span className="t-badge-dot inline-block min-w-[18px] px-1 text-center text-[10px] font-semibold leading-[18px] rounded-full bg-destructive text-destructive-foreground shadow-lg">
              5
            </span>
          </span>
        </button>

        {/* New check-in */}
        <Button className="gap-2">
          <Plus className="size-4" />
          Check-in
        </Button>

        {/* Avatar */}
        <Avatar className="ring-2 ring-primary/30">
          <AvatarFallback className="bg-gradient-to-br from-primary to-primary/70 text-primary-foreground">M</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}

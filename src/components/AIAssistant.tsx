import { useEffect, useState } from "react";
import { Sparkles, X, Send, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface AIAssistantProps {
  open: boolean;
  onClose: () => void;
}

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

const sampleSuggestions = [
  "¿Cuántos huéspedes extranjeros hay esta semana?",
  "Apartamentos que más rentaron este mes",
  "¿Cuántas manillas quedan del lote D?",
  "Reservas con check-in mañana",
  "Plazas de parqueadero en alerta",
];

const seedMessage: Message = {
  id: "seed",
  role: "assistant",
  content:
    "Hola María. Soy Marta, tu asistente del Palmetto. Puedo consultarte la ocupación, manillas, parqueadero, huéspedes, reservas y reportes. ¿Qué necesitas?",
};

export function AIAssistant({ open, onClose }: AIAssistantProps) {
  const [messages, setMessages] = useState<Message[]>([seedMessage]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onClose]);

  const send = (text: string) => {
    if (!text.trim()) return;
    const userMsg: Message = {
      id: String(Date.now()),
      role: "user",
      content: text,
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    // Simulated assistant response — replace with real backend call.
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: String(Date.now() + 1),
          role: "assistant",
          content:
            "En este momento hay 78% de ocupación con 184 adultos, 96 personas en familias y 90 niños. El apartamento que más ha rentado este mes es el 3801 con $18.4M COP (Caribbean Stays). ¿Quieres que te exporte el detalle?",
        },
      ]);
      setLoading(false);
    }, 1100);
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className={cn(
          "fixed inset-0 z-40 bg-background/60 backdrop-blur-sm transition-opacity duration-300",
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
        onClick={onClose}
      />

      {/* Panel — transitions.dev panel-reveal */}
      <aside
        data-open={open ? "true" : "false"}
        className="t-panel-slide fixed right-4 top-4 bottom-4 z-50 w-[420px] max-w-[calc(100vw-2rem)] glass shadow-card-premium rounded-2xl flex flex-col overflow-hidden"
      >
        {/* Header */}
        <div className="relative p-5 border-b border-border/60">
          <div className="absolute -top-10 -right-10 size-40 rounded-full bg-primary/20 blur-3xl pointer-events-none" />
          <div className="flex items-start justify-between gap-3 relative">
            <div className="flex items-center gap-3">
              <div className="size-10 rounded-xl bg-gradient-to-br from-cyan-300 via-sky-500 to-blue-700 grid place-items-center shadow-glow">
                <Sparkles className="size-5 text-slate-900" />
              </div>
              <div>
                <div className="text-[16px] font-semibold tracking-tight">
                  Asistente Palmetto
                </div>
                <div className="text-[11.5px] text-muted-foreground flex items-center gap-1.5">
                  <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Conectado al sistema interno
                </div>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="size-8 rounded-lg"
            >
              <X className="size-4" />
            </Button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {messages.map((m) => (
            <div
              key={m.id}
              className={cn(
                "flex flex-col gap-1",
                m.role === "user" ? "items-end" : "items-start"
              )}
            >
              <div
                className={cn(
                  "max-w-[85%] rounded-2xl px-4 py-2.5 text-[13.5px] leading-relaxed",
                  m.role === "user"
                    ? "bg-primary/15 text-primary-foreground border border-primary/30"
                    : "bg-muted/40 border border-border/60"
                )}
              >
                {m.content}
              </div>
              <span className="text-[10px] uppercase tracking-wider text-muted-foreground/70">
                {m.role === "user" ? "Tú" : "Asistente"}
              </span>
            </div>
          ))}
          {loading && (
            <div className="flex items-center gap-2 text-muted-foreground text-[13px]">
              <Loader2 className="size-4 animate-spin" />
              Consultando el sistema…
            </div>
          )}
        </div>

        {/* Suggestions */}
        {messages.length <= 1 && (
          <div className="px-5 pb-2">
            <div className="text-[11px] uppercase tracking-[0.15em] text-muted-foreground mb-2">
              Sugerencias
            </div>
            <div className="flex flex-wrap gap-1.5">
              {sampleSuggestions.map((s) => (
                <button
                  key={s}
                  onClick={() => send(s)}
                  className="text-[12px] rounded-full border border-border/60 bg-card/40 hover:bg-card/80 hover:border-primary/40 px-2.5 py-1 transition-colors"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            send(input);
          }}
          className="p-4 border-t border-border/60 bg-card/40"
        >
          <div className="flex items-center gap-2 rounded-xl border border-border/60 bg-background/60 px-3 py-2 focus-within:border-primary/60 transition-colors">
            <Sparkles className="size-4 text-primary shrink-0" />
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Pregúntame por aptos, reservas, manillas…"
              className="flex-1 bg-transparent text-[13.5px] outline-none placeholder:text-muted-foreground/70"
            />
            <button
              type="submit"
              disabled={!input.trim() || loading}
              className="inline-flex items-center justify-center size-8 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="size-3.5" />
            </button>
          </div>
          <div className="mt-2 text-[10.5px] text-muted-foreground/70 text-center">
            Las consultas son <span className="text-primary/80">internas</span> · datos del Palmetto Eliptic
          </div>
        </form>
      </aside>
    </>
  );
}

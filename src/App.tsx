import { useState } from "react";
import { Sidebar, type PageId } from "@/components/Sidebar";
import { TopBar } from "@/components/TopBar";
import { AIAssistant } from "@/components/AIAssistant";
import { DashboardPage } from "@/pages/Dashboard";
import { CheckInPage } from "@/pages/CheckIn";
import { CheckOutPage } from "@/pages/CheckOut";
import { ReportsPage } from "@/pages/Reports";
import { useTheme } from "@/lib/useTheme";

export default function App() {
  const [assistantOpen, setAssistantOpen] = useState(false);
  const [page, setPage] = useState<PageId>("dashboard");
  const { theme, toggle } = useTheme();

  return (
    <div className="min-h-screen flex">
      <Sidebar active={page} onSelect={setPage} />

      <main className="flex-1 flex flex-col min-w-0">
        <TopBar
          onOpenAssistant={() => setAssistantOpen(true)}
          theme={theme}
          onToggleTheme={toggle}
        />

        <div className="flex-1 p-6 max-w-[1600px] w-full mx-auto">
          {/* Re-mount on page change so the page-level animate-fade-up replays. */}
          <div key={page}>
            {page === "dashboard" && <DashboardPage />}
            {page === "checkin" && <CheckInPage />}
            {page === "checkout" && <CheckOutPage />}
            {page === "reportes" && <ReportsPage />}
            {page === "huespedes" && <Placeholder title="Huéspedes" />}
            {page === "visitantes" && <Placeholder title="Visitantes" />}
            {page === "empleados" && <Placeholder title="Empleados / Personal operativo" />}
            {page === "paquetes" && <Placeholder title="Paquetes" />}
            {page === "parqueadero" && <Placeholder title="Parqueadero" />}
            {page === "reservas" && <Placeholder title="Reservas" />}
            {page === "caja" && <Placeholder title="Caja" />}
            {page === "migracion" && <Placeholder title="Migración" />}
            {page === "registros" && <Placeholder title="Registros" />}
          </div>

          <footer className="py-6 mt-6 text-center text-[11.5px] text-muted-foreground/70">
            Palmetto Eliptic · Bocagrande, Cartagena · Demo build · transiciones por{" "}
            <a
              className="underline-offset-2 hover:underline hover:text-primary"
              href="https://transitions.dev"
              target="_blank"
              rel="noreferrer"
            >
              transitions.dev
            </a>
          </footer>
        </div>
      </main>

      <AIAssistant open={assistantOpen} onClose={() => setAssistantOpen(false)} />
    </div>
  );
}

function Placeholder({ title }: { title: string }) {
  return (
    <div className="rounded-2xl border border-dashed border-border/60 bg-card/30 p-12 text-center animate-fade-up">
      <div className="text-[14px] uppercase tracking-[0.18em] text-muted-foreground mb-2">
        Sección
      </div>
      <h1 className="text-[32px] font-bold tracking-tight">{title}</h1>
      <p className="mt-2 text-[13.5px] text-muted-foreground">
        Pantalla pendiente de diseñar en el demo. Las que ya están listas son:
        <span className="text-foreground"> Dashboard, Check-in, Check-out, Reportes.</span>
      </p>
    </div>
  );
}

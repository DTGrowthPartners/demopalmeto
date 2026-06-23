import {
  Bed,
  LogIn,
  LogOut,
  Package,
  Users,
  Watch,
} from "lucide-react";
import { KpiCard } from "@/components/KpiCard";
import { OccupancyChart } from "@/components/OccupancyChart";
import { DemographicsCard } from "@/components/DemographicsCard";
import { TopApartments } from "@/components/TopApartments";
import { ParkingGrid } from "@/components/ParkingGrid";
import { AlertsFeed } from "@/components/AlertsFeed";
import { ActivityFeed } from "@/components/ActivityFeed";
import { ManillasInventory } from "@/components/ManillasInventory";
import { ReservationsTable } from "@/components/ReservationsTable";
import { BuildingMap } from "@/components/BuildingMap";
import { kpis, occupancySeries } from "@/data/mock";
import { formatPercent, formatNumber } from "@/lib/utils";

export function DashboardPage() {
  const sparkline = occupancySeries.slice(-14).map((d) => d.ocupacion);
  const reservasSpark = occupancySeries.slice(-14).map((d) => d.reservas);

  return (
    <div className="space-y-6">
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 animate-fade-up">
        <KpiCard
          label="Ocupación"
          value={kpis.ocupacion}
          format={(n) => formatPercent(n)}
          delta={kpis.ocupacionDelta}
          icon={Bed}
          tone="primary"
          sparkline={sparkline}
        />
        <KpiCard
          label="Check-ins hoy"
          value={kpis.checkinsHoy}
          delta={kpis.checkinsDelta}
          icon={LogIn}
          tone="success"
          sparkline={reservasSpark}
        />
        <KpiCard
          label="Check-outs hoy"
          value={kpis.checkoutsHoy}
          delta={kpis.checkoutsDelta}
          icon={LogOut}
          tone="warning"
          sparkline={reservasSpark.map((v) => v * 0.7)}
        />
        <KpiCard
          label="Visitantes"
          value={kpis.visitantesHoy}
          delta={kpis.visitantesDelta}
          icon={Users}
          tone="primary"
        />
        <KpiCard
          label="Paquetes pendientes"
          value={kpis.paquetesPendientes}
          delta={kpis.paquetesDelta}
          icon={Package}
          tone="warning"
        />
        <KpiCard
          label="Manillas libres"
          value={kpis.manillasDisponibles}
          format={(n) => formatNumber(Math.round(n))}
          delta={kpis.manillasDelta}
          deltaLabel="vs semana pasada"
          icon={Watch}
          tone="primary"
        />
      </section>

      <section className="grid grid-cols-1 xl:grid-cols-3 gap-6 animate-fade-up [animation-delay:80ms]">
        <div className="xl:col-span-2">
          <OccupancyChart />
        </div>
        <AlertsFeed />
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 animate-fade-up [animation-delay:160ms]">
        <DemographicsCard />
        <TopApartments />
        <BuildingMap />
      </section>

      <section className="grid grid-cols-1 xl:grid-cols-3 gap-6 animate-fade-up [animation-delay:240ms]">
        <div className="xl:col-span-2">
          <ParkingGrid />
        </div>
        <div className="space-y-6">
          <ManillasInventory />
          <ActivityFeed />
        </div>
      </section>

      <section className="animate-fade-up [animation-delay:320ms]">
        <ReservationsTable />
      </section>
    </div>
  );
}

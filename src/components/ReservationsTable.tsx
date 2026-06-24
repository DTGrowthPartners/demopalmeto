import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { reservations } from "@/data/mock";
import { CalendarCheck, ArrowRight, Moon, Users, Briefcase } from "lucide-react";

const statusVariant = {
  confirmada: "success" as const,
  ingresada: "default" as const,
  pendiente: "warning" as const,
};

export function ReservationsTable() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-start justify-between space-y-0">
        <div>
          <CardTitle className="flex items-center gap-2">
            <CalendarCheck className="size-4 text-primary" />
            Próximas llegadas
          </CardTitle>
          <CardDescription>Reservas activas y pre-registros recibidos de operadores</CardDescription>
        </div>
        <Button variant="ghost" size="sm" className="gap-1">
          Ver todas <ArrowRight className="size-3.5" />
        </Button>
      </CardHeader>
      <CardContent>
        <div className="overflow-hidden rounded-xl border border-border/60">
          <table className="w-full text-[13px]">
            <thead className="bg-muted/30 text-[11px] uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="text-left font-medium p-3">Apto</th>
                <th className="text-left font-medium p-3">Huésped</th>
                <th className="text-left font-medium p-3">Llegada</th>
                <th className="text-left font-medium p-3">Estancia</th>
                <th className="text-left font-medium p-3">Operador</th>
                <th className="text-left font-medium p-3">Estado</th>
                <th className="text-right font-medium p-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/40">
              {reservations.map((r) => (
                <tr key={r.id} className="group hover:bg-muted/20 transition-colors">
                  <td className="p-3 font-semibold tabular-nums">{r.apartment}</td>
                  <td className="p-3">{r.guestName}</td>
                  <td className="p-3 text-muted-foreground">{r.arrival}</td>
                  <td className="p-3">
                    <div className="flex items-center gap-3 text-[12px]">
                      <span className="inline-flex items-center gap-1 text-muted-foreground">
                        <Moon className="size-3" /> {r.nights}
                      </span>
                      <span className="inline-flex items-center gap-1 text-muted-foreground">
                        <Users className="size-3" /> {r.pax}
                      </span>
                    </div>
                  </td>
                  <td className="p-3">
                    <span className="inline-flex items-center gap-1.5 rounded-md bg-primary/10 px-2 py-0.5 text-[11.5px] font-medium text-primary">
                      <Briefcase className="size-3" />
                      {r.operador}
                    </span>
                  </td>
                  <td className="p-3">
                    <Badge variant={statusVariant[r.status]}>{r.status}</Badge>
                  </td>
                  <td className="p-3 text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      Check-in
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}

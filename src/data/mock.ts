// Mock data realista del Edificio Palmetto Eliptic
// Basado en: 130 apartamentos, pisos 9–41, líneas 01–05.

export interface Apartment {
  id: string;
  number: string;
  floor: number;
  line: string;
  status: "ocupado" | "libre" | "checkout-hoy" | "checkin-hoy" | "bloqueado";
  guests: number;
  capacity: number;
  operator: string;
  view: "mar" | "ciudad" | "interior";
}

export interface ParkingSlot {
  id: string;
  number: string;
  level: number;
  state: "libre" | "ocupado" | "visitante" | "alerta";
  apartment?: string;
  plate?: string;
  since?: string;
}

export interface Alert {
  id: string;
  kind: "critica" | "advertencia" | "info";
  title: string;
  detail: string;
  ts: Date;
}

export interface ActivityItem {
  id: string;
  kind: "checkin" | "checkout" | "paquete" | "visitante" | "manilla" | "alerta";
  text: string;
  apartment?: string;
  user: string;
  ts: Date;
}

export interface Reservation {
  id: string;
  apartment: string;
  guestName: string;
  arrival: string;
  nights: number;
  pax: number;
  source: "directo" | "booking" | "airbnb" | "operador";
  status: "confirmada" | "pendiente" | "ingresada";
}

// ── KPIs principales ────────────────────────────────────────────────────────
export const kpis = {
  ocupacion: 78,
  ocupacionDelta: 4.2,
  checkinsHoy: 23,
  checkinsDelta: -2,
  checkoutsHoy: 18,
  checkoutsDelta: 5,
  paquetesPendientes: 12,
  paquetesDelta: 3,
  visitantesHoy: 47,
  visitantesDelta: 12,
  manillasDisponibles: 4720,
  manillasDelta: -180,
};

// ── Serie histórica de ocupación (últimos 30 días) ─────────────────────────
export const occupancySeries = [
  { day: "01", ocupacion: 62, reservas: 41 },
  { day: "02", ocupacion: 65, reservas: 44 },
  { day: "03", ocupacion: 68, reservas: 46 },
  { day: "04", ocupacion: 71, reservas: 49 },
  { day: "05", ocupacion: 74, reservas: 51 },
  { day: "06", ocupacion: 80, reservas: 58 },
  { day: "07", ocupacion: 83, reservas: 60 },
  { day: "08", ocupacion: 79, reservas: 55 },
  { day: "09", ocupacion: 76, reservas: 53 },
  { day: "10", ocupacion: 72, reservas: 50 },
  { day: "11", ocupacion: 70, reservas: 48 },
  { day: "12", ocupacion: 73, reservas: 52 },
  { day: "13", ocupacion: 78, reservas: 56 },
  { day: "14", ocupacion: 84, reservas: 61 },
  { day: "15", ocupacion: 88, reservas: 64 },
  { day: "16", ocupacion: 86, reservas: 62 },
  { day: "17", ocupacion: 82, reservas: 59 },
  { day: "18", ocupacion: 79, reservas: 56 },
  { day: "19", ocupacion: 76, reservas: 53 },
  { day: "20", ocupacion: 74, reservas: 51 },
  { day: "21", ocupacion: 77, reservas: 54 },
  { day: "22", ocupacion: 81, reservas: 58 },
  { day: "23", ocupacion: 85, reservas: 62 },
  { day: "24", ocupacion: 89, reservas: 65 },
  { day: "25", ocupacion: 91, reservas: 67 },
  { day: "26", ocupacion: 87, reservas: 63 },
  { day: "27", ocupacion: 83, reservas: 60 },
  { day: "28", ocupacion: 80, reservas: 57 },
  { day: "29", ocupacion: 78, reservas: 55 },
  { day: "30", ocupacion: 78, reservas: 56 },
];

// ── Demografía de huéspedes ─────────────────────────────────────────────────
export const demographics = [
  { name: "Adultos", value: 184, color: "hsl(188 92% 60%)" },
  { name: "Familias", value: 96, color: "hsl(220 96% 65%)" },
  { name: "Niños (0-6)", value: 38, color: "hsl(280 84% 70%)" },
  { name: "Niños (7-17)", value: 52, color: "hsl(39 96% 60%)" },
];

export const origin = [
  { name: "Nacionales", value: 248 },
  { name: "Extranjeros", value: 122 },
];

// ── Top apartamentos por renta del mes ──────────────────────────────────────
export const topApartments = [
  { apto: "3801", operador: "Caribbean Stays", renta: 18_400_000, noches: 28 },
  { apto: "4102", operador: "Palmetto Rentals", renta: 17_900_000, noches: 27 },
  { apto: "3505", operador: "Operador Directo", renta: 16_200_000, noches: 25 },
  { apto: "2903", operador: "Caribbean Stays", renta: 15_750_000, noches: 24 },
  { apto: "4001", operador: "Palmetto Rentals", renta: 15_100_000, noches: 23 },
  { apto: "3204", operador: "Cartagena Vibes", renta: 14_500_000, noches: 22 },
  { apto: "2705", operador: "Operador Directo", renta: 13_800_000, noches: 21 },
];

// ── Manillas por lote ───────────────────────────────────────────────────────
export const manillasLotes = [
  { lote: "Lote 2026-A", rango: "1–1000", usadas: 1000, disponibles: 0 },
  { lote: "Lote 2026-B", rango: "1001–2000", usadas: 1000, disponibles: 0 },
  { lote: "Lote 2026-C", rango: "2001–3000", usadas: 1000, disponibles: 0 },
  { lote: "Lote 2026-D", rango: "3001–4000", usadas: 720, disponibles: 280 },
  { lote: "Lote 2026-E", rango: "4001–5000", usadas: 0, disponibles: 1000 },
];

// ── Alertas activas ─────────────────────────────────────────────────────────
export const alerts: Alert[] = [
  {
    id: "a1",
    kind: "critica",
    title: "Parqueadero 11-05 ocupado sin autorización",
    detail: "Vehículo BNT-432 registrado al apto 4002, plaza asignada a 1105.",
    ts: new Date(Date.now() - 1000 * 60 * 7),
  },
  {
    id: "a2",
    kind: "advertencia",
    title: "Manilla 3784 marcada como defectuosa",
    detail: "Broche dañado al ingreso. Reemplazada por la 3785.",
    ts: new Date(Date.now() - 1000 * 60 * 24),
  },
  {
    id: "a3",
    kind: "info",
    title: "Notificación masiva enviada",
    detail: "Aviso de corte de agua programado para mañana 8:00 AM.",
    ts: new Date(Date.now() - 1000 * 60 * 65),
  },
  {
    id: "a4",
    kind: "advertencia",
    title: "Huésped bloqueado intenta ingresar",
    detail: "Documento CC 1.045.xxx.123 — bloqueado por escándalo nocturno 2026-03.",
    ts: new Date(Date.now() - 1000 * 60 * 88),
  },
  {
    id: "a5",
    kind: "info",
    title: "6 pre-registros pendientes de verificación",
    detail: "Reservas creadas desde portal de operador esperan revisión.",
    ts: new Date(Date.now() - 1000 * 60 * 120),
  },
];

// ── Feed de actividad reciente ──────────────────────────────────────────────
export const activity: ActivityItem[] = [
  {
    id: "ev1",
    kind: "checkin",
    text: "Check-in completado",
    apartment: "3801",
    user: "María (recepción)",
    ts: new Date(Date.now() - 1000 * 60 * 3),
  },
  {
    id: "ev2",
    kind: "paquete",
    text: "Paquete recibido (Servientrega)",
    apartment: "2904",
    user: "Tatiana (lobby)",
    ts: new Date(Date.now() - 1000 * 60 * 11),
  },
  {
    id: "ev3",
    kind: "manilla",
    text: "Manilla #3785 asignada",
    apartment: "1502",
    user: "María (recepción)",
    ts: new Date(Date.now() - 1000 * 60 * 18),
  },
  {
    id: "ev4",
    kind: "visitante",
    text: "Visitante registrado (3 personas)",
    apartment: "3204",
    user: "Tatiana (lobby)",
    ts: new Date(Date.now() - 1000 * 60 * 26),
  },
  {
    id: "ev5",
    kind: "checkout",
    text: "Check-out completado",
    apartment: "2705",
    user: "María (recepción)",
    ts: new Date(Date.now() - 1000 * 60 * 42),
  },
  {
    id: "ev6",
    kind: "checkin",
    text: "Check-in completado",
    apartment: "1903",
    user: "Tatiana (lobby)",
    ts: new Date(Date.now() - 1000 * 60 * 55),
  },
];

// ── Tablero de parqueadero (60 plazas en 3 sótanos) ─────────────────────────
function buildParking(): ParkingSlot[] {
  const rng = (seed: number) => {
    let x = Math.sin(seed) * 10000;
    return x - Math.floor(x);
  };
  const states: ParkingSlot["state"][] = ["libre", "ocupado", "visitante", "alerta"];
  const slots: ParkingSlot[] = [];
  let id = 0;
  for (let level = 1; level <= 3; level++) {
    for (let n = 1; n <= 20; n++) {
      const r = rng(level * 100 + n);
      const state: ParkingSlot["state"] =
        r > 0.95
          ? "alerta"
          : r > 0.75
          ? "visitante"
          : r > 0.25
          ? "ocupado"
          : "libre";
      slots.push({
        id: `p${++id}`,
        number: `${level}-${String(n).padStart(2, "0")}`,
        level,
        state,
        apartment:
          state !== "libre"
            ? `${Math.floor(rng(level + n) * 33 + 9)}0${Math.floor(rng(level - n + 1) * 5 + 1)}`
            : undefined,
        plate:
          state !== "libre"
            ? `${String.fromCharCode(65 + Math.floor(rng(level + n + 2) * 26))}${String.fromCharCode(
                65 + Math.floor(rng(level + n + 3) * 26)
              )}${String.fromCharCode(65 + Math.floor(rng(level + n + 4) * 26))}-${Math.floor(
                rng(level + n + 5) * 900 + 100
              )}`
            : undefined,
      });
    }
  }
  return slots;
}

export const parking = buildParking();

// ── Reservas próximas ───────────────────────────────────────────────────────
export const reservations: Reservation[] = [
  {
    id: "r1",
    apartment: "3801",
    guestName: "Ana Méndez",
    arrival: "Hoy · 14:00",
    nights: 7,
    pax: 4,
    source: "directo",
    status: "confirmada",
  },
  {
    id: "r2",
    apartment: "2904",
    guestName: "John Carter",
    arrival: "Hoy · 16:30",
    nights: 5,
    pax: 2,
    source: "booking",
    status: "ingresada",
  },
  {
    id: "r3",
    apartment: "1502",
    guestName: "Laura Pérez",
    arrival: "Mañana · 10:00",
    nights: 3,
    pax: 3,
    source: "operador",
    status: "pendiente",
  },
  {
    id: "r4",
    apartment: "4102",
    guestName: "Familia Restrepo",
    arrival: "Mañana · 15:00",
    nights: 10,
    pax: 6,
    source: "airbnb",
    status: "confirmada",
  },
  {
    id: "r5",
    apartment: "3204",
    guestName: "Diego Salazar",
    arrival: "23 Jun · 12:00",
    nights: 4,
    pax: 2,
    source: "directo",
    status: "confirmada",
  },
];

// ── Building layout (mini mapa de pisos para hover) ─────────────────────────
export const buildingFloors = Array.from({ length: 41 - 9 + 1 }, (_, i) => {
  const floor = 41 - i;
  return {
    floor,
    line01: ((floor * 7) % 10) > 3 ? "ocupado" : "libre",
    line02: ((floor * 13) % 10) > 5 ? "ocupado" : "libre",
    line03: ((floor * 11) % 10) > 4 ? "ocupado" : "libre",
    line04: ((floor * 17) % 10) > 6 ? "ocupado" : "libre",
    line05: ((floor * 19) % 10) > 5 ? "ocupado" : "libre",
  };
});

// ── Apartments disponibles (selector de check-in) ───────────────────────────
export const apartmentsList = [
  { id: "1502", piso: 15, capacidad: 4, adicionales: 2, alcobas: 2, vista: "Mar", parqueaderos: 1, propietario: "Inv. Caribe S.A.S.", operador: "Caribbean Stays", rnt: "RNT 54211", estado: "libre" },
  { id: "1903", piso: 19, capacidad: 6, adicionales: 2, alcobas: 3, vista: "Mar", parqueaderos: 2, propietario: "Hernández, Rocío", operador: "Operador Directo", rnt: "RNT 54322", estado: "libre" },
  { id: "2705", piso: 27, capacidad: 4, adicionales: 2, alcobas: 2, vista: "Ciudad", parqueaderos: 1, propietario: "Restrepo & Cía.", operador: "Palmetto Rentals", rnt: "RNT 54117", estado: "libre" },
  { id: "2904", piso: 29, capacidad: 5, adicionales: 2, alcobas: 2, vista: "Mar", parqueaderos: 1, propietario: "Mendoza, Diego", operador: "Caribbean Stays", rnt: "RNT 54402", estado: "libre" },
  { id: "3204", piso: 32, capacidad: 6, adicionales: 3, alcobas: 3, vista: "Mar", parqueaderos: 2, propietario: "Cartagena Vibes", operador: "Cartagena Vibes", rnt: "RNT 54588", estado: "libre" },
  { id: "3505", piso: 35, capacidad: 4, adicionales: 2, alcobas: 2, vista: "Mar", parqueaderos: 1, propietario: "Operador Directo", operador: "Operador Directo", rnt: "RNT 54705", estado: "libre" },
  { id: "3801", piso: 38, capacidad: 8, adicionales: 4, alcobas: 4, vista: "Mar 360°", parqueaderos: 2, propietario: "Premier Holdings", operador: "Caribbean Stays", rnt: "RNT 54801", estado: "libre" },
  { id: "4001", piso: 40, capacidad: 6, adicionales: 2, alcobas: 3, vista: "Mar", parqueaderos: 2, propietario: "Palmetto Rentals", operador: "Palmetto Rentals", rnt: "RNT 54901", estado: "libre" },
  { id: "4102", piso: 41, capacidad: 10, adicionales: 4, alcobas: 4, vista: "Penthouse", parqueaderos: 3, propietario: "Privado", operador: "Palmetto Rentals", rnt: "RNT 54999", estado: "libre" },
];

export const procedencias = [
  "Bogotá, Colombia",
  "Medellín, Colombia",
  "Cali, Colombia",
  "Barranquilla, Colombia",
  "Bucaramanga, Colombia",
  "Pereira, Colombia",
  "Cúcuta, Colombia",
  "Miami, USA",
  "Madrid, España",
  "Buenos Aires, Argentina",
  "Ciudad de México, México",
  "Santiago, Chile",
  "Lima, Perú",
  "Quito, Ecuador",
  "Panamá City, Panamá",
];

export const motivosViaje = [
  "Turismo familiar",
  "Vacaciones de pareja",
  "Trabajo / negocios",
  "Convención / evento",
  "Luna de miel",
  "Visita médica",
];

export const mediosReserva = [
  { id: "directo", label: "Directo / Voz a voz" },
  { id: "booking", label: "Booking.com" },
  { id: "airbnb", label: "Airbnb" },
  { id: "expedia", label: "Expedia" },
  { id: "operador", label: "Operador turístico" },
  { id: "agencia", label: "Agencia de viajes" },
];

// ── Estancias activas (para Check-out) ──────────────────────────────────────
export interface ActiveStay {
  folio: string;
  registro: string;
  apartment: string;
  guestName: string;
  pax: number;
  checkIn: string;
  scheduledOut: string;
  manilla: string;
  nights: number;
  total: number;
  operator: string;
  receptionist: string;
}

export const activeStays: ActiveStay[] = [
  { folio: "F-2026-04812", registro: "R-15891", apartment: "1502", guestName: "Laura Pérez Castaño", pax: 3, checkIn: "16 Jun · 11:42", scheduledOut: "Hoy · 11:00", manilla: "3640-3642", nights: 7, total: 4_900_000, operator: "Caribbean Stays", receptionist: "María" },
  { folio: "F-2026-04815", registro: "R-15894", apartment: "2705", guestName: "Familia Restrepo", pax: 5, checkIn: "17 Jun · 15:10", scheduledOut: "Hoy · 11:00", manilla: "3651-3655", nights: 5, total: 6_750_000, operator: "Palmetto Rentals", receptionist: "Tatiana" },
  { folio: "F-2026-04816", registro: "R-15895", apartment: "1903", guestName: "John Carter", pax: 2, checkIn: "18 Jun · 18:00", scheduledOut: "Hoy · 12:00", manilla: "3660-3661", nights: 5, total: 3_200_000, operator: "Caribbean Stays", receptionist: "María" },
  { folio: "F-2026-04820", registro: "R-15901", apartment: "3505", guestName: "Diego Salazar", pax: 2, checkIn: "19 Jun · 14:20", scheduledOut: "Mañana · 11:00", manilla: "3675-3676", nights: 4, total: 4_100_000, operator: "Operador Directo", receptionist: "María" },
  { folio: "F-2026-04823", registro: "R-15904", apartment: "3204", guestName: "Ana Méndez", pax: 4, checkIn: "16 Jun · 14:00", scheduledOut: "23 Jun · 11:00", manilla: "3635-3639", nights: 7, total: 5_950_000, operator: "Cartagena Vibes", receptionist: "Tatiana" },
  { folio: "F-2026-04826", registro: "R-15907", apartment: "2904", guestName: "Mariana López", pax: 3, checkIn: "20 Jun · 16:00", scheduledOut: "25 Jun · 11:00", manilla: "3690-3692", nights: 5, total: 4_500_000, operator: "Caribbean Stays", receptionist: "María" },
  { folio: "F-2026-04829", registro: "R-15910", apartment: "4001", guestName: "Familia Botero", pax: 6, checkIn: "21 Jun · 12:00", scheduledOut: "28 Jun · 11:00", manilla: "3700-3705", nights: 7, total: 11_900_000, operator: "Palmetto Rentals", receptionist: "Tatiana" },
];

// ── Reportes (datos mensuales/anuales) ──────────────────────────────────────
export const monthlyOccupancy2026 = [
  { mes: "Ene", ocupacion: 62, ingresos: 142_000_000, noches: 1184 },
  { mes: "Feb", ocupacion: 68, ingresos: 158_000_000, noches: 1245 },
  { mes: "Mar", ocupacion: 81, ingresos: 198_500_000, noches: 1502 },
  { mes: "Abr", ocupacion: 74, ingresos: 176_300_000, noches: 1378 },
  { mes: "May", ocupacion: 70, ingresos: 161_900_000, noches: 1290 },
  { mes: "Jun", ocupacion: 78, ingresos: 184_700_000, noches: 1432 },
];

export const guestAgeBreakdown = [
  { rango: "0-6", total: 38, paganManilla: false, color: "hsl(280 84% 70%)" },
  { rango: "7-17", total: 52, paganManilla: true, color: "hsl(220 96% 65%)" },
  { rango: "18-35", total: 96, paganManilla: true, color: "hsl(188 92% 60%)" },
  { rango: "36-55", total: 124, paganManilla: true, color: "hsl(152 76% 50%)" },
  { rango: "56+", total: 60, paganManilla: true, color: "hsl(39 96% 60%)" },
];

export const reservationCalidad = [
  { calidad: "Huésped familiar", value: 168 },
  { calidad: "Residente regular", value: 84 },
  { calidad: "Primera estancia", value: 118 },
];

export const reservationsByCountry = [
  { pais: "Colombia", value: 248, flag: "🇨🇴" },
  { pais: "Estados Unidos", value: 38, flag: "🇺🇸" },
  { pais: "Argentina", value: 24, flag: "🇦🇷" },
  { pais: "España", value: 18, flag: "🇪🇸" },
  { pais: "México", value: 14, flag: "🇲🇽" },
  { pais: "Chile", value: 12, flag: "🇨🇱" },
  { pais: "Perú", value: 8, flag: "🇵🇪" },
  { pais: "Otros", value: 8, flag: "🌎" },
];

export const topApartmentsYear = [
  { apto: "3801", noches: 224, ingresos: 132_400_000 },
  { apto: "4102", noches: 218, ingresos: 128_900_000 },
  { apto: "3505", noches: 198, ingresos: 112_200_000 },
  { apto: "2903", noches: 184, ingresos: 102_750_000 },
  { apto: "4001", noches: 176, ingresos: 96_100_000 },
  { apto: "3204", noches: 168, ingresos: 89_500_000 },
  { apto: "2705", noches: 161, ingresos: 84_800_000 },
  { apto: "1903", noches: 149, ingresos: 76_300_000 },
  { apto: "2904", noches: 142, ingresos: 71_900_000 },
  { apto: "1502", noches: 134, ingresos: 66_200_000 },
];

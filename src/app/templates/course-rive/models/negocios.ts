export interface Negocio {
  id: number;
  nombre: string;
  telefono?: string;
  correo?: string;
  direccion?: string;
  activo?: boolean;
  fechaRegistro?: string;
  usuario_id?: number;
}

export const negociosList: Negocio[] = [
  {
    id: 1,
    nombre: "Carnitas - El Compadre",
    telefono: "4181846370",
    correo: "carnitaselcompadre@yopmail.com",
    direccion: "Rivera del Río 28, Centro, 37800 Dolores Hidalgo Cuna de la Independencia Nacional, Gto.",
    activo: true,
    fechaRegistro: new Date().toISOString(),
    usuario_id: 1,
  },
  {
    id: 2,
    nombre: "Postres - Sarita",
    telefono: "4181571479",
    correo: "postressarita@yopmail.com",
    direccion: "Av. San Luis Potosí 59, Centro, 37800 Dolores Hidalgo Cuna de la Independencia Nacional, Gto.",
    activo: true,
    fechaRegistro: new Date().toISOString(),
    usuario_id: 1,
  },
  {
    id: 3,
    nombre: "Taquería - La Flamita",
    telefono: "4181162356",
    correo: "laflamitagod123@yopmail.com",
    direccion: "Avenida Nte. 27, Centro, 37800 Dolores Hidalgo Cuna de la Independencia Nacional, Gto.",
    activo: true,
    fechaRegistro: new Date().toISOString(),
    usuario_id: 1,
  }
];

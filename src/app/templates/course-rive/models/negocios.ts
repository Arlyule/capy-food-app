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
    nombre: "Negocio 1",
    telefono: "123456789",
    correo: "correo@negocio.com",
    direccion: "Dirección de ejemplo",
    activo: true,
    fechaRegistro: new Date().toISOString(),
    usuario_id: 1,
  },
  {
    id: 2,
    nombre: "Negocio 2",
    telefono: "987654321",
    correo: "contacto@negocio.com",
    direccion: "Otra dirección ejemplo",
    activo: true,
    fechaRegistro: new Date().toISOString(),
    usuario_id: 1,
  },
  {
    id: 3,
    nombre: "Negocio 3",
    telefono: "456789123",
    correo: "info@negocio.com",
    direccion: "Calle 123, Ciudad X",
    activo: true,
    fechaRegistro: new Date().toISOString(),
    usuario_id: 1,
  },
  {
    id: 4,
    nombre: "Negocio 4",
    telefono: "654321987",
    correo: "ventas@negocio.com",
    direccion: "Avenida Principal, Zona 4",
    activo: true,
    fechaRegistro: new Date().toISOString(),
    usuario_id: 1,
  },
  {
    id: 5,
    nombre: "Negocio 5",
    telefono: "321654987",
    correo: "soporte@negocio.com",
    direccion: "Calle Ficticia, Ciudad Y",
    activo: true,
    fechaRegistro: new Date().toISOString(),
    usuario_id: 1,
  },
  {
    id: 6,
    nombre: "Negocio 6",
    telefono: "789123456",
    correo: "contacto2@negocio.com",
    direccion: "Calle Real, Ciudad Z",
    activo: true,
    fechaRegistro: new Date().toISOString(),
    usuario_id: 1,
  },
  {
    id: 7,
    nombre: "Negocio 7",
    telefono: "159753468",
    correo: "atencion@negocio.com",
    direccion: "Calle 45, Zona Norte",
    activo: true,
    fechaRegistro: new Date().toISOString(),
    usuario_id: 1,
  },
  {
    id: 8,
    nombre: "Negocio 8",
    telefono: "753159456",
    correo: "info@negocio8.com",
    direccion: "Av. Independencia, Ciudad W",
    activo: true,
    fechaRegistro: new Date().toISOString(),
    usuario_id: 1,
  },
  {
    id: 9,
    nombre: "Negocio 9",
    telefono: "258963741",
    correo: "contacto@negocio9.com",
    direccion: "Calle Central, Ciudad V",
    activo: true,
    fechaRegistro: new Date().toISOString(),
    usuario_id: 1,
  },
  {
    id: 10,
    nombre: "Negocio 10",
    telefono: "963258741",
    correo: "ventas@negocio10.com",
    direccion: "Plaza Mayor, Zona 10",
    activo: true,
    fechaRegistro: new Date().toISOString(),
    usuario_id: 1,
  },
];

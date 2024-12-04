export interface Empleado {
  id?: number;
  nombre: string;
  telefono?: string;
  correo?: string;
  negocio_id: number;
  fechaRegistro?: string;
  usuarioId?: number; // Nuevo campo agregado
  rol_id: number;
}

export const empleadosList: Empleado[] = [
  {
    id: 1,
    nombre: "Empleado 1",
    telefono: "987654321",
    correo: "empleado@negocio.com",
    negocio_id: 1,
    fechaRegistro: new Date().toISOString(),
    usuarioId: 2,
    rol_id: 0
  },
];

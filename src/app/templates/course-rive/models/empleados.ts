export interface Empleado {
  id: number;
  nombre: string;
  telefono?: string;
  correo?: string;
  negocioId: number;
  fechaRegistro: string;
  usuarioId: number; // Nuevo campo agregado
}

export const empleadosList: Empleado[] = [
  {
    id: 1,
    nombre: "Empleado 1",
    telefono: "987654321",
    correo: "empleado@negocio.com",
    negocioId: 1,
    fechaRegistro: new Date().toISOString(),
    usuarioId: 2,
  },
];

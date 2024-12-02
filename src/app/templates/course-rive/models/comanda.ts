export interface Comanda {
  id: number;
  productoId: number;
  cantidad: number;
  estado: string;
  meseroId?: number;
  mesaId?: number;
  negocioId: number;
  idCuenta?: number;
  fechaRegistro?: string;
}

export const comandasList: Comanda[] = [
  {
    id: 1,
    productoId: 1,
    cantidad: 2,
    estado: "Pendiente",
    meseroId: 1,
    mesaId: 1,
    negocioId: 1,
    idCuenta: 1,
    fechaRegistro: new Date().toISOString(),
  },
  {
    id: 2,
    productoId: 2,
    cantidad: 1,
    estado: "Finalizado",
    meseroId: 2,
    mesaId: 1,
    negocioId: 1,
    idCuenta: 1,
    fechaRegistro: new Date().toISOString(),
  },
];

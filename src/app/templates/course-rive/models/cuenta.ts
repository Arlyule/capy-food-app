export interface Cuenta {
  id: number;
  idMesa: number;
  total: number;
  fechaRegistro: string;
  estado: string;
  negocioId: number;
}

export const cuentasList: Cuenta[] = [
  {
    id: 1,
    idMesa: 1,
    total: 50.0,
    fechaRegistro: new Date().toISOString(),
    estado: "Cerrada",
    negocioId: 1,
  },
  {
    id: 2,
    idMesa: 1,
    total: 30.0,
    fechaRegistro: new Date().toISOString(),
    estado: "Abierta",
    negocioId: 1,
  },
  {
    id: 3,
    idMesa: 2,
    total: 50.0,
    fechaRegistro: new Date().toISOString(),
    estado: "Abierta",
    negocioId: 1,
  },
];

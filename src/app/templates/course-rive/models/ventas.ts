export interface VentaDia {
  id: number;
  negocioId: number;
  total: number;
  fechaRegistro: string;
  fechaCierre?: string;
}

export const ventasDiaList: VentaDia[] = [
  {
    id: 1,
    negocioId: 1,
    total: 199.98,
    fechaRegistro: new Date().toISOString().split('T')[0],
    fechaCierre: new Date().toISOString(),
  },
];

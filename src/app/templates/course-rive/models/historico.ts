export interface HistoricoIngreso {
  id: number;
  negocioId: number;
  total: number;
  fechaHistorico: string;
}

export const historicoIngresosList: HistoricoIngreso[] = [
  {
    id: 1,
    negocioId: 1,
    total: 1000.00,
    fechaHistorico: new Date().toISOString().split('T')[0],
  },
];

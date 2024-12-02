export interface Categoria {
  id: number;
  nombreCategoria: string;
  negocioId?: number;
  parentId?: number;
  esGlobal: boolean;
}

export const categoriasList: Categoria[] = [
  {
    id: 1,
    nombreCategoria: "Alimentos",
    negocioId: 1,
    parentId: 1,
    esGlobal: true,
  },
  {
    id: 2,
    nombreCategoria: "Ropa",
    negocioId: 2,
    parentId: 1,
    esGlobal: false,
  },
  {
    id: 3,
    nombreCategoria: "Electrónica",
    negocioId: 3,
    parentId: 2,
    esGlobal: true,
  },
  {
    id: 4,
    nombreCategoria: "Hogar",
    negocioId: 1,
    parentId: 2,
    esGlobal: false,
  },
  {
    id: 5,
    nombreCategoria: "Deportes",
    negocioId: 4,
    parentId: 3,
    esGlobal: true,
  },
  {
    id: 6,
    nombreCategoria: "Salud",
    negocioId: 5,
    parentId: 3,
    esGlobal: true,
  },
  {
    id: 7,
    nombreCategoria: "Juguetes",
    negocioId: 6,
    parentId: 4,
    esGlobal: false,
  },
  {
    id: 8,
    nombreCategoria: "Música",
    negocioId: 7,
    parentId: 4,
    esGlobal: true,
  },
  {
    id: 9,
    nombreCategoria: "Libros",
    negocioId: 8,
    parentId: 5,
    esGlobal: false,
  },
  {
    id: 10,
    nombreCategoria: "Automotriz",
    negocioId: 9,
    parentId: 5,
    esGlobal: true,
  },
];

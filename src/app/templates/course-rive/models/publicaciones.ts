export interface Comentario {
  id: number;
  idUsuario: number; // FK a la tabla de usuarios
  idNegocio: number; // FK a la tabla de negocios
  puntuacion: number;
  comentarios: string;
  imagen: string | null; // Opcional, podría ser null si no hay imagen
}

export const comentariosList: Comentario[] = [
  {
    id: 1,
    idUsuario: 1,
    idNegocio: 1,
    puntuacion: 5,
    comentarios: 'Excelente servicio, muy recomendado!',
    imagen: null, // O una URL si se incluye una imagen
  },
  {
    id: 2,
    idUsuario: 2,
    idNegocio: 1,
    puntuacion: 4,
    comentarios: 'La comida estaba buena, pero el tiempo de espera fue largo.',
    imagen: 'url-imagen.jpg',
  },
  {
    id: 3,
    idUsuario: 3,
    idNegocio: 2,
    puntuacion: 3,
    comentarios: 'No estuvo mal, pero me esperaba más por el precio.',
    imagen: null,
  },
];

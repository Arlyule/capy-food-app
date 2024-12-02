export interface Login {
  username: string;
  password: string;
}


export interface Registro {
  username: string;
  password: string;
  correo: string;
  rol_id: number;
}


export interface RespuestaLogin {
  codigo: number;
  mensaje: string;
  objeto: {
    id: number;
    username: string;
    correo: string;
    rol_id: number;
    token: string;
    session_token: string;
  };
}

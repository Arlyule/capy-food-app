import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Login } from '../models/login';
import { Registro } from '../models/login';
import { RespuestaLogin } from '../models/login';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  /**
   * Función para hacer login de un usuario
   * @param loginData Datos de login (username y password)
   * @returns Observable<RespuestaLogin>
   */
  login(loginData: Login): Observable<RespuestaLogin> {
    const url = `${this.apiUrl}/login`;
    return this.http.post<RespuestaLogin>(url, loginData);
  }

  /**
   * Función para registrar un nuevo usuario
   * @param registroData Datos de registro (username, password, correo, rol_id)
   * @returns Observable<any>
   */
  register(registroData: Registro): Observable<any> {
    const url = `${this.apiUrl}/register`;
    return this.http.post<any>(url, registroData);
  }
}

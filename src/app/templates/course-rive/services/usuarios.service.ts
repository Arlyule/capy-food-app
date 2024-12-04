import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Negocio } from '../models/negocios';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  /**
 * Función para listar los roles
 * @param data Datos del filtrado
 * @returns Observable<any>
 */
  getRoles(data: any): Observable<any> {
    const url = `${this.apiUrl}/sps-roles`;
    return this.http.post<any>(url, data);
  }
}

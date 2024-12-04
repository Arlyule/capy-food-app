import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Negocio } from '../models/negocios';

@Injectable({
  providedIn: 'root'
})
export class NegociosService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  /**
 * Función para listar todos los negocios
 * @param data Datos del filtrado
 * @returns Observable<any>
 */
  getAllNegocios(data: any): Observable<any> {
    const url = `${this.apiUrl}/sps-clientes-negocios`;
    return this.http.post<any>(url, data);
  }

  /**
  * Función para guardar un negocio
  * @param data Datos del negocio
  * @returns Observable<any>
  */
  guardarNegocio(data: any): Observable<any> {
    const url = `${this.apiUrl}/crud-clientes-negocios`;
    return this.http.post<any>(url, { data, accion: 1 });
  }

}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmpleadosService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  /**
 * Función para listar empleados
 * @param data Datos del filtrado
 * @returns Observable<any>
 */
  getEmpleadosByNegocioId(data: any): Observable<any> {
    const url = `${this.apiUrl}/sps-empleados`;
    return this.http.post<any>(url, data);
  }

  /**
  * Función para operaciones CRUD empleados
  * @param data Datos del filtrado
  * @returns Observable<any>
  */
  crudEmpleados(data: any): Observable<any> {
    const url = `${this.apiUrl}/crud-empleados`;
    return this.http.post<any>(url, data);
  }

  notificarCorreo(correoData: any) {
    const url = `${this.apiUrl}/notificar`;
    return this.http.post<any>(url, correoData);
  }
}

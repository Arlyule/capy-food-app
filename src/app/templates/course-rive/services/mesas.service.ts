import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MesasService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  /**
 * Función para listar mesas
 * @param data Datos del filtrado
 * @returns Observable<any>
 */
  getMesas(data: any): Observable<any> {
    const url = `${this.apiUrl}/mesas`;
    return this.http.post<any>(url, data);
  }

    /**
   * Función para listar mesas
   * @param data Datos del filtrado
   * @returns Observable<any>
   */
    crudMesas(data: any): Observable<any> {
      const url = `${this.apiUrl}/crud-mesas`;
      return this.http.post<any>(url, data);
    }
}

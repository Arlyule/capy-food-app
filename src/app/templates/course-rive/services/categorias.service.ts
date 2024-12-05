import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {


  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }
  /**
* Función para listar todos los negocios
* @param data Datos del filtrado
* @returns Observable<any>
*/
  getAllCategorias(data: any, accion: number): Observable<any> {
    const url = `${this.apiUrl}/categorias`;
    return this.http.post<any>(url, { data, accion: accion });
  }

}

import { Component, OnInit } from '@angular/core';
import { negociosList, Negocio } from '../../../models/negocios';
import { categoriasList } from '../../../models/categorias';
import { menusList, Menu } from '../../../models/menu';

@Component({
  selector: 'app-catalogo-negocios',
  templateUrl: './catalogo-negocios.component.html',
  styleUrls: ['./catalogo-negocios.component.scss'],
})
export class CatalogoNegociosComponent implements OnInit {
  negocios = negociosList;
  filteredNegocios: Negocio[] = this.negocios; // Inicialmente mostramos todos los negocios
  searchTerm: string = ''; // Término de búsqueda
  allNegocios: Negocio[] = [...this.negocios]; // Almacena todos los negocios
  negocioColors: Map<number, string> = new Map(); // Mapa para almacenar los colores de cada negocio
  categoriasList = categoriasList; // Lista de categorías
  menusList = menusList; // Lista de menús

  constructor() { }

  ngOnInit() {
    // Asignamos colores aleatorios a cada negocio
    this.negocios.forEach((negocio) => {
      this.negocioColors.set(negocio.id, this.generateRandomColor());
    });
    this.filteredNegocios = [...this.negocios];
  }

  // Método para manejar errores en imágenes
  handleImageError(event: Event) {
    const target = event.target as HTMLImageElement;
    target.src = 'https://ionicframework.com/docs/img/demos/thumbnail.svg'; // URL de imagen predeterminada
  }

  // Método para filtrar negocios
  filterNegocios() {
    this.filteredNegocios = this.allNegocios.filter(
      (negocio) =>
        negocio.nombre.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        (negocio.telefono && negocio.telefono.includes(this.searchTerm)) ||
        (negocio.correo &&
          negocio.correo.toLowerCase().includes(this.searchTerm.toLowerCase()))
    );
  }

  // Método actualizado para devolver el degradado en formato rgb
  generateRandomColor(): string {
    // Retornar el degradado con los colores en formato rgb
    return 'linear-gradient(135deg, rgb(252, 135, 40),rgb(255, 107, 39),rgb(255, 85, 0))';
  }

  // Método para obtener el color de un negocio por su id
  getNegocioColor(id: number): string {
    // Devuelve el degradado en lugar de un color único
    return this.negocioColors.get(id) || 'linear-gradient(135deg, rgb(252, 135, 40),rgb(255, 107, 39),rgb(255, 85, 0))';
  }


  // Método para hacer seguimiento de los negocios
  trackNegocios(i: number, negocio: Negocio) {
    return `${negocio.id}_${i}`;
  }

  // Método para hacer seguimiento de los menús
  trackMenus(i: number, menu: Menu) {
    return `${menu.id}_${i}`;
  }

  // Método para cargar más negocios cuando el usuario haga scroll
  loadMore(event: any) {
    setTimeout(() => {
      const currentLength = this.filteredNegocios.length;
      const nextNegocios = this.allNegocios.slice(
        currentLength,
        currentLength + 5
      );
      this.filteredNegocios = [...this.filteredNegocios, ...nextNegocios];
      nextNegocios.forEach((negocio) => {
        if (!this.negocioColors.has(negocio.id)) {
          this.negocioColors.set(negocio.id, this.generateRandomColor());
        }
      });
      event.target.complete();
    }, 500);
  }
}

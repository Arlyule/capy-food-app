import { Component, OnInit } from '@angular/core';
import { CategoriasService } from '../../../services/categorias.service';
import { NegociosService } from '../../../services/negocios.service'; // Inyectar NegociosService
import { MenuService } from '../../../services/menu.service';

@Component({
  selector: 'app-catalogo-negocios',
  templateUrl: './catalogo-negocios.component.html',
  styleUrls: ['./catalogo-negocios.component.scss'],
})
export class CatalogoNegociosComponent implements OnInit {
  negocios: any[] = []; // Negocios obtenidos del servicio
  filteredNegocios: any[] = []; // Negocios filtrados
  searchTerm: string = ''; // Término de búsqueda
  negocioColors: Map<number, string> = new Map(); // Mapa para almacenar colores
  categorias: any[] = []; // Categorías obtenidas del servicio
  menus: Map<number, any[]> = new Map(); // Menús de los negocios
  accordionState: Map<number, boolean> = new Map();  // Mapa para almacenar el estado de los acordeones

  constructor(
    private categoriasService: CategoriasService,
    private negociosService: NegociosService, // Inyectar el servicio de negocios
    private menuService: MenuService // Inyectar el servicio de menús
  ) { }

  ngOnInit() {
    this.loadNegociosYCategorias();
  }

  // Cargar negocios y categorías desde el servicio
  loadNegociosYCategorias() {
    const requestData = { data: {}, accion: 1 }; // Parámetros para la consulta de negocios (filtrado si es necesario)

    this.negociosService.getAllNegocios(requestData).subscribe({
      next: (response) => {
        if (response.codigo === '0') {
          // Asignar los negocios a la propiedad negocios
          this.negocios = response.info;
          this.filteredNegocios = [...this.negocios]; // Inicializar negocios filtrados

          // Asignar colores aleatorios a cada negocio
          this.negocios.forEach((negocio) => {
            this.negocioColors.set(negocio.id, this.generateRandomColor());
          });

          // Cargar las categorías y menús
          this.loadCategoriasYMenus();
        }
      },
      error: (err) => {
        console.error('Error al cargar los negocios:', err);
      },
    });
  }

  // Cargar categorías y subcategorías
  loadCategoriasYMenus() {
    const requestData = { data: {}, accion: 4 };

    this.categoriasService.getAllCategorias(requestData, 4).subscribe({
      next: (response) => {
        if (response.codigo === '0') {
          // Organizar categorías y subcategorías
          this.categorias = response.info.map((cat: any) => ({
            id_categoria: cat.id_categoria,
            nombre_categoria: cat.nombre_categoria,
            subcategorias: cat.subcategorias || [],
          }));

          // Cargar los menús de cada negocio
          this.loadMenus();
        }
      },
      error: (err) => {
        console.error('Error al cargar categorías:', err);
      },
    });
  }

  // Cargar los menús de cada negocio
  loadMenus() {
    this.negocios.forEach((negocio) => {
      const requestData = { data: { negocioId: negocio.id }, accion: 3 }; // Parámetros para la consulta de menús, pasando el ID del negocio

      this.menuService.getAllCategorias(requestData, 3).subscribe({
        next: (response) => {
          if (response.codigo === '0') {
            // Almacenar los menús de cada negocio
            this.menus.set(negocio.id, response.info);
          }
        },
        error: (err) => {
          console.error(`Error al cargar menús para el negocio ${negocio.id}:`, err);
        },
      });
    });
  }

  // Método para manejar errores en imágenes
  handleImageError(event: Event) {
    const target = event.target as HTMLImageElement;
    target.src = 'https://ionicframework.com/docs/img/demos/thumbnail.svg';
  }

  // Filtrar negocios por término de búsqueda
  filterNegocios() {
    this.filteredNegocios = this.negocios.filter(
      (negocio) =>
        negocio.nombre.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  // Generar un degradado aleatorio
  generateRandomColor(): string {
    return 'linear-gradient(135deg, rgb(252, 135, 40),rgb(255, 107, 39),rgb(255, 85, 0))';
  }

  // Obtener el color del negocio
  getNegocioColor(id: number): string {
    return this.negocioColors.get(id) || 'linear-gradient(135deg, rgb(252, 135, 40),rgb(255, 107, 39),rgb(255, 85, 0))';
  }

  // Método para alternar el estado del acordeón
  toggleAccordion(negocioId: number) {
    const currentState = this.accordionState.get(negocioId) || false;
    this.accordionState.set(negocioId, !currentState);
  }

  // Seguimiento para la lista de negocios
  trackNegocios(index: number, negocio: any): string {
    return negocio.id; // Retorna el ID del negocio
  }

  // Seguimiento para la lista de categorías
  trackCategorias(index: number, categoria: any): string {
    return categoria.id_categoria; // Retorna el ID de la categoría
  }

  // Seguimiento para la lista de subcategorías
  trackSubcategorias(index: number, subcategoria: any): string {
    return subcategoria.id_subcategoria; // Retorna el ID de la subcategoría
  }

  // Seguimiento para la lista de menús
  trackMenus(index: number, menu: any): string {
    return menu.id; // Retorna el ID del producto/menú
  }


  // Método para cargar más negocios (opcional)
  loadMore(event: any) {
    setTimeout(() => {
      const currentLength = this.filteredNegocios.length;
      const nextNegocios = this.negocios.slice(
        currentLength,
        currentLength + 5
      );
      this.filteredNegocios = [...this.filteredNegocios, ...nextNegocios];
      event.target.complete();
    }, 500);
  }

}

import { Component, OnInit } from '@angular/core';
import { InfiniteScrollCustomEvent } from '@ionic/angular';
import { CategoriasService } from '../../services/categorias.service';
import { MenuService } from '../../services/menu.service';
import { NegociosService } from '../../services/negocios.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  productos: any[] = []; // Lista de productos obtenidos desde el servicio
  categoriasList: any[] = []; // Lista de categorías obtenidas desde el servicio
  negociosList: any[] = []; // Lista de negocios obtenidos desde el servicio
  currentProductoIndex = 0; // Índice actual para el scroll infinito
  negocioColors = new Map<number, string>(); // Mapa para asociar colores a los negocios

  constructor(
    private categoriasService: CategoriasService,
    private menuService: MenuService,
    private negociosService: NegociosService
  ) { }

  ngOnInit() {
    this.loadCategorias();
    console.log(this.categoriasList);
    this.loadProductos();
    this.loadNegocios();
  }

  // Cargar categorías desde el servicio
  loadCategorias() {
    this.categoriasService.getAllCategorias({}, 4).subscribe((response) => {
      console.log(response);
      if (response.codigo === '0') {
        this.categoriasList = response.info;
        console.log(response.info);
      }
    });
  }

  // Cargar productos desde el servicio
  loadProductos() {
    this.menuService.getAllCategorias({}, 3).subscribe((response) => {
      if (response.codigo === '0') {
        this.productos = response.info;
        this.assignColorsToNegocios();
      }
    });
  }

  // Cargar negocios desde el servicio
  loadNegocios() {
    this.negociosService.getAllNegocios({ accion: 1 }).subscribe((response) => {
      if (response.codigo === '0') {
        this.negociosList = response.info;
      }
    });
  }

  // Método para asignar uno de los tres colores al azar
  generateRandomColor(): string {
    return 'linear-gradient(135deg, rgb(252, 135, 40),rgb(255, 107, 39),rgb(255, 85, 0))';
  }

  // Obtener el color de un negocio por su ID
  getNegocioColor(id: number): string {
    return this.negocioColors.get(id) || this.generateRandomColor();
  }

  // Asignar colores aleatorios a cada negocio
  private assignColorsToNegocios() {
    this.productos.forEach((producto) => {
      if (!this.negocioColors.has(producto.negocio_id)) {
        const color = this.generateRandomColor();
        this.negocioColors.set(producto.negocio_id, color);
      }
    });
  }

  // Manejo de error en la carga de la imagen
  handleImageError(event: any) {
    event.target.src = 'https://ionicframework.com/docs/img/demos/thumbnail.svg';
  }

  // Seguimiento de los productos en el *ngFor
  trackProductos(i: number, producto: any) {
    return `${producto.nombre_producto}_${i}`;
  }

  // Función para cargar más productos con el scroll infinito
  onIonInfinite(ev: InfiniteScrollCustomEvent) {
    this.loadMoreProductos();
    setTimeout(() => {
      ev.target.complete();
    }, 500);
  }

  private loadMoreProductos() {
    // Simula la carga de más productos
    const newProductos = this.productos.slice(this.currentProductoIndex, this.currentProductoIndex + 5);
    this.productos = [...this.productos, ...newProductos];
    this.currentProductoIndex += 5;
  }

  // Filtrar productos por categoría
  getProductosPorCategoria(categoriaId: number) {
    return this.productos.filter((producto) => producto.categoria_id === categoriaId);
  }

  isProductoEnCategoria(categoria: any, producto: any): boolean {
    return categoria.subcategorias && categoria.subcategorias.some((sub: any) => sub.id_subcategoria === producto.categoria_id);
  }

}

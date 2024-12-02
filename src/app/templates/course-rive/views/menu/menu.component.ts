import { Component, OnInit } from '@angular/core';
import { InfiniteScrollCustomEvent } from '@ionic/angular'; // Importa el tipo

import { Categoria, categoriasList } from '../../models/categorias';
import { Menu, menusList } from '../../models/menu';
import { Negocio, negociosList } from '../../models/negocios'; // Importa la lista de negocios

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  productos: Menu[] = [...menusList];  // Usamos una copia de la lista de productos
  categoriasList = categoriasList;  // Lista de categorías
  negociosList: Negocio[] = negociosList; // Lista de negocios
  currentProductoIndex = 0;
  negocioColors = new Map<number, string>();  // Para almacenar los colores de los negocios

  constructor() { }

  ngOnInit() {
    this.assignColorsToNegocios();  // Asignar colores a los negocios al iniciar
  }

  // Método para asignar uno de los tres colores al azar
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


  // Asigna colores aleatorios a cada negocio
  assignColorsToNegocios() {
    this.productos.forEach((producto) => {
      const color = this.generateRandomColor();
      this.negocioColors.set(producto.id, color);  // Asignamos el color al negocio
    });
  }

  // Manejo de error en la carga de la imagen
  handleImageError(event: any) {
    event.target.src = 'https://ionicframework.com/docs/img/demos/thumbnail.svg';  // Imagen por defecto
  }

  trackProductos(i: number, producto: Menu) {
    return `${producto.nombreProducto}_${i}`;
  }

  // Función para cargar más productos cuando el usuario se desplaza
  onIonInfinite(ev: InfiniteScrollCustomEvent) {  // Tipado explícito aquí
    this.loadMoreProductos();
    setTimeout(() => {
      ev.target.complete();  // Usamos ev.target.complete() para completar el evento
    }, 500);
  }

  private loadMoreProductos() {
    // Simulando la carga de más productos
    const newProductos = menusList.slice(this.currentProductoIndex, this.currentProductoIndex + 5);
    this.productos = [...this.productos, ...newProductos];
    this.currentProductoIndex += 5;
  }

  // Filtrar productos por categoría
  getProductosPorCategoria(categoriaId: number) {
    return this.productos.filter(producto => producto.categoriaId === categoriaId);
  }
}

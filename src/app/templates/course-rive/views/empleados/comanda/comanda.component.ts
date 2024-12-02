import { Component, OnInit } from '@angular/core';
import { mesasList, Mesa } from '../../../models/mesas';
import { cuentasList, Cuenta } from '../../../models/cuenta';
import { Menu, menusList } from '../../../models/menu'; // Importa las interfaces de Menu
import { Comanda, comandasList } from '../../../models/comanda'; // Importa las interfaces de Comanda
import { categoriasList } from '../../../models/categorias';

@Component({
  selector: 'app-comanda',
  templateUrl: './comanda.component.html',
  styleUrls: ['./comanda.component.scss'],
})
export class ComandaComponent implements OnInit {
  mesas = mesasList;
  categorias = categoriasList;
  menus = menusList;
  isCategoriaDisabled: boolean = false;
  isProductoDisabled: boolean = true;
  isCantidadDisabled: boolean = true;
  productosFiltrados: Menu[] = [];
  filteredMesas: Mesa[] = [...this.mesas];
  searchTerm: string = '';
  allMesas: Mesa[] = [...this.mesas];
  mesaColors: Map<number, string> = new Map();
  mesaSeleccionado: Mesa = {
    id: 0,
    numero: 0,
    capacidad: 0,
    negocioId: 0,
  };

  // Variable para la comanda seleccionada
  comandaSeleccionada: Comanda = {
    id: 0,
    productoId: 0,
    cantidad: 0,
    estado: '',
    negocioId: 0,
  };

  constructor() { }

  ngOnInit() {
    // Asignar colores aleatorios a las mesas
    this.mesas.forEach((mesa) => {
      this.mesaColors.set(mesa.id, this.generateRandomColor());
    });
  }

  // Filtrar mesas por búsqueda
  filterMesas() {
    this.filteredMesas = this.allMesas.filter(
      (mesa) =>
        mesa.numero.toString().includes(this.searchTerm) ||
        mesa.capacidad.toString().includes(this.searchTerm)
    );
  }

  // Método para generar un color aleatorio para las mesas
  generateRandomColor(): string {
    return 'linear-gradient(180deg,rgb(252, 135, 40),rgb(255, 107, 39),rgb(255, 85, 0))';
  }

  // Método para obtener el color de una mesa por su id
  getMesaColor(id: number): string {
    return (
      this.mesaColors.get(id) ||
      'linear-gradient(180deg, rgb(252, 135, 40),rgb(255, 107, 39),rgb(255, 85, 0))'
    );
  }

  // Track por ID
  trackMesas(i: number, mesa: Mesa) {
    return mesa.id;
  }

  // Cargar más mesas
  loadMore(event: any) {
    setTimeout(() => {
      const currentLength = this.filteredMesas.length;
      const nextMesas = this.allMesas.slice(
        currentLength,
        currentLength + 5
      );
      this.filteredMesas = [...this.filteredMesas, ...nextMesas];
      event.target.complete();
    }, 500);
  }

  // Abrir modal para actualizar mesa
  openUpdateModal(mesa: Mesa, modal: any, comanda: Comanda) {
    this.comandaSeleccionada = { ...comanda }; // Clonar la comanda seleccionada para editarla
    modal.present(); // Mostrar el modal
  }

  // Actualizar comanda
  updateComanda() {
    const index = comandasList.findIndex((comanda) => comanda.id === this.comandaSeleccionada.id);
    if (index !== -1) {
      const alert = document.createElement('ion-alert');
      alert.header = '¿Estás seguro?';
      alert.message = '¿Seguro que quieres actualizar esta comanda?';
      alert.buttons = [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {

          },
        },
        {
          text: 'Confirmar',
          handler: () => {
            comandasList[index] = { ...this.comandaSeleccionada };
            const successAlert = document.createElement('ion-alert');
            successAlert.header = 'Comanda Actualizada';
            successAlert.message = 'La comanda ha sido actualizada correctamente.';
            successAlert.buttons = ['OK'];
            document.body.appendChild(successAlert);
            successAlert.present();
          },
        },
      ];

      document.body.appendChild(alert);
      alert.present();
    }
  }

  // Verificar si existe una cuenta activa para la mesa
  isCuentaActiva(idMesa: number): boolean {
    const cuentaActiva = cuentasList.find(
      (cuenta) => cuenta.idMesa === idMesa && cuenta.estado === 'Abierta'
    );
    return cuentaActiva !== undefined;
  }

  // Obtener el total de una cuenta activa para la mesa
  getTotalCuenta(idMesa: number): number {
    const cuentaActiva = cuentasList.find(
      (cuenta) => cuenta.idMesa === idMesa && cuenta.estado === 'Abierta'
    );
    return cuentaActiva ? cuentaActiva.total : 0;
  }

  // Confirmar si desea agregar una cuenta para la mesa
  confirmarAgregarCuenta(idMesa: number) {
    const alert = document.createElement('ion-alert');
    alert.header = '¿Estás seguro?';
    alert.message = '¿Seguro que quieres crear una cuenta para esta mesa?';
    alert.buttons = [
      {
        text: 'Cancelar',
        role: 'cancel',
        handler: () => { },
      },
      {
        text: 'Confirmar',
        handler: () => {
          this.agregarCuenta(idMesa);
        },
      },
    ];

    document.body.appendChild(alert);
    alert.present();
  }

  // Agregar una cuenta con total = 0
  agregarCuenta(idMesa: number) {
    const nuevaCuenta: Cuenta = {
      id: cuentasList.length + 1, // Asumiendo que se genera un nuevo ID
      idMesa: idMesa,
      total: 0,
      fechaRegistro: new Date().toISOString(),
      estado: 'Abierta', // Cuenta recién creada, se asume que está activa
      negocioId: 1, // Puedes ajustarlo según el negocio
    };
    cuentasList.push(nuevaCuenta); // Agregar la cuenta a la lista
  }

  // Obtener las comandas de una mesa activa
  getComandasForMesa(mesaId: number) {
    // Filtra las comandas para la mesa con idMesa activa
    return comandasList.filter(
      comanda => comanda.mesaId === mesaId && comanda.idCuenta !== undefined
    );
  }

  // Obtener el nombre del producto desde el menú por el productoId
  getMenuNameByProductId(productoId: number): string {
    const menuItem = menusList.find(menu => menu.id === productoId);
    return menuItem ? menuItem.nombreProducto : 'Producto no encontrado';
  }

  openAddModal(mesa: Mesa, modal: any) {
    this.mesaSeleccionado = { ...mesa }; // Clonar la mesa para editarla
    modal.present(); // Mostrar el modal
  }

  onCategoriaChange(event: any) {
    const categoriaId = event.detail.value;
    // Filtrar los productos que pertenecen a la categoría seleccionada
    this.productosFiltrados = this.menus.filter(producto => producto.categoriaId === categoriaId);
    // Habilitar el selector de productos
    this.isProductoDisabled = false;
  }

  // Método que se ejecuta cuando se selecciona un producto
  onProductoChange(event: any) {
    const productoId = event.detail.value;
    // Habilitar el campo de cantidad
    if (productoId) {
      this.isCantidadDisabled = false;
    }
  }

  // Método para agregar un pedido con confirmación
  addComanda() {
    const alert = document.createElement('ion-alert');
    alert.header = '¿Estás seguro?';
    alert.message = '¿Seguro que quieres agregar este pedido?';
    alert.buttons = [
      {
        text: 'Cancelar',
        role: 'cancel',
        handler: () => {
          console.log('Agregar pedido cancelado');
        },
      },
      {
        text: 'Confirmar',
        handler: () => {

          console.log('Pedido agregado:', this.comandaSeleccionada);

          // Mostrar una alerta de éxito
          const successAlert = document.createElement('ion-alert');
          successAlert.header = 'Pedido Agregado';
          successAlert.message = 'El pedido ha sido agregado correctamente.';
          successAlert.buttons = ['OK'];
          document.body.appendChild(successAlert);
          successAlert.present();
        },
      },
    ];

    document.body.appendChild(alert);
    alert.present();
  }
}

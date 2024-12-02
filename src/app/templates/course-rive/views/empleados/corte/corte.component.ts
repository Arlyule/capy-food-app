import { Component, OnInit } from '@angular/core';
import { Comanda, comandasList } from '../../../models/comanda';
import { cuentasList } from '../../../models/cuenta';
import { menusList } from '../../../models/menu';
import { Mesa, mesasList } from '../../../models/mesas';
import { negociosList } from '../../../models/negocios';

@Component({
  selector: 'app-corte',
  templateUrl: './corte.component.html',
  styleUrls: ['./corte.component.scss'],
})
export class CorteComponent implements OnInit {
  searchQuery: string = '';
  filteredMesas: Mesa[] = [];
  allMesas: Mesa[] = mesasList;

  constructor() { }

  ngOnInit() {
    this.filteredMesas = [...this.allMesas];
  }

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

  // Filtrar mesas basado en el buscador
  filterMesas() {
    if (!this.searchQuery) {
      this.filteredMesas = [...this.allMesas];
    } else {
      this.filteredMesas = this.allMesas.filter(mesa => {
        return mesa.numero.toString().includes(this.searchQuery);
      });
    }
  }

  // Obtener las cuentas asociadas a una mesa
  getCuentasPorMesa(mesaId: number) {
    return cuentasList.filter(cuenta => cuenta.idMesa === mesaId);
  }

  // Obtener el nombre del negocio
  getNegocioNombre(negocioId: number): string {
    const negocio = negociosList.find(neg => neg.id === negocioId);
    return negocio ? negocio.nombre : '';
  }

  // Obtener las comandas asociadas a una cuenta
  getComandasPorCuenta(cuentaId: number): Comanda[] {
    return comandasList.filter(comanda => comanda.idCuenta === cuentaId);
  }

  // Obtener el nombre del producto en el menú
  getMenuNombre(productoId: number): string {
    const menu = menusList.find(item => item.id === productoId);
    return menu ? menu.nombreProducto : '';
  }

  // Obtener el precio del producto en el menú
  getMenuPrecio(productoId: number): number {
    const menu = menusList.find(item => item.id === productoId);
    return menu ? menu.precio : 0;
  }

  // Calcular el total de la cuenta sumando el precio * cantidad de todas las comandas
  calcularTotalCuenta(cuentaId: number): number {
    const comandas = this.getComandasPorCuenta(cuentaId);
    return comandas.reduce((total, comanda) => {
      const precio = this.getMenuPrecio(comanda.productoId);
      return total + (precio * comanda.cantidad);
    }, 0);
  }

  // Función para cambiar el estado de la cuenta
  cerrarCuenta(cuentaId: number) {
    const cuenta = cuentasList.find(c => c.id === cuentaId);
    if (cuenta) {
      // Crear alerta de confirmación
      const alert = document.createElement('ion-alert');
      alert.header = '¿Estás seguro?';
      alert.message = '¿Seguro que quieres cerrar esta cuenta?';
      alert.buttons = [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            // No hacer nada al cancelar
          },
        },
        {
          text: 'Confirmar',
          handler: () => {
            // Cambiar el estado de la cuenta
            cuenta.estado = 'Cerrada';

            // Crear alerta de éxito
            const successAlert = document.createElement('ion-alert');
            successAlert.header = 'Cuenta Cerrada';
            successAlert.message = 'La cuenta ha sido cerrada correctamente.';
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
}

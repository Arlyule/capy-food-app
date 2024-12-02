import { Component, OnInit } from '@angular/core';
import { Negocio, negociosList } from '../../../models/negocios';
import { Mesa, mesasList } from '../../../models/mesas';
import { Menu, menusList } from '../../../models/menu';

@Component({
  selector: 'app-administrar-apartados-negocio',
  templateUrl: './administrar-apartados-negocio.component.html',
  styleUrls: ['./administrar-apartados-negocio.component.scss'],
})
export class AdministrarApartadosNegocioComponent implements OnInit {
  negocios = negociosList;
  menus = mesasList;
  filteredNegocios: Negocio[] = [...this.negocios];
  searchTerm: string = '';
  allNegocios: Negocio[] = [...this.negocios];
  negocioColors: Map<number, string> = new Map();
  selectedOption: string = '';
  // Inicialización de negocioSeleccionado con valores predeterminados.
  negocioSeleccionado: Negocio = {
    id: 0,
    nombre: '',
    telefono: '',
    correo: '',
    direccion: '',
    usuarioId: 0,
  };

  mesaSeleccionado: Mesa = {
    id: 0,
    numero: 0,
    negocioId: 0,
    capacidad: 0,
  }


  // Lista de opciones para el dropdown
  options = [
    { label: 'Opción 1', value: '1' },
    { label: 'Opción 2', value: '2' },
    { label: 'Opción 3', value: '3' },
  ];

  constructor() { }

  ngOnInit() {
    // Asignar colores aleatorios a los negocios
    this.negocios.forEach((negocio) => {
      this.negocioColors.set(negocio.id, this.generateRandomColor());
    });
  }

  // Filtrar negocios por búsqueda
  filterNegocios() {
    this.filteredNegocios = this.allNegocios.filter(
      (negocio) =>
        negocio.nombre.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        (negocio.telefono && negocio.telefono.includes(this.searchTerm)) ||
        (negocio.correo &&
          negocio.correo.toLowerCase().includes(this.searchTerm.toLowerCase()))
    );
  }

  // Abrir modal para actualizar negocio
  async openUpdateModal(negocio: Negocio, modal: any) {
    this.negocioSeleccionado = { ...negocio }; // Clonar el negocio para editarlo
    await modal.present(); // Mostrar el modal
  }

  // Actualizar negocio
  updateNegocio() {
    if (this.negocioSeleccionado !== null) {
      const index = this.allNegocios.findIndex(
        (n) => n.id === this.negocioSeleccionado?.id // Usamos el operador de encadenamiento opcional aquí
      );
      if (index !== -1) {
        // Confirmar actualización
        const confirmUpdate = confirm(
          '¿Estás seguro de que deseas actualizar este negocio?'
        );
        if (confirmUpdate) {
          this.allNegocios[index] = { ...this.negocioSeleccionado };
          this.filterNegocios(); // Actualizar lista filtrada
          alert('Negocio actualizado correctamente.');
        }
      }
    }
  }

  // Método actualizado para devolver el degradado en formato rgb
  generateRandomColor(): string {
    return 'linear-gradient(180deg,rgb(252, 135, 40),rgb(255, 107, 39),rgb(255, 85, 0))';
  }

  // Método para obtener el color de un negocio por su id
  getNegocioColor(id: number): string {
    return (
      this.negocioColors.get(id) ||
      'linear-gradient(180deg, rgb(252, 135, 40),rgb(255, 107, 39),rgb(255, 85, 0))'
    );
  }

  // Track por ID
  trackNegocios(i: number, negocio: Negocio) {
    return negocio.id;
  }

  // Cargar más negocios
  loadMore(event: any) {
    setTimeout(() => {
      const currentLength = this.filteredNegocios.length;
      const nextNegocios = this.allNegocios.slice(
        currentLength,
        currentLength + 5
      );
      this.filteredNegocios = [...this.filteredNegocios, ...nextNegocios];
      event.target.complete();
    }, 500);
  }

  openAddEmpleadoModal(negocio: Negocio, modal: any) {
    this.mesaSeleccionado.negocioId = negocio.id; // Asignar el negocioId
    modal.present();
  }

  getMesasByNegocio(negocioId: number): Mesa[] {
    return mesasList.filter(mesa => mesa.negocioId === negocioId);
  }

  deleteMesa(mesaId: number) {
    const alert = document.createElement('ion-alert');
    alert.header = '¿Estás seguro?';
    alert.message = '¿Seguro que quieres eliminar esta mesa?';
    alert.buttons = [
      {
        text: 'Cancelar',
        role: 'cancel',
        handler: () => {
          console.log('Mesa no eliminada');
        },
      },
      {
        text: 'Eliminar',
        handler: () => {
          this.removeMesa(mesaId);
        },
      },
    ];

    document.body.appendChild(alert);
    alert.present();
  }

  removeMesa(mesaId: number) {
    const index = mesasList.findIndex(mesa => mesa.id === mesaId);
    if (index !== -1) {
      mesasList.splice(index, 1);
      this.filterNegocios();  // Actualiza la lista de negocios después de eliminar el empleado

      // Mostrar alerta de éxito
      const successAlert = document.createElement('ion-alert');
      successAlert.header = 'Mesa ELiminada';
      successAlert.message = 'La mesa a sido eliminado correctamente.';
      successAlert.buttons = ['OK'];

      document.body.appendChild(successAlert);
      successAlert.present();
    }
  }

  addMesa() {
    if (this.mesaSeleccionado.negocioId) {
      // Crear la alerta de confirmación con los datos del empleado
      const confirmAlert = document.createElement('ion-alert');
      confirmAlert.header = 'Confirmar Agregar Mesa';
      confirmAlert.message = `¿Estás seguro de agregar la Mesa?`;
      confirmAlert.buttons = [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            // Alerta que muestra que el empleado no fue agregado
            const cancelAlert = document.createElement('ion-alert');
            cancelAlert.header = 'Mesa No Agregada';
            cancelAlert.message = 'La mesa no ha sido agregada.';
            cancelAlert.buttons = ['Aceptar'];

            document.body.appendChild(cancelAlert);
            cancelAlert.present();
          },
        },
        {
          text: 'Confirmar',
          handler: () => {
            // Agregar el nuevo empleado a la lista global
            mesasList.push({ ...this.mesaSeleccionado });

            // Resetear el empleado seleccionado
            this.mesaSeleccionado = {
              id: 0,
              numero: 0,
              capacidad: 0,
              negocioId: 0,
            };
            this.filterNegocios(); // Actualizar la lista filtrada

            // Crear la alerta de éxito
            const successAlert = document.createElement('ion-alert');
            successAlert.header = 'Mesa Agregada';
            successAlert.message = 'La mesaha sido agregado correctamente.';
            successAlert.buttons = ['Aceptar'];

            document.body.appendChild(successAlert);
            successAlert.present();
          },
        },
      ];

      document.body.appendChild(confirmAlert);
      confirmAlert.present();
    }
  }
}

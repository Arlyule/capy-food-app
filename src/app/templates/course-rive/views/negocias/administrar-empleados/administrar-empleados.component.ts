import { Component, OnInit } from '@angular/core';
import { empleadosList, Empleado } from '../../../models/empleados';
import { negociosList, Negocio } from '../../../models/negocios';


@Component({
  selector: 'app-administrar-empleados',
  templateUrl: './administrar-empleados.component.html',
  styleUrls: ['./administrar-empleados.component.scss'],
})
export class AdministrarEmpleadosComponent implements OnInit {
  negocios = negociosList;
  filteredNegocios: Negocio[] = [...this.negocios];
  searchTerm: string = '';
  allNegocios: Negocio[] = [...this.negocios];
  negocioColors: Map<number, string> = new Map();
  selectedOption: string = '';
  empleadoSeleccionado: Empleado = {
    id: 0,
    nombre: '',
    telefono: '',
    correo: '',
    negocioId: 0,
    fechaRegistro: new Date().toISOString(),
    usuarioId: 0, // Asignar un usuarioId adecuado
  };

  userOptions = [
    { label: 'Usuario 1', value: 1 },
    { label: 'Usuario 2', value: 2 },
    { label: 'Usuario 3', value: 3 },
  ];

  constructor() { }

  ngOnInit() {
    this.negocios.forEach((negocio) => {
      this.negocioColors.set(negocio.id, this.generateRandomColor());
    });
  }

  filterNegocios() {
    this.filteredNegocios = this.allNegocios.filter(
      (negocio) =>
        negocio.nombre.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        (negocio.telefono && negocio.telefono.includes(this.searchTerm)) ||
        (negocio.correo &&
          negocio.correo.toLowerCase().includes(this.searchTerm.toLowerCase()))
    );
  }

  openAddEmpleadoModal(negocio: Negocio, modal: any) {
    this.empleadoSeleccionado.negocioId = negocio.id; // Asignar el negocioId
    this.empleadoSeleccionado.fechaRegistro = new Date().toISOString(); // Fecha actual
    modal.present();
  }

  addEmpleado() {
    if (this.empleadoSeleccionado.nombre && this.empleadoSeleccionado.usuarioId) {
      // Crear la alerta de confirmación con los datos del empleado
      const confirmAlert = document.createElement('ion-alert');
      confirmAlert.header = 'Confirmar Agregar Empleado';
      confirmAlert.message = `¿Estás seguro de agregar a este empleado?

      Usuario: ${this.userOptions.find(option => option.value === this.empleadoSeleccionado.usuarioId)?.label}
    `;
      confirmAlert.buttons = [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            // Alerta que muestra que el empleado no fue agregado
            const cancelAlert = document.createElement('ion-alert');
            cancelAlert.header = 'Empleado No Agregado';
            cancelAlert.message = 'El empleado no ha sido agregado.';
            cancelAlert.buttons = ['Aceptar'];

            document.body.appendChild(cancelAlert);
            cancelAlert.present();
          },
        },
        {
          text: 'Confirmar',
          handler: () => {
            // Agregar el nuevo empleado a la lista global
            empleadosList.push({ ...this.empleadoSeleccionado });

            // Resetear el empleado seleccionado
            this.empleadoSeleccionado = {
              id: 0,
              nombre: '',
              telefono: '',
              correo: '',
              negocioId: 0,
              fechaRegistro: new Date().toISOString(),
              usuarioId: 0,
            };
            this.filterNegocios(); // Actualizar la lista filtrada

            // Crear la alerta de éxito
            const successAlert = document.createElement('ion-alert');
            successAlert.header = 'Empleado Agregado';
            successAlert.message = 'El empleado ha sido agregado correctamente.';
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

  generateRandomColor(): string {
    return 'linear-gradient(180deg,rgb(252, 135, 40),rgb(255, 107, 39),rgb(255, 85, 0))';
  }

  getNegocioColor(id: number): string {
    return (
      this.negocioColors.get(id) ||
      'linear-gradient(180deg, rgb(252, 135, 40),rgb(255, 107, 39),rgb(255, 85, 0))'
    );
  }

  trackNegocios(i: number, negocio: Negocio) {
    return negocio.id;
  }

  getEmpleadosByNegocio(negocioId: number): Empleado[] {
    return empleadosList.filter(empleado => empleado.negocioId === negocioId);
  }

  loadMore(event: any) {
    setTimeout(() => {
      const currentLength = this.filteredNegocios.length;
      const nextNegocios = this.allNegocios.slice(
        currentLength,
        currentLength + 10
      );
      this.filteredNegocios = [...this.filteredNegocios, ...nextNegocios];
      event.target.complete();
    }, 1000);
  }

  deleteEmpleado(empleadoId: number) {
    const alert = document.createElement('ion-alert');
    alert.header = '¿Estás seguro?';
    alert.message = '¿Seguro que quieres eliminar este empleado?';
    alert.buttons = [
      {
        text: 'Cancelar',
        role: 'cancel',
        handler: () => {
          console.log('Empleado no eliminado');
        },
      },
      {
        text: 'Eliminar',
        handler: () => {
          this.removeEmpleado(empleadoId);
        },
      },
    ];

    document.body.appendChild(alert);
    alert.present();
  }

  removeEmpleado(empleadoId: number) {
    const index = empleadosList.findIndex(empleado => empleado.id === empleadoId);
    if (index !== -1) {
      empleadosList.splice(index, 1);
      this.filterNegocios();  // Actualiza la lista de negocios después de eliminar el empleado

      // Mostrar alerta de éxito
      const successAlert = document.createElement('ion-alert');
      successAlert.header = 'Empleado Eliminado';
      successAlert.message = 'El empleado ha sido eliminado correctamente.';
      successAlert.buttons = ['OK'];

      document.body.appendChild(successAlert);
      successAlert.present();
    }
  }
}

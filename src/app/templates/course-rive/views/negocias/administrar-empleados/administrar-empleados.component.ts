import { Component, OnInit } from '@angular/core';
import { Empleado, empleadosList } from '../../../models/empleados';
import { Negocio } from '../../../models/negocios';
import { NegociosService } from '../../../services/negocios.service';
import { EmpleadosService } from '../../../services/empleados.service';
import { UsuariosService } from '../../../services/usuarios.service';

@Component({
  selector: 'app-administrar-empleados',
  templateUrl: './administrar-empleados.component.html',
  styleUrls: ['./administrar-empleados.component.scss'],
})
export class AdministrarEmpleadosComponent implements OnInit {
  negocios: Negocio[] = [];
  empleados: Empleado[] = [];
  filteredNegocios: Negocio[] = [];
  searchTerm: string = '';
  negocioColors: Map<number, string> = new Map();
  empleadoSeleccionado: Empleado = {
    //id: 0,
    nombre: '',
    telefono: '',
    correo: '',
    negocio_id: 0,
    //fechaRegistro: new Date().toISOString(),
    //usuarioId: 0,
    rol_id: 3,
  };

  roles: any[] = [];

  constructor(
    private negociosService: NegociosService,
    private empleadosService: EmpleadosService,
    private usuariosService: UsuariosService
  ) { }

  ngOnInit() {
    this.cargarNegocios();
    //this.cargarEmpleados();
    this.cargarRoles();
  }

  cargarEmpleados(negocio_id: number) {
    const filtro = {
      data: { negocio_id: negocio_id },
      accion: 2,
    };

    console.log(filtro);

    this.empleadosService.getEmpleadosByNegocioId(filtro).subscribe({
      next: (response: any) => {
        if (response.codigo === '0') {
          console.log('Empleados cargados:', response.info);
          this.empleados = response.info.map((empleado: any) => ({
            id: empleado.id,
            nombre: empleado.nombre,
            telefono: empleado.telefono,
            correo: empleado.correo,
            negocioId: empleado.negocioId,
            fechaRegistro: empleado.fechaRegistro,
            usuarioId: empleado.usuarioId,
          }));
        } else {
          console.error('Error al cargar empleados:', response.mensaje);
          this.empleados = [];
        }
      },
      error: (err) => {
        console.error('Error en la petición de empleados:', err);
      },
    });
  }

  cargarRoles() {
    const filtro = {
      "data": {
        "id": 1
      },
      "accion": 3
    };
    this.usuariosService.getRoles(filtro).subscribe({
      next: (response: any) => {
        if (response.codigo === '0') {
          console.log(response.info);
          this.roles = response.info;
        } else {
          console.error('Error en la consulta:', response.mensaje);
        }
      },
      error: (err) => {
        console.error('Error al obtener los roles:', err);
      },
    });
  }

  cargarNegocios() {
    const filtro = {
      data: {},
      accion: 1,
    };
    this.negociosService.getAllNegocios(filtro).subscribe({
      next: (response: any) => {
        if (response.codigo === '0') {
          console.log(response.info);
          this.negocios = response.info.map((item: any, index: number) => ({
            id: item.id,
            nombre: item.nombre,
            telefono: item.telefono,
            correo: item.correo,
            direccion: item.direccion,
            usuarioId: 0,
          }));
          this.filteredNegocios = [...this.negocios];
          this.negocios.forEach((negocio) =>
            this.negocioColors.set(negocio.id, this.generateRandomColor())
          );
        } else {
          console.error('Error en la consulta:', response.mensaje);
        }
      },
      error: (err) => {
        console.error('Error al obtener los negocios:', err);
      },
    });
  }

  filterNegocios() {
    this.filteredNegocios = this.negocios.filter(
      (negocio) =>
        negocio.nombre.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        (negocio.telefono && negocio.telefono.includes(this.searchTerm)) ||
        (negocio.correo &&
          negocio.correo.toLowerCase().includes(this.searchTerm.toLowerCase()))
    );
  }

  openAddEmpleadoModal(negocio: Negocio, modal: any) {
    this.empleadoSeleccionado.negocio_id = negocio.id;
    //this.empleadoSeleccionado.fechaRegistro = new Date().toISOString();
    modal.present();
  }

  addEmpleado() {
    if (this.empleadoSeleccionado.nombre) {
      const confirmAlert = document.createElement('ion-alert');
      confirmAlert.header = 'Confirmar Agregar Empleado';
      confirmAlert.message = `¿Estás seguro de agregar a este empleado?
      Nombre: ${this.empleadoSeleccionado.nombre}
      Teléfono: ${this.empleadoSeleccionado.telefono}
      Correo: ${this.empleadoSeleccionado.correo}
      `;
  
      confirmAlert.buttons = [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Confirmar',
          handler: () => {
            const empleadoData = {
              accion: 1, // Supongamos que la acción 1 es "agregar"
              data: { ...this.empleadoSeleccionado },
            };
  
            console.log(empleadoData);
  
            this.empleadosService.crudEmpleados(empleadoData).subscribe({
              next: (response: any) => {
                console.log(response);
                if (response.codigo === '0') {
                  const successAlert = document.createElement('ion-alert');
                  successAlert.header = 'Empleado Agregado';
                  successAlert.message = 'El empleado ha sido agregado correctamente.';
                  successAlert.buttons = ['Aceptar'];
  
                  document.body.appendChild(successAlert);
                  successAlert.present();
  
                  // Llamada adicional para enviar el correo
                  let user = empleadoData.data.correo?.split('@')[0];
                  const correoData = {
                    correo: empleadoData.data.correo,
                    nombre: empleadoData.data.nombre,
                    user: user,
                    password: response.password, // Contraseña generada por el backend
                    asunto: "Envio de contraseña"
                  };

                  console.log(correoData);
  
                  this.empleadosService.notificarCorreo(correoData).subscribe({
                    next: (correoResponse: any) => {
                      console.log('Correo enviado con éxito:', correoResponse);
                    },
                    error: (correoError) => {
                      console.error('Error al enviar el correo:', correoError);
                    },
                  });
  
                  // Recargar la lista de empleados
                  this.cargarEmpleados(this.empleadoSeleccionado.negocio_id);
                  this.empleadoSeleccionado = {
                    id: 0,
                    nombre: '',
                    telefono: '',
                    correo: '',
                    negocio_id: 0,
                    fechaRegistro: new Date().toISOString(),
                    usuarioId: 0,
                    rol_id: 3
                  };
                } else {
                  const errorAlert = document.createElement('ion-alert');
                  errorAlert.header = 'Error';
                  errorAlert.message = `No se pudo agregar el empleado: ${response.mensaje}`;
                  errorAlert.buttons = ['Aceptar'];
  
                  document.body.appendChild(errorAlert);
                  errorAlert.present();
                }
              },
              error: (err) => {
                const errorAlert = document.createElement('ion-alert');
                errorAlert.header = 'Error';
                errorAlert.message = 'Hubo un problema al agregar el empleado.';
                errorAlert.buttons = ['Aceptar'];
  
                document.body.appendChild(errorAlert);
                errorAlert.present();
                console.error('Error en la solicitud:', err);
              },
            });

          },
        },
      ];
  
      document.body.appendChild(confirmAlert);
      confirmAlert.present();
    }
  }  

  deleteEmpleado(empleadoId: number) {
    const alert = document.createElement('ion-alert');
    alert.header = '¿Estás seguro?';
    alert.message = '¿Seguro que quieres eliminar este empleado?';
    alert.buttons = [
      {
        text: 'Cancelar',
        role: 'cancel',
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
    const index = this.empleados.findIndex((empleado) => empleado.id === empleadoId);
    if (index !== -1) {
      this.empleados.splice(index, 1);
      this.filterNegocios();
      const successAlert = document.createElement('ion-alert');
      successAlert.header = 'Empleado Eliminado';
      successAlert.message = 'El empleado ha sido eliminado correctamente.';
      successAlert.buttons = ['OK'];

      document.body.appendChild(successAlert);
      successAlert.present();
    }
  }

  getEmpleadosByNegocio(negocioId: number): Empleado[] {
    return empleadosList.filter((empleado) => empleado.negocio_id === negocioId);
  }

  generateRandomColor(): string {
    return 'linear-gradient(180deg, rgb(252, 135, 40), rgb(255, 107, 39), rgb(255, 85, 0))';
  }

  getNegocioColor(id: number): string {
    return (
      this.negocioColors.get(id) ||
      'linear-gradient(180deg, rgb(252, 135, 40), rgb(255, 107, 39), rgb(255, 85, 0))'
    );
  }

  trackNegocios(index: number, negocio: Negocio): number {
    return negocio.id;
  }
}

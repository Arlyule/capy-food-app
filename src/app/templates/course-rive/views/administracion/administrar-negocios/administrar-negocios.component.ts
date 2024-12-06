import { Component, OnInit } from '@angular/core';
import { Negocio } from '../../../models/negocios';
import { NegociosService } from '../../../services/negocios.service';
import { UsuariosService } from '../../../services/usuarios.service'; // Importar el servicio de usuarios
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-administrar-negocios',
  templateUrl: './administrar-negocios.component.html',
  styleUrls: ['./administrar-negocios.component.scss'],
})
export class AdministrarNegociosComponent implements OnInit {
  negocios: Negocio[] = [];
  filteredNegocios: Negocio[] = [...this.negocios];
  searchTerm: string = '';
  allNegocios: Negocio[] = [...this.negocios];
  negocioColors: Map<number, string> = new Map();
  selectedOption: string = ''; // Selección de usuario
  users: any[] = []; // Lista de usuarios
  filteredUsers: any[] = [...this.users];

  constructor(
    private negociosService: NegociosService,
    private usuariosService: UsuariosService,
    private alertController: AlertController,
  ) { }

  // Nueva propiedad para el negocio que se agregará
  newNegocio: { [key: string]: string } = {
    nombre: '',
    telefono: '',
    correo: '',
    direccion: '',
  };

  // Definir los campos de entrada para el formulario
  addNegocioInputs = [
    { name: 'nombre', placeholder: 'Nombre', type: 'text' },
    { name: 'telefono', placeholder: 'Teléfono', type: 'text' },
    { name: 'correo', placeholder: 'Correo', type: 'email' },
    { name: 'direccion', placeholder: 'Dirección', type: 'text' },
  ];

  ngOnInit() {
    this.cargarNegocios();
    this.cargarUsuarios(); // Cargar usuarios al inicio
  }

  // Cargar usuarios desde el servicio
  cargarUsuarios() {
    const filtro = { data: {}, accion: 1 };
    this.usuariosService.getUsers(filtro).subscribe({
      next: (response: any) => {
        if (response.codigo === "0") {
          this.users = response.info;
          this.filteredUsers = [...this.users]; // Copiar usuarios a la lista filtrada
        } else {
          console.error('Error al obtener los usuarios:', response.mensaje);
        }
      },
      error: (err) => {
        console.error('Error al obtener los usuarios:', err);
      },
    });
  }


  cargarNegocios() {
    const filtro = {
      "data": {},
      "accion": 1
    };
    this.negociosService.getAllNegocios(filtro).subscribe({
      next: (response: any) => {
        if (response.codigo === "0") {
          this.negocios = response.info.map((item: any, index: number) => ({
            id: item.id,
            nombre: item.nombre,
            telefono: item.telefono,
            correo: item.correo,
            direccion: item.direccion,
            usuarioId: 0, // Asignar un valor predeterminado
          }));
          this.filteredNegocios = [...this.negocios];
          // Asignar colores aleatorios a los negocios
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

  eliminarNegocio(id: number, usuario_id: number) {
    const filtro = {
      data: { id },
      accion: 3
    };

    this.negociosService.crudNegocio(filtro).subscribe({
      next: (response) => {
        if (response.codigo === "0") {
          // Eliminar el negocio de las listas
          this.allNegocios = this.allNegocios.filter((negocio) => negocio.id !== id);
          this.filteredNegocios = this.filteredNegocios.filter(
            (negocio) => negocio.id !== id
          );
          this.negocioColors.delete(id);

          // Alerta de éxito
          this.showAlert('Éxito', 'Negocio eliminado correctamente');
          const updateUsuario = {
            data: {
              "id": usuario_id,
              "rol_id": 4,
            }
            , accion: 3
          };
          console.log(updateUsuario);
          this.usuariosService.getUsers(updateUsuario).subscribe({});
        } else {
          // Alerta de error si la respuesta es diferente a "0"
          this.showAlert('Error', 'No se pudo eliminar el negocio. ' + response.mensaje);
        }
      },
      error: (err) => {
        // Alerta de error si ocurre un error en la solicitud
        this.showAlert('Error', 'Ocurrió un error al eliminar el negocio');
      }
    });
  }


  addNegocio(data: any) {
    if (data.nombre && data.telefono && data.correo && data.direccion) {

      const filtro = {
        "data": {
          "nombre": data.nombre,
          "telefono": data.telefono,
          "correo": data.correo,
          "direccion": data.direccion,
          "usuario_id": parseInt(this.selectedOption),
        },
        "accion": 1
      };

      this.negociosService.crudNegocio(filtro).subscribe({
        next: (response) => {
          if (response.codigo === "0") {
            const newNegocio: Negocio = {
              id: this.allNegocios.length > 0 ? Math.max(...this.allNegocios.map(n => n.id)) + 1 : 1,
              nombre: data.nombre,
              telefono: data.telefono,
              correo: data.correo,
              direccion: data.direccion,
              usuario_id: parseInt(this.selectedOption),
            };
            this.allNegocios.push(newNegocio);
            this.filteredNegocios.push(newNegocio);
            this.negocioColors.set(newNegocio.id, this.generateRandomColor());

            // Alerta de éxito
            this.showAlert('Éxito', 'Negocio agregado correctamente');

            const updateUsuario = {
              data: {
                "id": parseInt(this.selectedOption),
                "rol_id": 2,
              }
              , accion: 3
            };
            this.usuariosService.getUsers(updateUsuario).subscribe({});
          } else {
            // Alerta de error si la respuesta es diferente a "0"
            this.showAlert('Error', 'No se pudo agregar el negocio. ' + response.mensaje);
          }
        },
        error: (err) => {
          // Alerta de error si ocurre un error en la solicitud
          this.showAlert('Error', 'Ocurrió un error al agregar el negocio');
        }
      });
    } else {
      // Alerta si no se llenan todos los campos
      this.showAlert('Error', 'Todos los campos son obligatorios para agregar un negocio');
    }
  }

  // Función para mostrar alertas con Ionic
  async showAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['OK']
    });
    await alert.present();
  }

  // Método para devolver el degradado en formato rgb
  generateRandomColor(): string {
    return 'linear-gradient(180deg,rgb(252, 135, 40),rgb(255, 107, 39),rgb(255, 85, 0))';
  }

  // Método para obtener el color de un negocio por su id
  getNegocioColor(id: number): string {
    return this.negocioColors.get(id) || 'linear-gradient(180deg, rgb(252, 135, 40),rgb(255, 107, 39),rgb(255, 85, 0))';
  }

  trackNegocios(i: number, negocio: Negocio) {
    return negocio.id;
  }

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

  deleteNegocioButtons(id: number, usuario_id: number | undefined) {
    return [
      { text: 'Cancelar', role: 'cancel' },
      { text: 'Eliminar', handler: () => this.eliminarNegocio(id, usuario_id ?? 0) },
    ];
  }



}

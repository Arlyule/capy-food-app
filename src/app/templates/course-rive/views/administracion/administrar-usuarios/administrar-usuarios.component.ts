import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../../../services/usuarios.service';

@Component({
  selector: 'app-administrar-usuarios',
  templateUrl: './administrar-usuarios.component.html',
  styleUrls: ['./administrar-usuarios.component.scss'],
})
export class AdministrarUsuariosComponent implements OnInit {
  users: any[] = []; // Lista de usuarios
  filteredUsers: any[] = [...this.users]; // Lista filtrada para búsquedas
  roles: any[] = []; // Lista de roles
  filteredRoles: any[] = [...this.roles];
  searchTerm: string = '';
  selectedOption: string = ''; // Rol seleccionado
  userColors: Map<number, string> = new Map(); // Colores por usuario

  // Nueva propiedad para el usuario que se agregará
  newUsuario: { [key: string]: string } = {
    nombre: '',
    password: '',
    correo: '',
  };

  // Campos del formulario para agregar usuario
  addUsuarioInputs = [
    { name: 'nombre', placeholder: 'Nombre', type: 'text' },
    { name: 'password', placeholder: 'Password', type: 'password' },
    { name: 'correo', placeholder: 'Correo', type: 'email' },
  ];

  constructor(private usuariosService: UsuariosService) {
    this.cargarUsuarios();
    this.cargarRoles();
  }

  ngOnInit() {
    // Asignar colores aleatorios a los usuarios
    this.users.forEach((usuario) => {
      this.userColors.set(usuario.id, this.generateRandomColor());
    });
  }

  // Filtrar usuarios por búsqueda
  filterUsuarios() {
    this.filteredUsers = this.users.filter(
      (user) =>
        user.username.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        user.correo.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  // Obtener el nombre del rol
  getRolName(rolId: number): string {
    const rol = this.filteredRoles.find((role) => role.id === rolId);
    return rol ? rol.nombrerol : 'Desconocido';
  }

  // Eliminar usuario
  eliminarUsuario(id: number) {
    const filtro = { data: { id }, accion: 4 };

    this.usuariosService.getUsers(filtro).subscribe({
      next: (response: any) => {
        if (response.codigo === "0") {
          this.users = this.users.filter((usuario) => usuario.id !== id);
          this.filteredUsers = this.filteredUsers.filter(
            (usuario) => usuario.id !== id
          );
          this.userColors.delete(id);
          console.log('Usuario eliminado correctamente:', response.mensaje);
        } else {
          console.error('Error al eliminar el usuario:', response.mensaje);
        }
      },
      error: (err) => {
        console.error('Error en la petición para eliminar usuario:', err);
      },
    });
  }

  // Agregar usuario
  addUsuario(data: any) {
    if (data.nombre && data.password && data.correo) {
      const nuevoUsuario = {
        username: data.nombre,
        password: data.password,
        correo: data.correo,
        rol_id: parseInt(this.selectedOption),
      };

      const filtro = { data: nuevoUsuario, accion: 5 };

      this.usuariosService.getUsers(filtro).subscribe({
        next: (response: any) => {
          if (response.codigo === "0") {
            this.cargarUsuarios();
            console.log('Usuario agregado correctamente:', response.mensaje);
          } else {
            console.error('Error al agregar el usuario:', response.mensaje);
          }
        },
        error: (err) => {
          console.error('Error en la petición para agregar usuario:', err);
        },
      });
    } else {
      console.error('Faltan campos requeridos para agregar el usuario.');
    }
  }

  // Generar un color aleatorio en formato degradado
  generateRandomColor(): string {
    return 'linear-gradient(180deg, rgb(252, 135, 40), rgb(255, 107, 39), rgb(255, 85, 0))';
  }

  // Obtener el color asignado a un usuario por su id
  getUsuarioColor(id: number): string {
    return (
      this.userColors.get(id) ||
      'linear-gradient(180deg, rgb(252, 135, 40), rgb(255, 107, 39), rgb(255, 85, 0))'
    );
  }

  // Cargar usuarios desde el servicio
  cargarUsuarios() {
    const filtro = { data: {}, accion: 1 };
    this.usuariosService.getUsers(filtro).subscribe({
      next: (response: any) => {
        if (response.codigo === "0") {
          this.users = response.info;
          this.filteredUsers = [...this.users];
        } else {
          console.error('Error al obtener los usuarios:', response.mensaje);
        }
      },
      error: (err) => {
        console.error('Error al obtener los usuarios:', err);
      },
    });
  }

  // Cargar roles desde el servicio
  cargarRoles() {
    const filtro = { data: {}, accion: 1 };
    this.usuariosService.getRoles(filtro).subscribe({
      next: (response: any) => {
        if (response.codigo === "0") {
          this.roles = response.info;
          this.filteredRoles = [...this.roles];
        } else {
          console.error('Error al obtener los roles:', response.mensaje);
        }
      },
      error: (err) => {
        console.error('Error al obtener los roles:', err);
      },
    });
  }

  // Track por ID
  trackUsuarios(index: number, usuario: any) {
    return usuario.id;
  }

  // Cargar más usuarios (infinite scroll)
  loadMore(event: any) {
    setTimeout(() => {
      const currentLength = this.filteredUsers.length;
      const nextUsers = this.users.slice(currentLength, currentLength + 5);
      this.filteredUsers = [...this.filteredUsers, ...nextUsers];
      event.target.complete();
    }, 500);
  }

  // Botones para eliminar usuario
  deleteUsuarioButtons(id: number) {
    return [
      { text: 'Cancelar', role: 'cancel' },
      { text: 'Eliminar', handler: () => this.eliminarUsuario(id) },
    ];
  }
}

import { Component, OnInit } from '@angular/core';
import { negociosList, Negocio } from '../../../models/negocios';

@Component({
  selector: 'app-administrar-usuarios',
  templateUrl: './administrar-usuarios.component.html',
  styleUrls: ['./administrar-usuarios.component.scss'],
})
export class AdministrarUsuariosComponent implements OnInit {
  negocios = negociosList;
  filteredNegocios: Negocio[] = [...this.negocios];
  searchTerm: string = '';
  allNegocios: Negocio[] = [...this.negocios];
  negocioColors: Map<number, string> = new Map();
  selectedOption: string = '';

  // Lista de opciones para el dropdown
  options = [
    { label: 'Opción 1', value: '1' },
    { label: 'Opción 2', value: '2' },
    { label: 'Opción 3', value: '3' }
  ];

  // Nueva propiedad para el negocio que se agregará
  newNegocio: { [key: string]: string } = {
    nombre: '',
    telefono: '',
    correo: '',
    direccion: ''
  };

  // Definir los campos de entrada para el formulario
  addNegocioInputs = [
    { name: 'nombre', placeholder: 'Nombre', type: 'text' },
    { name: 'telefono', placeholder: 'Teléfono', type: 'text' },
    { name: 'correo', placeholder: 'Correo', type: 'email' },
    { name: 'usuario', placeholder: 'usuario', type: 'text' }
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

  // Eliminar negocio
  eliminarNegocio(id: number) {
    this.allNegocios = this.allNegocios.filter((negocio) => negocio.id !== id);
    this.filteredNegocios = this.filteredNegocios.filter(
      (negocio) => negocio.id !== id
    );
    this.negocioColors.delete(id);
  }

  // Agregar negocio
  addNegocio(data: any) {
    if (data.nombre && data.telefono && data.correo && data.direccion) {
      const newNegocio: Negocio = {
        id: this.allNegocios.length > 0 ? Math.max(...this.allNegocios.map(n => n.id)) + 1 : 1, // Generar ID único
        nombre: data.nombre,
        telefono: data.telefono,
        correo: data.correo,
        direccion: data.direccion,
        usuarioId: parseInt(this.selectedOption), // Guardar la opción seleccionada (aunque está vacía)
      };
      this.allNegocios.push(newNegocio);
      this.filteredNegocios.push(newNegocio);
      this.negocioColors.set(newNegocio.id, this.generateRandomColor());
    }
  }

  // Método actualizado para devolver el degradado en formato rgb
  generateRandomColor(): string {
    // Retornar el degradado con los colores en formato rgb
    return 'linear-gradient(180deg,rgb(252, 135, 40),rgb(255, 107, 39),rgb(255, 85, 0))';
  }

  // Método para obtener el color de un negocio por su id
  getNegocioColor(id: number): string {
    // Devuelve el degradado en lugar de un color único
    return this.negocioColors.get(id) || 'linear-gradient(180deg, rgb(252, 135, 40),rgb(255, 107, 39),rgb(255, 85, 0))';
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

  // Botones para eliminar negocio
  deleteNegocioButtons(id: number) {
    return [
      { text: 'Cancelar', role: 'cancel' },
      { text: 'Eliminar', handler: () => this.eliminarNegocio(id) },
    ];
  }
}

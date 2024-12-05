import { Component, OnInit } from '@angular/core';
import { negociosList, Negocio } from '../../../models/negocios';
import { NegociosService } from '../../../services/negocios.service';

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
  selectedOption: string = '';

  constructor(private negociosService: NegociosService) { }

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
    { name: 'direccion', placeholder: 'Dirección', type: 'text' }
  ];

  ngOnInit() {
    this.cargarNegocios();
  }

  // Método para cargar negocios desde el servicio
  cargarNegocios() {
    const filtro = {
      "data": {},
      "accion": 1
    };
    this.negociosService.getAllNegocios(filtro).subscribe({
      next: (response: any) => {
        if (response.codigo === "0") {
          console.log(response.info);
          // Mapea la respuesta para asegurar que cumpla con el modelo `Negocio`
          this.negocios = response.info.map((item: any, index: number) => ({
            id: item.id, // Asignar un ID único temporal
            nombre: item.nombre,
            telefono: item.telefono,
            correo: item.correo,
            direccion: item.direccion,
            usuarioId: 0, // Si el backend no lo devuelve, se asigna un valor predeterminado
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

  // Eliminar negocio
  eliminarNegocio(id: number) {
    this.allNegocios = this.allNegocios.filter((negocio) => negocio.id !== id);
    this.filteredNegocios = this.filteredNegocios.filter(
      (negocio) => negocio.id !== id
    );
    this.negocioColors.delete(id);
  }

  addNegocio(data: any) {
    if (data.nombre && data.telefono && data.correo && data.direccion) {
      // Formatear los datos según el requerimiento del backend
      const negocioData = {
        "nombre": data.nombre,
        "telefono": data.telefono,
        "correo": data.correo,
        "direccion": data.direccion
      };
      
      console.log(negocioData);
  
      // Llamar al servicio para guardar el negocio
      this.negociosService.guardarNegocio(negocioData).subscribe({
        next: (response) => {
          if (response.codigo === "0") {
            console.log('Negocio agregado con éxito:', response);
            // Actualizar las listas locales con el nuevo negocio
            const newNegocio: Negocio = {
              id: this.allNegocios.length > 0 ? Math.max(...this.allNegocios.map(n => n.id)) + 1 : 1, // Generar ID único
              nombre: negocioData.nombre,
              telefono: negocioData.telefono,
              correo: negocioData.correo,
              direccion: negocioData.direccion,
              usuario_id: parseInt(this.selectedOption), // Si aplica
            };
            this.allNegocios.push(newNegocio);
            this.filteredNegocios.push(newNegocio);
            this.negocioColors.set(newNegocio.id, this.generateRandomColor());
          } else {
            console.error('Error al agregar negocio:', response.mensaje);
          }
        },
        error: (err) => {
          console.error('Error al realizar la solicitud:', err);
        }
      });
    } else {
      console.error('Todos los campos son obligatorios para agregar un negocio.');
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

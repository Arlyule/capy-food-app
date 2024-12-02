export interface MenuItem {
  id: string;
  stateMachine: string;
  artboard: string;
  status: boolean;
  show: boolean;
  route: string;
}

export const menuItemsList: MenuItem[] = [
  {
    id: 'Home',
    stateMachine: 'HOME_interactivity',
    artboard: 'home-outline',
    status: false,
    show: true,
    route: '/publicaciones',
  },
  {
    id: 'Admin Negocios',
    stateMachine: 'SEARCH_Interactivity',
    artboard: 'business-outline', // Ícono de Ionicons para "Admin Negocios"
    status: false,
    show: true,
    route: '/administracion-negocios',
  },
  {
    id: 'Admin Usuarios',
    stateMachine: 'STAR_Interactivity',
    artboard: 'people-outline', // Ícono de Ionicons para "Admin Usuarios"
    status: false,
    show: true,
    route: '/administracion-usuarios',
  },
  {
    id: 'Admin Negocio',
    stateMachine: 'CHAT_Interactivity',
    artboard: 'chatbubble-outline', // Ícono de Ionicons para "Admin Negocio"
    status: false,
    show: true,
    route: '/administracion-negocio-apartados',
  },
  {
    id: 'Admin Empleados',
    stateMachine: 'CHAT_Interactivity',
    artboard: 'person-outline', // Ícono de Ionicons para "Admin Empleados"
    status: false,
    show: true,
    route: '/administracion-negocio-empleados',
  },
  {
    id: 'Comanda',
    stateMachine: 'CHAT_Interactivity',
    artboard: 'clipboard-outline', // Ícono de Ionicons para "Comanda"
    status: false,
    show: true,
    route: '/empleados-comanda',
  },
  {
    id: 'Cuenta',
    stateMachine: 'CHAT_Interactivity',
    artboard: 'wallet-outline',
    status: false,
    show: true,
    route: '/empleados-cuenta',
  },
];

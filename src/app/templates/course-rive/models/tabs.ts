export interface BottomTabItem {
  id: string;
  stateMachine: string;
  artboard: string; // Esto lo vamos a reemplazar por el nombre de los íconos
  status: boolean;
  show: boolean;
  route: string;
}

export const tabItemsList: BottomTabItem[] = [
  {
    id: 'tab_chat',
    stateMachine: 'CHAT_Interactivity',
    artboard: 'grid-outline', // Ícono de Ionicons para el chat
    status: false,
    show: true,
    route: '/menu',
  },
  {
    id: 'tab_search',
    stateMachine: 'SEARCH_Interactivity',
    artboard: 'search-outline', // Ícono de Ionicons para la búsqueda
    status: false,
    show: true,
    route: '/catalogosNegocios',
  },
  {
    id: 'tab_timer',
    stateMachine: 'TIMER_Interactivity',
    artboard: 'time-outline', // Ícono de Ionicons para el temporizador
    status: false,
    show: true,
    route: '/publicaciones',
  },
  {
    id: 'tab_user',
    stateMachine: 'USER_Interactivity',
    artboard: 'person-outline', // Ícono de Ionicons para el usuario
    status: false,
    show: true,
    route: '/user',
  },
];

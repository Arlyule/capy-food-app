import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RiveModule, RIVE_FOLDER } from 'ng-rive';

import { CourseRivePage } from './course-rive.page';
import { MenuComponent } from './views/menu/menu.component';
import { PublicacionesComponent } from './views/publicaciones/publicaciones.component';
import { AdministrarUsuariosComponent } from './views/administracion/administrar-usuarios/administrar-usuarios.component';
import { ComandaComponent } from './views/empleados/comanda/comanda.component';
import { CorteComponent } from './views/empleados/corte/corte.component';
import { AdministrarApartadosNegocioComponent } from './views/negocias/administrar-apartados-negocio/administrar-apartados-negocio.component';
import { AdministrarEmpleadosComponent } from './views/negocias/administrar-empleados/administrar-empleados.component';
import { AdministrarVentasComponent } from './views/negocias/administrar-ventas/administrar-ventas.component';
import { MesasComponent } from './views/negocias/mesas/mesas.component';
import { BottomTabBarComponent } from './navigation/bottom-tab-bar/bottom-tab-bar.component';
import { SideMenuComponent } from './navigation/side-menu/side-menu.component';
import { SignInComponent } from './views/on-boarding/sign-in/sign-in.component';
import { CatalogoNegociosComponent } from './views/negocias/catalogo-negocios/catalogo-negocios.component';
import { AdministrarNegociosComponent } from './views/administracion/administrar-negocios/administrar-negocios.component';

const routes: Routes = [
  {
    path: '',
    component: CourseRivePage,  // Página principal donde se mantienen el side-menu y los tabs
    children: [
      {
        path: 'menu',
        component: MenuComponent,  // Aquí se carga el menú
      },
      {
        path: 'catalogosNegocios',
        component: CatalogoNegociosComponent,  // Aquí se carga el menú
      },
      {
        path: 'sign-in',
        component: SignInComponent,  // Aquí se carga el menú
      },
      {
        path: 'sideBar',
        component: SideMenuComponent,  // Aquí se carga el menú
      },
      {
        path: 'tabs',
        component: BottomTabBarComponent,  // Aquí se carga el componente de los tabs
      },
      {
        path: 'content-view',
        loadChildren: () =>
          import('./views/content-view/content-view.module').then(
            (m) => m.ContentViewPageModule
          ),
      },
      {
        path: 'administracion-negocios',
        component: AdministrarNegociosComponent,
      },
      {
        path: 'administracion-usuarios',
        component: AdministrarUsuariosComponent,
      },
      {
        path: 'administracion-negocio-apartados',
        component: AdministrarApartadosNegocioComponent,
      },
      {
        path: 'administracion-negocio-empleados',
        component: AdministrarEmpleadosComponent,
      },
      {
        path: 'administracion-negocio-ventas',
        component: AdministrarVentasComponent,
      },
      {
        path: 'administracion-negocio-mesas',
        component: MesasComponent,
      },
      {
        path: 'empleados-comanda',
        component: ComandaComponent,
      },
      {
        path: 'empleados-cuenta',
        component: CorteComponent,
      },
      {
        path: 'publicaciones',
        component: PublicacionesComponent,
      },
    ]
  },
  {
    path: 'on-boarding',
    loadChildren: () =>
      import('./views/on-boarding/on-boarding.module').then(
        (m) => m.OnBoardingPageModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes), RiveModule],
  exports: [RouterModule, RiveModule],
  providers: [
    {
      provide: RIVE_FOLDER,
      useValue: 'assets/course_rive/rive',
    },
  ],
})
export class CourseRivePageRoutingModule { }

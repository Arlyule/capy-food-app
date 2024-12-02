import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CourseRivePageRoutingModule } from './course-rive-routing.module';

import { CourseRivePage } from './course-rive.page';
import { SideMenuComponent } from './navigation/side-menu/side-menu.component';
import { BottomTabBarComponent } from './navigation/bottom-tab-bar/bottom-tab-bar.component';
import { OnBoardingPageModule } from './views/on-boarding/on-boarding.module';
import { MenuRowComponent } from './navigation/side-menu/menu-row/menu-row.component';
import { PublicacionesComponent } from './views/publicaciones/publicaciones.component';
import { ShuffleArrayPipe } from './helper/shuffle-array/shuffle-array.pipe';
import { provideHttpClient } from '@angular/common/http';
import { CatalogoNegociosComponent } from './views/negocias/catalogo-negocios/catalogo-negocios.component';
import { MenuComponent } from './views/menu/menu.component';
import { AdministrarNegociosComponent } from './views/administracion/administrar-negocios/administrar-negocios.component';
import { AdministrarUsuariosComponent } from './views/administracion/administrar-usuarios/administrar-usuarios.component';
import { AdministrarApartadosNegocioComponent } from './views/negocias/administrar-apartados-negocio/administrar-apartados-negocio.component';
import { AdministrarEmpleadosComponent } from './views/negocias/administrar-empleados/administrar-empleados.component';
import { MesasComponent } from './views/negocias/mesas/mesas.component';
import { EmpleadosService } from './services/empleados.service';
import { ComandaComponent } from './views/empleados/comanda/comanda.component';
import { CorteComponent } from './views/empleados/corte/corte.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CourseRivePageRoutingModule,
    OnBoardingPageModule,
  ],
  declarations: [
    CourseRivePage,
    SideMenuComponent,
    MenuRowComponent,
    BottomTabBarComponent,
    PublicacionesComponent,
    CatalogoNegociosComponent,
    ShuffleArrayPipe,
    MenuComponent,
    AdministrarNegociosComponent,
    AdministrarUsuariosComponent,
    AdministrarApartadosNegocioComponent,
    AdministrarEmpleadosComponent,
    AdministrarNegociosComponent,
    MesasComponent,
    ComandaComponent,
    CorteComponent
  ],
  exports: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [provideHttpClient(),],
})
export class CourseRivePageModule { }

import { Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { AnimationController, Platform } from '@ionic/angular';
import { MenuItem, menuItemsList } from '../../models/side-menu';
import { Router } from '@angular/router';

@Component({
  selector: 'cr-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss'],
})
export class SideMenuComponent implements OnInit {
  @ViewChildren('menuItems', { read: ElementRef })
  menuItems1Ref?: QueryList<ElementRef>;


  menuItems = menuItemsList;
  selectedMenu = this.menuItems[0];
  isDarkMode = false;

  username: string = 'Sin Usuario';
  userProfession: string = 'Sin Rol';

  constructor(
    private animationCtrl: AnimationController,
    private router: Router,
    public platform: Platform
  ) { }

  ngOnInit() {
    // Leemos los datos del usuario desde localStorage
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (user && user.username) {
      this.username = user.username;
      // Si el campo 'rol_id' es 1, lo usamos como "Software Engineer"
      if (user.rol_id === 1) {
        this.userProfession = 'Administrador';
      } else if (user.rol_id === 2) {
        this.userProfession = 'Empleado';
      } else if (user.rol_id === 3) {
        this.userProfession = 'Usuario';
      }
    }

    // Mostramos los elementos del menú con retraso
    for (let i = 0; i < this.menuItems.length; i++) {
      setTimeout(() => (this.menuItems[i].show = true), 1000);
    }
  }

  onMenuItemPress(index: number, menu: MenuItem) {
    let lastSelection = this.menuItems.indexOf(this.selectedMenu);
    if (lastSelection < 0) {
      lastSelection =
        this.menuItems.length + this.menuItems.indexOf(this.selectedMenu);
    }

    menu.status = true;
    setTimeout(() => {
      menu.status = false;
    }, 1000);
    this.selectedMenu = menu;

    const menu1RefArray = this.menuItems1Ref?.toArray();

    for (let i = 0; i < menu1RefArray?.length!; i++) {
      const itemRef = menu1RefArray?.[i];
      const element = itemRef?.nativeElement;

      if (i === lastSelection || i === index) {
        this.animationCtrl
          .create()
          .addElement(element.querySelector('.menu-btn-bg'))
          .duration(250)
          .easing('cubic-bezier(0.2, 0.8, 0.2, 1.0)')
          .fromTo(
            'width',
            i === index ? '0px' : '272px',
            i === index ? '272px' : '0px'
          )
          .fromTo(
            'background',  // Cambiar a background para trabajar con degradados
            i === index ? 'transparent' : 'initial',  // color de fondo cuando no está seleccionado
            i === index
              ? 'linear-gradient(135deg, #c7511a, #ec6e30)' // Degradado de color más fuerte
              : 'transparent'
          )
          .play();
      }
    }

    this.router.navigate([menu.route]);
  }


  onDarkModeToggle() {
    this.menuItems[0].status = this.isDarkMode;
  }

  goBack() {
    this.router.navigate(['']);
  }

  trackMenuItems(_i: number, tab: MenuItem) {
    return tab.id;
  }


}

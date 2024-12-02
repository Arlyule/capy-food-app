import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { StatusBar, Style } from '@capacitor/status-bar';
import { AnimationController } from '@ionic/angular';
import { tabItemsList, BottomTabItem } from './models/tabs';
import { Router } from '@angular/router';

@Component({
  selector: 'cr-course-rive',
  templateUrl: './course-rive.page.html',
  styleUrls: ['./course-rive.page.scss'],
})
export class CourseRivePage implements OnInit {
  @ViewChild('mainContent', { read: ElementRef }) mainContentRef?: ElementRef;
  @ViewChild('menuToggleBtn', { read: ElementRef }) menuToggleBtnRef?: ElementRef;
  @ViewChild('sideMenu', { read: ElementRef }) sideMenuRef?: ElementRef;
  @ViewChild('bottomTabs', { read: ElementRef }) bottomTabRef?: ElementRef;
  @ViewChild('onBoardingBtn', { read: ElementRef }) onBoardingBtnRef?: ElementRef;
  @ViewChild('onBoarding', { read: ElementRef }) onBoardingRef?: ElementRef;
  @ViewChild('tabWhiteBg', { read: ElementRef }) tabWhiteBgRef?: ElementRef;

  selectedTab = tabItemsList[2]; // Selección por defecto: TIMER
  isMenuOpen = true;
  tabItems = tabItemsList;
  showOnBoarding = false;
  showRiveMenuBtn = false; // Temporal
  avatarArr = [1, 2, 3];
  isUserLoggedIn: boolean = false;

  constructor(
    public animationCtrl: AnimationController,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.isUserLoggedIn = !!localStorage.getItem('user');
    setTimeout(() => (this.showRiveMenuBtn = true), 1000);
  }

  /**
   * Método para manejar el cambio de pestañas y navegación a las rutas asociadas.
   */
  onTabChange(tab: BottomTabItem) {
    if (this.selectedTab !== tab) {
      this.selectedTab = tab; // Actualiza la pestaña seleccionada
      this.router.navigate([tab.route]); // Navega a la ruta correspondiente
    }
  }

  /**
   * Lógica de animación para mostrar u ocultar el panel de introducción.
   */
  showOnBoardingToggle() {
    this.showOnBoarding = !this.showOnBoarding;

    const transformBottom = 'calc(((100vh - (100vh * 0.92)) / 2) + 20px)';
    const onBoardingAnim = this.animationCtrl
      .create()
      .addElement(this.onBoardingRef?.nativeElement)
      .fromTo(
        'transform',
        `translateY(calc(-1 * (100vh + ${transformBottom} + 40px)))`,
        `translateY(calc(-1 * ${transformBottom}))`
      );

    const contentViewAnim = this.animationCtrl
      .create()
      .addElement(this.mainContentRef?.nativeElement)
      .fromTo('transform', 'none', 'scale(0.92)');

    const bottomTabAnim = this.animationCtrl
      .create()
      .addElement(this.bottomTabRef?.nativeElement)
      .fromTo('transform', 'none', 'translateY(200px)');

    const tabWhiteBgAnim = this.animationCtrl
      .create()
      .addElement(this.tabWhiteBgRef?.nativeElement)
      .fromTo('opacity', '1', '0');

    const allAnim = this.animationCtrl
      .create()
      .duration(500)
      .easing('ease-in-out')
      .addAnimation([
        onBoardingAnim,
        contentViewAnim,
        bottomTabAnim,
        tabWhiteBgAnim,
      ]);

    if (this.showOnBoarding) {
      allAnim.play();
    } else {
      allAnim.direction('reverse').play();
    }
  }

  /**
   * Lógica de animación para abrir/cerrar el menú lateral.
   */
  onMenuToggle() {
    StatusBar.setStyle({
      style: this.isMenuOpen ? Style.Dark : Style.Light,
    }).catch(() => { });

    const contentViewAnim = this.animationCtrl
      .create()
      .addElement(this.mainContentRef?.nativeElement)
      .fromTo(
        'transform',
        'none',
        'scale(0.9) perspective(calc(720px + (100vw - 320px) * 7)) translateX(288px) rotateY(-30deg)'
      );

    const menuBtnAnim = this.animationCtrl
      .create()
      .addElement(this.menuToggleBtnRef?.nativeElement)
      .fromTo('transform', 'none', 'translateX(216px)');

    const sideMenuAnim = this.animationCtrl
      .create()
      .addElement(this.sideMenuRef?.nativeElement)
      .fromTo(
        'transform',
        'perspective(700px) translateX(-300px) rotateY(30deg)',
        'none'
      );

    const bottomTabAnim = this.animationCtrl
      .create()
      .addElement(this.bottomTabRef?.nativeElement)
      .fromTo('transform', 'none', 'translateY(300px)');

    const onBoardingBtnAnim = this.animationCtrl
      .create()
      .addElement(this.onBoardingBtnRef?.nativeElement)
      .fromTo('transform', 'none', 'translateX(100px)');

    const tabWhiteBgAnim = this.animationCtrl
      .create()
      .addElement(this.tabWhiteBgRef?.nativeElement)
      .fromTo('opacity', '1', '0');

    const allAnim = this.animationCtrl
      .create()
      .duration(250)
      .addAnimation([
        contentViewAnim,
        menuBtnAnim,
        sideMenuAnim,
        bottomTabAnim,
        onBoardingBtnAnim,
        tabWhiteBgAnim,
      ]);

    if (this.isMenuOpen) {
      allAnim.play();
    } else {
      allAnim.direction('reverse').play();
    }

    this.isMenuOpen = !this.isMenuOpen;
  }

  onLogout() {
    // Limpiar el localStorage y actualizar el estado
    localStorage.removeItem('user');
    this.isUserLoggedIn = false;
    // Redirigir o hacer lo necesario
    this.router.navigate(['/publicaciones']).then(() => {
      window.location.reload();
    });
  }
}

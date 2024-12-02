import {
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { AnimationController, IonModal, Platform } from '@ionic/angular';

@Component({
  selector: 'cr-on-boarding',
  templateUrl: './on-boarding.page.html',
  styleUrls: ['./on-boarding.page.scss'],
})
export class OnBoardingPage implements OnInit {
  @ViewChild('loginModal') loginModal?: IonModal;  // Modal de inicio de sesión
  @ViewChild('registerModal') registerModal?: IonModal;  // Modal de registro
  @ViewChild('container', { read: ElementRef }) containerRef?: ElementRef;
  @ViewChild('closeBtn', { read: ElementRef }) closeBtnRef?: ElementRef;

  @Output() closeOnBoardingEvent = new EventEmitter();

  buttonToggle = true;
  showRiveAsset = false;

  constructor(
    public platform: Platform,
    private animationCtrl: AnimationController
  ) { }

  ngOnInit() {
    setTimeout(() => (this.showRiveAsset = true), 1000);
  }

  // Método para abrir el modal de inicio de sesión
  startLoginModal() {
    this.buttonToggle = !this.buttonToggle;
    setTimeout(() => {
      this.loginModal?.present();  // Abre el modal de login
    }, 800);
  }

  // Método para abrir el modal de registro
  startRegisterModal() {
    this.buttonToggle = !this.buttonToggle;
    setTimeout(() => {
      this.registerModal?.present();  // Abre el modal de registro
    }, 800);
  }

  // Cerrar el onboarding
  onCloseOnBoarding() {
    this.closeOnBoardingEvent.emit();
  }

  // Cerrar el modal de inicio de sesión
  onSignInClose() {
    this.loginModal?.dismiss();
  }

  // Cerrar el modal de registro
  onSignUpClose() {
    this.registerModal?.dismiss();
  }

  enterAnimation = (baseEl: HTMLElement) => {
    const root = baseEl.shadowRoot;
    const containerEl = this.containerRef?.nativeElement;

    const backdropAnimation = this.animationCtrl
      .create()
      .addElement(root?.querySelector('ion-backdrop')!)
      .fromTo('opacity', '0.01', 'var(--backdrop-opacity)');

    const wrapperAnimation = this.animationCtrl
      .create()
      .addElement(root?.querySelector('.modal-wrapper')!)
      .keyframes([
        { offset: 0, opacity: '0.5', transform: 'translateY(-100vh)' },
        { offset: 1, opacity: '1', transform: 'translateY(0vh)' },
      ]);

    const onBoardingContent = this.animationCtrl
      .create()
      .addElement(containerEl!)
      .keyframes([
        { offset: 0, transform: 'translateY(0px)' },
        { offset: 1, transform: 'translateY(-50px)' },
      ]);
    const closeBtnAnim = this.animationCtrl
      .create()
      .addElement(this.closeBtnRef?.nativeElement!)
      .fromTo('transform', 'translateY(0)', 'translateY(-150px)');

    return this.animationCtrl
      .create()
      .addElement(baseEl)
      .easing('ease-in-out')
      .duration(500)
      .addAnimation([
        backdropAnimation,
        wrapperAnimation,
        onBoardingContent,
        closeBtnAnim,
      ]);
  };

  leaveAnimation = (baseEl: HTMLElement) => {
    return this.enterAnimation(baseEl).direction('reverse');
  };
}

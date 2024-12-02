import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OnBoardingPageRoutingModule } from './on-boarding-routing.module';

import { OnBoardingPage } from './on-boarding.page';
import { SignInComponent } from './sign-in/sign-in.component';
import { provideHttpClient } from '@angular/common/http';
import { RegisterComponent } from './register/register.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OnBoardingPageRoutingModule,
  ],
  exports: [OnBoardingPage],
  declarations: [OnBoardingPage, SignInComponent, RegisterComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [provideHttpClient(),],
})
export class OnBoardingPageModule { }

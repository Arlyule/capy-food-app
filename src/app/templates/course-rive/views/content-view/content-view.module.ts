import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ContentViewPageRoutingModule } from './content-view-routing.module';

import { ContentViewPage } from './content-view.page';
import { ShuffleArrayPipe } from '../../helper/shuffle-array/shuffle-array.pipe';
import { provideHttpClient } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ContentViewPageRoutingModule,
  ],
  exports: [ContentViewPage],
  declarations: [ContentViewPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [provideHttpClient(),],
})
export class ContentViewPageModule { }

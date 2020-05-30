import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { IntroductionPageRoutingModule } from './introduction-routing.module';

import { IntroductionPage } from './introduction.page';
import { Slide1Component } from './slide1/slide1.component';
import { Slide2Component } from './slide2/slide2.component';
import { Slide3Component } from './slide3/slide3.component';

@NgModule({
  imports: [
    FormsModule,
    IonicModule,
    CommonModule,
    IntroductionPageRoutingModule
  ],
  declarations: [
    IntroductionPage,
    Slide1Component,
    Slide2Component,
    Slide3Component
  ]
})
export class IntroductionPageModule {}

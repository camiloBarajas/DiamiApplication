import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfTab1PageRoutingModule } from './prof-tab1-routing.module';

import { ProfTab1Page } from './prof-tab1.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfTab1PageRoutingModule
  ],
  declarations: [ProfTab1Page]
})
export class ProfTab1PageModule {}

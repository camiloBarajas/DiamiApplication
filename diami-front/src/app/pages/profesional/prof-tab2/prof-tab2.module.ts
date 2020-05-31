import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfTab2PageRoutingModule } from './prof-tab2-routing.module';

import { ProfTab2Page } from './prof-tab2.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfTab2PageRoutingModule
  ],
  declarations: [ProfTab2Page]
})
export class ProfTab2PageModule {}

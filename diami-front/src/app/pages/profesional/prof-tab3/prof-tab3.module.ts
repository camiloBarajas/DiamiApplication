import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfTab3PageRoutingModule } from './prof-tab3-routing.module';

import { ProfTab3Page } from './prof-tab3.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfTab3PageRoutingModule
  ],
  declarations: [ProfTab3Page]
})
export class ProfTab3PageModule {}

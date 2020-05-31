import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfTab3PageRoutingModule } from './prof-tab3-routing.module';

import { ProfTab3Page } from './prof-tab3.page';
import { SharedModule } from 'src/app/modules/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfTab3PageRoutingModule,
    SharedModule
  ],
  declarations: [ProfTab3Page]
})
export class ProfTab3PageModule {}

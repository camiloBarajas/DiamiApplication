import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DiamiPage } from './diami.page';

import { DiamiPageRoutingModule } from './diami-routing.module';

@NgModule({
  imports: [IonicModule, FormsModule, CommonModule, DiamiPageRoutingModule],
  declarations: [DiamiPage]
})
export class DiamiPageModule {}

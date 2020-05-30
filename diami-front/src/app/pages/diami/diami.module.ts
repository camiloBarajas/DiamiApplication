import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DiamiPage } from './diami.page';

import { DiamiPageRoutingModule } from './diami-routing.module';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { ChatComponent } from './chat/chat.component';

@NgModule({
  imports: [
    IonicModule,
    FormsModule,
    SharedModule,
    CommonModule,
    DiamiPageRoutingModule
  ],
  declarations: [DiamiPage, ChatComponent]
})
export class DiamiPageModule {}

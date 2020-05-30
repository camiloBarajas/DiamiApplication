import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WelcomePageRoutingModule } from './welcome-routing.module';

import { WelcomePage } from './welcome.page';
import { SharedModule } from 'src/app/modules/shared/shared.module';

@NgModule({
  imports: [FormsModule, IonicModule, CommonModule, WelcomePageRoutingModule, SharedModule],
  declarations: [WelcomePage]
})
export class WelcomePageModule {}

import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { PipesModule } from 'src/app/modules/pipes/pipes.module';

@NgModule({
  imports: [
    IonicModule,
    FormsModule,
    CommonModule,
    SharedModule,
    PipesModule,
    HomePageRoutingModule
  ],
  declarations: [HomePage]
})
export class HomePageModule {}

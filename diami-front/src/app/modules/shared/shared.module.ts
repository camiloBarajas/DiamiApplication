import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActionButtonComponent } from 'src/app/components/action-button/action-button.component';
import { IonicModule } from '@ionic/angular';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { DescriptionComponent } from 'src/app/components/description/description.component';

@NgModule({
  declarations: [ActionButtonComponent, HeaderComponent, DescriptionComponent],
  exports: [ActionButtonComponent, HeaderComponent, DescriptionComponent],
  entryComponents: [
    ActionButtonComponent,
    HeaderComponent,
    DescriptionComponent
  ],
  imports: [CommonModule, IonicModule]
})
export class SharedModule {}

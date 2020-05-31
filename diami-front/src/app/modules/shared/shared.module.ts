import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActionButtonComponent } from 'src/app/components/action-button/action-button.component';
import { IonicModule } from '@ionic/angular';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { DescriptionComponent } from 'src/app/components/description/description.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CardProfessionalComponent } from 'src/app/components/card-professional/card-professional.component';
import { ModalCardComponent } from 'src/app/components/modal-card/modal-card.component';

@NgModule({
  declarations: [
    ActionButtonComponent,
    HeaderComponent,
    DescriptionComponent,
    CardProfessionalComponent,
    ModalCardComponent
  ],
  exports: [
    ActionButtonComponent,
    HeaderComponent,
    DescriptionComponent,
    CardProfessionalComponent,
    ModalCardComponent
  ],
  entryComponents: [
    ActionButtonComponent,
    HeaderComponent,
    DescriptionComponent,
    CardProfessionalComponent,
    ModalCardComponent
  ],
  imports: [CommonModule, IonicModule, ReactiveFormsModule, FormsModule]
})
export class SharedModule {}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfTab2Page } from './prof-tab2.page';

const routes: Routes = [
  {
    path: '',
    component: ProfTab2Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfTab2PageRoutingModule {}

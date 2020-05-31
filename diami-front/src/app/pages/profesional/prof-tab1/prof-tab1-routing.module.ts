import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfTab1Page } from './prof-tab1.page';

const routes: Routes = [
  {
    path: '',
    component: ProfTab1Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfTab1PageRoutingModule {}

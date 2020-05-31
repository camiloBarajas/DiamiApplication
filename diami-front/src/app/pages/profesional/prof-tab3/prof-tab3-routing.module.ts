import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfTab3Page } from './prof-tab3.page';

const routes: Routes = [
  {
    path: '',
    component: ProfTab3Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfTab3PageRoutingModule {}

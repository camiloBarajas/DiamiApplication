import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';
import { AuthGuard } from 'src/app/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'requests',
        loadChildren: () =>
          import('../prof-tab1/prof-tab1.module').then(
            (m) => m.ProfTab1PageModule
          ),
        canLoad: [AuthGuard]
      },
      {
        path: 'history',
        loadChildren: () =>
          import('../prof-tab2/prof-tab2.module').then(
            (m) => m.ProfTab2PageModule
          ),
        canLoad: [AuthGuard]
      },
      {
        path: 'prof-profile',
        loadChildren: () =>
          import('../prof-tab3/prof-tab3.module').then(
            (m) => m.ProfTab3PageModule
          ),
        canLoad: [AuthGuard]
      }
    ]
  },
  {
    path: '',
    redirectTo: '/welcome',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}

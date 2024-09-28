import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  {
    path: 'modeles',
    loadChildren: () =>
      import('./modeles/modeles.module').then((c) => c.ModelesModule),
  },
  {
    path: 'cv',
    loadChildren: () => import('./cv/cv.module').then((c) => c.CvModule),
  },
  {
    path: 'users',
    loadChildren: () =>
      import('./users/users.module').then((c) => c.UsersModule),
  },
  { path: 'dashboard', component: DashboardComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

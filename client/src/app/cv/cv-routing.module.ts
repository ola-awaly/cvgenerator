import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../shared/guards/auth.guard';
import { CreateCvComponent } from './create-cv/create-cv.component';
import { ListeCvComponent } from './liste-cv/liste-cv.component';

const routes: Routes = [
  {path:'create',component:CreateCvComponent,canActivate:[AuthGuard]},
  {path:'edit/:id',component:CreateCvComponent,canActivate:[AuthGuard]},
  {path: 'mescv', component:ListeCvComponent,canActivate:[AuthGuard]},
  {path: 'mescv/:id', component:ListeCvComponent,canActivate:[AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CvRoutingModule { }

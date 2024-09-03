import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../shared/guards/auth.guard';
import { LoginComponent } from './login/login.component';
import { MesParametresComponent } from './mes-parametres/mes-parametres.component';
import { ModifierMotDePasseComponent } from './modifier-mot-de-passe/modifier-mot-de-passe.component';
import { RegisterComponent } from './register/register/register.component';

const routes: Routes = [
  {path:'login',component:LoginComponent},
  {path:'register',component:RegisterComponent},
  {path:'mes-parametres/:id',component:MesParametresComponent,canActivate:[AuthGuard]},
  {path:'modifier-mot-de-passe/:id',component:ModifierMotDePasseComponent,canActivate:[AuthGuard]},
  {path:'modifier-mot-de-passe-by-token/:token',component:ModifierMotDePasseComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }

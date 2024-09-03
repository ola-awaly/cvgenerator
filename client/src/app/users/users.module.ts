import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { LoginComponent } from './login/login.component';
import { MaterialModule } from '../material/material.module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './register/register/register.component';
import { MesParametresComponent } from './mes-parametres/mes-parametres.component';
import { ModifierMotDePasseComponent } from './modifier-mot-de-passe/modifier-mot-de-passe.component';
import { DialogueForgetPasswordComponent } from './dialogue-forget-password/dialogue-forget-password.component';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    MesParametresComponent,
    ModifierMotDePasseComponent,
    DialogueForgetPasswordComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule
  ],providers: [
    {
      provide: MatDialogRef,
      useValue: {}
    },
    DialogueForgetPasswordComponent
    
 ]
})
export class UsersModule { }

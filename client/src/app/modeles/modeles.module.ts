import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModelesRoutingModule } from './modeles-routing.module';
import { BasicComponent } from './basic/basic.component';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {MatIconModule} from '@angular/material/icon';
import { MaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { EditPhotoComponent } from '../cv/sections/photo/edit-photo/edit-photo.component';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { DialogueEditPhotoComponent } from '../cv/sections/photo/dialogue-edit-photo/dialogue-edit-photo.component';
import { DialogueSendByMailFormComponent } from './tools/dialogue-send-by-mail-form/dialogue-send-by-mail-form.component';

@NgModule({
  declarations: [
    BasicComponent,
    DialogueSendByMailFormComponent
  ],
  imports: [
    CommonModule,
    ModelesRoutingModule,
    DragDropModule,
    MatIconModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    MatDialogModule
  ],
  providers: [
    {
      provide: MatDialogRef,
      useValue: {}
    },
    DialogueEditPhotoComponent
 ]
})
export class ModelesModule { }

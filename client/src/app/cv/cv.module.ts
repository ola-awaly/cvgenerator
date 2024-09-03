import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CvRoutingModule } from './cv-routing.module';
import { CreateCvComponent } from './create-cv/create-cv.component';
import { MaterialModule } from '../material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ListeCvComponent } from './liste-cv/liste-cv.component';
import { EditProfileComponent } from './sections/profile/edit-profile/edit-profile.component';
import { EditExperienceComponent } from './sections/experience/edit-experience/edit-experience.component';
import { EditFormationComponent } from './sections/formation/edit-formation/edit-formation.component';
import { EditSectionComponent } from './sections/edit-section/edit-section.component';
//import { AngularEditorModule } from '@kolkov/angular-editor';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { EditLangueComponent } from './sections/langue/edit-langue/edit-langue.component';
import { EditLienComponent } from './sections/liens/edit-lien/edit-lien.component';
import { EditPhotoComponent } from './sections/photo/edit-photo/edit-photo.component';
import { ImageCropperModule } from 'ngx-image-cropper';
import { SelectModeleComponent } from './select-modele/select-modele.component';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { SharedModule } from '../shared/shared.module';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { DialogueEditPhotoComponent } from './sections/photo/dialogue-edit-photo/dialogue-edit-photo.component';
import { DialogueEditProfileComponent } from './sections/profile/dialogue-edit-profile/dialogue-edit-profile.component';
import { DialogueEditExperienceComponent } from './sections/experience/dialogue-edit-experience/dialogue-edit-experience.component';
import { DialogueEditFormationComponent } from './sections/formation/dialogue-edit-formation/dialogue-edit-formation.component';
import { DialogueEditLangueComponent } from './sections/langue/dialogue-edit-langue/dialogue-edit-langue.component';
import { DialogueEditLienComponent } from './sections/liens/dialogue-edit-lien/dialogue-edit-lien.component';
import { DialogueEditSectionComponent } from './sections/dialogue-edit-section/dialogue-edit-section.component';
import { DialogueRenameCvlabelComponent } from './dialogue-rename-cvlabel/dialogue-rename-cvlabel.component';


@NgModule({
  declarations: [
  
    CreateCvComponent,
       ListeCvComponent,
       EditProfileComponent,
       EditExperienceComponent,
       EditFormationComponent,
       EditSectionComponent,
       EditLangueComponent,
       EditLienComponent,
       EditPhotoComponent,
       SelectModeleComponent,
       DialogueEditPhotoComponent,
       DialogueEditProfileComponent,
       DialogueEditExperienceComponent,
       DialogueEditFormationComponent,
       DialogueEditLangueComponent,
       DialogueEditLienComponent,
       DialogueEditSectionComponent,
       DialogueRenameCvlabelComponent,
       
  ],
  imports: [
    CommonModule,
    CvRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    CKEditorModule,
    ImageCropperModule,
    DragDropModule,
    SharedModule,
    MatDialogModule,
  ],
  providers: [
    {
      provide: MatDialogRef,
      useValue: {}
    },
    EditPhotoComponent
 ]
})
export class CvModule { }

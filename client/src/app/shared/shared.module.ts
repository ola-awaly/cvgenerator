import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NiveauPipe } from './pipes/niveau.pipe';
import { CvItemListDirective } from './directives/cv-item-list.directive';



@NgModule({
  declarations: [
    NiveauPipe,
    CvItemListDirective
  ],
  imports: [
    CommonModule
  ],
  exports:[
    NiveauPipe,
    CvItemListDirective
  ]
})
export class SharedModule { }

import {  NgModule } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatMenuModule} from '@angular/material/menu';
import {MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatStepperModule} from '@angular/material/stepper';
import { MatInputModule } from '@angular/material/input';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatListModule} from '@angular/material/list';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatExpansionModule} from '@angular/material/expansion';
import {CdkAccordionModule} from '@angular/cdk/accordion';
import {MatAccordion} from '@angular/material/expansion';
import {MatSliderModule} from '@angular/material/slider';
import {MatSelectModule} from '@angular/material/select';
import {MatRadioModule} from '@angular/material/radio';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatBadgeModule} from '@angular/material/badge';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

const MaterialComponents=[
  MatButtonModule,
  MatCardModule,
  MatToolbarModule,
  MatMenuModule,
  MatTableModule,
  MatIconModule,
  MatDividerModule,
  MatFormFieldModule,
  MatStepperModule,
  MatInputModule ,
  MatGridListModule ,
  MatListModule,
  MatCheckboxModule,
  MatExpansionModule,
  CdkAccordionModule,
  MatSliderModule,
  MatSelectModule,
  MatRadioModule,
  MatProgressBarModule,
  MatButtonToggleModule,
  MatBadgeModule,
  MatProgressSpinnerModule
]

@NgModule({
  declarations: [],
  imports: [
    MaterialComponents
  ],
  exports:[
    MaterialComponents
  ]
})
export class MaterialModule { }

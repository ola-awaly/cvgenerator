import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { SectionItem } from 'src/app/models/SectionItem.model';
import { SectionList } from 'src/app/models/SectionList.model';
import { SectionsService } from 'src/app/services/sections.service';
//import { AngularEditorConfig } from '@kolkov/angular-editor';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
//import Underline from '@ckeditor/ckeditor5-basic-styles/src/underline';
@Component({
  selector: 'app-edit-section',
  templateUrl: './edit-section.component.html',
  styleUrls: ['./edit-section.component.scss']
})
export class EditSectionComponent implements OnInit {

  public Editor = ClassicEditor;
  @Input() type = '';
  @Output() formState = new EventEmitter<boolean>();
  sectionFormGroup: FormGroup;
  CvId!:number;
  SectionId!:number;
  section!:SectionItem;
  config={ toolbar: [ 'bold', 'italic' ,'link','bulletedList', 'numberedList','undo','redo'] }
  
  constructor(private _formBuilder: FormBuilder, private _sectionapi:SectionsService) {}

  ngOnInit(): void {
   
    console.log("edit section oninit 😇");
    //get le cv en cours
    this.CvId=JSON.parse(localStorage.getItem("cvencours"))
    console.log("cvencours"+this.CvId);
    console.log({'type':this.type});
    
    if(this.type !='')
    {
      this._sectionapi.getAll(this.CvId,this.type).subscribe({
        next: (data : SectionList)=>{
          if(data.count)
          {
            console.log("Dans data count 🧐 🧐 🧐 🧐 🧐 🧐");
            
            this.SectionId=data.rows[0].id
            this.section=data.rows[0];
            this.formState.emit(true);
            console.log(data);
          
          }
         
          this.initSectionFormGroup()
         
          
        },
        error: err =>{
          console.log("error error error");
          
          console.log(err.status);
          if(err.status == 404)
          {
            this.initSectionFormGroup()
          }
          
        }
      })
    }
    else
      this.type='divers'
    
  
    
  }
  submitSection(){
    console.log("😶 😶 😶 😶 😶");
    console.log(this.sectionFormGroup.value);
   
    let section={...this.sectionFormGroup.value,
           intitule: 'Compétences',
           position:"gauche",
           type:this.type,
           ordre:2,
           CvId:this.CvId
         }
    if(this.section)
    {
      this.section.description=this.sectionFormGroup.get("description").value
      this._sectionapi.update(this.SectionId,this.section).subscribe({
        next: data=>{
            console.log({"dans update 🖐🏾 🖐🏾 🖐🏾":data});
            
        },
        error:err=>{
          console.log(err);
          
        }
      })
    }
         
    else

        this._sectionapi.new(section).subscribe({
              next: data=>{
                console.log(data);
                this.SectionId=data['id']
              },
              error: err=>{
                console.log(err);
                
              }
            })

    this.formState.emit(true);
    
  }
  
  initSectionFormGroup(){

    if(this.section)
      this.sectionFormGroup=this._formBuilder.group({
        'intitule':new FormControl(this.section.intitule),
        'description':new FormControl(this.section.description, Validators.required),
        'CvId':this.CvId             
        
      })
    else
    this.sectionFormGroup=this._formBuilder.group({
      'intitule':new FormControl(''),
       'description':new FormControl('', Validators.required),
       'CvId':this.CvId             
      
    })

    
      
  }
  


}

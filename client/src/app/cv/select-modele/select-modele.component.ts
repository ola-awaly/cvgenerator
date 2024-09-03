import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CvItem } from 'src/app/models/CvItem.model';
import { TemplateList } from 'src/app/models/TemplateList.model';
import { CvService } from 'src/app/services/cv.service';
import { TemplatesService } from 'src/app/services/templates.service';

@Component({
  selector: 'app-select-modele',
  templateUrl: './select-modele.component.html',
  styleUrls: ['./select-modele.component.scss']
})
export class SelectModeleComponent implements OnInit {

  @Output() formState = new EventEmitter<boolean>();
  templateFormGroup: FormGroup=this._formBuilder.group({
    'TemplateId':new FormControl('',Validators.required)
  })
  CvId!:number;
  Id!:number;
  templateList!:TemplateList;
  cv!:CvItem;
  
  constructor(private _formBuilder: FormBuilder, private _templateapi:TemplatesService,private _cvapi:CvService) {}

  ngOnInit(): void {
   
    console.log("edit template oninit 😇");
    //get le cv en cours
    this.CvId=JSON.parse(localStorage.getItem("cvencours"))
    console.log("cvencours"+this.CvId);
   
    this._cvapi.getOne(this.CvId).subscribe({
      next: data=>{
          this.cv = data
          console.log({'cv':data});
          
          this.initTemplateFormGroup()
      },
      error: err =>{
        console.log(err);
      }
    })
    
      this._templateapi.getAll(this.CvId).subscribe({
        next: (data : TemplateList)=>{
          if(data.count)
          {
            console.log("Dans data count 🧐 🧐 🧐 🧐 🧐 🧐");
            this.templateList=data;
            this.formState.emit(true);
            console.log({'templateliste':data});
          }
        },
        error: err =>{
          console.log("error error error");
          
          console.log(err.status);
          if(err.status == 404)
          {
            this.initTemplateFormGroup()
          }
        }
      })
    
    
  
    
  }
   submitTemplate(){
    console.log("😶 😶 😶 😶 😶");
    console.log(this.templateFormGroup.value);
    this.cv.TemplateId=this.templateFormGroup.get('TemplateId').value
    this.cv.customTemplateConfig=this.templateList.rows.find(el=>el.id == this.cv.TemplateId).configParDefaut
    this._cvapi.update(this.CvId,this.cv).subscribe({
      next: data=>{
        console.log(data);
        
      },
      error: err=>{
        console.log(err);
        
      }
    })
    this.formState.emit(true);
   }
  
  initTemplateFormGroup(){

   
      this.templateFormGroup=this._formBuilder.group({
        'TemplateId':new FormControl(this.cv.TemplateId,Validators.required)
      })
   

    
      
  }

}

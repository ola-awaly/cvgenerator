import { Component, OnInit,Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { CvItem } from 'src/app/models/CvItem.model';
import { CvService } from 'src/app/services/cv.service';

@Component({
  selector: 'app-dialogue-rename-cvlabel',
  templateUrl: './dialogue-rename-cvlabel.component.html',
  styleUrls: ['./dialogue-rename-cvlabel.component.scss']
})
export class DialogueRenameCvlabelComponent implements OnInit {

  labelFormGroup: FormGroup;
  CvId!:number;
  CV!:CvItem;
  constructor( private _formBuilder: FormBuilder, private _cvapi:CvService, 
    public dialogRef: MatDialogRef<DialogueRenameCvlabelComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    ) { }

  
    //gestion dialogue
  cancel(): void {
    this.dialogRef.close();
  }

  // ok(){
    
  //   this.dialogRef.close(this.CV);
  // }
  
  ngOnInit() {
    console.log("edit profile");
    if(this.data['cvid']) 
    this.CvId=this.data['cvid']
  else
   this.CvId=JSON.parse(localStorage.getItem("cvencours"))
    this._cvapi.getOne(this.CvId).subscribe({
      next: data=>{
        console.log(data);
        
          this.CV = data
          this.changerForm();
         
      },
      error: err =>{
        
        
        console.log(err);
       
        
      }
    })
   
  }

  changerForm(){
    this.labelFormGroup = this._formBuilder.group({
      label: [this.CV.label, Validators.required],
     
  });
  }

  submitLabel(){
    console.log("submitting");
    
    console.log(this.labelFormGroup.value);
    const cv=this.labelFormGroup.value
    
    this._cvapi.update(this.CvId,cv).subscribe({
      next: data =>{
        console.log(data);
        this.CV=cv
        this.dialogRef.close(this.CV);
      },
      error: err =>{
        console.log(err);
        
      }
    })

   
  }

}

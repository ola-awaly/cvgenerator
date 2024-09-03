import { Component, OnInit,Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { CvItem } from 'src/app/models/CvItem.model';
import { CvService } from 'src/app/services/cv.service';
import { DateAvantAujourdhui } from 'src/app/shared/validators/date-avant-aujourdhui';

@Component({
  selector: 'app-dialogue-edit-profile',
  templateUrl: './dialogue-edit-profile.component.html',
  styleUrls: ['./dialogue-edit-profile.component.scss']
})
export class DialogueEditProfileComponent implements OnInit {

  validated:boolean=false
  profileFormGroup: FormGroup;
  CvId!:number;
  CV!:CvItem;
  constructor( private _formBuilder: FormBuilder, private _cvapi:CvService, 
    public dialogRef: MatDialogRef<DialogueEditProfileComponent>,
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
    this.profileFormGroup = this._formBuilder.group({
      nom: [this.CV.nom, [Validators.required,Validators.minLength(3)]],
      prenom: [this.CV.prenom,[Validators.required,Validators.minLength(3)]],
      intituleDePoste:[this.CV.intituleDePoste,[Validators.required,Validators.minLength(3)]],
      adresse:[this.CV.adresse],
      cp:[this.CV.cp],
      ville:[this.CV.ville,[Validators.required,Validators.minLength(3)]],
      tel:[this.CV.tel],
      mobile:[this.CV.mobile],
      email:[this.CV.email,Validators.email],
      dateDeNaissance:[this.CV.dateDeNaissance,DateAvantAujourdhui()],
      nationalite:[this.CV.nationalite],
      permisDeConduire:[this.CV.permisDeConduire],
      situationFamiliale:[this.CV.situationFamiliale]
  });
  }

  submitProfil(){
    console.log("submitting");
    
    console.log(this.profileFormGroup.value);
    const cv=this.profileFormGroup.value
    cv['status']=1
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

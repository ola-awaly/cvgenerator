import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CvItem } from 'src/app/models/CvItem.model';
import { CvService } from 'src/app/services/cv.service';
import { DateAvantAujourdhui } from 'src/app/shared/validators/date-avant-aujourdhui';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {

  profileFormGroup: FormGroup;
  CvId!:number;
  CV!:CvItem;
  @Output() formState = new EventEmitter<boolean>();
  constructor(private _formBuilder: FormBuilder, private _cvapi:CvService) {}

  ngOnInit() {
    console.log("edit profile");
    this.CvId=JSON.parse(localStorage.getItem("cvencours"))
    this._cvapi.getOne(this.CvId).subscribe({
      next: data=>{
          this.CV = data
          this.changerForm();
          if(this.profileFormGroup.valid)
          this.formState.emit(true);
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
        
      },
      error: err =>{
        console.log(err);
        
      }
    })

    this.formState.emit(true);
  }
}

import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-dialogue-forget-password',
  templateUrl: './dialogue-forget-password.component.html',
  styleUrls: ['./dialogue-forget-password.component.scss']
})
export class DialogueForgetPasswordComponent implements OnInit {

  sendMailFormGroup: FormGroup;
  
  showSpinner:boolean=false
  showSent:boolean=false
  sentMessage:string=''
  constructor( private _formBuilder: FormBuilder,private _usersapi:UsersService,
    public dialogRef: MatDialogRef<DialogueForgetPasswordComponent>,
   
    ) { }

  
    //gestion dialogue
  cancel(): void {
    this.dialogRef.close();
  }

  // ok(){
    
  //   this.dialogRef.close(this.CV);
  // }
  
  ngOnInit() {
    
    
    this.chargerForm()
   
  }

  chargerForm(){
    this.sendMailFormGroup = this._formBuilder.group({
      toEmail: [null, [Validators.required,Validators.email]]
     
  });
  }

  submitForm(){
    console.log("submitting");
    
    
    const info=this.sendMailFormGroup.value
    this.showSpinner=true
    this._usersapi.sendEmailForgetPassword(info.toEmail).subscribe({
      next: data =>{
        console.log(data);
        this.showSpinner=false
        if(data['sent'] == 1){
          this.showSent=true
          this.sentMessage="C'est envoyé !"
        }
        else{
          this.showSent=true
          this.sentMessage="Email pas envoyé !"
        }
        setTimeout(() => {
          this.dialogRef.close();
       }, 2000)
        
      },
      error: err =>{
        console.log(err);
        
      }
    })

   
  }



}

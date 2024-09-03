import { Component, OnInit,Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { CvItem } from 'src/app/models/CvItem.model';
import { CvService } from 'src/app/services/cv.service';

@Component({
  selector: 'app-dialogue-send-by-mail-form',
  templateUrl: './dialogue-send-by-mail-form.component.html',
  styleUrls: ['./dialogue-send-by-mail-form.component.scss']
})
export class DialogueSendByMailFormComponent implements OnInit {

  sendMailFormGroup: FormGroup;
  cv!:CvItem
  showSpinner:boolean=false
  showSent:boolean=false
  sentMessage:string=''
  constructor( private _formBuilder: FormBuilder, private _cvapi:CvService,
    public dialogRef: MatDialogRef<DialogueSendByMailFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CvItem,
    ) { }

  
    //gestion dialogue
  cancel(): void {
    this.dialogRef.close();
  }

  // ok(){
    
  //   this.dialogRef.close(this.CV);
  // }
  
  ngOnInit() {
    
    if(this.data) this.cv=this.data['cv']
    this.chargerForm()
   
  }

  chargerForm(){
    this.sendMailFormGroup = this._formBuilder.group({
      toEmail: [null, Validators.required,Validators.email],
      subject: [null,Validators.required],
      message: [null,Validators.required]
     
  });
  }

  submitForm(){
    console.log("submitting");
    
    console.log(this.sendMailFormGroup.value + this.cv.id);
    const info=this.sendMailFormGroup.value
    this.showSpinner=true
    this._cvapi.sendByMail(this.cv.id,info.toEmail,info.subject,info.message).subscribe({
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

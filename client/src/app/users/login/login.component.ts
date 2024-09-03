import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { UsersService } from 'src/app/services/users.service';
import { DialogueSendByMailFormComponent } from 'src/app/modeles/tools/dialogue-send-by-mail-form/dialogue-send-by-mail-form.component';
import { MatDialog } from '@angular/material/dialog';
import { DialogueForgetPasswordComponent } from '../dialogue-forget-password/dialogue-forget-password.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginFormGroup!:FormGroup
  constructor(private _formBuilder: FormBuilder,private _auth:AuthService,
              private _router:Router,private _toasterService:ToastrService,
              private _usersapi:UsersService,private _dialog:MatDialog) { }

  ngOnInit(): void {
    this.loginFormGroup=this._formBuilder.group({
      'email':[null,[Validators.required, Validators.email]],
      'password':[null,Validators.required]
    })
  }
  login(){
    console.log("login");
    let values=this.loginFormGroup.value
    this._auth.login(values['email'],values['password']).subscribe({
      next: data=>{
        console.log("dans next");
        if(data == true)
          this._router.navigate(['/dashboard'])
        else
         // console.log("Error logging in")
         this._toasterService.error("Error logging in", "Error", { positionClass: 'toast-bottom-center' });
                    
        console.log(data);
        
      },
      error:err=>{
        console.log("dans error");
        console.log("Error logging in")
        this._toasterService.error("Error logging in", "Error", { positionClass: 'toast-center-center' });
         
      }
    }
    )
      
  }
  sendEmailForgetPassword(){
    
  
      let dialogRefSendByMail = this._dialog.open(DialogueForgetPasswordComponent, {
        width: '40em',
        
      });
    
      dialogRefSendByMail.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        console.log(result);
       
           
         });
    
      
     
  }

}


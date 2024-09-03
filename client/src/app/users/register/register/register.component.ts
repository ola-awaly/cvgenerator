import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UsersService } from 'src/app/services/users.service';
import { isEqualToPassword } from 'src/app/shared/validators/confirmpassword-is-equal-to-password';
import { DateAvantAujourdhui } from 'src/app/shared/validators/date-avant-aujourdhui';
import {  EmailValidator } from 'src/app/shared/validators/email-exist';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerFormGroup!:FormGroup
  isRegistered:boolean=false
  constructor(private _formBuilder: FormBuilder,private _usersapi:UsersService,
              private _router:Router,private _toasterService:ToastrService,
              private _emailValidator:EmailValidator) { }

  ngOnInit(): void {
    console.log(this.isRegistered);
    
    this.registerFormGroup=this._formBuilder.group({
        'email':[null,{
          validators:[Validators.required, Validators.email],
          asyncValidators:[this._emailValidator.validate],
          updateOn: 'blur'
        }],
        'password':[null,Validators.compose([
          Validators.minLength(8),
          Validators.required,
          Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$') // (both uppercase and lowercase) and numbers validation
       ])],
       'confirmPassword': [null,Validators.compose([Validators.required])],
       
        'prenom': [null,Validators.compose([Validators.required,Validators.minLength(3)])],
        'nom': [null,[Validators.required,Validators.minLength(3)]],
        'adresse': [null],
        'cp': [null],
        'ville': [null],
        'pays':[null],
        'tel': [null],
        'mobile': [null],
        'dateDeNaissance': [null,DateAvantAujourdhui()],
    }, { 
      validator: isEqualToPassword('password', 'confirmPassword')
    })
  }
  register(){
    console.log("register");
    let user=this.registerFormGroup.value
    for(let c in user)
        if(user[c] == null) delete user[c]
        
    this._usersapi.new(user).subscribe({
      next: data=>{
        console.log(data);
        this.isRegistered=true
      },
      error: err=>{
        console.log(err);
        this._toasterService.error("Error logging in", "Error", { positionClass: 'toast-bottom-center' });
           
        
      }
      
    })
    // this._auth.login(values['email'],values['password']).subscribe({
    //   next: data=>{
    //     console.log("dans next");
    //     if(data == true)
    //       this._router.navigate(['/dashboard'])
    //     else
    //      // console.log("Error logging in")
    //      this._toasterService.error("Error logging in", "Error", { positionClass: 'toast-bottom-center' });
                    
    //     console.log(data);
        
    //   },
    //   error:err=>{
    //     console.log("dans error");
    //     console.log("Error logging in")
    //     this._toasterService.error("Error logging in", "Error", { positionClass: 'toast-center-center' });
         
    //   }
    // }
    // )
      
  }

}


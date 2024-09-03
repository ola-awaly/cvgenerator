import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserItem } from 'src/app/models/UserITem.model';
import { UsersService } from 'src/app/services/users.service';
import { isEqualToPassword } from 'src/app/shared/validators/confirmpassword-is-equal-to-password';
import { DateAvantAujourdhui } from 'src/app/shared/validators/date-avant-aujourdhui';
import {  EmailValidator } from 'src/app/shared/validators/email-exist';

@Component({
  selector: 'app-mes-parametres',
  templateUrl: './mes-parametres.component.html',
  styleUrls: ['./mes-parametres.component.scss']
})
export class MesParametresComponent implements OnInit {

  mesParametresFormGroup!:FormGroup
  isSaved:boolean=false
  id!:number
  user!:UserItem
  constructor(private _formBuilder: FormBuilder,private _usersapi:UsersService,
              private _router:Router,private _toasterService:ToastrService,
              private _emailValidator:EmailValidator,
              private _activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.id=this._activatedRoute.snapshot.params['id']
    console.log(this.isSaved);
    this._usersapi.getOne(this.id).subscribe({
      next: data=>{
          this.user=data
          this.chargeForm()
      },
      error:err=>{
        this._toasterService.error("An error has occured", "Error", { positionClass: 'toast-bottom-center' });
        
      }
    })
    
    
  }

  chargeForm(){
    this.mesParametresFormGroup=this._formBuilder.group({
      'email':[this.user.email,{
        validators:[Validators.required, Validators.email],
        asyncValidators:[this._emailValidator.validate],
        updateOn: 'blur'
      }],
     
     
      'prenom': [this.user.prenom,Validators.compose([Validators.required,Validators.minLength(3)])],
      'nom': [this.user.nom,[Validators.required,Validators.minLength(3)]],
      'adresse': [this.user.adresse],
      'cp': [this.user.cp],
      'ville': [this.user.ville],
      'pays' : [this.user.pays],
      'tel': [this.user.tel],
      'mobile': [this.user.mobile],
      'dateDeNaissance': [this.user.dateDeNaissance,DateAvantAujourdhui()],
  })
  }
  save(){
    console.log("register");
    let user=this.mesParametresFormGroup.value
    for(let c in user)
        if(user[c] == null) delete user[c]
        
    this._usersapi.update(this.id,user).subscribe({
      next: data=>{
        console.log(data);
        if(data["updated"]==1)
          this.isSaved=true
        else
          this._toasterService.error("Nothing saved", "Error", { positionClass: 'toast-bottom-center' });
       
      },
      error: err=>{
        console.log(err);
        this._toasterService.error("An error has occured", "Error", { positionClass: 'toast-bottom-center' });
           
        
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

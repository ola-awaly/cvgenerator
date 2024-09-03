import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserItem } from 'src/app/models/UserITem.model';
import { UsersService } from 'src/app/services/users.service';
import { isEqualToPassword } from 'src/app/shared/validators/confirmpassword-is-equal-to-password';

@Component({
  selector: 'app-modifier-mot-de-passe',
  templateUrl: './modifier-mot-de-passe.component.html',
  styleUrls: ['./modifier-mot-de-passe.component.scss']
})
export class ModifierMotDePasseComponent implements OnInit {

  mdpFormGroup!:FormGroup
  isSaved:boolean=false
  id!:number
  //user!:UserItem
  resetByToken:boolean=false
  constructor(private _formBuilder: FormBuilder,private _usersapi:UsersService,
              private _router:Router,private _toasterService:ToastrService,
              private _activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    if(this._activatedRoute.snapshot.params['id'])
    this.id=this._activatedRoute.snapshot.params['id']
    else if(this._activatedRoute.snapshot.params['token']){
      this.resetByToken=true
      this._usersapi.checkRandomToken(this._activatedRoute.snapshot.params['token']).subscribe({
        next:data=>{
          if(data){
            if (data["valid"] && data["valid"] == 0)
              this._toasterService.error("Ce lien n'est plus valide", "Error", { positionClass: 'toast-center-center' });
            else
              this.id=data["id"]
        
          }
        },
        error:err=>{
          console.log(err);
          
        }
      })
    }
    console.log(this.isSaved);
    this.chargeForm()
    // this._usersapi.getOne(this.id).subscribe({
    //   next: data=>{
    //       this.user=data
    //       this.chargeForm()
    //   },
    //   error:err=>{
    //     this._toasterService.error("An error has occured", "Error", { positionClass: 'toast-bottom-center' });
        
    //   }
    // })
    
    
  }

  chargeForm(){
    this.mdpFormGroup=this._formBuilder.group({
      'password':[null,Validators.compose([
        Validators.minLength(8),
        Validators.required,
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$') // (both uppercase and lowercase) and numbers validation
     ])],
     'confirmPassword': [null,Validators.compose([Validators.required])],
     
     
  },{ 
    validator: isEqualToPassword('password', 'confirmPassword')
  })
  }
  save(){
    console.log("change password save");
    let user=this.mdpFormGroup.value
    for(let c in user)
        if(user[c] == null) delete user[c]
    if(!this.resetByToken){
      this._usersapi.resetPassword(this.id,user).subscribe({
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
    }
    else{
      user.token=this._activatedRoute.snapshot.params['token']
      this._usersapi.resetPasswordByToken(this.id,user).subscribe({
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
    }    
   
  
      
  }

}

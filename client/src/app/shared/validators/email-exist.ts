import { Injectable } from "@angular/core";
import { AbstractControl, AsyncValidator, AsyncValidatorFn, ValidationErrors, ValidatorFn } from "@angular/forms";
import { UsersService } from "src/app/services/users.service";
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
@Injectable({
    providedIn: 'root',
  })
export class EmailValidator implements AsyncValidator {
    constructor(private _usersapi:UsersService){}

    validate = (control: AbstractControl) :Observable<ValidationErrors> | null => {
        
        const loggedUser=localStorage.getItem('loggedUser')
        console.log(loggedUser);
        
        if(loggedUser)
        {
          let loggedUserObj=JSON.parse(loggedUser)
          if(loggedUserObj.email == control.value)
            return of(null)
          
        }
        return this._usersapi.emailExist(control.value).pipe(
            map(data => (data['exist'] === 'true' ? { emailexist: true } : null),
            catchError(() => of(null))
          ));
        // return this.http.get(`${this.apiUrl}/users?name=${control.value}`).pipe(
        //   map(isUsernameValid => (isUsernameValid === 'false' ? { usernameIsInvalid: true } : null),
        //   catchError(() => of(null))
        // );
      }
    //  EmailExist(control: AbstractControl,_usersapi:UsersService) : Observable<ValidationErrors> | null {
   
        
    //        // if(control.touched) {
    //         console.log('email validator');
          
    //         let value :string = control.value;
    //         if(value == null) return of(null)
    //         //return of({emailexist : "Cet email existe déjà"});
    //         //this._usersapi.emailExist()
    //         _usersapi.emailExist(value).subscribe({
    //             next: data=>{
    //                 console.log(data);
                    
    //                 if(data['exist']==true)
    //                     return of({emailexist : "Cet email existe déjà"});
    //                 else
    //                     return of(null)
    //             }
    //         })
    //         return of(null)
            
            
    //        /* if(value == null) return null
    //         if(value.length < length) return {myCustomError : "Chaine de caratère trop courte"}
    //         if(value.length == length) return {myError2 : "Chaine à la bonne taille"}*/
    //         //}
            
    //       //  }
        
    // }
}

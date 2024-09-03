import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable, of } from "rxjs";
import { tap, catchError } from "rxjs/operators";
import { ToastrService } from 'ngx-toastr';
import { Router } from "@angular/router";


@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(public toasterService: ToastrService,private _router:Router) {}

    intercept(req: HttpRequest<any>,
              next: HttpHandler): Observable<HttpEvent<any>> {

        
            const loggedUser=localStorage.getItem('loggedUser')
            console.log({'httprequest':HttpRequest});
            
            if(loggedUser)
            {
              const loggedUserObj=JSON.parse(loggedUser)
              const idToken=loggedUserObj['accessToken']
              const cloned = req.clone({
                headers: req.headers.set("Authorization",
                    "Bearer " + idToken)
            });

            return next.handle(cloned).pipe(
                tap(evt => {
                    if (evt instanceof HttpResponse) {
                        if(evt.body && evt.body.success)
                            this.toasterService.success(evt.body.success.message, evt.body.success.title, { positionClass: 'toast-bottom-center' });
                    }
                }),
                catchError((err: any) => {
                    if(err instanceof HttpErrorResponse) {
                        try {
                            if(err.status==401)
                            this._router.navigate(['/users/login'])
                            this.toasterService.error(err.error.message || 'An Error has occured', err.error.title || 'Error', { positionClass: 'toast-bottom-center' });
                        } catch(e) {

                            //this.toasterService.error('An error occurred', '', { positionClass: 'toast-bottom-center' });
                            this._router.navigate(['/users/login'])
                        }
                        //log error 
                    }
                    return of(err);
                }));
             }
             else
             return next.handle(req)
            // else {
            //     return next.handle(req).pipe(
            //         tap(evt => {
            //             if (evt instanceof HttpResponse) {
            //                 if(evt.body && evt.body.success)
            //                     this.toasterService.success(evt.body.success.message, evt.body.success.title, { positionClass: 'toast-bottom-center' });
            //             }
            //         }),
            //         catchError((err: any) => {
            //             if(err instanceof HttpErrorResponse) {
            //                // try {
            //                 console.log({'errorstatus':err.status});
                               
            //                     if(err.status==400)
            //                     console.log({'errorstatus':err.status});
            //                     if(err.error.length)
            //                         this.toasterService.error(err.error[0].message, err.error[0].type, { positionClass: 'toast-bottom-center' });
            //                     // else if(err.message.length)
            //                     // this.toasterService.error(err.message, 'Erreur', { positionClass: 'toast-bottom-center' });
                                
            //                // } catch(e) {
            //                     //console.log("catche",e);
                                
            //                     //this.toasterService.error('An error occurred', '', { positionClass: 'toast-bottom-center' });
            //                     //this._router.navigate(['/users/login'])
            //                // }
            //                 //log error 
            //             }
            //             return of(err);
            //         }));
            
            // }
    }
}
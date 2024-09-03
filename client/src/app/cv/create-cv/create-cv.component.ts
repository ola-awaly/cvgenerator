import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { ActivatedRoute, Router } from '@angular/router';
import { CvItem } from 'src/app/models/CvItem.model';
import { CvService } from 'src/app/services/cv.service';
import { UsersService } from 'src/app/services/users.service';
import { EditSectionComponent } from '../sections/edit-section/edit-section.component';
import { EditExperienceComponent } from '../sections/experience/edit-experience/edit-experience.component';
import { EditFormationComponent } from '../sections/formation/edit-formation/edit-formation.component';
import { EditLangueComponent } from '../sections/langue/edit-langue/edit-langue.component';
import { EditLienComponent } from '../sections/liens/edit-lien/edit-lien.component';
import { EditPhotoComponent } from '../sections/photo/edit-photo/edit-photo.component';
import { EditProfileComponent } from '../sections/profile/edit-profile/edit-profile.component';

@Component({
  selector: 'app-create-cv',
  templateUrl: './create-cv.component.html',
  styleUrls: ['./create-cv.component.scss']
})
export class CreateCvComponent implements OnInit {

  CvId!: number
  //languesFormGroup: FormGroup
  competencesFormGroup: FormGroup;
  profilProfessionnelFormGroup: FormGroup;
  modeleFormGroup: FormGroup;
  isEditable = false;
  orientation = 'horizontal';
  smallScreen!: boolean;
  @ViewChild('EditProfileComponent') editProfileComponent: EditProfileComponent
  @ViewChild('EditExperienceComponent') editExperienceComponent: EditExperienceComponent
  @ViewChild('EditFormationComponent') editFormationComponent: EditFormationComponent
  @ViewChild('EditSectionComponent') editSectionComponent: EditSectionComponent
  @ViewChild('EditLangueComponent') editLangueComponent: EditLangueComponent
  @ViewChild('EditLienComponent') editLienComponent: EditLienComponent
  @ViewChild('EditPhotoComponent') editPhotoComponent: EditPhotoComponent
  
  @ViewChild('stepper') stepper: MatStepper;
  parcoursCompleted:boolean=false
  
  get profileFormGroup() {

    return this.editProfileComponent ? this.editProfileComponent.profileFormGroup : null;
  }

  get parcoursFormGroup(){
    let FG=this.editExperienceComponent ? this.editExperienceComponent.parcoursFormGroup : null;
   
    return FG;

  }
 
setState(state){
  console.log({"currentstepstate":state});
  this.stepper.selected.completed=true
  //this.parcoursCompleted=state 
  this.stepper.next();
  
}
  get formationFormGroup(){
    return this.editFormationComponent ? this.editFormationComponent.formationFormGroup:  null;
  }
  get sectionFormGroup(){
    return this.editSectionComponent ? this.editSectionComponent.sectionFormGroup:  null;
  }

  get langueFormGroup(){
    return this.editLangueComponent ? this.editLangueComponent.langueFormGroup:  null;
  }

  get lienFormGroup(){
    return this.editLienComponent ? this.editLienComponent.lienFormGroup:  null;
  }
  get photoFormGroup(){
    return this.editPhotoComponent ? this.editPhotoComponent.photoFormGroup:  null;
  }


  constructor(private _formBuilder: FormBuilder, private _cvapi:CvService,
    private _userapi: UsersService,private _activatedRoute: ActivatedRoute,
    private _router: Router,private breakpointObserver: BreakpointObserver) {
      breakpointObserver.observe([
        Breakpoints.XSmall,
        Breakpoints.Small
      ]).subscribe(result => {
        //this.smallScreen = result.matches;
        result.matches?this.orientation='vertical':this.orientation='horizontal'
    });
    }

  ngOnInit() {

    if(this._activatedRoute.snapshot.params['id']){
      this.CvId=this._activatedRoute.snapshot.params['id']
      localStorage.setItem('cvencours',this.CvId.toString())
    }
    // else if(localStorage.getItem('cvencours'))
    //   this.CvId= parseInt(localStorage.getItem('cvencours'))
    else
        {
            //initialiser un nouveau cv et ajouter son id dans le local storage
            this.initCV()
        }
  
        
   
  }

  initCV(){
    if(localStorage.getItem('loggedUser'))
    {
      const user=JSON.parse(localStorage.getItem('loggedUser') )
      console.log(user.id);
      this._userapi.getOne(user.id).subscribe({
        next: userinfo=>{
             

          let cv={
            label : (userinfo['prenom']+userinfo['nom']+Date.now()).split('').map(el=>el == ' '? '-':el).join(''),
            adresse:userinfo['adresse'],
            cp: userinfo['cp'],
            ville:userinfo['ville'],
            tel:userinfo['tel'],
            mobile:userinfo['mobile'],
            email:userinfo['email'],
            dateDeNaissance: userinfo['dateDeNaissance'],
            prenom: userinfo['prenom'],
            nom : userinfo['nom'],
            UserId:userinfo['id'],
            TemplateId:1,
            customTemplateConfig:'{"bgcolor":"#fe7a66","sectionTitleFontSize":"16","police":"\'Open Sans\', sans-serif;","taillePolice":15,"espaceSections":"10","espaceParagraphes":"10","titleFontSize":28,"posteFontSize":17}',
            intituleDePoste:"",
            status:0
           
          }
            console.log(cv);
          
          this._cvapi.new(cv).subscribe({
            next: (data)=>{
              this.CvId=data["id"];
              localStorage.setItem('cvencours',data["id"])
            }
          })
        }
      })
     

    }
    
    
  }

  finaliser(){
    this._router.navigate(['/modeles/basic/'+this.CvId])
  }
  

  // @HostListener('window:resize') onWindowResize() {

  //   if (window.innerWidth <= 768) {
  //     this.orientation = 'vertical';
  //   } else {
  //     this.orientation = 'horizontal';
  //   }
  // }
}

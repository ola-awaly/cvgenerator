import { Component, EventEmitter, OnInit,Output,ViewChild } from '@angular/core';
import { Form, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Annee, Mois, moveItemInFormArray } from 'src/app/models/Config.model';
import { ExperienceList } from 'src/app/models/ExperienceList.model';
import { SectionItem } from 'src/app/models/SectionItem.model';
import { SectionList } from 'src/app/models/SectionList.model';
import { ExperiencesService } from 'src/app/services/experiences.service';
import { SectionsService } from 'src/app/services/sections.service';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import { isEqualToPassword } from 'src/app/shared/validators/confirmpassword-is-equal-to-password';
import { debutInferieurFin } from 'src/app/shared/validators/date-debut-inferieur-date-fin';

@Component({
  selector: 'app-edit-experience',
  templateUrl: './edit-experience.component.html',
  styleUrls: ['./edit-experience.component.scss']
})
export class EditExperienceComponent implements OnInit {

  parcoursFormGroup: FormGroup;
  CvId!:number;
  SectionId!:number;
  section!:SectionItem;
  mois=Mois;
  annee=Annee()
  @Output() formState = new EventEmitter<boolean>();
  constructor(private _formBuilder: FormBuilder, private _sectionapi:SectionsService,
              private _experienceapi:ExperiencesService) {}


  ngOnInit(): void {
   
    console.log("edit experience oninit");
    //get le cv en cours
    this.CvId=JSON.parse(localStorage.getItem("cvencours"))
    console.log("cvencours"+this.CvId);
    console.log("annee"+this.annee);
    
    // la section de type experience de ce cv
    this._sectionapi.getAll(this.CvId,'experience').subscribe({
      next: (data : SectionList)=>{
        if(data.count)
        {
          this.SectionId=data.rows[0].id
        console.log(data);
        this._experienceapi.getAll(this.SectionId).subscribe({
          next: (experiences: ExperienceList)=>{
              console.log(experiences);
              if(experiences.count)
              {

                this.parcoursFormGroup=this._formBuilder.group({
                        
                  'experiences': this._formBuilder.array([])
                })
                for(let exp of experiences.rows){
                  this.getExperiences().push( new FormGroup({
                    'id':new FormControl(exp.id),
                    'intituleDePoste':new FormControl(exp.intituleDePoste, [Validators.required,Validators.minLength(3)]),
                    'employeur':new FormControl(exp.employeur),
                    'ville': new FormControl(exp.ville),
                    'typeDeContrat': new FormControl(exp.typeDeContrat),
                    'dateDeDebutMois': new FormControl(exp.dateDeDebutMois),
                    'dateDeDebutAnnee': new FormControl(exp.dateDeDebutAnnee,Validators.required),
                    'dateDeFinMois': new FormControl(exp.dateDeFinMois),
                    'dateDeFinAnnee': new FormControl(exp.dateDeFinAnnee,Validators.required),
                    'enCours': new FormControl(exp.enCours,Validators.required),
                    'description':new FormControl(exp.description),
                    'ordre': new FormControl(exp.ordre),
                    'SectionId': new FormControl(exp.SectionId),
                  }
                  ))
                  let len=this.getExperiences().length - 1
                 // this.getExperiences().at(len).addValidators(debutInferieurFin('dateDeDebutAnnee','dateDeDebutMois','dateDeFinAnnee','dateDeFinMois'))
                 this.disableValidator(len,2); 
                  
                  
                }
                //.addValidators(debutInferieurFin('dateDeDebutAnnee','dateDeFinAnnee')
                this.formState.emit(true);
              }
              else
                this.initParcoursFormGroup()
          },
          error: err =>{
            console.log(err);
            this.initParcoursFormGroup()
          }
        })
        }
        //else
          //this.creerSection()
        
       
      },
      error: err =>{
        console.log("error error error");
        
        console.log(err.status);
        if(err.status == 404)
        {
          //this.creerSection()
        }
        
      }
    })
   
  }

  creerSection(){
    let section={
      intitule:"Expériences professionnelles",
      description:"",
      position:"droit",
      type:"experience",
      ordre:1,
      CvId:this.CvId
    }
    this._sectionapi.new(section).subscribe({
      next: data=>{
        console.log(data);
        this.SectionId=data['id']
        this.initParcoursFormGroup()
      },
      error: err=>{
        console.log(err);
        
      }
    })
  }
  initParcoursFormGroup(){

    this.parcoursFormGroup=this._formBuilder.group({
                        
      'experiences': this._formBuilder.array([])
    })
    
      this.addExperience()
      console.log("formgroup initialized");
  }
  getExperiences() : FormArray {
    return this.parcoursFormGroup.get('experiences') as FormArray;
  }
  addExperience(){
    if(!this.parcoursFormGroup)
      this.creerSection()
    this.getExperiences().push( new FormGroup({
      'intituleDePoste':new FormControl('', [Validators.required,Validators.minLength(3)]),
      'employeur':new FormControl(''),
      'ville': new FormControl(''),
      'typeDeContrat': new FormControl(''),
      'dateDeDebutMois': new FormControl(''),
      'dateDeDebutAnnee': new FormControl('',Validators.required),
      'dateDeFinMois': new FormControl(''),
      'dateDeFinAnnee': new FormControl('',Validators.required),
      'enCours': new FormControl(false,Validators.required),
      'description':new FormControl(''),
      'ordre': new FormControl(''),
      'SectionId': new FormControl(this.SectionId),
    }))
    let len=this.getExperiences().length - 1
    this.getExperiences().at(len).addValidators(debutInferieurFin('dateDeDebutAnnee','dateDeDebutMois','dateDeFinAnnee','dateDeFinMois'))
     //this.disableValidator(len);     
      
  }
  deleteExperience(i:number){
    let id=this.getExperiences().at(i).get('id')?.value
    console.log(id);
    
   if(id) 
      this._experienceapi.delete(id).subscribe()
  this.getExperiences().removeAt(i)
   
  }
  test(){
    console.log((this.getExperiences().at(1).valid && this.getExperiences().at(1).touched ));
    
  }
  submitParcours(){
    console.log('submit');
   // console.log(this.parcoursFormGroup.value);
    let section=this.parcoursFormGroup.value;
    this.setOrdres(section.experiences)
    console.log(section);
    for(let exp of section.experiences){
      if(exp.id){
        // update l'expérience
        this._experienceapi.update(exp.id,exp).subscribe({
          next: data=>{
            console.log(data);
            
          },
          error: err=>{
            console.log(err);
            
          }
        })
      }
      else{
        //ajouter l'expérience
        this._experienceapi.new(exp).subscribe({
          next: data=>{
            console.log(data);
            
          },
          error: err=>{
            console.log(err);
            
          }
        })
      }
    }
    this.formState.emit(true);
  }

  setOrdres(tab:any[]){
    tab.map((el,i)=>el.ordre=i)
    //console.log(tab);
    
  }
  arrange(tab:any[]){
    tab.sort((a,b)=>(a > b ? 1 : -1))
  }

  passer(){
    this.formState.emit(true);
  }

  drop(event: CdkDragDrop<any[]>) {
    console.log(event.previousIndex);
    console.log(event.currentIndex);
    console.log({"event":event});
    
    
    moveItemInFormArray(this.parcoursFormGroup.get('experiences') as FormArray, event.previousIndex, event.currentIndex);
    //moveItemInArray(this.parcoursFormGroup.get('experiences') as Array, event.previousIndex, event.currentIndex);
   // moveItemInArray(this.parcoursFormGroup.get('experiences').value, event.previousIndex, event.currentIndex);
    console.log(this.getExperiences());
    
  }


  disableValidator(i:number,choice:number=1){
    console.table("disable validator"+this.getExperiences().at(i).get('enCours').value);
    
      //console.log(this.getExperiences().at(i).errors);
      
    if( (this.getExperiences().at(i).get('enCours').value ==false && choice == 1) || (this.getExperiences().at(i).get('enCours').value ==true && choice == 2)){      // il check le value avant le click apparement , c'est pourquoi j'ai mis false au lieu de true
      console.table(["dans en cours"]);
      
     // console.log(this.getExperiences().at(i).get('dateDeFinAnnee').errors);
      this.getExperiences().at(i).clearValidators();
      this.getExperiences().at(i).updateValueAndValidity()
      this.getExperiences().at(i).get('dateDeFinAnnee').disable()
      this.getExperiences().at(i).get('dateDeFinMois').disable()
      //console.log(this.getExperiences().at(i).get('dateDeFinAnnee').errors);
      
    }
    else{
      this.getExperiences().at(i).addValidators(debutInferieurFin('dateDeDebutAnnee','dateDeDebutMois','dateDeFinAnnee','dateDeFinMois'))
      this.getExperiences().at(i).get('dateDeFinAnnee').enable()
      this.getExperiences().at(i).get('dateDeFinMois').enable()
  
    }  
  }
}

import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Form, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Annee, Mois, moveItemInFormArray } from 'src/app/models/Config.model';
import { SectionItem } from 'src/app/models/SectionItem.model';
import { SectionList } from 'src/app/models/SectionList.model';
import { SectionsService } from 'src/app/services/sections.service';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import {  forkJoin } from 'rxjs';
import { FormationsService } from 'src/app/services/formations.service';
import { FormationList } from 'src/app/models/FormationList.model';
import { debutInferieurFin } from 'src/app/shared/validators/date-debut-inferieur-date-fin';

@Component({
  selector: 'app-dialogue-edit-formation',
  templateUrl: './dialogue-edit-formation.component.html',
  styleUrls: ['./dialogue-edit-formation.component.scss']
})
export class DialogueEditFormationComponent implements OnInit {

  formationFormGroup: FormGroup;
  CvId!:number;
  SectionId!:number;
  section!:SectionItem;
  mois=Mois;
  annee=Annee()

  constructor( 
    private _formBuilder: FormBuilder, private _sectionapi:SectionsService,
    private _formationapi:FormationsService,
    public dialogRef: MatDialogRef<DialogueEditFormationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }


   //gestion dialogue
   cancel(): void {
    this.dialogRef.close();
  }
  
  

  ngOnInit(): void {
    console.log("edit formation oninit");
    //get le cv en cours
    if(this.data['cvid']) 
      this.CvId=this.data['cvid']
    else
    this.CvId=JSON.parse(localStorage.getItem("cvencours"))
    console.log("cvencours"+this.CvId);
    
    // la section de type formation de ce cv
    this._sectionapi.getAll(this.CvId,'formation').subscribe({
      next: (data : SectionList)=>{
        if(data.count)
        {
          this.SectionId=data.rows[0].id
          console.log(data);
          this._formationapi.getAll(this.SectionId).subscribe({
            next: (formations: FormationList)=>{
                console.log(formations);
                if(formations.count)
                {
  
                  this.formationFormGroup=this._formBuilder.group({
                          
                    'formations': this._formBuilder.array([])
                  })
                  for(let formation of formations.rows){
                    this.getFormations().push( new FormGroup({
                      'id':new FormControl(formation.id),
                      'nomEtablissement': new FormControl(formation.nomEtablissement,[Validators.required,Validators.minLength(3)]),
                      'diplome': new FormControl(formation.diplome,Validators.required),
                      'domaineEtude': new FormControl(formation.domaineEtude),
                      'mention': new FormControl(formation.mention),
                      'dateDeDebutMois': new FormControl(formation.dateDeDebutMois),
                      'dateDeDebutAnnee': new FormControl(formation.dateDeDebutAnnee,Validators.required),
                      'dateDeFinMois': new FormControl(formation.dateDeFinMois),
                      'dateDeFinAnnee': new FormControl(formation.dateDeFinAnnee,Validators.required),
                      'enCours': new FormControl(formation.enCours,Validators.required),
                      'description':new FormControl(formation.description),
                      'ordre': new FormControl(formation.ordre),
                      'SectionId': new FormControl(formation.SectionId),
                    }))
                    let len=this.getFormations().length - 1
                   // this.getFormations().at(len).addValidators(debutInferieurFin('dateDeDebutAnnee','dateDeDebutMois','dateDeFinAnnee','dateDeFinMois'))
                     this.disableValidator(len,2)
                  }
                 
                }
                else
                  this.initFormationFormGroup()
            },
            error: err =>{
              console.log(err);
              this.initFormationFormGroup()
            }
          })
        }
        else
          this.creerSection()
       
        
      },
      error: err =>{
        console.log("error error error");
        
        console.log(err.status);
        if(err.status == 404)
        {
          this.creerSection()
        }
        
      }
    })
    
  }

  creerSection(){
    let section={
      intitule:"Formations",
      description:"",
      position:"gauche",
      type:"formation",
      ordre:2,
      CvId:this.CvId
    }
    this._sectionapi.new(section).subscribe({
      next: data=>{
        console.log(data);
        this.SectionId=data['id']
        this.initFormationFormGroup()
      },
      error: err=>{
        console.log(err);
        
      }
    })
  }
  initFormationFormGroup(){

    this.formationFormGroup=this._formBuilder.group({
                        
      'formations': this._formBuilder.array([])
    })
    
      this.addFormation()
      console.log("formgroup initialized");
      
  }
  getFormations() : FormArray {
    return this.formationFormGroup.get('formations') as FormArray;
  }
  addFormation(){
    this.getFormations().push( new FormGroup({
      'nomEtablissement': new FormControl('',[Validators.required,Validators.minLength(3)]),
      'diplome': new FormControl('',Validators.required),
      'domaineEtude': new FormControl(''),
      'mention': new FormControl(''),
      'dateDeDebutMois': new FormControl(''),
      'dateDeDebutAnnee': new FormControl('',Validators.required),
      'dateDeFinMois': new FormControl(''),
      'dateDeFinAnnee': new FormControl('',Validators.required),
      'enCours': new FormControl(false,Validators.required),
      'description':new FormControl(''),
      'ordre': new FormControl(''),
      'SectionId': new FormControl(this.SectionId),
    }))
    let len=this.getFormations().length - 1
    this.getFormations().at(len).addValidators(debutInferieurFin('dateDeDebutAnnee','dateDeDebutMois','dateDeFinAnnee','dateDeFinMois'))
  
  }
  deleteFormation(i:number){
    let id=this.getFormations().at(i).get('id')?.value
    console.log(id);
    
    if(id) 
      this._formationapi.delete(id).subscribe()
  this.getFormations().removeAt(i)
    
  }
 
  submitFormations(){
    console.log('submit');
    // console.log(this.parcoursFormGroup.value);
    let section=this.formationFormGroup.value;
    this.setOrdres(section.formations)
    console.log(section);
    const obs=forkJoin(
      section.formations.map(
        exp=>
        exp.id?
        this._formationapi.update(exp.id,exp)
        :
        this._formationapi.new(exp)
        ))
     obs.subscribe({
       next: (data: any[])=>{
         console.log("over");
         console.log(data);
         if(data.every(el=>el.updated == 1 || el.id))
         this.dialogRef.close({ok:true});
          
       },
       error: err=> console.log(err)
       
     })
    // let cpt=0
    // for(let formation of section.formations){
    //   if(formation.id){
    //     // update l'expérience
    //     this._formationapi.update(formation.id,formation).subscribe({
    //       next: data=>{
    //         console.log(data);
            
    //       },
    //       error: err=>{
    //         console.log(err);
            
    //       }
    //     })
    //   }
    //   else{
    //     //ajouter l'expérience
    //     this._formationapi.new(formation).subscribe({
    //       next: data=>{
    //         console.log(data);
    //         formation['id']=data['id']
    //         this.getFormations()
    //       },
    //       error: err=>{
    //         console.log(err);
            
    //       }
    //     })
    //   }
    //   cpt++
    // }

   
    
  }

  setOrdres(tab:any[]){
    tab.map((el,i)=>el.ordre=i)
    //console.log(tab);
    
  }
  arrange(tab:any[]){
    tab.sort((a,b)=>(a > b ? 1 : -1))
  }

  drop(event: CdkDragDrop<any[]>) {
    console.log(event.previousIndex);
    console.log(event.currentIndex);
    console.log({"event":event});
    
    
    moveItemInFormArray(this.formationFormGroup.get('formations') as FormArray, event.previousIndex, event.currentIndex);
    //moveItemInArray(this.parcoursFormGroup.get('experiences') as Array, event.previousIndex, event.currentIndex);
   // moveItemInArray(this.parcoursFormGroup.get('experiences').value, event.previousIndex, event.currentIndex);
    console.log(this.getFormations());
    
  }


  disableValidator(i:number,choice:number=1){
    //console.log(this.getFormations().at(i).errors);
    
  if( (this.getFormations().at(i).get('enCours').value == false && choice == 1) || (this.getFormations().at(i).get('enCours').value == true && choice ==2 )){
   // console.log(this.getFormations().at(i).get('dateDeFinAnnee').errors);
    this.getFormations().at(i).clearValidators();
    this.getFormations().at(i).updateValueAndValidity()
    this.getFormations().at(i).get('dateDeFinAnnee').disable()
    this.getFormations().at(i).get('dateDeFinMois').disable()
    //console.log(this.getFormations().at(i).get('dateDeFinAnnee').errors);
    
  }
  else{
    this.getFormations().at(i).addValidators(debutInferieurFin('dateDeDebutAnnee','dateDeDebutMois','dateDeFinAnnee','dateDeFinMois'))
    this.getFormations().at(i).get('dateDeFinAnnee').enable()
    this.getFormations().at(i).get('dateDeFinMois').enable()

  }  
  }

}

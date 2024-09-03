import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { LangueList } from 'src/app/models/LangueList.model';
import { SectionItem } from 'src/app/models/SectionItem.model';
import { SectionList } from 'src/app/models/SectionList.model';
import { LanguesService } from 'src/app/services/langues.service';
import { SectionsService } from 'src/app/services/sections.service';

import {moveItemInFormArray, NiveauLangue} from 'src/app/models/Config.model';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
@Component({
  selector: 'app-edit-langue',
  templateUrl: './edit-langue.component.html',
  styleUrls: ['./edit-langue.component.scss']
})
export class EditLangueComponent implements OnInit {

  langueFormGroup: FormGroup
  CvId!:number;
  SectionId!:number;
  section!:SectionItem;
  @Output() formState = new EventEmitter<boolean>();
  NiveauLangue=NiveauLangue
  constructor(private _formBuilder: FormBuilder, private _sectionapi:SectionsService,
              private _langueapi:LanguesService) {}

  ngOnInit(): void {
    console.log("edit langue oninit");
    console.log(NiveauLangue);
    
    //get le cv en cours
    this.CvId=JSON.parse(localStorage.getItem("cvencours"))
    console.log("cvencours"+this.CvId);
    
    // la section de type formation de ce cv
    this._sectionapi.getAll(this.CvId,'langue').subscribe({
      next: (data : SectionList)=>{
        console.trace("section de langues trouvées");
        
        console.table([data]);
        if(data.count > 0)
        {
          this.SectionId=data.rows[0].id
          
          this._langueapi.getAll(this.SectionId).subscribe({
            next: (langues: LangueList)=>{
                console.log(langues);
                if(langues.count)
                {
  
                  this.langueFormGroup=this._formBuilder.group({
                          
                    'langues': this._formBuilder.array([])
                  })
                  for(let langue of langues.rows){
                    this.getLangues().push( new FormGroup({
                      'id':new FormControl(langue.id),
                      'langue': new FormControl(langue.langue,Validators.required),
                      'niveau': new FormControl(langue.niveau,Validators.required),
                      'infoSup': new FormControl(langue.infoSup),
                      'ordre': new FormControl(langue.ordre),
                      'SectionId': new FormControl(this.SectionId),
                    }))
                  }
                  this.formState.emit(true);
                }
                else
                  this.initLangueFormGroup()
            },
            error: err =>{
              console.log(err);
              this.initLangueFormGroup()
            }
          })
        }
        // else
        //   this.creerSection()
       
        
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
      intitule:"Langues",
      description:"",
      position:"droit",
      type:"langue",
      ordre:3,
      CvId:this.CvId
    }
    this._sectionapi.new(section).subscribe({
      next: data=>{
        console.log(data);
        this.SectionId=data['id']
        this.initLangueFormGroup()
      },
      error: err=>{
        console.log(err);
        
      }
    })
  }
  initLangueFormGroup(){

    this.langueFormGroup=this._formBuilder.group({
                        
      'langues': this._formBuilder.array([])
    })
    
      this.addLangue()
      console.log("formgroup initialized");
      
  }
  getLangues() : FormArray {
    return this.langueFormGroup.get('langues') as FormArray;
  }
  addLangue(){
    if(!this.langueFormGroup)
      this.creerSection()
    this.getLangues().push( new FormGroup({
      'langue': new FormControl('',Validators.required),
      'niveau': new FormControl('',Validators.required),
      'infoSup': new FormControl(''),
      'ordre': new FormControl(''),
      'SectionId': new FormControl(this.SectionId),
    }))
  }
  deleteLangue(i:number){
    let id=this.getLangues().at(i).get('id')?.value
    console.log(id);
    
    if(id) 
      this._langueapi.delete(id).subscribe()
  this.getLangues().removeAt(i)
    
  }
 
  submitLangues(){
    console.log('submit');
    // console.log(this.parcoursFormGroup.value);
    let section=this.langueFormGroup.value;
    this.setOrdres(section.langues)
    console.log(section);
    let cpt=0
    for(let langue of section.langues){
      if(langue.id){
        // update l'expérience
        this._langueapi.update(langue.id,langue).subscribe({
          next: data=>{
            console.log(data);
            
          },
          error: err=>{
            console.log(err);
            
          }
        })
      }
      else{
        //ajouter la langue
        this._langueapi.new(langue).subscribe({
          next: data=>{
            console.log(data);
            langue['id']=data['id']
            this.getLangues()
          },
          error: err=>{
            console.log(err);
            
          }
        })
      }
      cpt++
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
    
    
    moveItemInFormArray(this.langueFormGroup.get('langues') as FormArray, event.previousIndex, event.currentIndex);
    //moveItemInArray(this.parcoursFormGroup.get('experiences') as Array, event.previousIndex, event.currentIndex);
   // moveItemInArray(this.parcoursFormGroup.get('experiences').value, event.previousIndex, event.currentIndex);
    console.log(this.getLangues());
    
  }

}

import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { moveItemInFormArray } from 'src/app/models/Config.model';
import { LienList } from 'src/app/models/LienList.model';
import { SectionItem } from 'src/app/models/SectionItem.model';
import { SectionList } from 'src/app/models/SectionList.model';
import { LiensService } from 'src/app/services/liens.service';
import { SectionsService } from 'src/app/services/sections.service';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { forkJoin } from 'rxjs';


@Component({
  selector: 'app-dialogue-edit-lien',
  templateUrl: './dialogue-edit-lien.component.html',
  styleUrls: ['./dialogue-edit-lien.component.scss']
})
export class DialogueEditLienComponent implements OnInit {

  lienFormGroup: FormGroup
  CvId!:number;
  SectionId!:number;
  section!:SectionItem;

  constructor(private _formBuilder: FormBuilder, private _sectionapi:SectionsService,
    private _lienapi:LiensService,
    public dialogRef: MatDialogRef<DialogueEditLienComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }


   //gestion dialogue
   cancel(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    console.log("edit lien oninit");
    //get le cv en cours
    if(this.data['cvid']) 
      this.CvId=this.data['cvid']
    else
    this.CvId=JSON.parse(localStorage.getItem("cvencours"))
    console.log("cvencours"+this.CvId);
    
    // la section de type formation de ce cv
    this._sectionapi.getAll(this.CvId,'lien').subscribe({
      next: (data : SectionList)=>{
        console.trace("section de liens trouvées");
        
        console.table([data]);
        if(data.count > 0)
        {
          this.SectionId=data.rows[0].id
          
          this._lienapi.getAll(this.SectionId).subscribe({
            next: (liens: LienList)=>{
                console.log(liens);
                if(liens.count > 0)
                {
  
                  this.lienFormGroup=this._formBuilder.group({
                          
                    'liens': this._formBuilder.array([])
                  })
                  for(let lien of liens.rows){
                    this.getLiens().push( new FormGroup({
                      'id':new FormControl(lien.id),
                      'lien': new FormControl(lien.lien,[Validators.required,Validators.pattern('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?')]),
                      'commentaire': new FormControl(lien.commentaire,Validators.required),
                      'ordre': new FormControl(lien.ordre),
                      'SectionId': new FormControl(this.SectionId),
                    }))
                  }
                  
                }
                else
                  this.initLienFormGroup()
            },
            error: err =>{
              console.log(err);
             // this.initLienFormGroup()
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
      intitule:"Liens",
      description:"",
      position:"gauche",
      type:"lien",
      ordre:4,
      CvId:this.CvId
    }
    this._sectionapi.new(section).subscribe({
      next: data=>{
        console.log(data);
        this.SectionId=data['id']
        this.initLienFormGroup()
      },
      error: err=>{
        console.log(err);
        
      }
    })
  }
  initLienFormGroup(){

    this.lienFormGroup=this._formBuilder.group({
                        
      'liens': this._formBuilder.array([])
    })
    
      this.addLien()
      console.log("formgroup initialized");
      
  }
  getLiens() : FormArray {
    return this.lienFormGroup.get('liens') as FormArray;
  }
  addLien(){
    this.getLiens().push( new FormGroup({
      'lien': new FormControl('',[Validators.required,Validators.pattern('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?')]),
      'commentaire': new FormControl('',Validators.required),
      'ordre': new FormControl(''),
      'SectionId': new FormControl(this.SectionId),
    }))
  }
  deleteLien(i:number){
    let id=this.getLiens().at(i).get('id')?.value
    console.log(id);
    
    if(id) 
      this._lienapi.delete(id).subscribe()
  this.getLiens().removeAt(i)
    
  }
 
  submitLiens(){
    console.log('submit');
    // console.log(this.parcoursFormGroup.value);
    let section=this.lienFormGroup.value;
    this.setOrdres(section.liens)
    console.log(section);

    const obs=forkJoin(
      section.liens.map(
        lien=>
        lien.id?
        this._lienapi.update(lien.id,lien)
        :
        this._lienapi.new(lien)
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
    // for(let lien of section.liens){
    //   if(lien.id){
    //     // update l'expérience
    //     this._lienapi.update(lien.id,lien).subscribe({
    //       next: data=>{
    //         console.log(data);
            
    //       },
    //       error: err=>{
    //         console.log(err);
            
    //       }
    //     })
    //   }
    //   else{
    //     //ajouter le lien
    //     this._lienapi.new(lien).subscribe({
    //       next: data=>{
    //         console.log(data);
    //         lien['id']=data['id']
    //         this.getLiens()
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
  

  drop(event: CdkDragDrop<any[]>) {
    console.log(event.previousIndex);
    console.log(event.currentIndex);
    console.log({"event":event});
    
    
    moveItemInFormArray(this.lienFormGroup.get('liens') as FormArray, event.previousIndex, event.currentIndex);
    //moveItemInArray(this.parcoursFormGroup.get('experiences') as Array, event.previousIndex, event.currentIndex);
   // moveItemInArray(this.parcoursFormGroup.get('experiences').value, event.previousIndex, event.currentIndex);
    console.log(this.getLiens());
    
  }

}

import { Component, HostBinding, OnInit,ViewChild, ElementRef } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { jsPDF } from "jspdf";
import html2canvas from 'html2canvas';
import { CvService } from 'src/app/services/cv.service';
import { SectionsService } from 'src/app/services/sections.service';
import { CvItem } from 'src/app/models/CvItem.model';
import { Position, SectionPositionList } from 'src/app/models/SectionByPositionList.model';
import { DomSanitizer } from '@angular/platform-browser';
import {NiveauLangue} from 'src/app/models/Config.model';
import { ActivatedRoute } from '@angular/router';

import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import htmlToPdfmake from 'html-to-pdfmake';
import { EditPhotoComponent } from 'src/app/cv/sections/photo/edit-photo/edit-photo.component';
import { MatDialog } from '@angular/material/dialog';
import { DialogueEditPhotoComponent } from 'src/app/cv/sections/photo/dialogue-edit-photo/dialogue-edit-photo.component';
import { DialogueEditProfileComponent } from 'src/app/cv/sections/profile/dialogue-edit-profile/dialogue-edit-profile.component';
import { DialogueEditExperienceComponent } from 'src/app/cv/sections/experience/dialogue-edit-experience/dialogue-edit-experience.component';
import { DialogueEditFormationComponent } from 'src/app/cv/sections/formation/dialogue-edit-formation/dialogue-edit-formation.component';
import { DialogueEditLangueComponent } from 'src/app/cv/sections/langue/dialogue-edit-langue/dialogue-edit-langue.component';
import { DialogueEditLienComponent } from 'src/app/cv/sections/liens/dialogue-edit-lien/dialogue-edit-lien.component';
import { DialogueEditSectionComponent } from 'src/app/cv/sections/dialogue-edit-section/dialogue-edit-section.component';
import { DialogueRenameCvlabelComponent } from 'src/app/cv/dialogue-rename-cvlabel/dialogue-rename-cvlabel.component';
import { DialogueSendByMailFormComponent } from '../tools/dialogue-send-by-mail-form/dialogue-send-by-mail-form.component';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-basic',
  templateUrl: './basic.component.html',
  styleUrls: ['./basic.component.scss']
})
export class BasicComponent implements OnInit {
  colors=['#929496','#944150','#b9481f','#f89200','#166c60','#007d8b','#102a73','#3f3f3f',
          '#ae9b93','#b41c2e','#c9652d','#eba600','#008e6e','#00a3c2','#0069a5','#275879',
          '#c4b08f','#d11a24','#fe7a66','#f2c000','#56b239','#2fc4b1','#0085e1','#486267'
        ]
  //nvLangue:typeof NiveauLangue;
  NiveauLangue=NiveauLangue
  
  customTemplateConfig={bgcolor:'red',sectionTitleFontSize:'16',police:"'Courier New', Courier, monospace",taillePolice:"12",
                        espaceSections:'10',espaceParagraphes:'10',titleFontSize:'36',posteFontSize:'20'};
  cv!:CvItem
  cvid:number=17
  sectionsGauche!:SectionPositionList
  sectionsDroit!:SectionPositionList
  

  constructor(private _cvapi:CvService,
              private _sectionapi:SectionsService,
              private sanitizer: DomSanitizer,
              private _activatedRoute: ActivatedRoute,
              private _dialog:MatDialog,
              private _toasterService:ToastrService) { }
  @HostBinding("attr.style")
  public get valueAsStyle(): any {
    return this.sanitizer.bypassSecurityTrustStyle(
                `--bg-color: ${this.customTemplateConfig.bgcolor};
                 --sectionTitle-fontSize: ${this.customTemplateConfig.sectionTitleFontSize}px;
                 --police:${this.customTemplateConfig.police};
                 --taillePolice:${this.customTemplateConfig.taillePolice}px;
                 --espaceSections:${this.customTemplateConfig.espaceSections}px;
                 --espaceParagraphes:${this.customTemplateConfig.espaceParagraphes}px;
                 --titleFontSize:${this.customTemplateConfig.titleFontSize}px;
                 --posteFontSize:${this.customTemplateConfig.posteFontSize}px;`);
    

  }
  
  ngOnInit(): void {
    this.cvid=this._activatedRoute.snapshot.params['id']
    this._cvapi.getOne(this.cvid).subscribe({
      next: cv=>{
          
          this.cv=cv
          //this.cv.customTemplateConfig=
          console.log(JSON.parse(this.cv.customTemplateConfig));
          this.customTemplateConfig=JSON.parse(this.cv.customTemplateConfig)
      },
      error: err=>{

      }
    })

    this.refreshLists()
  }

  drop(event: CdkDragDrop<any[]>) {
    //console.log(event);
    
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }

  
    console.log(this.sectionsDroit.rows);
    console.log(this.sectionsGauche.rows);
    
    
  }

 exportHtmlToPDF(destination=1){
    let data:any;
    if(document.getElementById('htmltable'))
     data = document.getElementById('htmltable');
      
      html2canvas(data,{allowTaint : true,useCORS: true}).then(async canvas => {
          
          let docWidth = 208;
          let docHeight = canvas.height * docWidth / canvas.width;
          
          const contentDataURL = canvas.toDataURL('image/png')
          let doc = new jsPDF('p', 'mm', 'a4');
          let position = 0;
          doc.addImage(contentDataURL, 'PNG', 0, position, docWidth, docHeight)
          switch (destination) {
            case 1:   //save to disk
              let p = await doc.save(this.cv.label+'.pdf',{ returnPromise: true });

              break;
            case 2:  //open in browser to print
              var blob = doc.output("blob");
              window.open(URL.createObjectURL(blob));
              break;
            case 3:  //save to server
              //alert("save to server");
             
              var blob = doc.output("blob");
              var data = new FormData();
               data.append("pdf", blob);
              
              this._cvapi.updatepdf(this.cvid,data).subscribe({
                next: data=>{
                  console.log(data);
                },
                error: err=>{
                  console.log(err);
                  
                }
              })
              break;  
            default:
              break;
          }
          
         
      });
  }
 sendByMail(){
  
  let dialogRefSendByMail = this._dialog.open(DialogueSendByMailFormComponent, {
    width: '60em',
    data: {cv:this.cv}
  });

  dialogRefSendByMail.afterClosed().subscribe(result => {
    console.log('The dialog was closed');
    console.log(result);
   
       
     });

  
 }
  save(){
    this.exportHtmlToPDF(3)   // save the pdf to server
    console.log(this.customTemplateConfig);
    this.cv.customTemplateConfig=JSON.stringify(this.customTemplateConfig)
    this.cv.status='2' 
    console.log(this.cv.customTemplateConfig);
        
    this._cvapi.update(this.cvid,this.cv).subscribe({
      next: data=>{
            console.log(data);
            this._toasterService.success("Bien sauvegardé", "Sauvegardé", { positionClass: 'toast-center-center' });
        
            // rediriger vers la liste des cvs
      },
      error:err=>{
        console.log(err);
        
      }
    })
    
    // update de l'ordre et de la position des sections
    // set le champ section "gauche" à tous les gauche, et "droit" à tous les droits
    this.setPositionAndOrdre()
    //update
    this.sectionsDroit.rows.forEach(sec=>{
      this._sectionapi.update(sec.id,sec).subscribe({
        next: data=>{
            console.log({"appel update sec droit":data});
            
        },
        error: err=> console.log(err)
        
      })
    })

    this.sectionsGauche.rows.forEach(sec=>{
      this._sectionapi.update(sec.id,sec).subscribe({
        next: data=>{
            console.log({"appel update sec gauche":data});
            
        },
        error: err=> console.log(err)
        
      })
    })
  }

  setPositionAndOrdre(){
    this.sectionsDroit.rows.forEach((section,index)=>{
                section.position = Position.Droit
                section.ordre= ++index
              })
    this.sectionsGauche.rows.forEach((section,index)=>{
              section.position=Position.Gauche
              section.ordre= ++index})
    console.log({'position droit':this.sectionsDroit.rows});
    console.log({'position gauche':this.sectionsGauche.rows});
    
  }


  title = 'htmltopdf';
  
  @ViewChild('htmltable') pdfTable: ElementRef;
  
  public downloadAsPDF() {
    const doc = new jsPDF();
   
    const pdfTable = this.pdfTable.nativeElement;
   
    var html = htmlToPdfmake(pdfTable.innerHTML);
     
    const documentDefinition = { content: html };
    pdfMake.createPdf(documentDefinition).open(); 
     
  }

  //Dialogue photo
  openPhotoDialog(): void {
    const dialogRefPhoto = this._dialog.open(DialogueEditPhotoComponent, {
      width: '60em',
      data: {cvid:this.cvid},
    });

    dialogRefPhoto.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
      if(result)
      this.cv.photo=result
      // this.user = result;
      // console.log(this.user);
      // this.addFormGroup.get('userid')?.setValue(this.user.id)
      // this.addFormGroup.get('username')?.setValue(this.user.firstname+" "+this.user.lastname)
      
    });

    
  }

  //Dialogue header
  openProfileDialog(): void {
    const dialogRefProfile = this._dialog.open(DialogueEditProfileComponent, {
      width: '60em',
      data: {cvid:this.cvid},
    });

    dialogRefProfile.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
      if(result)
      {
        for(let i in result)
          this.cv[i]=result[i]
      }
        
      // this.user = result;
      // console.log(this.user);
      // this.addFormGroup.get('userid')?.setValue(this.user.id)
      // this.addFormGroup.get('username')?.setValue(this.user.firstname+" "+this.user.lastname)
      
    });

    
  }

  openSection(id:number,type:string){

    console.table([id,type]);
    
    switch (type) {
      case 'experience':
        let dialogRefExperience = this._dialog.open(DialogueEditExperienceComponent, {
          width: '50rem',
          data: {cvid:this.cvid,sectionid:id}
        });
    
        dialogRefExperience.afterClosed().subscribe(result => {
          console.log('The dialog was closed');
          console.log(result);
          if(result)
           {
             if(result['ok'])
             this.refreshLists(2)
           }
        });
        break;
        case 'formation':
          let dialogRefFormation = this._dialog.open(DialogueEditFormationComponent, {
            width: '50em',
            data: {cvid:this.cvid,sectionid:id}
          });
      
          dialogRefFormation.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
            console.log(result);
            if(result)
             {
              if(result['ok'])
               this.refreshLists(2)
             }
          });
          break;

          case 'langue':
          let dialogRefLangue = this._dialog.open(DialogueEditLangueComponent, {
            width: '50em',
            data: {cvid:this.cvid,sectionid:id}
          });
      
          dialogRefLangue.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
            console.log(result);
            if(result)
             {
              if(result['ok'])
               this.refreshLists(2)
             }
          });
          break;
          case 'lien':
          let dialogRefLien = this._dialog.open(DialogueEditLienComponent, {
            width: '50em',
            data: {cvid:this.cvid,sectionid:id}
          });
      
          dialogRefLien.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
            console.log(result);
            if(result)
             {
              if(result['ok']){
                console.log("refreshlists");
                
                this.refreshLists(2)
              }
               
             }
          });
          break;
          case 'competence':
            let dialogRefCompetence = this._dialog.open(DialogueEditSectionComponent, {
              width: '60em',
              data: {cvid:this.cvid,sectionid:id,type:'competence'}
            });
        
            dialogRefCompetence.afterClosed().subscribe(result => {
              console.log('The dialog was closed');
              console.log(result);
              if(result)
               {
                if(result['ok']){
                  console.log("refreshlists");
                  
                  this.refreshLists(2)
                }
                 
               }
            });
            break;    
      
      default:
        alert("not implemented yet")
        break;
    }

  }
  refreshLists(choice:number=1){ // choice = 1 get originals, choice = 2 update only certain infos
    this._sectionapi.getAll(this.cvid,'','gauche').subscribe({
      next: (data: SectionPositionList) =>{
        if(choice == 1){
          this.sectionsGauche=data
          this.sectionsGauche.rows.map(el=>{
           // if(el.ExperienceProfessionnelles)
                el.ExperienceProfessionnelles.sort((a,b)=>(a.ordre>b.ordre?1:-1))
                el.Formations.sort((a,b)=>(a.ordre>b.ordre?1:-1))
                el.Langues.sort((a,b)=>(a.ordre>b.ordre?1:-1))
                el.Liens.sort((a,b)=>(a.ordre>b.ordre?1:-1))
          })
        }
        else{
             this.updateLists(data)
        }

       
      },
      error: err=>{
        console.log(err);
        
      }
    })
    this._sectionapi.getAll(this.cvid,'','droit').subscribe({
      next: (data: SectionPositionList) =>{
        if(choice == 1){
          this.sectionsDroit=data
          this.sectionsDroit.rows.map(el=>{
           // if(el.ExperienceProfessionnelles)
              el.ExperienceProfessionnelles.sort((a,b)=>(a.ordre>b.ordre?1:-1))
              el.Formations.sort((a,b)=>(a.ordre>b.ordre?1:-1))
              el.Langues.sort((a,b)=>(a.ordre>b.ordre?1:-1))
              el.Liens.sort((a,b)=>(a.ordre>b.ordre?1:-1))
               
          })
        } 
        else
            this.updateLists(data)
      
      },
      error: err=>{
        console.log(err);
        
      }
    })
  }

  updateLists(data:SectionPositionList){
    this.sectionsGauche.rows=this.sectionsGauche.rows.map(el=>{
      let row=data['rows'].find(d=>d.id == el.id)
      console.log({rowFindedGauche:row});
      
      if(row){
        for(let att in el){
          if(att != 'position' && att != 'ordre')
            el[att]=row[att]
        }
        el.ExperienceProfessionnelles.sort((a,b)=>(a.ordre>b.ordre?1:-1))
        el.Formations.sort((a,b)=>(a.ordre>b.ordre?1:-1))
        el.Langues.sort((a,b)=>(a.ordre>b.ordre?1:-1))
        el.Liens.sort((a,b)=>(a.ordre>b.ordre?1:-1))
      }
        
      return el
    })

    this.sectionsDroit.rows=this.sectionsDroit.rows.map(el=>{
      let row=data['rows'].find(d=>d.id == el.id)
      console.log({rowFindedDroit:row});
      
      if(row){
        for(let att in el){
          if(att != 'position' && att != 'ordre')
            el[att]=row[att]
        }
        el.ExperienceProfessionnelles.sort((a,b)=>(a.ordre>b.ordre?1:-1))
        el.Formations.sort((a,b)=>(a.ordre>b.ordre?1:-1))
        el.Langues.sort((a,b)=>(a.ordre>b.ordre?1:-1))
        el.Liens.sort((a,b)=>(a.ordre>b.ordre?1:-1))
      }
        
      return el
    })

  }
  openLabelRenameDialog(){
    const dialogRefLabel = this._dialog.open(DialogueRenameCvlabelComponent, {
      width: '40em',
      data: {cvid:this.cvid},
    });

    dialogRefLabel.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
      if(result)
      {
        for(let i in result)
          this.cv[i]=result[i]
      }
        
      // this.user = result;
      // console.log(this.user);
      // this.addFormGroup.get('userid')?.setValue(this.user.id)
      // this.addFormGroup.get('username')?.setValue(this.user.firstname+" "+this.user.lastname)
      
    });

  }
}

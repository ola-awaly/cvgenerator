import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CvList } from 'src/app/models/CvList.model';
import { CvService } from 'src/app/services/cv.service';
import { DialogueRenameCvlabelComponent } from '../dialogue-rename-cvlabel/dialogue-rename-cvlabel.component';
import { MatDialog } from '@angular/material/dialog';
import { DialogueSendByMailFormComponent } from 'src/app/modeles/tools/dialogue-send-by-mail-form/dialogue-send-by-mail-form.component';
import { CvItem } from 'src/app/models/CvItem.model';
import { saveAs } from 'file-saver';
@Component({
  selector: 'app-liste-cv',
  templateUrl: './liste-cv.component.html',
  styleUrls: ['./liste-cv.component.scss']
})
export class ListeCvComponent implements OnInit {

  mesCv!:CvList
  @Input() userid!:number;
  constructor(private _cvapi:CvService,private _activatedRoute: ActivatedRoute,
              private _dialog:MatDialog,private _router:Router) { }

  ngOnInit(): void {
    if(!this.userid && this._activatedRoute.snapshot.params['id']) 
    this.userid=this._activatedRoute.snapshot.params['id']
    if(this.userid)
      this._cvapi.getByUserId(this.userid).subscribe({
        next: data=>{
              this.mesCv=data
              console.log(this.mesCv);
              
        },
        error: err =>{
          console.log(err);
          
        }
      })
      else
          this._cvapi.getAll().subscribe({
            next: data=>{
                  this.mesCv=data
                  console.log(this.mesCv);
                  
            },
            error: err =>{
              console.log(err);
              
            }
          })

  }

  deleteCv(id:number){
    this._cvapi.delete(id).subscribe({
      next: data=>{
        console.log(data);
        this.mesCv.rows=this.mesCv.rows.filter(el=>el.id != id)
      },
      error: err=>{
        console.log(err);
        
      }
    })
  }

  openLabelRenameDialog(id:number){
    const dialogRefLabel = this._dialog.open(DialogueRenameCvlabelComponent, {
      width: '40em',
      data: {cvid:id},
    });

    dialogRefLabel.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
      if(result)
      {
       
        this.mesCv.rows=this.mesCv.rows.map(el=>{
            if(el.id==id)
              el.label=result.label
            return el
          })
         
      }
        
      // this.user = result;
      // console.log(this.user);
      // this.addFormGroup.get('userid')?.setValue(this.user.id)
      // this.addFormGroup.get('username')?.setValue(this.user.firstname+" "+this.user.lastname)
      
    });

  }

  duplicate(id:number){
    this._cvapi.duplicate(id).subscribe({
      next: data =>{
          if(data)
            this._router.navigate(['cv/edit/'+data['id']])
      },
      error: err=>{
        console.log(err);
        
      }

    })
  }

  sendByMail(id:number){
    let mycv:CvItem
     mycv=this.mesCv.rows.find(el=>el.id == id)
    console.log({mycv:mycv});
    
    const dialogRefMail = this._dialog.open(DialogueSendByMailFormComponent, {
      width: '40em',
      data: {cv:mycv},
    });

    dialogRefMail.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
     
    });
  }

  openPdf(url:string){
    window.open(url, '_blank');
  }

  downloadPdf(data:string,name:string){
    //const blob = new Blob([data], { type: 'application/pdf' });
   // const url= window.URL.createObjectURL(blob);
    saveAs(data,`${name}.pdf`);
    //window.open(url);
  }

  
}

import { Component, OnInit,Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormBuilder,  FormGroup, Validators } from '@angular/forms';
import { CvService } from 'src/app/services/cv.service';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { Image } from 'src/app/shared/validators/image';

@Component({
  selector: 'app-dialogue-edit-photo',
  templateUrl: './dialogue-edit-photo.component.html',
  styleUrls: ['./dialogue-edit-photo.component.scss']
})
export class DialogueEditPhotoComponent implements OnInit {

  constructor( private _cvapi:CvService,private _formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<DialogueEditPhotoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    ) { }

  
    //gestion dialogue
  cancel(): void {
    this.dialogRef.close();
  }

  ok(){
    console.log(this.urlImageAfterSave);
    this.dialogRef.close(this.urlImageAfterSave);
  }

    //gestion photo edit
    CvId!:number;
    image!:any;
    choosen:boolean=false
    photoFormGroup: FormGroup
    imagePreview:string=''
    urlImageAfterSave:string=''
    validated:boolean=false
    showCropper:boolean=false
    ngOnInit(): void {
    if(this.data['cvid']) 
      this.CvId=this.data['cvid']
    else
      this.CvId=JSON.parse(localStorage.getItem("cvencours"))

    this._cvapi.getOne(this.CvId).subscribe({
      next:data=>{
        if(data['photo'])
          {
            this.cropImgPreview=data['photo']
            this.urlImageAfterSave=data['data']
            //this.formState.emit(true);
          }
      }
    })
    this.photoFormGroup = this._formBuilder.group({
      image: ['', Validators.required,Image()],
      imagePreview: ['']
    });
  }
  
  fileChoose(event:any){
    if(event.target.value){
      this.image=<File>event.target.files[0]
      this.choosen=true
      this.submitPhoto()
    }
  }
  submitPhoto(){
    let fd=new FormData()
    if(this.image){
      fd.append('image',this.image,this.image.name)
      this._cvapi.updatephoto(this.CvId,fd).subscribe({
        next: data=>{
          console.log("photo uploaded 🖐🏾");
          console.log({'data':data});
          
          this.urlImageAfterSave=data['imageUrl'];
          //this.photoFormGroup.get("imagePreview").setValue('http://localhost:8080/'+data['imageUrl'])
          this.imagePreview='http://localhost:8080'+data['imageUrl']
        },
        error: err=>{
          console.log(err);
          
        }
      })
    }
  }
/////////////////////////////////
imgChangeEvt: any = '';
cropImgPreview: any = '/assets/photos/NoImage.jpeg';

onFileChange(event: any): void {
  console.log({event:event});
 // if(!this.imageError)
  this.showCropper=true
  this.imgChangeEvt = event;
  
}
cropImg(e: ImageCroppedEvent) {
  console.log('cropimg');
  
  this.cropImgPreview = e.base64;
}

imgLoad() {
  // display cropper tool
  this.imageError=false
}

initCropper() {
  // init cropper
}
imageError:boolean=false
imgFailed() {
  // error msg
  this.imageError=true
  this.showCropper=false
}
envoyerImg(){
  console.log("envoyerImg");
  
  if(this.cropImgPreview){
    console.log("dans cond");
    
   // fd.append('image',this.cropImgPreview,'nom')
    this._cvapi.updatephoto64(this.CvId,{image:this.cropImgPreview}).subscribe({
      next: data=>{
        console.log("photo64 uploaded 🖐🏾");
        console.log({'data':data});
          
          this.urlImageAfterSave=data['imageUrl'];
          this.validated=true
         
      },
      error: err=>{
        console.log(err);
        
      }
    })
    this.showCropper=false
  }
}


}

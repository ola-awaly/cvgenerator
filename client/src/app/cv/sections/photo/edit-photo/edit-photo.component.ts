import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter,  OnInit, Output } from '@angular/core';
import { FormBuilder,  FormGroup, Validators } from '@angular/forms';
import { CvService } from 'src/app/services/cv.service';
import { ImageCroppedEvent } from 'ngx-image-cropper';

@Component({
  selector: 'app-edit-photo',
  templateUrl: './edit-photo.component.html',
  styleUrls: ['./edit-photo.component.scss']
})
export class EditPhotoComponent implements OnInit{

  @Output() formState = new EventEmitter<boolean>();
  CvId!:number;
  image!:any;
  choosen:boolean=false
  photoFormGroup: FormGroup
  imagePreview:string=''
  showCropper:boolean=false
  ngOnInit(): void {
    this.CvId=JSON.parse(localStorage.getItem("cvencours"))
    this._cvapi.getOne(this.CvId).subscribe({
      next:data=>{
        if(data['photo'])
          {
            this.cropImgPreview=data['photo']
            this.formState.emit(true);
          }
      }
    })
    this.photoFormGroup = this._formBuilder.group({
      image: ['', Validators.required],
      imagePreview: ['']
    });
  }
  
  constructor(private _cvapi:CvService,private _formBuilder: FormBuilder){
      
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
  this.showCropper=true
  this.imgChangeEvt = event;
  
}
cropImg(e: ImageCroppedEvent) {
  console.log('cropimg');
  
  this.cropImgPreview = e.base64;
}

imgLoad() {
  // display cropper tool
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
    console.log("dnas cond");
    
   // fd.append('image',this.cropImgPreview,'nom')
    this._cvapi.updatephoto64(this.CvId,{image:this.cropImgPreview}).subscribe({
      next: data=>{
        console.log("photo64 uploaded 🖐🏾");
        //this.photoFormGroup.get("imagePreview").setValue('http://localhost:8080/'+data['imageUrl'])
        //this.imagePreview='http://localhost:8080'+data['imageUrl']
      },
      error: err=>{
        console.log(err);
        
      }
    })
    this.showCropper=false
  }
}

submit(){
  this.formState.emit(true);
}
}

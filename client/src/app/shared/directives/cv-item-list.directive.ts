import { Directive, ElementRef,Input } from '@angular/core';

@Directive({
  selector: '[appCvItemList]'
})
export class CvItemListDirective {

  @Input() appCvItemList:string='1';

  constructor(private _elementRef : ElementRef) { 
    
    //this._elementRef.nativeElement.style.backgroundColor = 'yellow';
  }
  ngOnInit(){
    console.log("dans directive"+this.appCvItemList);
    if(this.appCvItemList == '2')
      this._elementRef.nativeElement.classList.add('finalise');
    
  }
}

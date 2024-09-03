import { AbstractControl, ValidatorFn } from "@angular/forms";

export function Image() : ValidatorFn | null {
    return (control : AbstractControl) => {
        //if(control.touched) {
            console.log('valid cus');
            
        let file :string = control.value;
        console.log(file);
       
        
        if(  file['type'].split('/')[0] === 'image'   )
        {
            console.log("pas bon");
            
            return {imagenotvalid : "Image non valide"};
        
      
        }
       
        return null;
        
    }
}
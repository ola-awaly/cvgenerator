import { AbstractControl, ValidatorFn } from "@angular/forms";

export function DateAvantAujourdhui() : ValidatorFn | null {
    return (control : AbstractControl) => {
        //if(control.touched) {
            console.log('valid cus');
            
        let value :string = control.value;
        console.log(value);
        let d=new Date(value);
        let auj=new Date();
       // console.log(auj.getFullYear() - d.getFullYear());
        console.log({'dateControl':d.getTime(),'aujourdhui':auj.getTime()});
        
        if(  auj.getTime() < d.getTime()   )
        {
            console.log("pas bon");
            
            return {avantaujourdhui : "Date doit être au passé"};
        
      
        }
       
        return null;
        
    }
}
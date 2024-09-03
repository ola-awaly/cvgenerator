import { AbstractControl, FormGroup, ValidatorFn } from "@angular/forms";

export function debutInferieurFin(debutAnneeName: string,debutMoisName:string, 
                                finAnneeName: string,finMoisName:string):ValidatorFn | null{
    return (formGroup: FormGroup) => {
        console.log("dans validator debutinferieurfin");
        
        const debutAnnee = formGroup.controls[debutAnneeName];
        const finAnnee = formGroup.controls[finAnneeName];
        const debutMois=formGroup.controls[debutMoisName];
        const finMois=formGroup.controls[finMoisName]
        if (finAnnee.errors && !finAnnee.errors['debutPasInferieurFin']) {
            return null;
        }
        if (
            (finAnnee.value < debutAnnee.value) || 
            (finAnnee.value == debutAnnee.value && finMois.value < debutMois.value )) {
            finAnnee.setErrors({ debutPasInferieurFin: true });
        } else{

            finAnnee.setErrors(null);
        }
    }
}
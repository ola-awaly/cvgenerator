import { FormArray } from "@angular/forms"

export enum Position {
    Gauche = "gauche",
    Droit = "droit"
}

export const NiveauLangue = [
    { literal: 'A1', value: 1  },
    { literal: 'A2', value: 2 },
    { literal: 'B1', value: 3 },
    { literal: 'B2', value: 4},
    { literal: 'C1', value: 5 },
    { literal: 'C2', value: 6},
  ]


export const Mois = [
    { literal: 'Janvier', value: 1  },
    { literal: 'Février', value: 2 },
    { literal: 'Mars', value: 3 },
    { literal: 'Avril', value: 4},
    { literal: 'Mai', value: 5 },
    { literal: 'Juin', value: 6},
    { literal: 'Juillet', value: 7},
    { literal: 'Août', value: 8},
    { literal: 'Septembre', value: 9},
    { literal: 'Octobre', value: 10},
    { literal: 'Novembre', value: 11},
    { literal: 'Décembre', value: 12},

 ]

 export const Annee = ():string[]=>{
     let Annee=[]
     
     
     for(let a= 1943;a <= new Date().getFullYear() ;a++)
        Annee.push(a)
    return Annee
 }


export function moveItemInFormArray(
    formArray: FormArray,
    fromIndex: number,
    toIndex: number
  ): void {
    // const dir = toIndex > fromIndex ? 1 : -1;
  
    // const item = formArray.at(fromIndex);
    // for (let i = fromIndex; i * dir < toIndex * dir; i = i + dir) {
    //   const current = formArray.at(i + dir);
    //   formArray.setControl(i, current);
    // }
    // formArray.setControl(toIndex, item);
  
    let controlFrom= formArray.at(fromIndex)
    let controlTo=formArray.at(toIndex)
  
    formArray.setControl(fromIndex,controlTo)
    formArray.setControl(toIndex,controlFrom)
  }
  
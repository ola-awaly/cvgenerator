import { Pipe, PipeTransform } from '@angular/core';
import { NiveauLangue } from 'src/app/models/Config.model';

@Pipe({
  name: 'niveau'
})
export class NiveauPipe implements PipeTransform {

  transform(niveau: string): unknown {
    let a=NiveauLangue.filter(el=>{
      if(el.literal == niveau) return el.value
})
console.log(2222);

console.log(a);
return a[0]['value']*100/6;
  }

}

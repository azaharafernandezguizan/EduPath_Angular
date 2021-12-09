import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'agePipe',
})
export class AgePipe implements PipeTransform {
  transform(age: any, args?: any): any {
    if (!age) {
        return age;
    } else{
        const ageNumber = +age;
        if(ageNumber >=26 && ageNumber <=65){
            return 'dummies.adult';
        }  else if (ageNumber > 65){
            return 'dummies.retired';
        } else{
            return 'dummies.junior';
        }
    }
  }
}
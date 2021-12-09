import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  acceptedLanguages = ['en', 'es'];

  constructor(private translate: TranslateService) { }

  setDefaultLanguage(): void{
    let navigatorLanguage = navigator.language; 
    let selectedLanguage = navigatorLanguage 
                          ? navigatorLanguage.split('-') 
                          : undefined;
    if(selectedLanguage && selectedLanguage.length > 0 
      && this.acceptedLanguages.indexOf(selectedLanguage[0]) > -1){
      navigatorLanguage = selectedLanguage[0];
    } else{
      navigatorLanguage = 'es';
    }
    this.translate.setDefaultLang(navigatorLanguage);
  }
}

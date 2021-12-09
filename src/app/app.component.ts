import { SharedService } from './services/shared.service';
import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  greeting = '';

  constructor(private sharedService: SharedService) {
   this.sharedService.setDefaultLanguage();
  }

  ngOnInit(){
    this.greeting = 'greetingText';
  }
}

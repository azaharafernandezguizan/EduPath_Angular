import { SharedService } from './../../services/shared.service';
import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  isMenuDisplayed = false;

  buttons = [
    {
      text: '',
      link: 'employees'
    },
    {
      text: '',
      link: 'employees/0'
    }];

  constructor(private commonsService: SharedService,
              private translate: TranslateService,
              private router: Router) { }

  ngOnInit(): void {
    this.translate.get('dummies.title').subscribe((response: string) => this.buttons[0].text = response);
    this.translate.get('detail.title').subscribe((response: string) => this.buttons[1].text = response);
  }

  showMenu(): void {
    this.isMenuDisplayed = !this.isMenuDisplayed;
  }

  navigateToButtonLink(url: string): void{
      this.router.navigate([url]);
  }

}

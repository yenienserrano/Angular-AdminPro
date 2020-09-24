import { Component, OnInit } from '@angular/core';
import { AccountSettingService } from '../services/account-setting.service';

declare function customInitFunctions()


@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: [],
  providers: [ AccountSettingService ]
})
export class PagesComponent implements OnInit {

  year = new Date().getFullYear()
  

  constructor( private accountSettingService: AccountSettingService) {
    customInitFunctions()
   }

  ngOnInit(): void {

  } 

}

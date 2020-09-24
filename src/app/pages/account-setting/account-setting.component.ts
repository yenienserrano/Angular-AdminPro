import { Component, OnInit } from '@angular/core';
import { AccountSettingService } from 'src/app/services/account-setting.service';

@Component({
  selector: 'app-account-setting',
  templateUrl: './account-setting.component.html',
  styleUrls: []
})
export class AccountSettingComponent implements OnInit {

  
  constructor( private accountSettingService: AccountSettingService) { }

  ngOnInit(): void {
    
    this.accountSettingService.checkCurrentTheme()
    
  }

  colorChange(theme: string){
    
    this.accountSettingService.colorChange(theme)
  }
}

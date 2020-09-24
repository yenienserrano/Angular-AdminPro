import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AccountSettingService {

  linkTheme = document.querySelector('#theme')

  constructor() {
    const storageTheme = localStorage.getItem('theme') ||  "./assets/css/colors/default-dark.css"
    this.linkTheme.setAttribute('href', storageTheme)
    }


   colorChange(theme: string){
    
    const url = `./assets/css/colors/${ theme }.css`

    this.linkTheme.setAttribute('href', url)
    localStorage.setItem('theme', url)
    this.checkCurrentTheme()
  }

  checkCurrentTheme(){

    const links = document.querySelectorAll('.selector')

    links.forEach( elem => {
      
      elem.classList.remove('working')
      const btnTheme = elem.getAttribute('data-theme')
      const urlsTheme = `./assets/css/colors/${ btnTheme }.css`
      const currentTheme = this.linkTheme.getAttribute('href')

      if(urlsTheme === currentTheme){
        elem.classList.add('working')
      }

    })

  }
}

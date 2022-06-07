import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  private linkTheme = document.querySelector('#theme');

  constructor() {
    const link = localStorage.getItem('theme') || 'href="./assets/css/colors/default-dark.css"';
    this.linkTheme?.setAttribute('href', link);
  }

  changeThemes(theme: any){
    const url = `./assets/css/colors/${ theme }.css`

    this.linkTheme?.setAttribute('href', url);
    localStorage.setItem('theme', url);
  }
}

import { Component, OnInit } from '@angular/core';
import { SettingsService } from 'src/app/services/settings.service';

@Component({
  selector: 'app-acount-settings',
  templateUrl: './acount-settings.component.html',
  styles: [
  ]
})
export class AcountSettingsComponent implements OnInit {

  private linkTheme = document.querySelector('#theme');
  public links!: NodeListOf<Element>;

  constructor(private settingsService: SettingsService) { }

  ngOnInit(): void {
    this.links = document.querySelectorAll('.selector');
    this.checkTheme();
  }

  changeThemes(theme: any){

    this.settingsService.changeThemes(theme);
    this.checkTheme();
  }

  checkTheme(){

    this.links.forEach(link =>{
      link.classList.remove('working');
      const btnThemes = link.getAttribute('data-theme');
      const urlThemes = `./assets/css/colors/${ btnThemes }.css`;
      const currentTheme = this.linkTheme?.getAttribute('href');

      if(urlThemes === currentTheme){
        link.classList.add('working');
      }
    })
  }

}

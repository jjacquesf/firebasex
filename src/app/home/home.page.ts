import { Component } from '@angular/core';
import { FirebasePluginService } from '../services/firebase-plugin.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public token = 'Cargando';
  constructor(private fps: FirebasePluginService) {

  }

  onInit() {
    // this.fps.getToken().then(token => { this.token = token; alert(token); }).catch(error => { this.token = error; console.log(error); })
  }

}

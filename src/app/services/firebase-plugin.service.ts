import { Injectable } from '@angular/core';
import { Cordova, Plugin, IonicNativePlugin } from '@ionic-native/core';


@Plugin({
  pluginName: 'FirebasePlugin',
  plugin: 'cordova-plugin-firebasex',
  pluginRef: 'window.FirebasePlugin',
  platforms: ['Android', 'iOS'],
  repo: 'https://github.com/dpa99c/cordova-plugin-firebasex'
})

@Injectable()
export class FirebasePluginService extends IonicNativePlugin{

  @Cordova()
  getToken(): Promise<any> { return; }
}

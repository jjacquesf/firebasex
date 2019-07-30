import { Component } from '@angular/core';
import { Firebase } from '@ionic-native/firebase/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  providers:[Firebase]
})

export class HomePage {
  
	public token = 'Cargando'

	constructor(private firebase: Firebase) {
		
	}

	ngOnInit() {

		this.firebase.getToken().then(token => {
			console.log(`The token is ${token}`);
			this.token = token;
		})
		.catch(error => console.error('Error getting token', error));

		this.firebase.onNotificationOpen().subscribe(data => {
			console.log(`User opened a notification ${data}`);
		});

		this.firebase.onTokenRefresh().subscribe((token: string) => {
			console.log(`Got a new token ${token}`);
			this.token = token;
		});

	}

}

import { Component } from '@angular/core';
import { Firebase } from '@ionic-native/firebase/ngx';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook/ngx';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  providers:[GooglePlus,Facebook,Firebase,AngularFirestore,AngularFireAuth]
})

export class HomePage {
  
	public token = 'Cargando';
	public collection = null;

	constructor(
		private gplus: GooglePlus, 
		private firebasePlugin: Firebase, 
		private firestone: AngularFirestore, 
		private firebaseAuth: AngularFireAuth,
		private fb: Facebook
	) {
		
		
		//https://github.com/angular/angularfire2/blob/master/docs/firestore/ documentacion completa
		
		//retorna la coleccion de forma asincrona
		//valueChanges regresa solo los datos del documento
		//this.collection.snapshotChanges().subscribe(tasks => {
/* 		this.collection = this.firestone.collection('tasks').snapshotChanges().subscribe(tasks => {
			tasks.forEach(task => {
				console.log(task.payload);
				console.log(task.payload.doc.data());
				console.log(task.payload.doc.id);
			});
		}); */

		//podemos leer la coleccion y suscribirnos para cuando lleguen los documentos
		
		//crear un documento
		//this.collection.add({title: "ejemplo 2222", description: "description 2222"});
		
		//podemos generar un id y luego utilizaro para generar un documento
		//const id = this.firestone.createId();

		//set() actualiza por completo el documento
		//this.collection.doc("zsflSNAwJ2ljSTUQwXB9").set({nuevodato:"123456"});
		
		//update() solo cambia los valores enviados
		//this.collection.doc("zsflSNAwJ2ljSTUQwXB9").update({titulo:"testingo con update()"});
		
		//eliminar un documento de la coleccion
		//this.collection.doc("zsflSNAwJ2ljSTUQwXB9").delete();

	}

	ngOnInit() {

		this.firebasePlugin.getToken().then(token => {
			console.log(`The token is ${token}`);
			this.token = token;
		})
		.catch(error => console.error('Error getting token', error));

		this.firebasePlugin.onNotificationOpen().subscribe(data => {
			console.log(`User opened a notification ${data}`);
		});

		this.firebasePlugin.onTokenRefresh().subscribe((token: string) => {
			console.log(`Got a new token ${token}`);
			this.token = token;
		});

	}
	
	
	//documentacion
	//https://firebase.google.com/docs/reference/js/firebase.auth.Auth
	
		//registramos un usuario con email
	  register() {
		this.firebaseAuth.auth.createUserWithEmailAndPassword("jorgearmandooc@gmail.com","123456");
	  }
	  
	  //iniciamos sesion con email
	  login() {
		this.firebaseAuth.auth.signInWithEmailAndPassword("jorgearmandooc@gmail.com","123456").then(function(r){
			console.log(r);
		});
	  }
	  
	  
	login_fb() {
		this.fb.login(['email']).then((response: FacebookLoginResponse) => {
			this.login_fb_success(response.authResponse.accessToken);
			console.log(response.authResponse.accessToken);
		}).catch((error) => {
			console.log(error)
			alert('error:' + error)
		});
	  }

	login_fb_success(accessToken: string) {
		const credential =  firebase.auth.FacebookAuthProvider.credential(accessToken);
		this.firebaseAuth.auth.signInWithCredential(credential).then((response) => {
			console.log(response);
			alert("facebook");
			alert(JSON.stringify(response));
		})

	}
	
	login_google(){
	
		alert("trying google");
	
		this.gplus.login({
			  'webClientId': '260260646101-u7tv7ftbhg3ugjebiei0scfhqmkaeufe.apps.googleusercontent.com',
			  'offline': true
		}).then((response) => {
			alert(JSON.stringify(response));
			//this.login_google_success(response.idToken);
		  }).catch((error) => {
			console.log(error)
			alert('error:' + JSON.stringify(error))
		  });
	}
	 
	 login_google_success(idToken){
		  const credential = firebase.auth.GoogleAuthProvider.credential(idToken);
		  this.firebaseAuth.auth.signInWithCredential(credential).then((response) => {
			alert('error:' + JSON.stringify(response))
		  })
	 }

}

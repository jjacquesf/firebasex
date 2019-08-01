import { Component } from '@angular/core';
import { Firebase } from '@ionic-native/firebase/ngx';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  providers:[Firebase,AngularFirestore,AngularFireAuth]
})

export class HomePage {
  
	public token = 'Cargando'

	constructor(private firebase: Firebase, private firestone: AngularFirestore, public firebaseAuth: AngularFireAuth) {
		
		
		//https://github.com/angular/angularfire2/blob/master/docs/firestore/ documentacion completa
		
		//retorna la coleccion de forma asincrona
		this.collection = this.firestone.collection('tasks');

		//podemos leer la coleccion y suscribirnos para cuando lleguen los documentos
		
		//valueChanges regresa solo los datos del documento
		//this.collection.snapshotChanges().subscribe(tasks => {
		
		//snapshotChanges regresa los documentos como objetos
		this.collection.snapshotChanges().subscribe(tasks => {
			tasks.forEach(task => {
				console.log(task.payload);
				console.log(task.payload.doc.data());
				console.log(task.payload.doc.id);
			});
		});
		
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

}

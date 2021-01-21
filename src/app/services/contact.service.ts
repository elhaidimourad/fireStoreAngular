import { Contact } from './../models/contact';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore'
import { Observable } from 'rxjs';

@Injectable()
export class ContactService {

  contactsDoc: AngularFirestoreDocument<Contact>;
  contactsCollection: AngularFirestoreCollection<Contact>;
  contacts : Observable<Contact[]>;

  constructor(private firestore: AngularFirestore) { 

    this.contactsCollection = this.firestore.collection("contacts");
    this.contacts = this.contactsCollection.snapshotChanges().map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as Contact;
        const id = a.payload.doc.id;
        return { id, ...data };
      });
    });
        
  }

  getContacts(){
    return this.contacts;
  }

  createontact(contact: Contact){
     this.contactsCollection.add(contact);
  }

  editContact(contact: Contact) {
    this.contactsCollection.doc(contact.id).update(contact);
    /*this.contactsDoc = this.contactsCollection.doc<Contact>("contacts/"+contact.id);
    this.contactsDoc.update(contact);*/
  }

  destroyContact(contact: Contact){
    this.contactsCollection.doc(contact.id).delete();
  }

}




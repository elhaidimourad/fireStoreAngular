import { Component, OnInit } from '@angular/core';
import { ContactService } from '../../../services/contact.service';
import swal from 'sweetalert2';
import { timer } from 'rxjs/observable/timer';

@Component({
  selector: 'app-list-contact',
  templateUrl: './list-contact.component.html',
  styleUrls: ['./list-contact.component.css']
})
export class ListContactComponent implements OnInit {

  contacts;
  myContact;
  formStatus = false;

  constructor(private contactService: ContactService) { }

  ngOnInit() {
    this.contactService.getContacts().subscribe(contacts => {
      this.contacts = contacts;
      console.log(this.contacts);
    })
  }

  updateContact(contact){
    this.myContact = contact;
    this.formStatus = true;
  }

  editMyContact(){
    this.contactService.editContact(this.myContact);
    this.formStatus = false;
    swal({
      position: 'top-end',
      type: 'success',
      title: 'Your contact has been updated',
      showConfirmButton: false,
      timer: 1500
    })
  }

  deleteContact(contact){

    swal({
      title: 'Are you sure?',
      text: 'are you sur to delete this contact !',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
        this.contactService.destroyContact(contact);
        swal({
          title:'Deleted!',
          text:'Your contact has been deleted.',
          type:'success',
          timer:2000
        })

      } 
    })
    
  }

}

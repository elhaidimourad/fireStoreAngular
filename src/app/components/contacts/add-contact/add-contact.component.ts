import swal  from 'sweetalert2';
import { ContactService } from './../../../services/contact.service';
import { Contact } from './../../../models/contact';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.css']
})
export class AddContactComponent implements OnInit {

  cont: Contact = {
    email: '',
    fullName: '',
    phone: 0
  };

  @Input() formStatus = false;
  @Output() change = new EventEmitter();

  form = new FormGroup({
    fullName: new FormControl('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', [Validators.required, , Validators.maxLength(10)])
  });

  get f() {
    return this.form.controls;
  }

  constructor(private contactService: ContactService, private toast: ToastrService) { }

  ngOnInit() {
  }

  addContact(){
    this.cont.fullName = this.form.value.fullName;
    this.cont.email = this.form.value.email;
    this.cont.phone = this.form.value.phone;
    this.contactService.createontact(this.cont);
    this.form.reset();
    //console.log(this.cont);
   this.formStatus = !this.formStatus;
    swal({
      position: 'top-end',
      type: 'success',
      title: 'Your contact register with success',
      showConfirmButton: false,
      timer: 1800
    })
  }

  openForm(){
    this.formStatus = true;
    this.change.emit();
  }

  closeForm(){
    this.form.reset();
    this.formStatus = !this.formStatus;
    
  }

}

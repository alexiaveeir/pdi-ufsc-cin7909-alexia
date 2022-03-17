import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { CrudService } from './../../service/crud.service';
import { FormGroup, FormBuilder } from "@angular/forms";

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.css']
})
export class AddContactComponent implements OnInit {
  contactForm: FormGroup;


  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private crudService: CrudService
  ) {
    this.contactForm = this.formBuilder.group({
      name: [''],
      number: [''],
      email: ['']
    })
   }
  ngOnInit() { }
  onSubmit(): any{
    this.crudService.AddContact(this.contactForm.value)
    .subscribe(() => {
      console.log('Data added sucessfully!')
      this.ngZone.run(()=> this.router.navigateByUrl('/contacts-list'))
    }, (err)=>{
      console.log(err);
    });
  }
}
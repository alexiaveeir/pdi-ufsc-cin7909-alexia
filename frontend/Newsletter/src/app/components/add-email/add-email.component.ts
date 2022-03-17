import { Component, OnInit, NgZone } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CrudService } from './../../service/crud.service';
import { FormGroup, FormBuilder } from "@angular/forms";
@Component({
  selector: 'app-add-email',
  templateUrl: './add-email.component.html',
  styleUrls: ['./add-email.component.css']
})
export class AddEmailComponent implements OnInit {
  getId: any;
  updateForm: FormGroup;
  
  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private activatedRoute: ActivatedRoute,
    private crudService: CrudService
  ) {
    this.getId = this.activatedRoute.snapshot.paramMap.get('id');
    this.crudService.GetContact(this.getId).subscribe(res => {
      this.updateForm.setValue({
        name: res['name'],
        number: res['number'],
        email: res['email']
      });
    });
    this.updateForm = this.formBuilder.group({
      name: [''],
      number: [''],
      email: ['']
    })
  }
  ngOnInit() { }
  onUpdate(): any {
    this.crudService.updateContact(this.getId, this.updateForm.value)
    .subscribe(() => {
        console.log('Data updated successfully!')
        this.ngZone.run(() => this.router.navigateByUrl('/contacts-list'))
      }, (err) => {
        console.log(err);
    });
  }
}
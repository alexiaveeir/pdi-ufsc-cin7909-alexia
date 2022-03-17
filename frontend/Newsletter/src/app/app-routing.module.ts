import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddContactComponent } from './components/add-contact/add-contact.component';
import { AddEmailComponent } from './components/add-email/add-email.component';
import { AddNumberComponent } from './components/add-number/add-number.component';


const routes: Routes = [
  { path:'', pathMatch:'full', redirectTo:'add-contact' },
  { path:'add-contact', component:AddContactComponent },
  { path: 'add-number', component:AddNumberComponent },
  { path:'add-email', component:AddEmailComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

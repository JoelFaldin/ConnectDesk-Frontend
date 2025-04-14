import { Component } from '@angular/core';
import { RegisterHeaderComponent } from "./register-header/register-header.component";
import { RegisterFormComponent } from "./register-form/register-form.component";

@Component({
  selector: 'app-register',
  imports: [RegisterHeaderComponent, RegisterFormComponent],
  templateUrl: './register.component.html',
})
export default class RegisterComponent { }

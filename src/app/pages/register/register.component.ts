import { Component } from '@angular/core';

import { RegisterHeaderComponent } from "./register-header/register-header.component";
import { RegisterFormComponent } from "./register-form/register-form.component";
import { RegisterFooterComponent } from "./register-footer/register-footer.component";

@Component({
  selector: 'app-register',
  imports: [RegisterHeaderComponent, RegisterFormComponent, RegisterFooterComponent],
  templateUrl: './register.component.html',
})
export default class RegisterComponent { }

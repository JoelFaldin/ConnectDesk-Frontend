import { Component } from '@angular/core';
import { LoginHeaderComponent } from "./login-header/login-header.component";
import { LoginFormComponent } from "./login-form/login-form.component";

@Component({
  selector: 'app-login',
  imports: [LoginHeaderComponent, LoginFormComponent],
  templateUrl: './login.component.html',
})
export default class LoginComponent { }

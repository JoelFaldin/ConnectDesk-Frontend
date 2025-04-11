import { Component } from '@angular/core';
import { RegisterHeaderComponent } from "./register-header/register-header.component";

@Component({
  selector: 'app-register',
  imports: [RegisterHeaderComponent],
  templateUrl: './register.component.html',
})
export default class RegisterComponent { }

import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'app/services/auth.service';
// import { ToastrService } from 'ngx-toastr'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  constructor(private builder: FormBuilder, private service: AuthService, private router: Router,
   ) {

  }

  registerform = this.builder.group({
    name: this.builder.control('', Validators.required),
    password: this.builder.control('', Validators.required),
    confirmPassword: this.builder.control('', Validators.required),
    role: this.builder.control(''),
    isactive: this.builder.control(false)
  });
  proceedregister() {
    if (this.registerform.valid) {
      this.service.registerUser(this.registerform.value).subscribe(result => {
      this.router.navigate(['login'])
      });
    } else {
    }
  }
}
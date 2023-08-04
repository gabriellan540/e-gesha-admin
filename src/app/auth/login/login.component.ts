import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
// import { ToastrService } from 'ngx-toastr'
import { AuthService } from 'app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private builder: FormBuilder, private authService: AuthService,
    private router: Router) {
    sessionStorage.clear();

  }
  result: any;

  loginform = this.builder.group({
    id: this.builder.control('', Validators.required),
    password: this.builder.control('', Validators.required)
  });
  userdata: any

  // proceedlogin() {
  //   if (this.loginform.valid) {
  //     this.authService.login(this.loginform.value).subscribe(res => {
  //       localStorage.setItem('access_token', res.token);
  //       if (res.success){
  //         this.router.navigate(['/dashboard']);
  //         console.log(res);
  //         alert(res.message);
  //       } else {
  //         alert(res.message)
  //       }
  //     })}
  //   }
  proceedlogin() {
    if (this.loginform.valid) {
      this.authService.getUserByCode(this.loginform.value.id).subscribe(item => {
        this.result = item;
        if (this.result.password === this.loginform.value.password) {
          if (this.result.isactive) {
            sessionStorage.setItem('username',this.result.id);
            sessionStorage.setItem('role',this.result.role);
            this.router.navigate(['/dashboard']);
          } else {
            alert('Please contact Admin for activation of account');
          }
        } else {
          alert('Invalid credentials');
        }
      });
      } else {
        alert('Please enter valid data.')
    }
  }
}
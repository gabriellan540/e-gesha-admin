// import { Injectable, inject } from '@angular/core';
// import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
// import { ToastrService } from 'ngx-toastr';
// import { Observable } from 'rxjs';
import { AuthService } from 'app/services/auth.service';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthGuard implements CanActivate {
//   constructor(private service: AuthService, private router: Router,private tostr:ToastrService) { }
//   canActivate(
//     route: ActivatedRouteSnapshot,
//     state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
   
//     if (this.service.isloggedin()) {
      // if (route.url.length > 0) {
      //   let menu = route.url[0].path;
      //   if (menu == 'user') {
      //     if (this.service.getrole() == 'admin') {
      //       return true;
      //     } else {
      //       this.router.navigate(['']);
      //         this.tostr.warning('You dont have access.')
      //       return false;
      //     }
      //   }else{
      //     return true;
      //   }
      // } else {
      //   return true;
      // }
//       console.log("logged")
//       return true;
//     }
//     else {
//       console.log("not logged")
//       this.router.navigate(['login']);
//       return false;
//     }
//   }

// }

// export const AuthGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot):Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree => {
//   const authService = inject(AuthService);
//   const router = inject(Router);

//   if(authService.isloggedin()){
//     console.log("logged")
//     return true;
//   }else{
//     console.log("loggedd")
//     router.navigate(['/auth/login']);
//     return false;
//   }
// }

import { Injectable } from '@angular/core';
import { CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router,private authService: AuthService,) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let url: string = state.url;
    return this.checkUserLogin(route, url);
  }

  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.canActivate(next, state);
  }

  checkUserLogin(route: ActivatedRouteSnapshot, url: any): boolean {
    if (!!this.authService.isLoggedIn()) {
      return true;
    } else {
      this.router.navigate(['/auth/login']);
        return false;
    }
  }
}
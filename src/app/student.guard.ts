import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../service/auth.service';

@Injectable()
export class StudentGuard implements CanActivate {
  constructor(private router: Router, private auth: AuthService) { }

  canActivate(): boolean {
    const user = this.auth.decodeAccessToken(localStorage.getItem('token'));
    if (user.userType === 'STUDENT') return true;
    this.router.navigate(['/dashboard/teacher/my-classes']);
    return false;
  }

}

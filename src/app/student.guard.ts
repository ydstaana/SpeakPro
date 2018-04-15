import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class StudentGuard implements CanActivate {
  constructor(private router: Router) { }

  canActivate(): boolean {
    const user = JSON.parse(localStorage.getItem('loggedUser'));
    if (user.userType === 'STUDENT') return true;
    this.router.navigate(['/dashboard/teacher/my-classes']);
    return false;
  }

}
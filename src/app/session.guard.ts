import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class SessionGuard implements CanActivate {
  constructor(private router: Router) { }

  canActivate(): boolean {
    const token = localStorage.getItem('token');

    if (token) {
      return true;
    }

    alert('Expired token');
    this.router.navigate(['/home']);
    localStorage.clear();
    return false;
  }

}

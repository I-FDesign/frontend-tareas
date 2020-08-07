import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AlreadyLogguedGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}
  canActivate() {
    if (this.authService.user || this.authService.token) {
      this.router.navigate(['/home']);
      return false;
    }
    return true;
  }
}




import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}
  canActivate(): any {
    if (!this.authService.user || !this.authService.token) {
      this.router.navigate(['/login']);
      return false;
    }

    this.checkTokenExpiration();

    return true;
  }

  checkTokenExpiration() {
    // tslint:disable-next-line: radix
    let expiration = parseInt(this.authService.getStorage().tokenExpiresIn) * 1000;
    expiration = new Date(expiration).getTime();
    const now = new Date().getTime();

    const oneDayLater = now + (1000 * 60 * 60 * 24);

    if (oneDayLater < expiration) { // Remains more than a day
     return true;
    } else if (now < expiration) { // One day remains, have to refresh
      this.authService.refreshToken();
      return true;
    } else {
      this.authService.logOut(true);
      this.router.navigate(['/login']);
      return false;
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user.model';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

import swal from 'sweetalert';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  user: User = new User();

  repassword: string;

  error: string;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  signUpSubmit() {
    if (!this.user.email) {
      this.error = 'Debes ingresar un email valido';
      return;
    }

    if (!this.user.password) {
      this.error = 'Debes ingresar una contraseña';
      return;
    }

    if (!this.repassword) {
      this.error = 'Debes repetir la contraseña';
      return;
    }

    if (this.repassword !== this.user.password) {
      this.error = 'Las contraseñas deben ser iguales';
      return;
    }

    this.authService.signUp(this.user).subscribe((res: any) => {
      this.router.navigate(['/login']);

      swal({
        title: 'Creaste tu cuenta',
        text: 'Has creado tu cuenta correctamente!, inicia sesión',
        icon: 'success',
        timer: 1500
      });

    }, ((error) => {
      const errors = error.error;

      if (errors.email && errors.email.length > 0) {
        this.error = errors.email[0];
        return;
      }

      if (errors.password && errors.password.length > 0) {
        this.error = errors.password[0];
        return;
      }
    }));
  }

}

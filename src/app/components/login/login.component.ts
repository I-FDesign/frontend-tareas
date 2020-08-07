import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user.model';
import { Router } from '@angular/router';

import swal from 'sweetalert';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user = new User();

  error: string;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  loginSubmit() {
    this.authService.login(this.user).subscribe((res: any) => {
      this.authService.saveInStorage(res.user, res.access_token, res.expires_in);
      this.authService.getUserData();
      swal({
        title: 'Inicio de sesíon',
        text: 'Has iniciado sesión correctamente!',
        icon: 'success',
        timer: 1500
      });
      this.router.navigate(['/home']);
    }, ((error) => {
      this.error = error.error.error;
    }) );
  }

}

import { Component, inject } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [CommonModule,FormsModule],
  templateUrl:'./login.component.html'
})
export class LoginComponent {

    username = "";
    password = "";
    cargando = false;
    error = "";

    private loginService = inject(LoginService);
    private router = inject(Router);

    login(){

      if(!this.username || !this.password){
        this.error = "Completas los campos";
        return;
      }

      this.cargando = true;

      this.error = ""

      this.loginService.login({username : this.username , password :this.password})
      .subscribe({
        next:()=> {
          this.cargando = false;
          this.router.navigate(['/dashboard']);
        },
        error:(e) => {
          this.cargando = false;
          this.error = e.status === 401 ?
          'Usuario o Contraseña Incorrecta': 'Error al conectar al servidor';
        }
      })



    }







}

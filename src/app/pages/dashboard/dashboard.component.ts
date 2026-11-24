import { Component, inject } from '@angular/core';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent {

   private loginService = inject(LoginService);

  logout(){
    this.loginService.logout();
  }


}

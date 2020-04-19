import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticacaoService } from 'src/app/services/authenticacao.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private router: Router,
    private authServico: AuthenticacaoService
  ) { }

  email = '';
  password = '';

  ngOnInit() {
    window.scrollTo(0,0)
  }

  autoFillListner(field){
    console.log(this[field]);
  }

  isResting(field){
    return typeof this[field] === 'string' && this[field].trim().length > 0;
  }

  goToPage(page){
    this.router.navigate([page]);
  }

  async logarUsuario  () {
    /*
    if (!this.isValidForm()) {
      return;
    }
    */
   try {
    const response = await this.authServico.apiLoginUsuario({email: this.email,password: this.password});

    this.goToPage('home')

   } catch (error) {

   }



  }

  async logoutUsuario  () {

   this.authServico.token = null

   // this.goToPage('cadastro')

  }

}

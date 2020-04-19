import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticacaoService } from 'src/app/services/authenticacao.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss']
})
export class CadastroComponent implements OnInit {

  etapa = 1;

  apelido = '';
  nascimento = '';
  bandaFavorita = '';
  email = '';
  password = '';

  constructor(
    private router: Router,
    private authServico: AuthenticacaoService
  ) { }

  ngOnInit() {
    window.scrollTo(0,0)
  }

  async registrarUsuario(){
    if (!this.isValidForm()) {
      return;
    }

    const response = await this.authServico.apiRegistrarUsuario({
      email: this.email,
      senha: this.password,
      username: this.apelido,
      birthday: this.nascimento,
      favoriteBand: this.bandaFavorita
    });

    await this.authServico.apiLoginUsuario({
      email: this.email,
      password: this.password,
    })

    this.goToPage('home')

  }

  isResting(field){
    return typeof this[field] === 'string' && this[field].trim().length > 0;
  }

  goToPage(page){
    this.router.navigate([page]);
  }

  proximaEtapa(){
    if (!this.isResting('apelido') || !this.isResting('nascimento') || !this.isResting('bandaFavorita')) {
      return;
    }

    this.etapa = 2;
  }

  voltarEtapa(){
    this.etapa = 1;
  }

  isValidForm(){
    if (!this.isResting('apelido') || !this.isResting('nascimento') || !this.isResting('bandaFavorita')) {
      return false;
    }

    if (this.password.trim().length < 6) {
      return false;
    }
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(String(this.email).toLowerCase());
  }

}

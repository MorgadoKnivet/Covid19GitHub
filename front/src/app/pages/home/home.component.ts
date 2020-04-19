import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticacaoService } from 'src/app/services/authenticacao.service';
import {ShowService} from 'src/app/services/show.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  seletor = 0;

  busca = '';

  listaElement: any = null

  page = 0;
  pageCount = 0;

  widthTotal: any;
  scrollTotal: any;

  constructor(
    private router: Router,
    private authServico: AuthenticacaoService,
    private showServico: ShowService
  ) {
    if (this.authServico.token === null) {
      this.goToPage('')
    }
  }

  artistas = [
    {
      show: "World Tour",
      nome: 'Foo Fighters',
      tipo: "Rock'n'Roll",
      photo: "https://www.505indie.com.br/wp-content/uploads/2018/02/30dcce9f-d2e9-41f7-88d2-dc071baa5db5.jpg"
    },
    {
      show: "Game North American tour",
      nome: 'Queens',
      tipo: "Rock'n'Roll",
      photo: "https://media-manager.noticiasaominuto.com/1920/naom_5dd3ed00c7793.jpg"
    },
    {
      show:"Buteco do Gusttavo Lima,",
      nome:"Gusttavo Lima",
      tipo: "Sertanejo",
      photo: "http://blogs.diariodonordeste.com.br/puxaofole/wp-content/uploads/2020/04/80346912_3164296440296154_8207712962564063232_o-e1587161211305.jpg"
    },
    {
      show:"Turne Internacional",
      nome:"Alok",
      tipo: "Eletronica",
      photo: "https://br.jetss.com/wp-content/uploads/2020/01/Alok.jpeg"
    },
    {
      show:"Roda de Samba do Exalta",
      nome:"Exaltasamba",
      tipo: "Samba/pagode",
      photo: "https://www.guiadasemana.com.br/contentFiles/system/pictures/2012/1/38969/original/arq-1665-82164.jpg"
    }
  ];

  ngOnInit() {
    window.scrollTo(0,0)
  }

  calcularSlider() {
    setTimeout(() => {
      this.listaElement = document.querySelector(`.resultado`);

      this.widthTotal = this.listaElement.offsetWidth;
      this.scrollTotal = document.querySelector(`.resultado .artistas`).scrollWidth;

      this.pageCount = Math.floor(this.scrollTotal / this.widthTotal);

      if (this.scrollTotal % this.widthTotal === 0) {
        this.pageCount--;
      }
    }, 10);
  }

  proximoSlideArtistas() {
    this.page++;

    if (this.pageCount === this.page) {
      document.querySelector(`.resultado .artistas`).scrollTo({
        left: this.scrollTotal,
        behavior: 'smooth',
      });
    } else {
      document.querySelector(`.resultado .artistas`).scrollTo({
        left: this.page * this.widthTotal,
        behavior: 'smooth',
      });
    }
  }
  voltarSlideArtistas() {
    this.page--;
    document.querySelector(`.resultado .artistas`).scrollTo({
      left: this.page * this.widthTotal,
      behavior: 'smooth',
    });
  }

  isResting(field){
    return typeof this[field] === 'string' && this[field].trim().length > 0;
  }

  goToPage(page){
    this.router.navigate([page]);
  }

  async getShows() {
    await this.showServico.getAllConcerts(this.authServico.token)
  }

}

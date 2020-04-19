import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModaisService } from 'src/app/services/modais.service';

@Component({
  selector: 'app-banda',
  templateUrl: './banda.component.html',
  styleUrls: ['./banda.component.scss']
})
export class BandaComponent implements OnInit {

  seletor = 0;

  listaElement: any = null

  page = 0;
  pageCount = 0;

  widthTotal: any;
  scrollTotal: any;

  constructor(
    private router: Router,
    public modaisService: ModaisService
  ) { }

  escolhidos = [
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
    }
  ]

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

}

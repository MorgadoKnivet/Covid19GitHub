import { Component, OnInit, Input } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-lista-cards',
  templateUrl: './lista-cards.component.html',
  styleUrls: ['./lista-cards.component.scss']
})
export class ListaCardsComponent implements OnInit {

  constructor() {
  }

  listaId = `id_${uuidv4().substring(0, 8)}`;
  listaElement: any = null

  page = 0;
  pageCount = 0;

  widthTotal: any;
  scrollTotal: any;

  @Input() tipo = 0;
  @Input() subtipo = 0;

  tipoTexto = '';

  fixo = {
    show: "Relive - Única apresentação",
    nome: 'Relive',
    tipo: "Rock'n'Roll",
    photo: "https://instagram.fgig4-1.fna.fbcdn.net/v/t51.2885-15/e35/s1080x1080/59376457_298429461109401_5846966917395806316_n.jpg?_nc_ht=instagram.fgig4-1.fna.fbcdn.net&_nc_cat=109&_nc_ohc=pD3Cyb_JWaoAX96KR-c&oh=097233b1dcc65bd7eb8d6ef5fcda6bc5&oe=5EC6EF4E"
  }

  shows = [
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
  espetaculos = [
    {
      show:"Anos 2000",
      nome:"Orquestra Sinfônica Brasileira",
      tipo: "Orquestra",
      photo: "https://1.bp.blogspot.com/-JmEKyZ2x1AU/WeXXjyJi0iI/AAAAAAAAH4A/KbFsO_25IPwnhDXRwph7iJIMkRgS1xiqACLcBGAs/s1600/OSB-Violoncelos-e-Contrabaixos.png"
   },
   {
    show:"Dança Contemporânia",
    nome:"Companhia de Dança Deborah Colker",
    tipo: "Balé",
    photo: "https://media.jornaldooeste.com.br/1555612790-5cb8c50f90b0f-mjgc.jpg"
    },
    {
      show:"Especial só agradece",
      nome:"Thiago Ventura",
      tipo: "Humorístico",
      photo:"https://www.diariodoaco.com.br/images/noticias/72911/20191030143125_92tnOFTjVo.jpg"
    }
  ]

  escolhidos = []

  ngOnInit() {
    if (this.tipo == 0 || this.tipo == 2) {
      const randomQtd = Math.floor(Math.random() * 5) + 1;
      let jaEscolhidos = [];
      let i = 0;

      while (i < randomQtd) {
        const randomI = Math.floor(Math.random() * this.shows.length) + 1 - 1;

        if (jaEscolhidos.indexOf(randomI) === -1) {
          jaEscolhidos.push(randomI);
          i++;

          this.escolhidos.push(this.shows[randomI]);
        }
      }
    } else{
        const randomQtd = Math.floor(Math.random() * 3) + 1;
        let jaEscolhidos = [];
        let i = 0;

        while (i < randomQtd) {
          const randomI = Math.floor(Math.random() * this.espetaculos.length) + 1 - 1;

          if (jaEscolhidos.indexOf(randomI) === -1) {
            jaEscolhidos.push(randomI);
            i++;

            this.escolhidos.push(this.espetaculos[randomI]);
          }
        }
    }

    setTimeout(() => {
      this.listaElement = document.querySelector(`#${this.listaId}`);

      this.widthTotal = this.listaElement.offsetWidth;
      this.scrollTotal = document.querySelector(`#${this.listaId} .cards`).scrollWidth;

      this.pageCount = Math.floor(this.scrollTotal / this.widthTotal);

      if (this.scrollTotal % this.widthTotal === 0) {
        this.pageCount--;
      }
    }, 10);
    if (this.subtipo === 0) {
      this.tipoTexto = 'agendados';
      return;
    }
    if (this.subtipo === 1) {
      this.tipoTexto = 'passados';
      return;
    }
    if (this.subtipo === 2) {
      this.tipoTexto = 'ao vivo';
      return;
    }
  }

  proximoSlide() {
    this.page++;

    if (this.pageCount === this.page) {
      document.querySelector(`#${this.listaId} .cards`).scrollTo({
        left: this.scrollTotal,
        behavior: 'smooth',
      });
    } else {
      document.querySelector(`#${this.listaId} .cards`).scrollTo({
        left: this.page * this.widthTotal,
        behavior: 'smooth',
      });
    }
  }
  voltarSlide() {
    this.page--;
    document.querySelector(`#${this.listaId} .cards`).scrollTo({
      left: this.page * this.widthTotal,
      behavior: 'smooth',
    });
  }

}

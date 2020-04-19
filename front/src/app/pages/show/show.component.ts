import { Component, OnInit } from '@angular/core';
import { ModaisService } from 'src/app/services/modais.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.scss']
})
export class ShowComponent implements OnInit {

  constructor(
    public modaisService: ModaisService,
    private router: Router
  ) { }

  setList = [
    {
      "position": 1,
      "name":"Kashmir",
      "start": "0:00",
      "duration": "8:30"
    },
    {
      "position": 2,
      "name":"Whole Lotta Love",
      "start": "8:30",
      "duration": "5:30"
    },
    {
      "position": 3,
      "name":"Stairway to Heaven",
      "start": "14:00",
      "duration": "8:00"
    },
    {
      "position": 4,
      "name":"Rock and Roll",
      "start": "22:00",
      "duration": "3:41"
    },
    {
      "position": 3,
      "name":"All My Love",
      "start": "25:41",
      "duration": "5:51"
    }
  ]

  ngOnInit() {
    window.scrollTo(0,0)
  }

  abrirPagamento() {
    this.modaisService.comprarModal = true;
  }

  goToPage(page){
    this.router.navigate([page]);
  }

}

import { Component, OnInit } from '@angular/core';
import { ModaisService } from 'src/app/services/modais.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-avaliar',
  templateUrl: './avaliar.component.html',
  styleUrls: ['./avaliar.component.scss']
})
export class AvaliarComponent implements OnInit {

  notaImg = 1;
  notaSom = 1;
  notaBanda = 1;

  constructor(
    public modaisService: ModaisService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  avaliar() {
    this.router.navigate(['home']);
  }

}

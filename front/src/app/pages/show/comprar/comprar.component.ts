import { Component, OnInit } from '@angular/core';
import { ModaisService } from 'src/app/services/modais.service';

@Component({
  selector: 'app-comprar',
  templateUrl: './comprar.component.html',
  styleUrls: ['./comprar.component.scss']
})
export class ComprarComponent implements OnInit {

  constructor(
    public modaisService: ModaisService
  ) { }

  ngOnInit() {
  }

  eventoPago() {
    this.modaisService.comprarModal = false;
    this.modaisService.pagamentoModalLiberado = true;
  }

}

import { Component, OnInit } from '@angular/core';
import { ModaisService } from 'src/app/services/modais.service';

@Component({
  selector: 'app-live',
  templateUrl: './live.component.html',
  styleUrls: ['./live.component.scss']
})
export class LiveComponent implements OnInit {

  constructor(
    public modaisService: ModaisService
  ) { }

  chat = true;

  ngOnInit() {
    window.scrollTo(0,0)
  }

  avaliar() {
    this.modaisService.avaliarModal = true;
  }

}

import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardsComponent implements OnInit {

  @Input() show = null;

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }

  goToPage(page){
    this.router.navigate([page]);
  }

}

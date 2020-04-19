import { Component, OnInit } from '@angular/core';
import { ModaisService } from 'src/app/services/modais.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  constructor(
    public modaisService: ModaisService
  ) { }

  ngOnInit() {
  }

  eventoPago() {
    this.modaisService.chatModal = false;
  }

}

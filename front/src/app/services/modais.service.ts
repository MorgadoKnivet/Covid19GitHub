import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModaisService {

  constructor() { }

  comprarModal = false;
  chatModal = false;
  avaliarModal = false;

  chatModalLiberado = false;
  pagamentoModalLiberado = false;

  seguindo = false;
}

import { Injectable } from '@angular/core';
import Axios from 'axios';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticacaoService {

  token = null

  constructor() { }

  async apiRegistrarUsuario({
    email,
    senha,
    username,
    birthday,
    favoriteBand
  }) {
    try {
      const response = await Axios.post(`${environment.api}/user/register`, {
        email,
        password:senha,
        username,
        birthday,
        favoriteBand
      });


      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  async apiLoginUsuario({email,password}) {
    try {
      const response = await Axios.post(`${environment.api}/user/login`, {
        email,
        password
      });

      this.token = response.data.token

      return response.data;
    } catch (error) {
      console.log(error);
    }
  }



}

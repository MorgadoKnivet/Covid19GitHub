import { Injectable } from '@angular/core';
import Axios from 'axios';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  async postUserTickets(token,{showId,whenPurchased}) {
    try {
      const response = await Axios.post(`${environment.api}/user/tickets`, {
        showId,
        whenPurchased
      }, {
        headers: { "Authorization":  token },
      });

      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  async getUserTickets(token) {
    try {
      const response = await Axios.get(`${environment.api}/user/tickets`,{
        headers: { "Authorization":  token },
      });

      return response.data.purchasedTickets;
    } catch (error) {
      console.log(error);
    }
  }

  async getOwnProfile(token) {
    try {
      const response = await Axios.get(`${environment.api}/user`,{
        headers: { "Authorization":  token },
      });

      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

}

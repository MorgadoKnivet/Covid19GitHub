import { Injectable } from '@angular/core';
import Axios from 'axios';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BandService {

  constructor() { }


  async registerBand({email,password,foundationData,name,segment}) {
    try {
      const response = await Axios.post(`${environment.api}/band/register`, {
        email,
        password,
        foundationData,
        name,
        segment
      }, {});

      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  async loginBand({email,password}) {
    try {
      const response = await Axios.post(`${environment.api}/band/register`, {
        email,
        password,
      }, {});

      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  async getBand(token) {
    try {
      const response = await Axios.get(`${environment.api}/band`,  {
        headers: { "Authorization":  token },
      });

      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  async getBandById(token,id) {
    try {
      const response = await Axios.get(`${environment.api}/band/${id}`,  {
        headers: { "Authorization":  token },
      });

      return response.data;
    } catch (error) {
      console.log(error);
    }

  }

  async getConcertsByBand(token,bandId){

    try {
      const response = await Axios.get(`${environment.api}/band/${bandId}/concerts`,  {
        headers: { "Authorization":  token },
      });

      return response.data;
    } catch (error) {
      console.log(error);
    }

  }

  async putBandDetails(token,{details}) {
    try {
      const response = await Axios.put(`${environment.api}/band/details/`, {
        details
      }, {
        headers: { "Authorization":  token },
      });

      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  async putBand(token,{details,location,members}) {
    try {
      const response = await Axios.put(`${environment.api}/band/details/`, {
        details,
        location,
        members
      }, {
        headers: { "Authorization":  token },
      });

      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  async postFollowBandByBandId(token,bandId,status){
    try {
      const response = await Axios.post(`${environment.api}/band/follow/${bandId}`, {
        status
      }, {
        headers: { "Authorization":  token },
      });

      return response.data;
    } catch (error) {
      console.log(error);
    }

  }
//logo photo
  async postBandLogo(token,{logo}){
    try {
      const response = await Axios.post(`${environment.api}/band/logo/`, {
        logo
      }, {
        headers: { "Authorization":  token },
      });

      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  async deleteBandLogo(token,){
    try {
      const response = await Axios.delete(`${environment.api}/band/logo/`, {
        headers: { "Authorization":  token },
      });

      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  async postBandPhoto(token,{photo}){
    try {
      const response = await Axios.post(`${environment.api}/band/photo/`, {
        photo
      }, {
        headers: { "Authorization":  token },
      });

      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  async deleteBandPhoto(token){
    try {
      const response = await Axios.delete(`${environment.api}/band/photo/`, {
        headers: { "Authorization":  token },
      });

      return response.data;
    } catch (error) {
      console.log(error);
    }
  }



}


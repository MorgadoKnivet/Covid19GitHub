import { Injectable } from '@angular/core';
import Axios from 'axios';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ShowService {

  constructor() { }

  async getAllConcerts(token) {
    try {
      const response = await Axios.get(`${environment.api}/concerts`,  {
        headers: { "Authorization":  token },

    });

      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  async getConcertById(token,id) {
    try {
      const response = await Axios.get(`${environment.api}/concert/${id}`,  {
        headers: { "Authorization":  token },

    });

      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  async getConcertBandById(token,id) {
    try {
      const response = await Axios.get(`${environment.api}/concert/${id}/band`,  {
        headers: { "Authorization":  token },

    });

      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  async getConcertReviewById(token,id) {
    try {
      const response = await Axios.get(`${environment.api}/concert/${id}/review`,  {
        headers: { "Authorization":  token },

    });

      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  async postConcertReviewById(token,id,{image,sound,band}) {
    try {
      const response = await Axios.post(`${environment.api}/concert/${id}/review`,
       {
        image,
        sound,
        band
       },
       {
        headers: {
          "Authorization":  token
        },

    });

      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  async putConcertDateById(token,id,{date}){
    try {
      const response = await Axios.put(`${environment.api}/concert/${id}/updateDate`,
      {
        date
      },
       {
        headers: { "Authorization":  token },
      }
    );

      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  async patchConcertDateById(token,id,{title,concertPhoto,description,date,estimatedDuration,setlist}){
    try {
      const response = await Axios.patch(`${environment.api}/concert/${id}/details`,
      {
        title,
        concertPhoto,
        description,
        date,
        estimatedDuration,
        setlist
      },
       {
        headers: { "Authorization":  token },
      }
    );

      return response.data;
    } catch (error) {
      console.log(error);
    }
  }


  async putFinishConcertDateById(token,id){
    try {
      const response = await Axios.put(`${environment.api}/concert/${id}/finish`,
       {},
       {
        headers: { "Authorization":  token },
      }
    );

      return response.data;
    } catch (error) {
      console.log(error);
    }
  }


  async putPreparationConcertDateById(token,id){
    try {
      const response = await Axios.put(`${environment.api}/concert/${id}/preparation`,
       {},
       {
        headers: { "Authorization":  token },
      }
    );

      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  async putStartConcertDateById(token,id){
    try {
      const response = await Axios.put(`${environment.api}/concert/${id}/start`,
       {},
       {
        headers: { "Authorization":  token },
      }
    );

      return response.data;
    } catch (error) {
      console.log(error);
    }
  }


  async postRegisterConcert(token,{ticketPrice,title,locationName}) {
    try {
      const response = await Axios.post(`${environment.api}/concert/register`,
       {
        ticketPrice,
        title,
        locationName
       },
       {
        headers: { "Authorization":  token },
      }
    );

      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  async postMusicSetListByConcertId(token,id,{position,name,start,duration}){
    try {
      const response = await Axios.post(`${environment.api}/concert/${id}/setList`,
       {
        position,
        name,
        start,
        duration
       },
       {
        headers: { "Authorization":  token },
      }
    );

      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  async putConcertLocalByConcertid(token,id,{name,address,geolocation}) {
    try {
      const response = await Axios.post(`${environment.api}/concert/${id}/local`,
       {
        name,
        address,
        geolocation
       },
       {
        headers: { "Authorization":  token },
      }
    );

      return response.data;
    } catch (error) {
      console.log(error);
    }

  }


  //async get
}

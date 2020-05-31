import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  constructor(private httpClient: HttpClient) {}

  private getHttpHeaders(): HttpHeaders {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return headers;
  }

  getNews(country: string) {
    return this.httpClient.get(`${environment.urlApi}/news?country=${country}`);
  }

  getNotificationsDB(idUser: string) {
    return this.httpClient.get(
      `${environment.urlApi}/user/messages?idUser=${idUser}`,
      {
        headers: this.getHttpHeaders()
      }
    );
  }
}

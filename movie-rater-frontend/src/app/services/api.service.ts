import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Movie } from '../models/movie';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  baseUrl = 'http://127.0.0.1:8000/api/movies/';
  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: 'Token 36c13f064a0db74f4dcab203bc590e3004a1496e'
  })

  constructor(
    private httpClient: HttpClient
  ) { }

  getMovies() {
    return this.httpClient.get<Movie[]>(this.baseUrl, {headers: this.headers});
  }
  getMovie(id: number) {
    return this.httpClient.get<Movie>(`${this.baseUrl}${id}/`, {headers: this.headers});
  }

  rateMovie(rating: number, movieId: number) {
    const body = JSON.stringify({stars: rating});
    return this.httpClient.post<Movie>(`${this.baseUrl}${movieId}/rate_movie/`, body, {headers: this.headers});
  }
}

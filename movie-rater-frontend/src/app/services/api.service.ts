import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private _movies = ['Happy Gilmore', 'The Waterboy' ]

  constructor() { }

  getMovies() {
    return this._movies;
  }
}

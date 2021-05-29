import { Component, OnInit } from '@angular/core';
import { Movie } from '../models/movie';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  movies: Movie[] = [];
  selectedMovie = null

  constructor(
    private apiService: ApiService
  ) { }

  ngOnInit() {
    this.apiService.getMovies().subscribe(
      (data: Movie[]) => {
        this.movies = data;
      },
      error => console.log(error)
    );
  }

  selectMovie(movie: Movie) {
    this.selectedMovie = movie;
    console.log(this.selectedMovie);
  }

}

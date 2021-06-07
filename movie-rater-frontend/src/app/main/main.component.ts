import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { Movie } from '../models/movie';
import { ApiService } from '../services/api.service';
import { AlertifyService } from '../services/alertify.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  movies: Movie[] = [];
  selectedMovie = null
  editedMovie = null

  constructor(
    private apiService: ApiService,
    private cookieService: CookieService,
    private router: Router,
    private alertify: AlertifyService
  ) { }

  ngOnInit() {
    const token = this.cookieService.get('token');
    if (!token) {
      this.router.navigate(['/auth']);
    } else {
      this.apiService.getMovies().subscribe(
      (data: Movie[]) => {
        this.movies = data;
      });
    }    
  }

  logout() {
    this.cookieService.delete('token');
    this.router.navigate(['/auth']);
    this.alertify.success('Successfully logged out.')
  }

  selectMovie(movie: Movie) {
    this.selectedMovie = movie;
    this.editedMovie = null;
  }
  
  editMovie(movie: Movie) {
    this.editedMovie = movie;
    this.selectedMovie = null;
    this.alertify.success(movie.title + " was updated.")
  }

  createNewMovie() {
    this.editedMovie = {title: '', description: ''};
    this.selectedMovie = null;
  }
  
  deleteMovie(movie: Movie) {
    this.apiService.deleteMovie(movie.id).subscribe(
      data => {
        this.movies = this.movies.filter(value => value.id !== movie.id);
        this.alertify.error(movie.title + " was deleted from the ratings list.")
      },
      error => this.alertify.error("There was a problem trying to delete this movie.")
    );
  }

  movieCreated(movie: Movie) {
    this.movies.push(movie);
    this.editedMovie = null;
    this.alertify.success(movie.title + " was added to the movie list!")
  }

  movieUpdated(movie: Movie) {
    const index = this.movies.findIndex( value => value.id === movie.id);
    if (index >= 0) {
      this.movies[index] = movie;
    }
    this.editedMovie = null;
  }
}

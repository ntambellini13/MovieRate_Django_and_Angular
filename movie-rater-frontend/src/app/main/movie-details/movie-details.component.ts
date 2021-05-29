import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Movie } from '../../models/movie';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent implements OnInit {

  @Input() movie: Movie;
  @Output() updateMovie = new EventEmitter();
  rateHovered = 0;

  constructor(
    private apiService: ApiService
  ) { }

  ngOnInit() {
  }
  rateHover(rating: number) {
    this.rateHovered = rating;
  }

  rateClicked(rating: number){
    this.apiService.rateMovie(rating, this.movie.id).subscribe(
      result => this.getDetails()
    );
  }

  getDetails(){
    this.apiService.getMovie(this.movie.id).subscribe(
      (movie: Movie) => {
        this.updateMovie.emit(movie);
      });
  }
}

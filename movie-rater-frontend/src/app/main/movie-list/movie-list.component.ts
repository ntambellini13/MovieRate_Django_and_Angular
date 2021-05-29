import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Movie } from 'src/app/models/movie';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit {

  @Input() movies: Movie[] = [];
  @Output() selectMovie = new EventEmitter();

  constructor() { }

  ngOnInit() {}

  movieClicked(movie: Movie) {
    this.selectMovie.emit(movie);
  }

}

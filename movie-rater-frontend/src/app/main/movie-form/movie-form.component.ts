import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Movie } from '../../models/movie';
import { FormGroup, FormControl } from '@angular/forms';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-movie-form',
  templateUrl: './movie-form.component.html',
  styleUrls: ['./movie-form.component.css']
})
export class MovieFormComponent implements OnInit {

  movieForm;
  id = null;


  @Input() set movie(value: Movie) {
    this.id = value.id;
    this.movieForm = new FormGroup({
      title: new FormControl(value.title),
      description: new FormControl(value.description)
    });
  };

  @Output() movieCreated = new EventEmitter<Movie>();
  @Output() movieUpdated = new EventEmitter<Movie>();

  constructor(
    private apiService: ApiService
  ) { }

  ngOnInit() {
  }

  formDisabled() {
    if (this.movieForm.value.title.length &&
      this.movieForm.value.description.length) {
        return false
      } else {
        return true;
      }
  }

  saveForm() {
    console.log(this.movieForm.value);
    if (this.id) {
      this.apiService.updateMovie(
        this.id, this.movieForm.value.title, this.movieForm.value.description).subscribe(
          (result: Movie) => this.movieUpdated.emit(result)
        );
    } else {
      this.apiService.createMovie(
        this.movieForm.value.title, this.movieForm.value.description).subscribe(
          (result: Movie) => this.movieCreated.emit(result)
        );
    }
  }
}

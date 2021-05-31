import { Component, OnInit, Input } from '@angular/core';
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

  @Input() set movie(value: Movie) {
    this.movieForm = new FormGroup({
      title: new FormControl(value.title),
      description: new FormControl(value.description)
    });
  };

  constructor(
    private apiService: ApiService
  ) { }

  ngOnInit() {
  }

  saveForm() {
    console.log(this.movieForm.value);
    this.apiService.createMovie(
      this.movieForm.value.title, this.movieForm.value.description).subscribe(
        result => console.log(result),
        error => console.log(error)
      );
    }
}

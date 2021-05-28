import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent implements OnInit {

  @Input() movie;
  rateHovered = 0;

  constructor(
    private apiService: ApiService
  ) { }

  ngOnInit() {
  }
  rateHover(rating) {
    this.rateHovered = rating;
  }
  rateClicked(rating){
    this.apiService.rateMovie(rating, this.movie.id).subscribe(
      result => {
        console.log(result);
      },
      error => console.log(error)
    );
  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieServiceService } from '../services/movie-service.service';
import { MovieModel } from '../movie.model';

@Component({
  selector: 'app-movie-page',
  templateUrl: './movie-page.component.html',
  styleUrls: ['./movie-page.component.css']
})
export class MoviePageComponent implements OnInit {
  movie: MovieModel;
  moviePoster = '';
  thenTemplate: any;
  constructor(
    private route: ActivatedRoute,
    private movieSearch: MovieServiceService
  ) {
    this.route.paramMap.subscribe(params => this.showMovie(params.get('id')));
  }

  ngOnInit() {
    this.movie = undefined;
  }

  showMovie(movieId: any) {
    this.movieSearch
      .getMovieInfo(movieId)
      .subscribe(
        (response: MovieModel) => this.handleMovieResponse(response),
        error => console.log(error)
      );
  }

  handleMovieResponse(response: MovieModel) {
    this.movie = response;
    this.moviePoster = this.movie.poster;
    console.log(this.moviePoster);
  }

  favoriteMovie(movie: MovieModel): void {
    this.movieSearch.favoriteMovie(movie).subscribe(
      response => {
        movie.favorite = true;
      },
      error => {
        console.error();
      }
    );
  }
  unfavoriteMovie(movie: MovieModel): void {
    this.movieSearch.unfavoriteMovie(movie).subscribe(
      response => {
        movie.favorite = false;
      },
      error => {
        console.log(error);
      }
    );
  }
}

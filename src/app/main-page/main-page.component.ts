import { Component, OnInit} from '@angular/core';
import { MovieServiceService } from '../services/movie-service.service';
import { MovieModel } from '../movie.model';
import {PageEvent} from '@angular/material/paginator';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  movieTitle = '';
  movieList: MovieModel[];
  movieCount: number;
  currentPage = 1;
  pages: number;
  page: PageEvent;
  movieToShow: Observable<MovieModel>;
  noMovieToShow = false;
  lastSearch = '' ;

  constructor(private movieSearch: MovieServiceService,
              private route: ActivatedRoute,
              private router: Router) {
    this.movieList = [];
   }

  ngOnInit() { }

  searchFilter(movie: MovieModel, index, array) {
    if (movie.title.toLowerCase().includes(this.movieTitle.toLowerCase())) {
      return movie;
    }
  }

  search(movieTitle: string): void {
    if (movieTitle !== this.lastSearch ) {
      this.lastSearch = movieTitle;
      this.movieSearch.getFromMovies(this.movieTitle).subscribe(
        (response: MovieModel[]) => this.handleMovieResponse(response),
        error => console.log(error));
      this.movieSearch.getMoviesCount(this.movieTitle).subscribe(
          (response: number) => this.handleMovieCountResponse(response),
          error => console.log(error));
      } else {
        this.movieSearch.getNextPage(this.movieTitle, this.currentPage).subscribe(
          (response: MovieModel[]) => this.handleMovieResponse(response),
        error => console.log(error));
      }
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
      console.log("unfavorited");
  }
  handleMovieResponse(response: MovieModel[]) {
    if (response.length > 1) {
    this.movieList = response;
    this.noMovieToShow = true;
  } else {
    this.movieList = [];
    this.noMovieToShow = false;
  }
  }

  goToMovie(movieId: string) {
    this.router.navigate(['/movie/' + movieId]);
  }

  onPageEvent(e) {
    window.scroll(0, 0);
    if (this.lastSearch !== '') {
    this.currentPage = e.pageIndex + 1;
    this.search(this.movieTitle);
  } else {
    this.noMovieToShow = false;
  }
    }

  handleMovieCountResponse(response: number) {
    this.movieCount = response;
    if (this.movieCount > 10) {
        this.pages = Math.floor(this.movieCount / 10);
    }
    console.log(this.movieCount, this.pages);
  }
}



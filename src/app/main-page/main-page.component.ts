import { Component, OnInit} from '@angular/core';
import { MovieServiceService } from '../services/movie-service.service';
import { MovieModel } from '../movie.model';
import {PageEvent} from '@angular/material/paginator';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
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
  moveisToShow = false;
  searchDone = false;
  lastSearch = '' ;

  constructor(private movieSearch: MovieServiceService,
              private _snack: MatSnackBar,
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
      this.searchDone = true;
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
    this.openSnackBar(movie.title + ' was favorited!', 'Undo Favorited', movie);

  }
  openSnackBar(movieTitle: string, undo: string, movie: MovieModel){
    let undoClicked =  this._snack.open(movieTitle, undo, {duration: 1500});
    if(undo.includes('Favorited')){
      undoClicked.onAction().subscribe(() => this.unfavoriteMovie(movie));
    } else {
    undoClicked.onAction().subscribe(() => this.favoriteMovie(movie));
  }
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
    this.openSnackBar(movie.title + ' was unfavorited!', 'Undo Unfav', movie);
  }
  handleMovieResponse(response: MovieModel[]) {
    if (response.length > 1) {
    this.movieList = response;
    this.moveisToShow = true;
  } else {
    this.movieList = [];
    this.moveisToShow = false;
    this.searchDone = true;
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
    this.moveisToShow = false;
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



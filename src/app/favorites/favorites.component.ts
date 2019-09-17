import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { MovieServiceService } from "../services/movie-service.service";
import { MovieModel } from "../movie.model";
import { PageEvent } from "@angular/material/paginator";
import { Observable } from "rxjs";

@Component({
  selector: "app-favorites",
  templateUrl: "./favorites.component.html",
  styleUrls: ["./favorites.component.css"]
})
export class FavoritesComponent implements OnInit {
  movieTitle = "";
  movieList: MovieModel[];
  movieCount: number;
  currentPage = 1;
  pages: number;
  page: PageEvent;
  movieToShow: Observable<MovieModel>;
  noMovieToShow = false;

  constructor(
    private movieSearch: MovieServiceService,
    private router: Router
  ) {
    this.movieList = [];
  }

  ngOnInit() {
    this.getAllFavorites();
  }
  getAllFavorites() {
    if (this.currentPage === 1) {

      this.movieSearch
        .getAllFavorites()
        .subscribe(
          (response: MovieModel[]) => this.handleMovieResponse(response),
          error => console.log(error)
        );
      this.movieSearch
        .getMoviesCount(this.movieTitle)
        .subscribe(
          (response: number) => this.handleMovieCountResponse(response),
          error => console.log(error)
        );
    } else {
      this.movieSearch
        .getNextPage(this.movieTitle, this.currentPage)
        .subscribe(
          (response: MovieModel[]) => this.handleMovieResponse(response),
          error => console.log(error)
        );
    }
  }
  handleMovieResponse(response: MovieModel[]) {
    if (response.length >= 1) {
      this.movieList = response;
      this.noMovieToShow = true;
    }else{

      this.noMovieToShow = false;
    }
  }

  goToMovie(movieId: string) {
    this.router.navigate(["/movie/" + movieId]);
  }

  onPageEvent(e) {
    window.scroll(0, 0);
    this.currentPage = e.pageIndex + 1;
    this.getAllFavorites();
  }

  handleMovieCountResponse(response: number) {
    this.movieCount = response;
    if (this.movieCount > 10) {
      this.pages = Math.floor(this.movieCount / 10);
    }
    console.log(this.movieCount, this.pages);
  }
  unfavoriteMovie(movie: MovieModel): void {
    this.movieSearch.unfavoriteMovie(movie).subscribe(
      response => {
        this.getAllFavorites();
      },
      error => {
        console.log(error);
      }
    );
  }
}

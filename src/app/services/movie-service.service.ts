import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs';
import { MovieModel } from '../movie.model';

@Injectable({
  providedIn: 'root'
})
export class MovieServiceService {
  private listener = new Subject<any>();

  constructor(private http: HttpClient) {}
  listen(): Observable<any> {
    return this.listener.asObservable();
  }

  filter(filterBy: string) {
    this.listener.next(filterBy);
  }
  getFromMovies(movieTitle: string) {
    return this.http.get('https://aldant-moviewatcher.herokuapp.com/api/movies', { params: { s: movieTitle } });
  }
  getNextPage(movieTitle: string, page: number) {
    return this.http.get('https://aldant-moviewatcher.herokuapp.com/api/movies', {
      params: { s: movieTitle, page: page.toString() }
    });
  }
  getMoviesCount(movieTitle: string) {
    return this.http.get('https://aldant-moviewatcher.herokuapp.com/api/movies/count', { params: { s: movieTitle } });
  }
  getMovieInfo(movieId: string) {
    return this.http.get('https://aldant-moviewatcher.herokuapp.com/api/movie/' + movieId);
  }
  getAllFavorites(): Observable<any> {
    return this.http.get('https://aldant-moviewatcher.herokuapp.com/api/favorites');
  }
  favoriteMovie(movieTemp: MovieModel): Observable<any> {
    return this.http
      .put('https://aldant-moviewatcher.herokuapp.com/api/movie/' + movieTemp.id, {
        id: movieTemp.id,
        year: movieTemp.year,
        favorite: true
      });
  }
  unfavoriteMovie(movieTemp: MovieModel): Observable<any> {
    return this.http.put('https://aldant-moviewatcher.herokuapp.com/api/movie/' + movieTemp.id + '/unfavorite', {
      id: movieTemp.id,
      favorite: false
    });
  }
}

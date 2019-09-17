import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'watcher-frontend';
  public movieTitle = '';
  searchMovies(movtitle: string) {
    this.movieTitle = movtitle;
  }
}

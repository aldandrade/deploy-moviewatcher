import { Component, OnInit, Input, AfterViewInit, ViewChild } from '@angular/core';
import { MovieModel } from '../movie.model';
import { MovieServiceService } from '../services/movie-service.service';
import { MainPageComponent } from '../main-page/main-page.component';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.css']
})
export class MovieCardComponent implements OnInit, AfterViewInit {
  @ViewChild(MainPageComponent, {read: '', static: false}) mainChild: MainPageComponent;
  movieTitle = '';

  constructor() {

   }

  ngOnInit() {
  }
  ngAfterViewInit(): void {
  }

}

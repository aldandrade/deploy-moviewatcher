import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { MainPageComponent } from './main-page/main-page.component';
import { MovieServiceService } from './services/movie-service.service';
import { FormsModule } from '@angular/forms';
import { MovieGridComponent } from './movie-grid/movie-grid.component';
import { MovieCardComponent } from './movieGrid/movie-card.component';
import { HttpClientModule } from '@angular/common/http';
import { ErrorPageComponentComponent } from './error-page-component/error-page-component.component';
import { AboutPageComponentComponent } from './about-page-component/about-page-component.component';
import { MoviePageComponent } from './movie-page/movie-page.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { NavbarComponent } from './navbar/navbar.component';
import { TruncatePipe } from './truncate.pipe';

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    MovieGridComponent,
    MovieCardComponent,
    ErrorPageComponentComponent,
    AboutPageComponentComponent,
    MoviePageComponent,
    FavoritesComponent,
    NavbarComponent,
    TruncatePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    HttpClientModule,
    FlexLayoutModule
  ],
  providers: [MovieServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }

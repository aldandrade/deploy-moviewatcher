import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainPageComponent } from './main-page/main-page.component';
import { ErrorPageComponentComponent } from './error-page-component/error-page-component.component';
import { AboutPageComponentComponent } from './about-page-component/about-page-component.component';
import { MoviePageComponent } from './movie-page/movie-page.component';
import { FavoritesComponent } from './favorites/favorites.component';


const routes: Routes = [
  {path: '', redirectTo: 'search', pathMatch: 'full'},
  {path: 'search', component: MainPageComponent},
  {path: 'about', component: AboutPageComponentComponent},
  {path: 'favorites', component: FavoritesComponent},
  {path: 'movie/:id', component: MoviePageComponent},
  {path: '**', component: ErrorPageComponentComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

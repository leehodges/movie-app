import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthComponent } from "./auth/auth.component";
import { MovieFeedComponent } from "./movie-feed/movie-feed.component";
import { MovieDetailComponent } from "./movies/movie-detail/movie-detail.component";
import { MovieEditComponent } from "./movies/movie-edit/movie-edit.component";
import { MovieListComponent } from "./movies/movie-list/movie-list.component";
import { MovieStartComponent } from "./movies/movie-start/movie-start.component";
import { MoviesComponent } from "./movies/movies.component";

const appRoutes: Routes = [

  { path: '', redirectTo: '/movies', pathMatch: 'full' },
  { path: 'movies', component: MoviesComponent, children: [
    { path: '', component: MovieStartComponent },
    { path: 'new', component: MovieEditComponent },
    { path: 'movie-feed', component: MovieFeedComponent },
    { path: ':id', component: MovieDetailComponent },
    { path: ':id/edit', component: MovieEditComponent }

  ] },
  { path: 'auth', component: AuthComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}

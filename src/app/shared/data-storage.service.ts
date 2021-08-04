import { EventEmitter, Injectable, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators'

import { MovieService } from '../movies/movie.service';
import { Movie } from '../movies/movie.model';
import { LocalStorageService } from './local-storage.service';

@Injectable({providedIn: 'root'})
export class DataStorageService {
  constructor(private http: HttpClient, private storage: LocalStorageService, private movieService: MovieService) {}

    storeMovies() {
      const movies = this.movieService.getMovies();
      return this.http.put('https://movie-database-tool-default-rtdb.firebaseio.com/movies.json',
      movies)
      .subscribe(response =>
      {
        console.log(response);
      });
    }

    fetchMovies() {
      this.http.get<Movie[]>('https://movie-database-tool-default-rtdb.firebaseio.com/movies.json')
        .subscribe(movies => {
          this.storage.setItem('movies', movies)
          this.movieService.setMovies(movies)
          console.log(movies);
        });
    }s

    fetchMoviesAndReturn() {
      return this.http.get<Movie[]>('https://movie-database-tool-default-rtdb.firebaseio.com/movies.json')
        .subscribe(movies => {
          debugger
          this.movieService.setMovies(movies)
          console.log(movies);
          return movies
        });
    }
   // .pipe(
      //   map(responseData => {
      //   const moviesArray: Movie[] = [];
      //   for (const key in responseData) {
      //     if (responseData.hasOwnProperty(key)) {
      //       moviesArray.push({ ...responseData[key], id: key })
      //     }
      //   }
      //   return moviesArray;
      // })
      // )
}

import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { LocalStorageService } from '../shared/local-storage.service';

import { Movie } from './movie.model';

@Injectable({providedIn: 'root'})
export class MovieService {
  moviesChanged = new Subject<Movie[]>()

  // private movies: Movie[] = [
  //   new Movie(
  //      'Attack of the Killer Tomatoes',
  //     'Aaargh!...',
  //     'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrvQEBxBu-xAvpeHP6Srio3VI2iXj26vLC5BnM8qGETOezQ4ergsY60jlpWpn56XI8sTQ&usqp=CAU',
  //     '1989'),
  //   new Movie(
  //     'Arcade',
  //     'The game wants to play with you.',
  //     'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6nUdtA3UVAPClm30Jz2TPzNVrijb6wrpiF0ciY5NJ3QEqbwmPcwRma0_xzBTpxIzBOiY&usqp=CAU',
  //     '1989'),
  //   new Movie(
  //     'The Giant Gila Monster',
  //     'Pretty Straight Forward',
  //     'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwLsLW26rNqWteyo7fIdRfB7-IuGvzXbLnF1zkQ5S1IcDoDrB2HWgyHedrah7vYHqWsQ8&usqp=CAU',
  //     '1989' )
  // ];
  private movies: Movie[] = [];

  constructor(private storage: LocalStorageService) {}

  setMovies(movies: Movie[]) {
    this.movies = movies
    console.table(movies)
    // this.moviesChanged.next(this.movies.slice());
  }

  getMovies() {
    debugger
    let movies
    if (this.movies && this.movies.length) {
      movies = this.movies.slice()
    } else {
      const storedMovies = this.storage.getItem('movies')
      movies = storedMovies
    }
    return movies
  }

  getMovie(index: number) {
    return this.movies[index];
  }

  // addMoviesToSeenList(facts: Facts) {
  //   this.slService.addFact(facts);
  // }

  deleteMovie(index: number) {
    this.movies.splice(index, 1);
    this.moviesChanged.next(this.movies.slice());
  }

  // First you need to make the api call, so you can update the Subject
  updateMovie(index: number, newMovie: Movie) {
    let movies
    if (this.movies && this.movies.length) {
      movies = this.movies.slice()
    } else {
      const storedMovies = this.storage.getItem('movies')
      movies = storedMovies
    }
    movies[index] = newMovie;
    this.storage.setItem('movies', movies)
    this.moviesChanged.next(movies.slice());
  }

  // First you need to make the api call, so you can update the Subject
  addMovie(movie: Movie) {
    debugger
    let movies
    if (this.movies && this.movies.length) {
      movies = this.movies.slice()
    } else {
      const storedMovies = this.storage.getItem('movies')
      movies = storedMovies
    }
    movies.push(movie);
    this.storage.setItem('movies', movies)
    this.moviesChanged.next(movies.slice());
  }

  rateMovie(movie: Movie) {}
}

// The if statements above are checking to see if there is a movies array and if it has content. It checks that
// and sets the movies variable to the copy of the array.
// If there were to be nothing in the initial check it would pull the movies from the local storage.

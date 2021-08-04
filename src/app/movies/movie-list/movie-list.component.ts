import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DataStorageService } from 'src/app/shared/data-storage.service';

import { Movie } from '../movie.model';
import { MovieService } from '../movie.service';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit {
  movies: Movie[] = [];
  subscription: Subscription;

  constructor(private movieService: MovieService,
              private dataStore: DataStorageService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.dataStore.fetchMovies()
    this.movies = this.movieService.getMovies();
    this.subToMovieChanged()
  }

  subToMovieChanged() {
    this.movieService.moviesChanged.subscribe(data => {
      if (data && data.length) {
        this.movies = data
      }
    })
  }

  onNewMovie() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }

  onMovieFeed() {
    this.router.navigate(['movie-feed'], {relativeTo: this.route});
  }

  ngOnDestroy() {
    // this.subscription.unsubscribe();
  }
}

// Adding movies requires the subscription to movies changed

import { Component, OnInit } from '@angular/core';
import { DataStorageService } from './shared/data-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(
    private dataService: DataStorageService
  ) {

  }

  ngOnInit() {
    // this is fetching the movies as soon as the whole app loads, before anything else
    this.dataService.fetchMovies()
  }

}

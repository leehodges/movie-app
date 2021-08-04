import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';


import { MovieService } from '../movie.service';
import { Movie } from '../movie.model';

@Component({
  selector: 'app-movie-edit',
  templateUrl: './movie-edit.component.html',
  styleUrls: ['./movie-edit.component.css']
})
export class MovieEditComponent implements OnInit {
id: number;
public editMode = false;
movieForm: FormGroup;
currentRate = 8;

  get movieControls() {
    return (this.movieForm.get('movie') as FormArray).controls
  }


  constructor(private route: ActivatedRoute,
              private movieService: MovieService,
              private router : Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.editMode = params['id'] != null;
        this.initForm();
      }
    )
  }

  onSubmit() {
    console.table(this.movieForm);
    if (this.editMode) {
      this.movieService.updateMovie(this.id, this.movieForm.value);
    } else {
        // const newMovie = new Movie(
        //   this.movieForm.value['name'],
        //   this.movieForm.value['description'],
        //   this.movieForm.value['imagePath'],
        //   this.movieForm.value['date'],
        // )

      this.movieService.addMovie(this.movieForm.value);
    }
    this.onCancel();
  }

  onCancel() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  private initForm() {
    let movieName = '';
    let movieImagePath = '';
    let movieDescription = '';
    let movieDate: '';

    if (this.editMode) {
          const movie = this.movieService.getMovie(this.id);
          movieName = movie.name;
          movieImagePath = movie.imagePath;
          movieDescription = movie.description;
          // movieDate = movie.date;

    }

        this.movieForm = new FormGroup({
    'name': new FormControl(movieName, Validators.required),
    'imagePath': new FormControl(movieImagePath, Validators.required),
    'description': new FormControl(movieDescription, Validators.required),
    'date': new FormControl(movieDate, Validators.required)
        });
      }
}

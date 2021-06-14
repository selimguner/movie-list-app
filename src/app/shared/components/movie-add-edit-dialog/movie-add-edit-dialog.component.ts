import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Movie } from '@core/models/movie';
import { MovieService } from '@core/services/movie.service';
import { SnackBarService } from '@shared/services/snackbar.service';

@Component({
  selector: 'app-movie-add-edit-dialog',
  templateUrl: './movie-add-edit-dialog.component.html',
  styleUrls: ['./movie-add-edit-dialog.component.scss']
})
export class MovieAddEditDialogComponent {
  movieForm: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<MovieAddEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData: any,
    private formBuilder: FormBuilder,
    private movieService: MovieService,
    private snackBar: SnackBarService) {
    this.movieForm = this.formBuilder.group({
      title: [{ value: this.dialogData.movie.Title, disabled: true }],
      poster: [{ value: this.dialogData.movie.Poster, disabled: true }],
      rating: [this.dialogData.movie.Rating, [Validators.pattern("^[0-9]*$"), Validators.min(0), Validators.max(10), Validators.required]],
    });
  }

  addMyList() {
    if (this.movieForm.valid) {
      let movie: Movie = {
        Title: this.movieForm.controls['title'].value,
        Poster: this.movieForm.controls['poster'].value,
        Rating: +this.movieForm.controls['rating'].value
      }
      this.movieService.addMovie(movie).subscribe((res) => {
        if (res) this.dialogRef.close('success');
        this.snackBar.open(movie.Title + ' Filmi Eklenmiştir', 'success');
      })
    } else {
      this.snackBar.open('Lütfen sadece 0-10 arasında puan veriniz.', 'warning');
    }
  }

  updateMovieRating(id: number) {
    if (this.movieForm.valid) {
      let movie: Movie = {
        Title: this.movieForm.controls['title'].value,
        Poster: this.movieForm.controls['poster'].value,
        Rating: +this.movieForm.controls['rating'].value
      }
      this.movieService.updateMovieRating(id, movie).subscribe((res) => {
        if (res) this.dialogRef.close('success');
        this.snackBar.open(movie.Title + ' Filmi Güncellenmiştir', 'success');
      })
    } else {
      this.snackBar.open('Lütfen sadece 0-10 arasında puan veriniz.', 'warning');
    }
  }

}

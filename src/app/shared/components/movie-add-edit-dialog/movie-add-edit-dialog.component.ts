import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MovieService } from 'src/app/data/services/movie.service';

interface Movie {
  Title: string,
  Poster: string,
  Year: string
}

@Component({
  selector: 'app-movie-add-edit-dialog',
  templateUrl: './movie-add-edit-dialog.component.html',
  styleUrls: ['./movie-add-edit-dialog.component.scss']
})
export class MovieAddEditDialogComponent {
  movieForm: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<MovieAddEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public movie: Movie,
    private formBuilder: FormBuilder,
    private movieService: MovieService) {

    this.movieForm = this.formBuilder.group({
      title: [{ value: this.movie.Title, disabled: true }],
      poster: [{ value: this.movie.Poster, disabled: true }],
      rating: ['', [Validators.pattern("^[0-9]*$"), Validators.min(1), Validators.max(10), Validators.required]],
    });

  }

  addMyList() {
    if (this.movieForm.valid) {
      let movie = {
        Title: this.movieForm.controls['title'].value,
        Poster: this.movieForm.controls['poster'].value,
        Rating: this.movieForm.controls['rating'].value
      }
      this.movieService.addMovie(movie).subscribe((res) => {
        if (res) this.dialogRef.close('success');
        alert('Kaydedildi')
      })
    } else {
      alert('Lütfen sadece 1-10 arasında puan veriniz.')
    }
  }

}

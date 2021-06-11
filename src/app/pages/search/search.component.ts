import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MovieService } from 'src/app/data/services/movie.service';
import { MovieAddEditDialogComponent } from 'src/app/shared/components';
import { debounceTime } from "rxjs/operators";

interface Movie {
  Title: string,
  Poster: string,
  Year: string
}

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})

export class SearchComponent implements OnInit {
  overlay = false;
  searchControl: FormControl = new FormControl();
  results: Movie[] = [];

  constructor(public dialog: MatDialog, private movieService: MovieService) { }

  ngOnInit(): void {
    this.searchControl
      .valueChanges
      .pipe(debounceTime(1000))
      .subscribe((keyword: string) => this.searchMovie(keyword));
  }

  searchMovie(keyword: string) {
    if (keyword.length > 2) {
      this.movieService
        .searchMoviesByTitles(keyword)
        .subscribe((res: any) => this.results = res.Response == 'True' ? res.Search : []);
    } else {
      this.results = [];
    }
  }

  openDialog(movie: Movie): void {
    const dialogRef = this.dialog.open(MovieAddEditDialogComponent, {
      width: '550px',
      disableClose: true,
      data: movie
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == 'success') {
        this.results = [];
        this.searchControl.setValue('');
        this.overlay = false;
      }
    });
  }

}

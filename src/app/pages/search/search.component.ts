import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MovieService } from '@core/services/movie.service';
import { MovieAddEditDialogComponent } from '@shared/components';
import { debounceTime } from "rxjs/operators";
import { Movie } from '@core/models/movie';



@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})

export class SearchComponent implements OnInit {
  overlay = false;
  searchControl: FormControl = new FormControl();
  results: Movie[] = [];
  noResult: boolean = false;
  loading: boolean = false;

  constructor(public dialog: MatDialog,
    private movieService: MovieService) { }

  ngOnInit(): void {
    this.searchControl.valueChanges
      .pipe(debounceTime(1000))
      .subscribe((keyword: string) => this.searchMovie(keyword));
  }

  searchMovie(keyword: string) {

    this.results = [];
    this.noResult = false;
    this.loading = true;

    if (keyword.length > 2) {
      this.movieService
        .searchMoviesByTitles(keyword)
        .subscribe((res: any) => {
          this.loading = false;
          if (res.Response == 'True') {
            this.results = res.Search;
          } else {
            this.noResult = true;
          }

        });
    } else {
      this.results = [];
    }
  }

  openDialog(movie: Movie): void {
    const dialogRef = this.dialog
      .open(MovieAddEditDialogComponent, {
        width: '550px',
        disableClose: true,
        data: { isEdit: false, movie: movie }
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

import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MovieService } from 'src/app/data/services/movie.service';
import { MovieAddEditDialogComponent } from 'src/app/shared/components';

interface Movie {
  Title: string,
  Poster: string,
  Rating: string
}


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  movies: any;
  constructor(
    private movieService: MovieService,
    private dialog: MatDialog) { }

  ngOnInit(): void {
    this.getMyList()
  }

  getMyList() {
    this.movieService
      .getMyList()
      .subscribe((res) => this.movies = res);
  }

  openEditDialog(movie: Movie) {
    const dialogRef = this.dialog.open(MovieAddEditDialogComponent, {
      width: '550px',
      disableClose: true,
      data: movie
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == 'success') {

      }
    });
  }

  deleteMovie(movie: Movie) {

  }

}

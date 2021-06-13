import { Component, HostListener, OnInit } from '@angular/core';
import { debounceTime, first } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DialogService } from '@shared/services/dialog.service';
import { SnackBarService } from '@shared/services/snackbar.service';
import { MovieService } from '@core/services/movie.service';
import { Movie } from '@core/models/movie';
import { MovieAddEditDialogComponent } from '@shared/components';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {
  skeleton = true;
  movies: Movie[] = [];
  order: string = 'desc';
  totalCount!: number;
  pageIndex: number = 1;
  searchValue: string = '';
  searchControl: FormControl = new FormControl();

  constructor(
    private movieService: MovieService,
    private dialog: MatDialog,
    private snackBar: SnackBarService,
    private dialogService: DialogService) { }

  ngOnInit(): void {

    setTimeout(() => { // sadece skeleton'u göstermek için
      this.getList(this.searchValue, this.pageIndex, 10, '', false);
    }, 2000);

    this.searchControl.valueChanges
      .pipe(debounceTime(1000))
      .subscribe((keyword: string) => {
        this.searchValue = keyword;
        this.getList(this.searchValue, 1, 10, this.order, true);
      });
  }

  getList(keyword: string, page: number, limit: number, order: string, clear: boolean) {
    this.skeleton = clear;
    this.movieService
      .getMovieList(keyword, page, limit, order)
      .pipe(first())
      .subscribe((res: any) => {
        this.totalCount = res.totalCount;
        if (clear) {
          this.movies = res.result;
          this.pageIndex = 1;
        } else {
          this.movies.push(...res.result);
        }
        this.skeleton = false;
      });
  }

  openEditDialog(movie: Movie) {
    const dialogRef = this.dialog.open(MovieAddEditDialogComponent, {
      width: '550px',
      disableClose: true,
      data: { isEdit: true, movie: movie }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == 'success') {
        this.getList(this.searchValue, 1, this.movies.length, this.order, true);
      }
    });
  }

  deleteMovie(movie: any) {
    this.dialogService.deleteDialog().afterClosed().subscribe(res => {
      if (res) {
        this.movieService.removeMovie(movie.id).subscribe((res) => {
          this.getList(this.searchValue, 1, this.movies.length, this.order, true);
          this.snackBar.open(movie.Title + ' Filmi Silinmiştir', 'success');
        });
      }
    });
  }

  sort() {
    this.order = this.order == 'asc' ? 'desc' : 'asc';
    this.pageIndex = 1;
    this.getList(this.searchValue, this.pageIndex, this.movies.length, this.order, true);
  }

  getMore() {
    if (this.totalCount == this.movies.length) return;
    this.pageIndex++;
    this.getList(this.searchValue, this.pageIndex, 10, this.order, false);
  }

  @HostListener('window:scroll', ['$event'])
  onScrollEvent($event: any) {
    if ((document.body.clientHeight + window.scrollY) == document.body.scrollHeight) {
      this.getMore()
    }
  }

}

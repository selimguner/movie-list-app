import { Component, HostListener, OnInit } from '@angular/core';
import { debounceTime, first, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

import { Movie } from '@core/models/movie';

import { MovieAddEditDialogComponent } from '@shared/components';

import { ThemeService } from '@core/services/theme.service';
import { DialogService } from '@shared/services/dialog.service';
import { SnackBarService } from '@shared/services/snackbar.service';
import { MovieService } from '@core/services/movie.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {
  skeleton = true;
  movies: Movie[] = [];
  order: string = '';
  totalCount!: number;
  pageIndex: number = 1;
  searchValue: string = '';
  searchControl: FormControl = new FormControl();
  private unsubscribe$ = new Subject<void>();

  constructor(
    private movieService: MovieService,
    private dialog: MatDialog,
    private snackBar: SnackBarService,
    private dialogService: DialogService,
    private themeService: ThemeService) { }

  ngOnInit(): void {

    setTimeout(() => { // sadece skeleton'u göstermek için
      this.getList(this.searchValue, this.pageIndex, 10, '', true);
    }, 2000);

    this.searchControl.valueChanges
      .pipe(debounceTime(800))
      .subscribe((keyword: string) => {
        this.searchValue = keyword;
        this.getList(this.searchValue, 1, 10, this.order, true);
      });
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  getList(keyword: string, page: number, limit: number, order: string, clear: boolean) {
    this.skeleton = clear;
    this.movieService
      .getMovieList(keyword, page, limit, order)
      .pipe(first())
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((res: any) => {
        this.totalCount = res.totalCount;
        if (clear) {
          this.movies = res.result;
          this.pageIndex = 1;
        } else {
          this.movies.push(...res.result);
        }
        this.changeBg(res.result.length > 0 ? res.result[0].Poster : '');
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
          this.getList(this.searchValue, 1, this.movies.length, '', true);
          this.snackBar.open(movie.Title + ' Filmi Silinmiştir', 'success');
        });
      }
    });
  }

  sort() {
    this.order = this.order == 'asc' ? 'desc' : 'asc';
    this.getList(this.searchValue, 1, this.movies.length, this.order, true);
  }

  getMore() {
    if (this.totalCount == this.movies.length) return;
    this.pageIndex++;
    this.getList(this.searchValue, this.pageIndex, 10, this.order, false);
  }

  @HostListener('window:scroll', ['$event'])
  onScrollEvent(e: any) {
    if ((document.body.clientHeight + window.scrollY) == document.body.scrollHeight) {
      this.getMore()
    }
  }

  changeBg(poster: string) {
    this.themeService.changeBackground(poster.replace('SX300', 'SX2000'));
  }

}

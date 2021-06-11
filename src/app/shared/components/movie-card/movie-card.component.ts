import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

interface Movie {
  title: string,
  poster: string,
  rating: string
}

@Component({
  selector: 'movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent {
  @Input() movie: any;
  @Output() edit = new EventEmitter();
  @Output() delete = new EventEmitter();

  openEditDialog(movie: Movie) {
    this.edit.emit(movie);
  }

  deleteMovieFromList(movie: Movie) {
    this.delete.emit(movie);
  }

}

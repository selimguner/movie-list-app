import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

interface Movie {
  Title: string,
  Poster: string,
  Rating: string
}


@Injectable({
  providedIn: 'root'
})
export class MovieService {

  private readonly API_URL = environment.api_root_url;
  private readonly API_KEY = environment.api_key;
  private readonly JSON_SERVER_URL = environment.json_server_url;

  constructor(private http: HttpClient) { }

  searchMoviesByTitles(keyword: string) {
    let params = new HttpParams().set('s', keyword).set('apikey', this.API_KEY).set('plot', 'full');
    return this.http.get(this.API_URL, { params })
  }

  getMyList() {
    return this.http.get<Movie[]>(this.JSON_SERVER_URL + '/movies');
  }

  addMovie(movie: Movie) {
    return this.http.post<Movie[]>(this.JSON_SERVER_URL + '/movies', movie).pipe(
      map((data => {
        return data;
      }), catchError(error => {
        return throwError('Something went wrong!');
      })
      ));
  }
}

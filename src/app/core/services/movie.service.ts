import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Movie } from '@core/models/movie';
import { environment } from '@env';

@Injectable({
  providedIn: 'root'
})

export class MovieService {
  private readonly API_URL = environment.api_root_url;
  private readonly API_KEY = environment.api_key;
  private readonly JSON_SERVER_URL = environment.json_server_url;

  constructor(private http: HttpClient) { }

  searchMoviesByTitles(keyword: string) {
    let params = new HttpParams()
      .set('s', keyword)
      .set('apikey', this.API_KEY);
    return this.http.get(this.API_URL, { params });
  }

  getMovieList(title: string, page: number, limit: number = 10, sort: string = '') {
    let params = new HttpParams()
      .set('q', title)
      .set('_page', page)
      .set('_limit', limit)
    if (sort != '') {
      params = params.set('_sort', 'Rating,id').set('_order', sort + ',desc')
    } else {
      params = params.set('_sort', 'id').set('_order', 'desc')
    }

    let list = this.http.get<Movie[]>(this.JSON_SERVER_URL + '/movies', { params, observe: 'response' })
      .pipe(map(res => {
        let data = { "totalCount": res.headers.get('X-Total-Count'), "result": res.body }
        return data;
      }));

    return list;
  }

  addMovie(movie: Movie) {
    return this.http.post<Movie[]>(this.JSON_SERVER_URL + '/movies', movie).pipe(map((data => data)))
  }

  updateMovieRating(id: number, movie: Movie) {
    return this.http.put<Movie[]>(this.JSON_SERVER_URL + '/movies/' + id, movie).pipe(map((data => data)))
  }

  removeMovie(id: number) {
    return this.http.delete(this.JSON_SERVER_URL + '/movies/' + id).pipe(map((data => data)))
  }
}

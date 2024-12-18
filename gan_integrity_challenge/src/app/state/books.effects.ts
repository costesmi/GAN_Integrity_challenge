import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { loadBooks, loadBooksSuccess } from './books.actions';
import { BookApiResponse } from '../models/book-api-response.model';
import { Book } from '../models/book.model';

@Injectable()
export class BooksEffects {
  loadBooks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadBooks),
      switchMap(() =>
        this.http
          .get<BookApiResponse>(
            'https://www.googleapis.com/books/v1/volumes?q=subject:fiction&maxResults=20'
          )
          .pipe(
            map((response) => {
              const books: Book[] = response.items.map((item) => ({
                id: item.id,
                title: item.volumeInfo.title,
                description:
                  item.volumeInfo.description || 'No description available.',
                authors: item.volumeInfo.authors || ['No authors available'],
                imageLinks: item.volumeInfo.imageLinks,
              }));
              return loadBooksSuccess({ books });
            }),
            catchError(() => of(loadBooksSuccess({ books: [] })))
          )
      )
    )
  );

  constructor(private actions$: Actions, private http: HttpClient) {}
}

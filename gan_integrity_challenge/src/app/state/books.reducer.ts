import { createReducer, on } from '@ngrx/store';
import { Book } from '../models/book.model';
import { loadBooksSuccess } from './books.actions';

export interface BooksState {
  books: Book[];
}

export const initialState: BooksState = {
  books: [],
};

export const booksReducer = createReducer(
  initialState,
  on(loadBooksSuccess, (state, { books }) => ({ ...state, books }))
);

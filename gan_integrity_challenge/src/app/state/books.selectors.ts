import { createSelector, createFeatureSelector } from '@ngrx/store';
import { BooksState } from './books.reducer';
import { Book } from '../models/book.model';

export const selectBooksState = createFeatureSelector<BooksState>('books');

export const selectAllBooks = createSelector(
  selectBooksState,
  (state) => state.books
);

export const selectLatestBooks = createSelector(
  selectAllBooks,
  (books: Book[]) => books.slice(0, 3)
);

export const selectFilteredBooks = (searchTerm: string) =>
  createSelector(selectAllBooks, (books) => {
    if (!searchTerm.trim()) {
      return [];
    }
    const filtered = books.filter((book) =>
      book.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    return filtered.length > 0 ? filtered : [];
  });

export const selectBookById = (id: string) =>
  createSelector(selectAllBooks, (books: Book[]) =>
    books.find((book) => book.id === id)
  );

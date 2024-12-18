import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { Book } from '../models/book.model';
import { selectAllBooks } from '../state/books.selectors';
import { loadBooks } from '../state/books.actions';

@Component({
  selector: 'app-books-page',
  templateUrl: './books-page.component.html',
  styleUrls: ['./books-page.component.scss'],
})
export class BooksPageComponent implements OnInit, OnDestroy {
  books$: Observable<Book[]> = this.store.select(selectAllBooks);
  displayedBooks: Book[] = [];
  allBooks: Book[] = [];
  booksPerPage = 10;
  currentPage = 1;
  booksSub!: Subscription;

  constructor(private store: Store) {}

  ngOnInit() {
    this.booksSub = this.books$.subscribe((books) => {
      this.allBooks = books || [];
      this.updateDisplayedBooks();
    });
  }

  ngOnDestroy() {
    if (this.booksSub) {
      this.booksSub.unsubscribe();
    }
  }

  updateDisplayedBooks() {
    const end = this.booksPerPage * this.currentPage;
    this.displayedBooks = this.allBooks.slice(0, end);
  }

  loadMoreBooks() {
    this.currentPage++;
    this.updateDisplayedBooks();
  }

  get hasMoreBooks(): boolean {
    return this.displayedBooks.length < this.allBooks.length;
  }
}

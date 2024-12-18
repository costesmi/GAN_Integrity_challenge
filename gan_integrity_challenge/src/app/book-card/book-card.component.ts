import { Component, Input } from '@angular/core';
import { Book } from '../models/book.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-book-card',
  templateUrl: './book-card.component.html',
  styleUrls: ['./book-card.component.scss'],
})
export class BookCardComponent {
  @Input() book!: Book;

  constructor(private router: Router) {}

  navigateToDetails() {
    this.router.navigate([`/books/${this.book.id}`]);
  }
}

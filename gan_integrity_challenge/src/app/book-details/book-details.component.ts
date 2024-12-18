import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectBookById } from '../state/books.selectors';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss'],
})
export class BookDetailsComponent {
  book$ = this.store.select(selectBookById(this.route.snapshot.params['id']));

  constructor(private route: ActivatedRoute, private store: Store) {}

  ngOnInit() {}
}

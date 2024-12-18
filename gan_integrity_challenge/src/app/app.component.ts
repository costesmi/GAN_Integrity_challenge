import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { loadBooks } from './state/books.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'gan_integrity_challenge';

  constructor(private store: Store) {
    this.store.dispatch(loadBooks());
  }
}

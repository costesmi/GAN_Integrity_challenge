import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import {
  selectFilteredBooks,
  selectLatestBooks,
} from '../state/books.selectors';
import { Observable, Subscription } from 'rxjs';
import { Book } from '../models/book.model';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
})
export class LandingPageComponent implements OnInit, OnDestroy {
  searchControl = new FormControl('');
  latestBooks$: Observable<Book[]> = this.store.select(selectLatestBooks);
  filteredBooks$: Observable<Book[]> | undefined;
  querySub: Subscription | undefined;

  @ViewChild('filteredSection') filteredSection!: ElementRef;

  constructor(
    private store: Store,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.querySub = this.route.queryParams.subscribe((params) => {
      const searchTerm = params['search'] || '';
      this.searchControl.setValue(searchTerm, { emitEvent: false });
      this.updateFilteredBooks(searchTerm);
    });
  }

  ngOnDestroy(): void {
    if (this.querySub) {
      this.querySub.unsubscribe();
    }
  }

  triggerSearch() {
    const searchTerm = this.searchControl.value || '';
    this.router.navigate([], { queryParams: { search: searchTerm } });
    this.updateFilteredBooks(searchTerm);
    this.scrollToFilteredSection();
  }

  updateFilteredBooks(searchTerm: string) {
    this.filteredBooks$ = this.store.select(selectFilteredBooks(searchTerm));
  }

  scrollToFilteredSection() {
    if (this.filteredSection) {
      this.filteredSection.nativeElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  }
}

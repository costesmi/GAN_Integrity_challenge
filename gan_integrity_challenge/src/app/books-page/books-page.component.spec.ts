import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BooksPageComponent } from './books-page.component';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { Book } from '../models/book.model';
import { loadBooks } from '../state/books.actions';
import { selectAllBooks } from '../state/books.selectors';
import { By } from '@angular/platform-browser';
import { BookCardComponent } from '../book-card/book-card.component';

describe('BooksPageComponent', () => {
  let component: BooksPageComponent;
  let fixture: ComponentFixture<BooksPageComponent>;
  let store: Store;

  const mockBooks: Book[] = [
    {
      id: '1',
      title: 'Book 1',
      description: 'Description',
      authors: ['Author 1'],
      imageLinks: {
        thumbnail: '',
        smallThumbnail: '',
        extraLarge: '',
        large: '',
        medium: '',
        small: '',
      },
    },
    {
      id: '2',
      title: 'Book 2',
      description: 'Description',
      authors: ['Author 2'],
      imageLinks: {
        thumbnail: '',
        smallThumbnail: '',
        extraLarge: '',
        large: '',
        medium: '',
        small: '',
      },
    },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BooksPageComponent, BookCardComponent],
      providers: [
        {
          provide: Store,
          useValue: {
            select: jasmine.createSpy('select').and.returnValue(of(mockBooks)), // Mock the store's select method
            dispatch: jasmine.createSpy('dispatch'),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(BooksPageComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(Store);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should subscribe to the store and set books', () => {
    component.ngOnInit();
    expect(component.allBooks.length).toBe(mockBooks.length);
    expect(component.displayedBooks.length).toBe(2);
  });

  it('should load more books on calling loadMoreBooks', () => {
    component.ngOnInit();
    component.loadMoreBooks();
    expect(component.currentPage).toBe(2);
  });

  it('should have more books when not all books are displayed', () => {
    component.allBooks = mockBooks;
    component.updateDisplayedBooks();
    expect(component.hasMoreBooks).toBeFalsy();
  });

  it('should clean up subscription on ngOnDestroy', () => {
    spyOn(component.booksSub, 'unsubscribe');
    component.ngOnDestroy();
    expect(component.booksSub.unsubscribe).toHaveBeenCalled();
  });

  it('should display the correct number of books', () => {
    component.ngOnInit();
    component.updateDisplayedBooks();

    const bookElements = fixture.debugElement.queryAll(By.css('.book-card'));
    expect(bookElements.length).toBe(component.displayedBooks.length);
  });
});

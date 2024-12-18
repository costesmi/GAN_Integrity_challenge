import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BookCardComponent } from './book-card.component';
import { Router } from '@angular/router';
import { Book } from '../models/book.model';
import { of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

describe('BookCardComponent', () => {
  let component: BookCardComponent;
  let fixture: ComponentFixture<BookCardComponent>;
  let router: Router;

  const mockBook: Book = {
    id: '1',
    title: 'Book 1',
    description: 'A book description',
    authors: ['Author 1'],
    imageLinks: {
      thumbnail: 'https://example.com/book1-thumbnail.jpg',
      smallThumbnail: '',
      extraLarge: '',
      large: '',
      medium: '',
      small: '',
    },
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BookCardComponent],
      imports: [RouterTestingModule], // Imports RouterTestingModule for router testing
    }).compileComponents();

    router = TestBed.inject(Router);
    fixture = TestBed.createComponent(BookCardComponent);
    component = fixture.componentInstance;
    component.book = mockBook; // Assign the mock book to the component
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should display book title and author', () => {
    const titleElement = fixture.nativeElement.querySelector('h3');
    const authorElement = fixture.nativeElement.querySelector('p');

    expect(titleElement.textContent).toContain(mockBook.title);
    expect(authorElement.textContent).toContain(mockBook.authors[0]);
  });

  it('should navigate to the book details page when clicked', () => {
    spyOn(router, 'navigate'); // Spy on the navigate method of the router

    component.navigateToDetails(); // Call the navigateToDetails method

    expect(router.navigate).toHaveBeenCalledWith([`/books/${mockBook.id}`]); // Check if navigate was called with correct URL
  });
});

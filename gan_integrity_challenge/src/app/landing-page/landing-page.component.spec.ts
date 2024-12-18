import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LandingPageComponent } from './landing-page.component';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { ElementRef } from '@angular/core';
import { Book } from '../models/book.model';
import {
  selectFilteredBooks,
  selectLatestBooks,
} from '../state/books.selectors';
import { BookCardComponent } from '../book-card/book-card.component';

describe('LandingPageComponent', () => {
  let component: LandingPageComponent;
  let fixture: ComponentFixture<LandingPageComponent>;
  let store: MockStore;
  let routerSpy: jasmine.SpyObj<Router>;
  let route: ActivatedRoute;

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

  const initialState = {
    books: mockBooks, // Provide an empty array or mock data here
  };

  beforeEach(async () => {
    const routerMock = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      declarations: [LandingPageComponent, BookCardComponent],
      imports: [ReactiveFormsModule],
      providers: [
        provideMockStore({
          initialState: initialState,
        }),
        { provide: Router, useValue: routerMock },
        {
          provide: ActivatedRoute,
          useValue: { queryParams: of({ search: 'test' }) },
        },
      ],
    }).compileComponents();

    store = TestBed.inject(MockStore);
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    route = TestBed.inject(ActivatedRoute);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LandingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set searchControl value based on queryParams on init', () => {
    expect(component.searchControl.value).toBe('test');
  });

  it('should unsubscribe querySub on destroy', () => {
    const spy = spyOn(component.querySub!, 'unsubscribe').and.callThrough();
    component.ngOnDestroy();
    expect(spy).toHaveBeenCalled();
  });

  it('should scroll to the filtered section when scrollToFilteredSection is called', () => {
    const scrollSpy = jasmine.createSpy('scrollIntoView');
    component.filteredSection = {
      nativeElement: { scrollIntoView: scrollSpy },
    } as ElementRef;

    component.scrollToFilteredSection();
    expect(scrollSpy).toHaveBeenCalledWith({
      behavior: 'smooth',
      block: 'start',
    });
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { Store } from '@ngrx/store';
import { loadBooks } from './state/books.actions';
import { RouterModule, ActivatedRoute } from '@angular/router'; // Import ActivatedRoute

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let store: MockStore;
  let dispatchSpy: jasmine.Spy;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [RouterModule], // Add RouterModule for router-outlet
      providers: [
        provideMockStore(),
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: { params: {} }, // Mocking the ActivatedRoute snapshot
          },
        },
      ],
    }).compileComponents();

    store = TestBed.inject(MockStore); // Use MockStore type
    dispatchSpy = spyOn(store, 'dispatch'); // Spy on the dispatch method
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // Triggers Angular's change detection
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch loadBooks action on initialization', () => {
    expect(dispatchSpy).toHaveBeenCalledWith(loadBooks());
  });

  it('should have the correct title', () => {
    expect(component.title).toBe('gan_integrity_challenge');
  });
});

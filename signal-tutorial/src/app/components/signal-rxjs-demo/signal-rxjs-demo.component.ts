import { Component, OnDestroy, OnInit, signal, computed, effect, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  Subject, 
  Observable, 
  interval, 
  debounceTime, 
  distinctUntilChanged, 
  map, 
  takeUntil, 
  take 
} from 'rxjs';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-signal-rxjs-demo',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './signal-rxjs-demo.component.html',
  styleUrl: './signal-rxjs-demo.component.scss'
})
export class SignalRxjsDemoComponent implements OnInit, OnDestroy {
  // Cleanup subject for unsubscribing from observables
  private destroy$ = new Subject<void>();
  
  // 1. Basic signal creation
  counter = signal<number>(0);
  
  // 2. Input signal for search with debounce
  searchTerm = signal<string>('');
  
  // 3. Convert signal to observable
  counter$ = toObservable(this.counter);
  searchTerm$ = toObservable(this.searchTerm);
  
  // 4. Debounced search results
  searchResults = signal<string[]>([]);
  
  // 5. Timer observable converted to signal
  timer$ = interval(1000).pipe(
    map(v => v + 1),
    take(60) // Limit to 60 seconds
  );
  
  // 6. Convert observable to signal
  timerSignal = toSignal(this.timer$, { initialValue: 0 });
  
  // 7. Computed signal based on timer
  formattedTimer = computed(() => {
    const seconds = this.timerSignal();
    return `${Math.floor(seconds / 60)}:${(seconds % 60).toString().padStart(2, '0')}`;
  });
  
  // Sample data for search
  private items = [
    'Angular', 'React', 'Vue', 'Svelte', 'Ember', 
    'Signal', 'Observable', 'RxJS', 'NgRx', 'Redux',
    'JavaScript', 'TypeScript', 'HTML', 'CSS', 'SCSS'
  ];
  
  ngOnInit(): void {
    // Set up effect to log counter changes
    effect(() => {
      console.log(`Counter value changed: ${this.counter()}`);
    });
    
    // Set up debounced search using RxJS
    this.searchTerm$.pipe(
      debounceTime(300), // Wait 300ms after last input
      distinctUntilChanged(), // Only emit when value changes
      takeUntil(this.destroy$)
    ).subscribe(term => {
      if (!term.trim()) {
        this.searchResults.set([]);
        return;
      }
      
      // Filter items based on search term
      const results = this.items.filter(item => 
        item.toLowerCase().includes(term.toLowerCase())
      );
      
      this.searchResults.set(results);
    });
    
    // Example of counter$ subscription
    this.counter$.pipe(
      takeUntil(this.destroy$)
    ).subscribe(value => {
      console.log(`Counter$ observable emitted: ${value}`);
    });
  }
  
  // Increment counter
  incrementCounter(): void {
    this.counter.update(value => value + 1);
  }
  
  // Decrement counter
  decrementCounter(): void {
    this.counter.update(value => Math.max(0, value - 1));
  }
  
  // Reset counter
  resetCounter(): void {
    this.counter.set(0);
  }
  
  // Update search term
  updateSearchTerm(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.searchTerm.set(input.value);
  }
  
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as CounterActions from '../../store/counter/counter.actions';
import { selectCount } from '../../store/counter/counter.selectors';

@Component({
  selector: 'app-counter',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.css']
})
export class CounterComponent {
  // NGRXで管理するグローバルカウンター
  count$: Observable<number>;
  incrementAmount: number = 1;

  // Signalを使用したローカルカウンター
  localCount = signal<number>(0); // Signalを使用
  localIncrementAmount: number = 1;

  constructor(private store: Store) {
    this.count$ = this.store.select(selectCount);
  }

  // グローバルカウンターの操作
  increment(): void {
    this.store.dispatch(CounterActions.increment());
  }

  decrement(): void {
    this.store.dispatch(CounterActions.decrement());
  }

  reset(): void {
    this.store.dispatch(CounterActions.reset());
  }

  incrementByAmount(): void {
    this.store.dispatch(CounterActions.incrementByAmount({ amount: this.incrementAmount }));
  }

  // ローカルカウンターの操作（Signalを使用）
  localIncrement(): void {
    this.localCount.update(value => value + 1);
  }

  localDecrement(): void {
    this.localCount.update(value => value - 1);
  }

  localReset(): void {
    this.localCount.set(0);
  }

  localIncrementByAmount(): void {
    this.localCount.update(value => value + this.localIncrementAmount);
  }
}

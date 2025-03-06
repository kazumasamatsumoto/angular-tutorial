import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CounterComponentStore } from '../../store/component-store/counter.store';
import { ChildCounterComponent } from './child/child-counter.component';

@Component({
  selector: 'app-component-store-counter',
  standalone: true,
  imports: [CommonModule, FormsModule, ChildCounterComponent],
  templateUrl: './component-store-counter.component.html',
  styleUrls: ['./component-store-counter.component.css'],
  providers: [CounterComponentStore] // コンポーネントレベルでプロバイダーを提供
})
export class ComponentStoreCounterComponent {
  // コンポーネントストアから状態を取得
  readonly count$;
  incrementAmount: number = 1;

  constructor(private counterStore: CounterComponentStore) {
    this.count$ = this.counterStore.count$;
  }

  // カウンターの操作
  increment(): void {
    this.counterStore.increment();
  }

  decrement(): void {
    this.counterStore.decrement();
  }

  reset(): void {
    this.counterStore.reset();
  }

  incrementByAmount(): void {
    this.counterStore.incrementByAmount(this.incrementAmount);
  }
}

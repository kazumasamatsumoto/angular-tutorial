import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CounterComponentStore } from '../../../store/component-store/counter.store';

@Component({
  selector: 'app-child-counter',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './child-counter.component.html',
  styleUrls: ['./child-counter.component.css']
})
export class ChildCounterComponent {
  // 親コンポーネントから提供されるコンポーネントストアを注入
  readonly count$;

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
}

import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-counter',
  imports: [],
  templateUrl: './counter.component.html',
  styleUrl: './counter.component.css',
  standalone: true
})
export class CounterComponent {
  // Signalを使用してカウンター状態を管理
  count = signal(0);

  // カウンターをインクリメントするメソッド
  increment() {
    this.count.update(value => value + 1);
  }
}

import { Component, signal, Output, EventEmitter } from '@angular/core';

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
  
  // カウント値の変更を通知するためのEventEmitter
  @Output() countChange = new EventEmitter<number>();

  // カウンターをインクリメントするメソッド
  increment() {
    this.count.update(value => value + 1);
    // 値が変更されたことを通知
    this.countChange.emit(this.count());
  }
}

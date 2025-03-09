import { Component } from '@angular/core';
import { CounterComponent } from './counter/counter.component';
import { DisplayComponent } from './display/display.component';

@Component({
  selector: 'app-root',
  imports: [CounterComponent, DisplayComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  standalone: true
})
export class AppComponent {
  title = 'Angular Counter Test';
  
  // カウンターの値を保持する変数
  currentCount: number = 0;
  
  // カウンターコンポーネントからの値を受け取るメソッド
  onCountChange(count: number) {
    this.currentCount = count;
  }
}

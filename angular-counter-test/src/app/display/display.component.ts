import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-display',
  imports: [],
  templateUrl: './display.component.html',
  styleUrl: './display.component.css',
  standalone: true
})
export class DisplayComponent {
  // counterコンポーネントから受け取るカウント値
  @Input() countValue: number = 0;
}

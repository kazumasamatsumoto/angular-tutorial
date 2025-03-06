import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-whitespace-handling',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './whitespace-handling.component.html',
  styleUrl: './whitespace-handling.component.css',
  preserveWhitespaces: true
})
export class WhitespaceHandlingComponent {
  // サンプルコード
  exampleWithWhitespace = `
  <p>Hello         world</p>
  `;

  exampleWithoutWhitespace = `
  <p>Hello world</p>
  `;
}

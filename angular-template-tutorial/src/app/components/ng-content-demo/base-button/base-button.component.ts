import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'button[baseButton]',
  standalone: true,
  imports: [CommonModule],
  template: `
    <ng-content></ng-content>
  `,
  styleUrl: './base-button.component.css'
})
export class BaseButtonComponent {

}

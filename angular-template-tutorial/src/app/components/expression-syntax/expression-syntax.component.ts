import { Component } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-expression-syntax',
  standalone: true,
  imports: [CommonModule, CurrencyPipe],
  templateUrl: './expression-syntax.component.html',
  styleUrl: './expression-syntax.component.css'
})
export class ExpressionSyntaxComponent {
  // サンプルデータ
  total = 1000;
  price = 1500;
  firstName = '太郎';
  lastName = '山田';
}

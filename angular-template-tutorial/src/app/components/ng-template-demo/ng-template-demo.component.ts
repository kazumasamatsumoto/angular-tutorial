import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ng-template-demo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ng-template-demo.component.html',
  styleUrl: './ng-template-demo.component.css'
})
export class NgTemplateDemoComponent {
  // テンプレートフラグメントのレンダリング時のパラメータの受け渡しのデモ用
  pizzaToppings = ['玉ねぎ', 'ピーマン', 'マッシュルーム', 'ペパロニ', 'ハム'];
  selectedTopping = '玉ねぎ';
}

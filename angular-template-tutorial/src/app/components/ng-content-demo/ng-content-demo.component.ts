import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from './card/card.component';
import { PanelComponent } from './panel/panel.component';
import { BaseButtonComponent } from './base-button/base-button.component';

@Component({
  selector: 'app-ng-content-demo',
  standalone: true,
  imports: [CommonModule, CardComponent, PanelComponent, BaseButtonComponent],
  templateUrl: './ng-content-demo.component.html',
  styleUrl: './ng-content-demo.component.css'
})
export class NgContentDemoComponent {
  // サンプルデータ
  cardTitle = 'ng-contentの基本';
  cardContent = 'ng-contentを使用すると、親コンポーネントから子コンポーネントにコンテンツを渡すことができます。';
  
  panelTitle = '複数のng-contentスロット';
  panelContent = 'select属性を使用して、複数のng-contentスロットを定義できます。';
  panelFooter = '© 2025 Angular Template Tutorial';
}

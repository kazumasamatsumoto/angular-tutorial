import { Component } from '@angular/core';
import { BreadcrumbComponent } from '../../breadcrumb/breadcrumb.component';

@Component({
    selector: 'app-faq-contact',
    standalone: true,
    imports: [BreadcrumbComponent],
    template: `
    <app-breadcrumb></app-breadcrumb>
    <h1>お問い合わせに関する質問</h1>
    <p>このページはお問い合わせに関する質問と回答を表示するページです。</p>
  `,
    styles: [`
    h1 {
      color: #333;
      margin-bottom: 1rem;
    }
    p {
      color: #666;
      line-height: 1.6;
    }
  `]
})
export class FaqContactComponent { } 
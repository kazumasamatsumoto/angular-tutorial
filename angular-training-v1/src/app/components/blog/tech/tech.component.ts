import { Component } from '@angular/core';
import { BreadcrumbComponent } from '../../breadcrumb/breadcrumb.component';

@Component({
    selector: 'app-tech',
    standalone: true,
    imports: [BreadcrumbComponent],
    template: `
    <app-breadcrumb></app-breadcrumb>
    <h1>技術ブログ</h1>
    <p>このページは技術ブログ記事一覧を表示するページです。</p>
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
export class TechComponent { } 
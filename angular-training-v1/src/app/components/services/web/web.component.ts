import { Component } from '@angular/core';
import { BreadcrumbComponent } from '../../breadcrumb/breadcrumb.component';

@Component({
    selector: 'app-web',
    standalone: true,
    imports: [BreadcrumbComponent],
    template: `
    <app-breadcrumb></app-breadcrumb>
    <h1>Webサービス</h1>
    <p>このページはWebサービスの詳細情報を表示するページです。</p>
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
export class WebComponent { } 
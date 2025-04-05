import { Component } from '@angular/core';
import { BreadcrumbComponent } from '../../breadcrumb/breadcrumb.component';

@Component({
    selector: 'app-software',
    standalone: true,
    imports: [BreadcrumbComponent],
    template: `
    <app-breadcrumb></app-breadcrumb>
    <h1>ソフトウェア</h1>
    <p>このページはソフトウェア製品の詳細情報を表示するページです。</p>
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
export class SoftwareComponent { } 
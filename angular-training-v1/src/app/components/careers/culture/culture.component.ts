import { Component } from '@angular/core';
import { BreadcrumbComponent } from '../../breadcrumb/breadcrumb.component';

@Component({
    selector: 'app-culture',
    standalone: true,
    imports: [BreadcrumbComponent],
    template: `
    <app-breadcrumb></app-breadcrumb>
    <h1>企業文化</h1>
    <p>このページは当社の企業文化と働き方について説明するページです。</p>
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
export class CultureComponent { } 
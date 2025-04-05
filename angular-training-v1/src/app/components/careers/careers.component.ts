import { Component } from '@angular/core';

@Component({
    selector: 'app-careers',
    standalone: true,
    template: `
    <h1>採用情報</h1>
    <p>このページは採用情報を表示するページです。</p>
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
export class CareersComponent { } 
import { Component } from '@angular/core';

@Component({
    selector: 'app-home',
    standalone: true,
    template: `
    <h1>ホームページ</h1>
    <p>ようこそ！このページはAngularのルーティング練習用のホームページです。</p>
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
export class HomeComponent { } 
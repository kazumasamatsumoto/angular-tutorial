import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BreadcrumbComponent } from '../breadcrumb/breadcrumb.component';

@Component({
    selector: 'app-gallery',
    standalone: true,
    imports: [RouterLink, BreadcrumbComponent],
    template: `
    <app-breadcrumb></app-breadcrumb>
    <h1>ギャラリー</h1>
    <p>このページはギャラリー一覧を表示するページです。</p>
    <nav class="sub-nav">
      <a routerLink="photos">写真</a>
      <a routerLink="videos">動画</a>
    </nav>
  `,
    styles: [`
    h1 {
      color: #333;
      margin-bottom: 1rem;
    }
    p {
      color: #666;
      line-height: 1.6;
      margin-bottom: 2rem;
    }
    .sub-nav {
      display: flex;
      gap: 1rem;
    }
    .sub-nav a {
      padding: 0.5rem 1rem;
      background-color: #f5f5f5;
      border-radius: 4px;
      color: #333;
      text-decoration: none;
      transition: background-color 0.3s ease;
    }
    .sub-nav a:hover {
      background-color: #e0e0e0;
    }
  `]
})
export class GalleryComponent { } 
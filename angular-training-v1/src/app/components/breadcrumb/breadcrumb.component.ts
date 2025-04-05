import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-breadcrumb',
    standalone: true,
    imports: [RouterLink, CommonModule],
    template: `
    <nav class="breadcrumb">
      <ng-container *ngFor="let item of breadcrumbs; let last = last">
        <a [routerLink]="item.path">{{ item.label }}</a>
        <span *ngIf="!last">/</span>
      </ng-container>
    </nav>
  `,
    styles: [`
    .breadcrumb {
      display: flex;
      align-items: center;
      padding: 0.5rem 0;
      background-color: #f8f9fa;
      border-radius: 4px;
      width: 100%;
    }
    .breadcrumb a {
      color: #666;
      text-decoration: none;
      padding: 0.25rem 0.5rem;
    }
    .breadcrumb a:hover {
      text-decoration: underline;
      color: #333;
    }
    .breadcrumb span {
      margin: 0 0.5rem;
      color: #999;
    }
  `]
})
export class BreadcrumbComponent implements OnInit {
    breadcrumbs: Array<{ path: string; label: string }> = [];

    constructor(private router: Router) { }

    ngOnInit() {
        this.router.events.subscribe((event) => {
            if (event instanceof NavigationEnd) {
                this.updateBreadcrumbs(event.url);
            }
        });
    }

    private updateBreadcrumbs(url: string) {
        // ルートパスの場合でもホームを表示するように修正
        if (url === '/' || url === '') {
            this.breadcrumbs = [{ path: '/', label: 'ホーム' }];
            return;
        }

        // まず「ホーム」を追加
        this.breadcrumbs = [{ path: '/', label: 'ホーム' }];

        // 残りのパスを処理
        const paths = url.split('/').filter(path => path);
        const pathBreadcrumbs = paths.map((path, index) => {
            const fullPath = '/' + paths.slice(0, index + 1).join('/');
            const label = this.getLabel(path);
            return { path: fullPath, label };
        });

        // ホームと残りのパスを結合
        this.breadcrumbs = [...this.breadcrumbs, ...pathBreadcrumbs];
    }

    private getLabel(path: string): string {
        const labels: { [key: string]: string } = {
            'about': '会社概要',
            'company': '会社情報',
            'history': '沿革',
            'services': 'サービス',
            'web': 'Webサービス',
            'mobile': 'モバイルサービス',
            'products': '製品',
            'software': 'ソフトウェア',
            'hardware': 'ハードウェア',
            'contact': 'お問い合わせ',
            'form': 'お問い合わせフォーム',
            'office': 'オフィス情報',
            'blog': 'ブログ',
            'news': 'ニュース',
            'tech': '技術ブログ',
            'gallery': 'ギャラリー',
            'photos': '写真',
            'videos': '動画',
            'team': 'チーム',
            'management': '経営陣',
            'staff': 'スタッフ',
            'careers': '採用情報',
            'positions': '募集職種',
            'benefits': '福利厚生',
            'faq': 'よくある質問',
            'general': '一般的な質問',
            'technical': '技術的な質問'
        };
        return labels[path] || path;
    }
}

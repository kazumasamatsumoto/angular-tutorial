import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

// 動的コンポーネントのデモ用
@Component({
  selector: 'app-admin-profile',
  standalone: true,
  template: `
    <div class="admin-profile">
      <h3>管理者プロフィール</h3>
      <p>管理者権限を持つユーザーです。すべての機能にアクセスできます。</p>
      <button>管理者設定</button>
    </div>
  `,
  styles: [`
    .admin-profile {
      background-color: #f0f7ff;
      padding: 15px;
      border-radius: 5px;
      border-left: 4px solid #3f51b5;
    }
    button {
      background-color: #3f51b5;
      color: white;
      border: none;
      padding: 8px 15px;
      border-radius: 4px;
      cursor: pointer;
    }
  `]
})
export class AdminProfileComponent {}

@Component({
  selector: 'app-basic-user-profile',
  standalone: true,
  template: `
    <div class="basic-profile">
      <h3>一般ユーザープロフィール</h3>
      <p>一般ユーザーです。基本的な機能にアクセスできます。</p>
      <button>プロフィール編集</button>
    </div>
  `,
  styles: [`
    .basic-profile {
      background-color: #f5f5f5;
      padding: 15px;
      border-radius: 5px;
      border-left: 4px solid #9e9e9e;
    }
    button {
      background-color: #9e9e9e;
      color: white;
      border: none;
      padding: 8px 15px;
      border-radius: 4px;
      cursor: pointer;
    }
  `]
})
export class BasicUserProfileComponent {}

@Component({
  selector: 'app-ng-container-demo',
  standalone: true,
  imports: [CommonModule, AdminProfileComponent, BasicUserProfileComponent],
  templateUrl: './ng-container-demo.component.html',
  styleUrl: './ng-container-demo.component.css'
})
export class NgContainerDemoComponent {
  // 構造ディレクティブのデモ用
  permissions = 'user';
  items = [
    { title: '項目1', description: 'これは最初の項目の説明です。' },
    { title: '項目2', description: 'これは2番目の項目の説明です。' },
    { title: '項目3', description: 'これは3番目の項目の説明です。' }
  ];

  // 動的コンポーネントのデモ用
  isAdmin = false;
  
  get profileComponent() {
    return this.isAdmin ? AdminProfileComponent : BasicUserProfileComponent;
  }

  toggleAdmin() {
    this.isAdmin = !this.isAdmin;
  }

  trackByFn(index: number, item: any) {
    return index;
  }
}

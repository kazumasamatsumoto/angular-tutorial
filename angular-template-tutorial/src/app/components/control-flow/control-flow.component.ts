import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface OrderDetail {
  id: number;
  label: string;
  value: string;
}

interface User {
  name: string;
  isAdmin: boolean;
  profile?: {
    settings?: {
      startDate?: Date;
    }
  };
  details: OrderDetail[];
}

interface MenuItem {
  id: number;
  label: string;
  route: string;
  requiredPermission: string;
}

@Component({
  selector: 'app-control-flow',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './control-flow.component.html',
  styleUrl: './control-flow.component.css'
})
export class ControlFlowComponent {
  // @if、@else-if、@else の例用
  a = 10;
  b = 20;
  
  // @if と as キーワードの例用
  user: User = {
    name: '山田太郎',
    isAdmin: true,
    profile: {
      settings: {
        startDate: new Date('2023-01-15')
      }
    },
    details: [
      { id: 1, label: 'メールアドレス', value: 'yamada@example.com' },
      { id: 2, label: '電話番号', value: '03-1234-5678' },
      { id: 3, label: '住所', value: '東京都渋谷区' }
    ]
  };
  
  // @for の例用
  items = [
    { id: 1, name: '商品A' },
    { id: 2, name: '商品B' },
    { id: 3, name: '商品C' },
    { id: 4, name: '商品D' }
  ];
  
  // @for と @empty の例用
  emptyItems: any[] = [];
  
  // @for と menuItems の例用
  menuItems: MenuItem[] = [
    { id: 1, label: 'ダッシュボード', route: '/dashboard', requiredPermission: 'view' },
    { id: 2, label: 'ユーザー管理', route: '/users', requiredPermission: 'admin' },
    { id: 3, label: '設定', route: '/settings', requiredPermission: 'admin' },
    { id: 4, label: 'レポート', route: '/reports', requiredPermission: 'view' }
  ];
  
  // @switch の例用
  userPermissions = 'admin'; // 'admin', 'reviewer', 'editor', 'viewer'
  
  // @switch の別の例用
  orderStatus = 'processing'; // 'pending', 'processing', 'shipped', 'delivered'
  order = {
    id: 12345,
    customer: '佐藤花子',
    total: 5000,
    date: new Date()
  };
  
  // 権限チェックメソッド
  hasPermission(permission: string): boolean {
    // 実際のアプリケーションでは、ユーザーの権限をチェックするロジックを実装
    return permission === 'admin' ? this.user.isAdmin : true;
  }
  
  // 状態を切り替えるメソッド
  toggleOrderStatus(): void {
    const statuses = ['pending', 'processing', 'shipped', 'delivered'];
    const currentIndex = statuses.indexOf(this.orderStatus);
    const nextIndex = (currentIndex + 1) % statuses.length;
    this.orderStatus = statuses[nextIndex];
  }
  
  // ユーザー権限を切り替えるメソッド
  toggleUserPermissions(): void {
    const permissions = ['admin', 'reviewer', 'editor', 'viewer'];
    const currentIndex = permissions.indexOf(this.userPermissions);
    const nextIndex = (currentIndex + 1) % permissions.length;
    this.userPermissions = permissions[nextIndex];
  }
  
  // 数値を比較するメソッド
  compareValues(): void {
    // aとbの値をランダムに更新
    this.a = Math.floor(Math.random() * 100);
    this.b = Math.floor(Math.random() * 100);
  }
}

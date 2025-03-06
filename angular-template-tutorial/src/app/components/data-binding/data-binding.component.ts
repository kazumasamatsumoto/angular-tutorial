import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-data-binding',
  imports: [FormsModule, NgFor],
  templateUrl: './data-binding.component.html',
  styleUrl: './data-binding.component.css'
})
export class DataBindingComponent {
  // プロパティバインディングのためのプロパティ
  title = 'データバインディング';
  imageUrl = 'https://angular.io/assets/images/logos/angular/angular.svg';
  isDisabled = true;
  
  // 補間のためのプロパティ
  username = 'ユーザー';
  currentDate = new Date();
  
  // プロパティバインディングのためのオブジェクト
  user = {
    name: '山田太郎',
    email: 'yamada@example.com',
    role: '管理者'
  };
  
  // 配列バインディングの例
  items = ['アイテム1', 'アイテム2', 'アイテム3'];
  
  // クラスバインディングの例
  isSpecial = true;
  
  // スタイルバインディングの例
  highlightColor = 'yellow';
  fontSize = 16;
  
  // 属性バインディングの例
  columnSpan = 2;
  
  // 計算プロパティの例
  get fullGreeting(): string {
    return `こんにちは、${this.username}さん！`;
  }
  
  // 有効/無効の切り替え
  toggleDisabled(): void {
    this.isDisabled = !this.isDisabled;
  }
}

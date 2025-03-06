import { Component } from '@angular/core';
import { NgFor, NgIf, CommonModule } from '@angular/common';

@Component({
  selector: 'app-event-binding',
  imports: [NgFor, NgIf, CommonModule],
  standalone: true,
  templateUrl: './event-binding.component.html',
  styleUrl: './event-binding.component.css'
})
export class EventBindingComponent {
  // クリックイベントのデモ用
  clickMessage = '';
  clickCount = 0;
  
  // マウスイベントのデモ用
  mouseMessage = '';
  
  // キーボードイベントのデモ用
  keyboardMessage = '';
  inputValue = '';
  
  // フォームイベントのデモ用
  submittedValue = '';
  
  // イベントオブジェクトのデモ用
  coordinates = { x: 0, y: 0 };
  
  // イベント伝播のデモ用
  propagationLog: string[] = [];
  
  // ドラッグ＆ドロップのデモ用
  dragStatus = 'ドラッグして移動';
  
  // クリックイベントハンドラー
  onClick() {
    this.clickCount++;
    this.clickMessage = `ボタンがクリックされました！ (${this.clickCount}回)`;
  }
  
  // パラメータ付きのイベントハンドラー
  onClickWithParam(message: string) {
    this.clickMessage = message;
  }
  
  // マウスイベントハンドラー
  onMouseOver() {
    this.mouseMessage = 'マウスが要素の上に来ました';
  }
  
  onMouseOut() {
    this.mouseMessage = 'マウスが要素から離れました';
  }
  
  // キーボードイベントハンドラー
  onKeyDown(event: KeyboardEvent) {
    this.keyboardMessage = `キーが押されました: ${event.key}`;
  }
  
  onInput(event: Event) {
    const target = event.target as HTMLInputElement;
    this.inputValue = target.value;
  }
  
  // フォームイベントハンドラー
  onSubmit(value: string) {
    this.submittedValue = value;
    return false; // フォームのデフォルト送信を防止
  }
  
  // イベントオブジェクトを使用するハンドラー
  onMouseMove(event: MouseEvent) {
    this.coordinates = {
      x: event.clientX,
      y: event.clientY
    };
  }
  
  // イベント伝播のデモ用ハンドラー
  onOuterClick() {
    this.propagationLog.push('外側の要素がクリックされました');
  }
  
  onInnerClick(event: Event) {
    this.propagationLog.push('内側の要素がクリックされました');
    // イベントの伝播を停止
    event.stopPropagation();
  }
  
  // ログをクリア
  clearLog() {
    this.propagationLog = [];
  }
  
  // ドラッグ＆ドロップのハンドラー
  onDragStart() {
    this.dragStatus = 'ドラッグ中...';
  }
  
  onDragEnd() {
    this.dragStatus = 'ドロップされました！';
    setTimeout(() => {
      this.dragStatus = 'ドラッグして移動';
    }, 2000);
  }
}

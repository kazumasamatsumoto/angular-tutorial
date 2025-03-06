import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-two-way-binding',
  imports: [FormsModule, NgFor, NgIf],
  templateUrl: './two-way-binding.component.html',
  styleUrl: './two-way-binding.component.css'
})
export class TwoWayBindingComponent {
  // 基本的な双方向バインディングのデモ用
  username = '';
  
  // フォーム要素のデモ用
  email = '';
  password = '';
  
  // チェックボックスとラジオボタンのデモ用
  isSubscribed = false;
  selectedPlan = 'basic';
  
  // セレクトボックスのデモ用
  selectedCountry = '';
  countries = ['日本', 'アメリカ', 'イギリス', 'フランス', 'ドイツ'];
  
  // 複数選択のデモ用
  selectedFruits: string[] = [];
  fruits = ['りんご', 'バナナ', 'オレンジ', 'ぶどう', 'いちご'];
  
  // チェックボックスの変更ハンドラー
  onFruitChange(fruit: string, event: Event): void {
    const isChecked = (event.target as HTMLInputElement).checked;
    if (isChecked) {
      this.selectedFruits.push(fruit);
    } else {
      const index = this.selectedFruits.indexOf(fruit);
      if (index !== -1) {
        this.selectedFruits.splice(index, 1);
      }
    }
  }
  
  // カスタムコンポーネントのデモ用
  fontSize = 16;
  
  // 複雑なオブジェクトのデモ用
  user = {
    name: '',
    age: 25,
    address: {
      city: '',
      zipCode: ''
    }
  };
  
  // フォーム送信のデモ用
  formSubmitted = false;
  
  // フォーム送信ハンドラー
  onSubmit() {
    this.formSubmitted = true;
    console.log('フォームが送信されました', {
      username: this.username,
      email: this.email,
      isSubscribed: this.isSubscribed,
      selectedPlan: this.selectedPlan,
      selectedCountry: this.selectedCountry,
      selectedFruits: this.selectedFruits,
      user: this.user
    });
  }
  
  // フォームリセットハンドラー
  resetForm() {
    this.username = '';
    this.email = '';
    this.password = '';
    this.isSubscribed = false;
    this.selectedPlan = 'basic';
    this.selectedCountry = '';
    this.selectedFruits = [];
    this.user = {
      name: '',
      age: 25,
      address: {
        city: '',
        zipCode: ''
      }
    };
    this.formSubmitted = false;
  }
}

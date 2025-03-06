import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-template-variables',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './template-variables.component.html',
  styleUrl: './template-variables.component.css'
})
export class TemplateVariablesComponent {
  user$ = new Promise<{name: string, photo: string, favoriteSnacks: {id: number, name: string}[]}>(resolve => {
    setTimeout(() => {
      resolve({
        name: '山田太郎',
        photo: 'https://via.placeholder.com/150',
        favoriteSnacks: [
          { id: 1, name: 'ポテトチップス' },
          { id: 2, name: 'チョコレート' },
          { id: 3, name: 'アイスクリーム' }
        ]
      });
    }, 1000);
  });

  update(user: any) {
    alert(`${user.name}のプロフィールを更新します`);
  }

  addTask(taskInput: HTMLInputElement) {
    alert(`新しいタスク: ${taskInput.value}`);
    taskInput.value = '';
  }

  currentDate = new Date();
}

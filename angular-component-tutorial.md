# Angularコンポーネントチュートリアル：タスク管理アプリの作成

このチュートリアルでは、Angularの最も基本的な構成要素であるコンポーネントについて学び、シンプルなタスク管理アプリケーションを通して実践的に理解を深めていきます。

## 目次

- [Angularコンポーネントチュートリアル：タスク管理アプリの作成](#angularコンポーネントチュートリアルタスク管理アプリの作成)
  - [目次](#目次)
  - [1. プロジェクトのセットアップ](#1-プロジェクトのセットアップ)
  - [2. コンポーネントの基本構造](#2-コンポーネントの基本構造)
  - [3. タスクモデルの作成](#3-タスクモデルの作成)
  - [4. タスクサービスの作成](#4-タスクサービスの作成)
  - [5. タスクリストコンポーネント](#5-タスクリストコンポーネント)
  - [6. タスク項目コンポーネント](#6-タスク項目コンポーネント)
  - [7. タスク追加フォームコンポーネント](#7-タスク追加フォームコンポーネント)
  - [8. タスク詳細コンポーネント](#8-タスク詳細コンポーネント)
  - [9. メインアプリコンポーネント](#9-メインアプリコンポーネント)
  - [10. コンポーネントのライフサイクルフック](#10-コンポーネントのライフサイクルフック)
  - [11. ビューの参照と制御](#11-ビューの参照と制御)
  - [12. アプリの実行と動作確認](#12-アプリの実行と動作確認)

## 1. プロジェクトのセットアップ

まず、新しいAngularプロジェクトを作成します。

```bash
ng new task-manager --routing=false --style=scss
cd task-manager
```

次に、必要なコンポーネントを生成します。

```bash
ng generate component components/task-list
ng generate component components/task-item
ng generate component components/task-form
ng generate component components/task-detail
ng generate component components/task-app
```

## 2. コンポーネントの基本構造

Angularコンポーネントは以下の3つの主要な部分から構成されています：

1. **@Componentデコレーター**: コンポーネントのメタデータを定義します
2. **HTMLテンプレート**: UIの見た目を定義します
3. **TypeScriptクラス**: コンポーネントの動作を定義します

基本的なコンポーネントの構造は以下のようになります：

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-example',
  templateUrl: './example.component.html',
  styleUrls: ['./example.component.scss']
})
export class ExampleComponent {
  // プロパティとメソッドをここに定義
}
```

## 3. タスクモデルの作成

まず、タスクのデータ構造を定義するモデルを作成します。

```bash
ng generate interface models/task
```

`src/app/models/task.ts` を以下のように編集します：

```typescript
export interface Task {
  id: number;
  title: string;
  description: string;
  completed: boolean;
}
```

## 4. タスクサービスの作成

次に、タスクデータを管理するサービスを作成します。

```bash
ng generate service services/task
```

`src/app/services/task.service.ts` を以下のように編集します：

```typescript
import { Injectable } from '@angular/core';
import { Task } from '../models/task';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private tasks: Task[] = [
    { id: 1, title: 'Angularを学ぶ', description: 'コンポーネントの基本を理解する', completed: false },
    { id: 2, title: 'タスク管理アプリを作る', description: 'コンポーネント間の連携を実践する', completed: false },
    { id: 3, title: 'CSSでスタイリング', description: 'アプリの見た目を整える', completed: true }
  ];
  
  private tasksSubject = new BehaviorSubject<Task[]>(this.tasks);
  
  constructor() { }
  
  getTasks(): Observable<Task[]> {
    return this.tasksSubject.asObservable();
  }
  
  getTaskById(id: number): Task | undefined {
    return this.tasks.find(task => task.id === id);
  }
  
  addTask(task: Omit<Task, 'id'>): void {
    const newTask: Task = {
      ...task,
      id: this.getNextId()
    };
    
    this.tasks = [...this.tasks, newTask];
    this.tasksSubject.next(this.tasks);
  }
  
  updateTask(updatedTask: Task): void {
    this.tasks = this.tasks.map(task => 
      task.id === updatedTask.id ? updatedTask : task
    );
    this.tasksSubject.next(this.tasks);
  }
  
  toggleTaskCompletion(id: number): void {
    this.tasks = this.tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    this.tasksSubject.next(this.tasks);
  }
  
  deleteTask(id: number): void {
    this.tasks = this.tasks.filter(task => task.id !== id);
    this.tasksSubject.next(this.tasks);
  }
  
  private getNextId(): number {
    return Math.max(0, ...this.tasks.map(task => task.id)) + 1;
  }
}
```

## 5. タスクリストコンポーネント

タスクの一覧を表示するコンポーネントを実装します。

`src/app/components/task-list/task-list.component.ts`:

```typescript
import { Component, OnInit } from '@angular/core';
import { Task } from '../../models/task';
import { TaskService } from '../../services/task.service';
import { CommonModule } from '@angular/common';
import { TaskItemComponent } from '../task-item/task-item.component';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, TaskItemComponent],
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];
  
  constructor(private taskService: TaskService) { }
  
  ngOnInit(): void {
    this.taskService.getTasks().subscribe(tasks => {
      this.tasks = tasks;
    });
  }
  
  onTaskToggle(taskId: number): void {
    this.taskService.toggleTaskCompletion(taskId);
  }
  
  onTaskDelete(taskId: number): void {
    this.taskService.deleteTask(taskId);
  }
}
```

`src/app/components/task-list/task-list.component.html`:

```html
<div class="task-list">
  <h2>タスク一覧</h2>
  
  @if (tasks.length === 0) {
    <p class="no-tasks">タスクがありません。新しいタスクを追加してください。</p>
  } @else {
    <ul>
      @for (task of tasks; track task.id) {
        <li>
          <app-task-item 
            [task]="task" 
            (toggleComplete)="onTaskToggle(task.id)" 
            (deleteTask)="onTaskDelete(task.id)">
          </app-task-item>
        </li>
      }
    </ul>
  }
</div>
```

`src/app/components/task-list/task-list.component.scss`:

```scss
.task-list {
  margin: 20px 0;
  
  h2 {
    color: #333;
    margin-bottom: 15px;
  }
  
  ul {
    list-style-type: none;
    padding: 0;
  }
  
  li {
    margin-bottom: 10px;
  }
  
  .no-tasks {
    color: #666;
    font-style: italic;
  }
}
```

## 6. タスク項目コンポーネント

個々のタスク項目を表示するコンポーネントを実装します。

`src/app/components/task-item/task-item.component.ts`:

```typescript
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from '../../models/task';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-task-item',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.scss']
})
export class TaskItemComponent {
  @Input() task!: Task;
  @Output() toggleComplete = new EventEmitter<void>();
  @Output() deleteTask = new EventEmitter<void>();
  
  onToggleComplete(): void {
    this.toggleComplete.emit();
  }
  
  onDeleteTask(): void {
    this.deleteTask.emit();
  }
}
```

`src/app/components/task-item/task-item.component.html`:

```html
<div class="task-item" [class.completed]="task.completed">
  <div class="task-content">
    <h3>{{ task.title }}</h3>
    <p>{{ task.description }}</p>
  </div>
  
  <div class="task-actions">
    <button class="toggle-btn" (click)="onToggleComplete()">
      {{ task.completed ? '✓' : '○' }}
    </button>
    <button class="delete-btn" (click)="onDeleteTask()">✕</button>
  </div>
</div>
```

`src/app/components/task-item/task-item.component.scss`:

```scss
.task-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  border-radius: 5px;
  background-color: #f9f9f9;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  
  &.completed {
    background-color: #e8f5e9;
    
    h3 {
      text-decoration: line-through;
      color: #757575;
    }
  }
  
  .task-content {
    flex: 1;
    
    h3 {
      margin: 0 0 5px 0;
      font-size: 18px;
    }
    
    p {
      margin: 0;
      color: #666;
      font-size: 14px;
    }
  }
  
  .task-actions {
    display: flex;
    gap: 10px;
    
    button {
      width: 30px;
      height: 30px;
      border-radius: 50%;
      border: none;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.2s ease;
      
      &.toggle-btn {
        background-color: #e3f2fd;
        color: #2196f3;
        
        &:hover {
          background-color: #bbdefb;
        }
      }
      
      &.delete-btn {
        background-color: #ffebee;
        color: #f44336;
        
        &:hover {
          background-color: #ffcdd2;
        }
      }
    }
  }
}
```

## 7. タスク追加フォームコンポーネント

新しいタスクを追加するフォームコンポーネントを実装します。

`src/app/components/task-form/task-form.component.ts`:

```typescript
import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Task } from '../../models/task';
import { CommonModule } from '@angular/common';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss']
})
export class TaskFormComponent {
  taskForm: FormGroup;
  @Output() taskAdded = new EventEmitter<void>();
  
  constructor(
    private fb: FormBuilder,
    private taskService: TaskService
  ) {
    this.taskForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', Validators.required]
    });
  }
  
  onSubmit(): void {
    if (this.taskForm.valid) {
      const newTask: Omit<Task, 'id'> = {
        ...this.taskForm.value,
        completed: false
      };
      
      this.taskService.addTask(newTask);
      this.taskForm.reset();
      this.taskAdded.emit();
    } else {
      // フォームを検証してエラーを表示
      this.markFormGroupTouched(this.taskForm);
    }
  }
  
  // フォームグループのすべてのコントロールをタッチ済みとしてマーク
  private markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      
      if ((control as FormGroup).controls) {
        this.markFormGroupTouched(control as FormGroup);
      }
    });
  }
}
```

`src/app/components/task-form/task-form.component.html`:

```html
<div class="task-form">
  <h2>新しいタスクを追加</h2>
  
  <form [formGroup]="taskForm" (ngSubmit)="onSubmit()">
    <div class="form-group">
      <label for="title">タイトル</label>
      <input 
        type="text" 
        id="title" 
        formControlName="title" 
        placeholder="タスクのタイトルを入力"
      >
      @if (taskForm.get('title')?.invalid && taskForm.get('title')?.touched) {
        <div class="error-message">
          @if (taskForm.get('title')?.errors?.['required']) {
            <span>タイトルは必須です</span>
          }
          @if (taskForm.get('title')?.errors?.['minlength']) {
            <span>タイトルは3文字以上必要です</span>
          }
        </div>
      }
    </div>
    
    <div class="form-group">
      <label for="description">説明</label>
      <textarea 
        id="description" 
        formControlName="description" 
        placeholder="タスクの説明を入力"
        rows="3"
      ></textarea>
      @if (taskForm.get('description')?.invalid && taskForm.get('description')?.touched) {
        <div class="error-message">
          <span>説明は必須です</span>
        </div>
      }
    </div>
    
    <button type="submit" [disabled]="taskForm.invalid">タスクを追加</button>
  </form>
</div>
```

`src/app/components/task-form/task-form.component.scss`:

```scss
.task-form {
  background-color: #f5f5f5;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 20px;
  
  h2 {
    margin-top: 0;
    color: #333;
    margin-bottom: 15px;
  }
  
  .form-group {
    margin-bottom: 15px;
    
    label {
      display: block;
      margin-bottom: 5px;
      font-weight: 500;
      color: #555;
    }
    
    input, textarea {
      width: 100%;
      padding: 10px;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-size: 16px;
      
      &:focus {
        outline: none;
        border-color: #2196f3;
        box-shadow: 0 0 0 2px rgba(33, 150, 243, 0.2);
      }
    }
    
    .error-message {
      color: #f44336;
      font-size: 12px;
      margin-top: 5px;
    }
  }
  
  button {
    background-color: #2196f3;
    color: white;
    border: none;
    padding: 10px 15px;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
    transition: background-color 0.3s;
    
    &:hover {
      background-color: #1976d2;
    }
    
    &:disabled {
      background-color: #bdbdbd;
      cursor: not-allowed;
    }
  }
}
```

## 8. タスク詳細コンポーネント

タスクの詳細を表示するコンポーネントを実装します。

`src/app/components/task-detail/task-detail.component.ts`:

```typescript
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { Task } from '../../models/task';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-task-detail',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.scss']
})
export class TaskDetailComponent implements OnChanges {
  @Input() task: Task | null = null;
  @Output() updateTask = new EventEmitter<Task>();
  @Output() closeDetail = new EventEmitter<void>();
  
  taskForm: FormGroup;
  isEditing = false;
  
  constructor(private fb: FormBuilder) {
    this.taskForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', Validators.required],
      completed: [false]
    });
  }
  
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['task'] && this.task) {
      this.taskForm.patchValue({
        title: this.task.title,
        description: this.task.description,
        completed: this.task.completed
      });
      this.isEditing = false;
    }
  }
  
  onClose(): void {
    this.closeDetail.emit();
  }
  
  onToggleEdit(): void {
    this.isEditing = !this.isEditing;
    if (!this.isEditing && this.task) {
      // 編集モードを終了する際にフォームを元の値にリセット
      this.taskForm.patchValue({
        title: this.task.title,
        description: this.task.description,
        completed: this.task.completed
      });
    }
  }
  
  onSubmit(): void {
    if (this.taskForm.valid && this.task) {
      const updatedTask: Task = {
        ...this.task,
        ...this.taskForm.value
      };
      
      this.updateTask.emit(updatedTask);
      this.isEditing = false;
    }
  }
}
```

`src/app/components/task-detail/task-detail.component.html`:

```html
<div class="task-detail" *ngIf="task">
  <div class="detail-header">
    <h2>タスク詳細</h2>
    <button class="close-btn" (click)="onClose()">✕</button>
  </div>
  
  <div class="detail-content">
    @if (!isEditing) {
      <div class="view-mode">
        <div class="status" [class.completed]="task.completed">
          {{ task.completed ? '完了' : '未完了' }}
        </div>
        <h3>{{ task.title }}</h3>
        <p class="description">{{ task.description }}</p>
        <button class="edit-btn" (click)="onToggleEdit()">編集</button>
      </div>
    } @else {
      <form [formGroup]="taskForm" (ngSubmit)="onSubmit()">
        <div class="form-group">
          <label for="detail-title">タイトル</label>
          <input 
            type="text" 
            id="detail-title" 
            formControlName="title"
          >
          @if (taskForm.get('title')?.invalid && taskForm.get('title')?.touched) {
            <div class="error-message">
              @if (taskForm.get('title')?.errors?.['required']) {
                <span>タイトルは必須です</span>
              }
              @if (taskForm.get('title')?.errors?.['minlength']) {
                <span>タイトルは3文字以上必要です</span>
              }
            </div>
          }
        </div>
        
        <div class="form-group">
          <label for="detail-description">説明</label>
          <textarea 
            id="detail-description" 
            formControlName="description"
            rows="3"
          ></textarea>
          @if (taskForm.get('description')?.invalid && taskForm.get('description')?.touched) {
            <div class="error-message">
              <span>説明は必須です</span>
            </div>
          }
        </div>
        
        <div class="form-group checkbox">
          <label>
            <input type="checkbox" formControlName="completed">
            完了済みとしてマーク
          </label>
        </div>
        
        <div class="form-actions">
          <button type="button" class="cancel-btn" (click)="onToggleEdit()">キャンセル</button>
          <button type="submit" [disabled]="taskForm.invalid">保存</button>
        </div>
      </form>
    }
  </div>
</div>
```

`src/app/components/task-detail/task-detail.component.scss`:

```scss
.task-detail {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  overflow: hidden;
  
  .detail-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px 20px;
    background-color: #f5f5f5;
    border-bottom: 1px solid #eee;
    
    h2 {
      margin: 0;
      color: #333;
    }
    
    .close-btn {
      background: none;
      border: none;
      font-size: 20px;
      cursor: pointer;
      color: #666;
      
      &:hover {
        color: #333;
      }
    }
  }
  
  .detail-content {
    padding: 20px;
    
    .view-mode {
      .status {
        display: inline-block;
        padding: 4px 8px;
        border-radius: 4px;
        font-size: 12px;
        font-weight: 500;
        background-color: #ffecb3;
        color: #ff8f00;
        margin-bottom: 10px;
        
        &.completed {
          background-color: #e8f5e9;
          color: #388e3c;
        }
      }
      
      h3 {
        margin: 0 0 10px 0;
        font-size: 20px;
        color: #333;
      }
      
      .description {
        margin: 0 0 20px 0;
        color: #666;
        line-height: 1.5;
      }
      
      .edit-btn {
        background-color: #f5f5f5;
        border: 1px solid #ddd;
        padding: 8px 15px;
        border-radius: 4px;
        cursor: pointer;
        
        &:hover {
          background-color: #eee;
        }
      }
    }
    
    form {
      .form-group {
        margin-bottom: 15px;
        
        label {
          display: block;
          margin-bottom: 5px;
          font-weight: 500;
          color: #555;
        }
        
        &.checkbox {
          label {
            display: flex;
            align-items: center;
            gap: 8px;
            cursor: pointer;
          }
        }
        
        input[type="text"], textarea {
          width: 100%;
          padding: 10px;
          border: 1px solid #ddd;
          border-radius: 4px;
          font-size: 16px;
          
          &:focus {
            outline: none;
            border-color: #2196f3;
            box-shadow: 0 0 0 2px rgba(33, 150, 243, 0.2);
          }
        }
        
        .error-message {
          color: #f44336;
          font-size: 12px;
          margin-top: 5px;
        }
      }
      
      .form-actions {
        display: flex;
        gap: 10px;
        justify-content: flex-end;
        
        button {
          padding: 8px 15px;
          border-radius: 4px;
          cursor: pointer;
          font-size: 14px;
          
          &[type="submit"] {
            background-color: #2196f3;
            color: white;
            border: none;
            
            &:hover {
              background-color: #1976d2;
            }
            
            &:disabled {
              background-color: #bdbdbd;
              cursor: not-allowed;
            }
          }
          
          &.cancel-btn {
            background-color: white;
            border: 1px solid #ddd;
            
            &:hover {
              background-color: #f5f5f5;
            }
          }
        }
      }
    }
  }
}
```

## 9. メインアプリコンポーネント

すべてのコンポーネントを統合するメインアプリコンポーネントを実装します。

`src/app/components/task-app/task-app.component.ts`:

```typescript
import { Component } from '@angular/core';
import { Task } from '../../models/task';
import { TaskService } from '../../services/task.service';
import { CommonModule } from '@angular/common';
import { TaskListComponent } from '../task-list/task-list.component';
import { TaskFormComponent } from '../task-form/task-form.component';
import { TaskDetailComponent } from '../task-detail/task-detail.component';

@Component({
  selector: 'app-task-app',
  standalone: true,
  imports: [CommonModule, TaskListComponent, TaskFormComponent, TaskDetailComponent],
  templateUrl: './task-app.component.html',
  styleUrls: ['./task-app.component.scss']
})
export class TaskAppComponent {
  selectedTask: Task | null = null;
  
  constructor(private taskService: TaskService) { }
  
  onSelectTask(taskId: number): void {
    const task = this.taskService.getTaskById(taskId);
    this.selectedTask = task || null;
  }
  
  onUpdateTask(task: Task): void {
    this.taskService.updateTask(task);
  }
  
  onCloseDetail(): void {
    this.selectedTask = null;
  }
}
```

`src/app/components/task-app/task-app.component.html`:

```html
<div class="task-app">
  <header>
    <h1>タスク管理アプリ</h1>
    <p>Angularコンポーネントの学習用アプリケーション</p>
  </header>
  
  <div class="container">
    <div class="main-content">
      <app-task-form (taskAdded)="onCloseDetail()"></app-task-form>
      <app-task-list (selectTask)="onSelectTask($event)"></app-task-list>
    </div>
    
    <div class="side-panel" [class.open]="selectedTask !== null">
      <app-task-detail 
        [task]="selectedTask" 
        (updateTask)="onUpdateTask($event)" 
        (closeDetail)="onCloseDetail()">
      </app-task-detail>
    </div>
  </div>
</div>
```

`src/app/components/task-app/task-app.component.scss`:

```scss
.task-app {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  
  header {
    text-align: center;
    margin-bottom: 30px;
    
    h1 {
      color: #2196f3;
      margin-bottom: 10px;
    }
    
    p {
      color: #666;
      margin: 0;
    }
  }
  
  .container {
    display: flex;
    gap: 20px;
    
    .main-content {
      flex: 1;
    }
    
    .side-panel {
      width: 0;
      overflow: hidden;
      transition: width 0.3s ease;
      
      &.open {
        width: 350px;
      }
    }
  }
}
```

## 10. コンポーネントのライフサイクルフック

Angularコンポーネントには、そのライフサイクルの異なる段階で実行されるフックメソッドがあります。これらのフックを使用することで、コンポーネントの初期化、変更検知、破棄などの重要なタイミングでコードを実行できます。

主なライフサイクルフックは以下の通りです：

1. **ngOnChanges**: 入力プロパティが変更されるたびに呼び出されます
2. **ngOnInit**: コンポーネントの初期化時に一度だけ呼び出されます
3. **ngDoCheck**: 変更検知の実行時に毎回呼び出されます
4. **ngAfterContentInit**: コンポーネントのコンテンツ（ng-content）が初期化された後に呼び出されます
5. **ngAfterContentChecked**: コンポーネントのコンテンツがチェックされた後に呼び出されます
6. **ngAfterViewInit**: コンポーネントのビュー（子コンポーネントを含む）が初期化された後に呼び出されます
7. **ngAfterViewChecked**: コンポーネントのビューがチェックされた後に呼び出されます
8. **ngOnDestroy**: コンポーネントが破棄される直前に呼び出されます

例えば、タスク詳細コンポーネントでは、`ngOnChanges`ライフサイクルフックを使用して、選択されたタスクが変更されたときにフォームの値を更新しています：

```typescript
ngOnChanges(changes: SimpleChanges): void {
  if (changes['task'] && this.task) {
    this.taskForm.patchValue({
      title: this.task.title,
      description: this.task.description,
      completed: this.task.completed
    });
    this.isEditing = false;
  }
}
```

また、タスクリストコンポーネントでは、`ngOnInit`ライフサイクルフックを使用して、コンポーネントの初期化時にタスクデータを取得しています：

```typescript
ngOnInit(): void {
  this.taskService.getTasks().subscribe(tasks => {
    this.tasks = tasks;
  });
}
```

## 11. ビューの参照と制御

Angularでは、テンプレート内の要素に直接アクセスするために、`@ViewChild`や`@ViewChildren`デコレータを使用できます。これにより、DOMの操作やコンポーネントのメソッド呼び出しなどが可能になります。

例えば、タスクフォームコンポーネントでタイトル入力フィールドに自動的にフォーカスを当てるには、以下のようにします：

```typescript
import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';

@Component({
  // ...
})
export class TaskFormComponent implements AfterViewInit {
  @ViewChild('titleInput') titleInput!: ElementRef<HTMLInputElement>;
  
  ngAfterViewInit(): void {
    // ビューの初期化後にタイトル入力フィールドにフォーカスを当てる
    this.titleInput.nativeElement.focus();
  }
}
```

そして、テンプレートでは以下のように参照を設定します：

```html
<input 
  #titleInput
  type="text" 
  id="title" 
  formControlName="title" 
  placeholder="タスクのタイトルを入力"
>
```

また、親コンポーネントから子コンポーネントのメソッドを呼び出すこともできます：

```typescript
import { Component, ViewChild } from '@angular/core';
import { TaskFormComponent } from '../task-form/task-form.component';

@Component({
  // ...
})
export class TaskAppComponent {
  @ViewChild(TaskFormComponent) taskForm!: TaskFormComponent;
  
  resetForm(): void {
    // 子コンポーネントのメソッドを呼び出す
    this.taskForm.resetForm();
  }
}
```

## 12. アプリの実行と動作確認

アプリケーションを実行するには、以下のコマンドを使用します：

```bash
ng serve
```

ブラウザで `http://localhost:4200` にアクセスすると、タスク管理アプリが表示されます。

以下の機能を試してみましょう：

1. **タスクの一覧表示**: アプリを起動すると、初期タスクのリストが表示されます
2. **タスクの追加**: フォームに新しいタスクの情報を入力し、「タスクを追加」ボタンをクリックします
3. **タスクの完了/未完了の切り替え**: タスク項目の完了ボタン（○/✓）をクリックして、タスクの状態を切り替えます
4. **タスクの削除**: タスク項目の削除ボタン（✕）をクリックして、タスクを削除します
5. **タスクの詳細表示と編集**: タスク項目をクリックして詳細を表示し、「編集」ボタンをクリックして情報を更新します

このアプリケーションを通じて、以下のAngularコンポーネントの重要な概念を学びました：

- コンポーネントの基本構造（デコレーター、テンプレート、クラス）
- 入力プロパティ（@Input）を使った親子コンポーネント間のデータ受け渡し
- 出力イベント（@Output）を使った子から親へのイベント通知
- コンポーネントのライフサイクルフック
- ビューの参照と制御（@ViewChild）

これらの概念を理解することで、より複雑なAngularアプリケーションを構築するための基礎が固まりました。

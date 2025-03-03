# Angular Signals Tutorial

This project demonstrates how to use Angular Signals for state management in a task management application.

## Features

- Task creation, editing, deletion
- Task filtering (all, active, completed)
- Task statistics (total, active, completed counts)
- Signal integration with RxJS for advanced state management
- Persistence with localStorage

## Technical Focus Areas

- Using `signal()` for primitive state management
- Implementing `computed()` signals for derived state
- Setting up `effect()` for side effects
- Creating custom signal-based services
- Integrating signals with RxJS observables
- Proper signal disposal patterns

## Project Structure

- **Components**:
  - TaskApp (container)
  - TaskList
  - TaskItem
  - TaskForm
  - TaskStats
- **Services**:
  - TaskService (with signal-based state)
- **Models**:
  - Task model with id, title, description, completed status, and creation date

## Implementation Details

- Signal-based task collection in the service
- Computed signals for derived data (filtered tasks, statistics)
- Effects for persistence (localStorage)
- RxJS integration for debouncing task edits and search functionality

## Getting Started

### Prerequisites

- Node.js and npm installed

### Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

### Running the Application

```bash
ng serve
```

Navigate to `http://localhost:4200/` in your browser.

## シグナルによる状態管理の解説

### 状態管理の宣言場所

このアプリケーションでは、主に `TaskService` クラス内でシグナルを使用して状態管理を行っています。

**src/app/services/task.service.ts**:

```typescript
// 主要なタスク状態のシグナル
private tasksSignal = signal<Task[]>([]);

// フィルター状態
private filterSignal = signal<'all' | 'active' | 'completed'>('all');

// 検索語句のシグナル
private searchTermSignal = signal<string>('');
```

これらのシグナルは、アプリケーションの主要な状態を保持します：

- `tasksSignal`: すべてのタスクのリスト
- `filterSignal`: 現在のフィルター設定（全て、アクティブ、完了済み）
- `searchTermSignal`: 検索語句

### 派生状態（Computed Signals）

`computed()` 関数を使用して、基本シグナルから派生した状態を作成しています：

```typescript
// フィルタリングされたタスクのcomputed signal
public filteredTasks = computed(() => {
  const tasks = this.tasksSignal();
  const filter = this.filterSignal();
  const searchTerm = this.searchTermSignal().toLowerCase();

  // フィルタリングロジック...

  return filteredTasks;
});

// 統計情報のcomputed signal
public stats = computed(() => {
  const tasks = this.tasksSignal();
  return {
    total: tasks.length,
    active: tasks.filter(task => !task.completed).length,
    completed: tasks.filter(task => task.completed).length
  };
});
```

これらの computed signals は、元のシグナルが変更されるたびに自動的に再計算されます。

### 副作用（Effects）

`effect()` 関数を使用して、シグナルの変更に応じて副作用を実行しています：

```typescript
constructor() {
  // localStorageからの初期状態の読み込み
  this.loadFromLocalStorage();

  // 永続化のためのeffect設定
  effect(() => {
    // このeffectはtasksSignalが変更されるたびに実行されます
    const tasks = this.tasksSignal();
    localStorage.setItem('tasks', JSON.stringify(tasks));
  });
}
```

この effect は、タスクリストが変更されるたびに自動的に localStorage に保存します。

### 状態の呼び出し場所

コンポーネント内では、TaskService をインジェクトして、シグナルにアクセスします：

**src/app/components/task-app/task-app.component.ts**:

```typescript
export class TaskAppComponent {
  private taskService = inject(TaskService);

  // サービスのcomputed signalsをテンプレートに公開
  protected filteredTasks = this.taskService.filteredTasks;
  protected stats = this.taskService.stats;

  // ...
}
```

テンプレート内では、シグナルを関数として呼び出して値にアクセスします：

**src/app/components/task-app/task-app.component.html**:

```html
<app-task-list [tasks]="filteredTasks()"></app-task-list> <app-task-stats [stats]="stats()"></app-task-stats>
```

## RxJS 統合デモページの解説

RxJS 統合デモページ（`/rxjs-demo`にアクセス）では、Angular Signals と RxJS の統合方法を 3 つの実用的な例で示しています：

### 1. シグナルから Observable への変換

カウンターの例では、シグナルを Observable に変換する方法を示しています：

- **操作方法**: 「+」ボタンと「-」ボタンをクリックしてカウンターを増減できます。「Reset」ボタンでカウンターをゼロにリセットできます。
- **確認できること**:
  - シグナルの値が変更されると、コンソールに 2 つのログが表示されます：
    1. `effect()`によるログ（シグナルの変更を直接監視）
    2. Observable サブスクリプションによるログ（`toObservable()`で変換されたシグナルを監視）

### 2. デバウンス検索（RxJS オペレーターとシグナルの組み合わせ）

検索機能の例では、シグナルと RxJS オペレーターを組み合わせる方法を示しています：

- **操作方法**: 検索ボックスに入力すると、入力が 300 ミリ秒間停止した後に検索が実行されます。
- **確認できること**:
  - 入力値がシグナルに保存される
  - シグナルが Observable に変換される
  - RxJS の`debounceTime`と`distinctUntilChanged`オペレーターが適用される
  - 検索結果が別のシグナルに保存される
  - 検索結果がリアルタイムで表示される

### 3. Observable からシグナルへの変換

タイマーの例では、Observable をシグナルに変換する方法を示しています：

- **操作方法**: ページを開くと、タイマーが自動的に開始します。
- **確認できること**:
  - RxJS の`interval`オブザーバブルが作成される
  - `toSignal()`を使用してオブザーバブルがシグナルに変換される
  - 変換されたシグナルを基に、フォーマットされた時間を表示する computed signal が作成される
  - タイマーの値が 1 秒ごとに更新される

このデモページは、Angular Signals と RxJS を組み合わせることで、より強力な反応型プログラミングパターンを実現できることを示しています。特に、既存の RxJS コードとの統合や、複雑な非同期操作の処理に役立ちます。

## Key Signal Concepts Demonstrated

1. **Signal Declaration and Initialization**

```typescript
// Basic signal creation
private tasksSignal = signal<Task[]>([]);
```

2. **Signal Updates with both `set()` and `update()`**

```typescript
// Using set
this.tasksSignal.set(parsedTasks);

// Using update
this.tasksSignal.update((tasks) => [...tasks, newTask]);
```

3. **Computed Signals with Dependencies**

```typescript
public filteredTasks = computed(() => {
  const tasks = this.tasksSignal();
  const filter = this.filterSignal();
  // ... filtering logic
  return filteredTasks;
});
```

4. **Effect Implementation with Cleanup**

```typescript
constructor() {
  // Set up persistence effect
  effect(() => {
    const tasks = this.tasksSignal();
    localStorage.setItem('tasks', JSON.stringify(tasks));
  });
}
```

## License

This project is licensed under the MIT License.

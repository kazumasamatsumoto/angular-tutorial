# Angularv19 テンプレート学習ガイド

このガイドでは、Angularv19 におけるテンプレートの基本から応用までを学ぶことができます。各セクションでは、実際のコード例と共に詳細な説明を提供します。

## 目次

1. [テンプレートの基本](#テンプレートの基本)
2. [動的なテキスト、プロパティ、属性のバインディング](#動的なテキストプロパティ属性のバインディング)
3. [イベントリスナーの追加](#イベントリスナーの追加)
4. [双方向バインディング](#双方向バインディング)
5. [組み込み制御フロー](#組み込み制御フロー)
6. [パイプ](#パイプ)
7. [ng-content による子コンテンツのスロット化](#ng-contentによる子コンテンツのスロット化)
8. [ng-template によるテンプレートフラグメントの作成](#ng-templateによるテンプレートフラグメントの作成)
9. [ng-container による要素のグループ化](#ng-containerによる要素のグループ化)
10. [テンプレート内の変数](#テンプレート内の変数)
11. [@defer による遅延読み込み](#deferによる遅延読み込み)
12. [式構文](#式構文)
13. [テンプレート内の空白](#テンプレート内の空白)

## テンプレートの基本

Angular におけるテンプレートは、HTML の断片です。テンプレート内で特別な構文を使用することで、Angular の多くの機能を活用できます。

すべての Angular コンポーネントには、コンポーネントがページにレンダリングする DOM を定義する**テンプレート**があります。テンプレートを使用することで、Angular はデータが変化してもページを自動的に最新の状態に保つことができます。

テンプレートは通常、`*.component.ts`ファイルの`template`プロパティまたは`*.component.html`ファイル内にあります。

### テンプレートはどのように動作しますか？

テンプレートは、HTML 構文に基づいており、組み込みのテンプレート関数、データバインディング、イベントリスニング、変数など、追加の機能が備わっています。

Angular はテンプレートを JavaScript にコンパイルして、アプリケーションの内部的な理解を構築します。これにより、Angular がアプリケーションに自動的に適用する組み込みのレンダリング最適化が実現されます。

### 標準 HTML との違い

テンプレートと標準 HTML 構文の違いには、次のようなものがあります：

- テンプレートソースコード内のコメントは、レンダリングされた出力に含まれません。
- コンポーネントとディレクティブの要素は、自己クローズできます（例：`<UserProfile />`）。
- 特定の文字（`[]`、`()`など）を持つ属性は、Angular にとって特別な意味を持ちます。
- `@`文字は、制御フローなどのテンプレートに動的な動作を追加するための Angular にとって特別な意味を持ちます。リテラルの`@`文字を含めるには、HTML エンティティコード（`&commat;`または`&#64;`）としてエスケープします。
- Angular は不要な空白文字を無視して折り畳みます。
- Angular は、動的コンテンツのプレースホルダーとしてコメントノードをページに追加する場合がありますが、開発者はこれらを無視できます。

さらに、ほとんどの HTML 構文は有効なテンプレート構文ですが、Angular はテンプレート内の`<script>`要素をサポートしていません。

## 動的なテキスト、プロパティ、属性のバインディング

### テキスト補間による動的テキストのレンダリング

テンプレートで動的なテキストをバインドするには、二重中括弧を使用します。これは、Angular に内部の式を担当し、それが正しく更新されるように指示します。これは**テキスト補間**と呼ばれます。

```angular-ts
@Component({
  template: `
    <p>Your color preference is {{ theme }}.</p>
  `,
  ...
})
export class AppComponent {
  theme = 'dark';
}
```

この例では、スニペットがページにレンダリングされると、Angular は`{{ theme }}`を`dark`に置き換えます。

```angular-html
<!-- Rendered Output -->
<p>Your color preference is dark.</p>
```

Angular は、最初のレンダリング時に式を評価するだけでなく、式の値が変更されると、レンダリングされたコンテンツも更新します。

### 動的なプロパティと属性のバインディング

Angular は、角括弧を使用して、動的な値をオブジェクトのプロパティと HTML 属性にバインドすることをサポートしています。

#### ネイティブ要素のプロパティ

```angular-html
<!-- ボタン要素のDOMオブジェクトの`disabled`プロパティをバインドします -->
<button [disabled]="isFormValid">Save</button>
```

#### コンポーネントとディレクティブのプロパティ

```angular-html
<!-- `MyListbox`コンポーネントインスタンスの`value`プロパティをバインドします。 -->
<my-listbox [value]="mySelection" />
```

#### 属性

```angular-html
<!-- `<ul>`要素の`role`属性をコンポーネントの`listRole`プロパティにバインドします。 -->
<ul [attr.role]="listRole">
```

### CSS クラスとスタイルプロパティのバインディング

#### CSS クラス

```angular-html
<!-- `isExpanded`が真偽値の場合、`expanded`CSSクラスを追加します。 -->
<ul [class.expanded]="isExpanded">
```

`class`プロパティに直接バインドもできます：

```angular-ts
@Component({
  template: `
    <ul [class]="listClasses"> ... </ul>
    <section [class]="sectionClasses"> ... </section>
    <button [class]="buttonClasses"> ... </button>
  `,
  ...
})
export class UserProfile {
  listClasses = 'full-width outlined';
  sectionClasses = ['expandable', 'elevated'];
  buttonClasses = {
    highlighted: true,
    embiggened: false,
  };
}
```

#### CSS スタイルプロパティ

```angular-html
<!-- `isExpanded`プロパティに基づいてCSSの`display`プロパティを設定します。 -->
<section [style.display]="isExpanded ? 'block' : 'none'">
```

単位を受け付ける CSS プロパティについては、さらに単位を指定できます：

```angular-html
<!-- `sectionHeightInPixels`プロパティに基づいてCSSの`height`プロパティをピクセル値に設定します。 -->
<section [style.height.px]="sectionHeightInPixels">
```

## イベントリスナーの追加

Angular は、イベント名とイベントが発生するたびに実行されるステートメントを括弧で囲むことで、テンプレート内の要素にイベントリスナーを定義することをサポートしています。

### ネイティブイベントのリスナー

```angular-ts
@Component({
  template: `
    <input type="text" (keyup)="updateField()" />
  `,
  ...
})
export class AppComponent {
  updateField(): void {
    console.log('Field is updated!');
  }
}
```

### イベント引数へのアクセス

```angular-ts
@Component({
  template: `
    <input type="text" (keyup)="updateField($event)" />
  `,
  ...
})
export class AppComponent {
  updateField(event: KeyboardEvent): void {
    console.log(`The user pressed: ${event.key}`);
  }
}
```

### キー修飾子の使用

```angular-ts
@Component({
  template: `
    <input type="text" (keyup.enter)="updateField($event)" />
  `,
  ...
})
export class AppComponent {
  updateField(event: KeyboardEvent): void {
    console.log('The user pressed enter in the text field.');
  }
}
```

追加のキー修飾子を追加できます：

```angular-html
<!-- Matches shift and enter -->
<input type="text" (keyup.shift.enter)="updateField($event)" />
```

## 双方向バインディング

**双方向バインディング**は、要素に値をバインドすると同時に、その要素が変更をバインディングを通じて伝播できるようにする、簡潔な方法です。

### 構文

双方向バインディングの構文は、角括弧`[]`と丸括弧`()`を組み合わせた`[()]`です。これはプロパティバインディングの構文`[]`とイベントバインディングの構文`()`を組み合わせたものです。

### フォームコントロールでの双方向バインディング

```angular-ts
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  imports: [FormsModule],
  template: `
    <main>
      <h2>Hello {{ firstName }}!</h2>
      <input type="text" [(ngModel)]="firstName" />
    </main>
  `
})
export class AppComponent {
  firstName = 'Ada';
}
```

### コンポーネント間の双方向バインディング

```angular-ts
// ./app.component.ts
import { Component } from '@angular/core';
import { CounterComponent } from './counter/counter.component';

@Component({
  selector: 'app-root',
  imports: [CounterComponent],
  template: `
    <main>
      <h1>Counter: {{ initialCount }}</h1>
      <app-counter [(count)]="initialCount"></app-counter>
    </main>
  `,
})
export class AppComponent {
  initialCount = 18;
}
```

```angular-ts
// './counter/counter.component.ts';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-counter',
  template: `
    <button (click)="updateCount(-1)">-</button>
    <span>{{ count }}</span>
    <button (click)="updateCount(+1)">+</button>
  `,
})
export class CounterComponent {
  @Input() count: number;
  @Output() countChange = new EventEmitter<number>();

  updateCount(amount: number): void {
    this.count += amount;
    this.countChange.emit(this.count);
  }
}
```

## 組み込み制御フロー

Angular テンプレートは制御フローブロックをサポートしており、要素の表示、非表示、繰り返しを条件付きで行うことができます。

### `@if`、`@else-if`、`@else`で条件付きのコンテンツを表示する

```angular-html
@if (a > b) {
  <p>{{a}} is greater than {{b}}</p>
} @else if (b > a) {
  <p>{{a}} is less than {{b}}</p>
} @else {
  <p>{{a}} is equal to {{b}}</p>
}
```

#### 条件式の結果への参照

```angular-html
@if (user.profile.settings.startDate; as startDate) {
  {{ startDate }}
}
```

### `@for`ブロックでコンテンツを繰り返す

```angular-html
@for (item of items; track item.id) {
  {{ item.name }}
}
```

#### `@for`ブロックのコンテキスト変数

```angular-html
@for (item of items; track item.id; let idx = $index, e = $even) {
  <p>Item #{{ idx }}: {{ item.name }}</p>
}
```

#### `@empty`ブロックを使用した`@for`ブロックのフォールバックの提供

```angular-html
@for (item of items; track item.name) {
  <li> {{ item.name }}</li>
} @empty {
  <li aria-hidden="true"> There are no items.</li>
}
```

### `@switch`ブロックを使用して条件付きでコンテンツを表示する

```angular-html
@switch (userPermissions) {
  @case ('admin') {
    <app-admin-dashboard />
  }
  @case ('reviewer') {
    <app-reviewer-dashboard />
  }
  @case ('editor') {
    <app-editor-dashboard />
  }
  @default {
    <app-viewer-dashboard />
  }
}
```

## パイプ

パイプは、Angular テンプレート式で、テンプレート内のデータを宣言的に変換することを可能にする特別な演算子です。

```angular-ts
import { Component } from '@angular/core';
import { CurrencyPipe, DatePipe, TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [CurrencyPipe, DatePipe, TitleCasePipe],
  template: `
    <main>
      <h1>Purchases from {{ company | titlecase }} on {{ purchasedOn | date }}</h1>
      <p>Total: {{ amount | currency }}</p>
    </main>
  `,
})
export class ShoppingCartComponent {
  amount = 123.45;
  company = 'acme corporation';
  purchasedOn = '2024-07-08';
}
```

### 同じ式で複数のパイプを組み合わせる

```angular-html
<p>The event will occur on {{ scheduledOn | date | uppercase }}.</p>
```

### パイプにパラメータを渡す

```angular-html
<p>The event will occur at {{ scheduledOn | date:'hh:mm':'UTC' }}.</p>
```

### カスタムパイプの作成

```angular-ts
// kebab-case.pipe.ts
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'kebabCase',
})
export class KebabCasePipe implements PipeTransform {
  transform(value: string): string {
    return value.toLowerCase().replace(/ /g, '-');
  }
}
```

## ng-content による子コンテンツのスロット化

`<ng-content>`は、マークアップまたはテンプレートフラグメントを受け取って、コンポーネントがコンテンツをレンダリングする方法を制御する特殊な要素です。

```angular-ts
// ./base-button/base-button.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'button[baseButton]',
  template: `
      <ng-content />
  `,
})
export class BaseButton {}
```

```angular-ts
// ./app.component.ts
import { Component } from '@angular/core';
import { BaseButton } from './base-button/base-button.component.ts';

@Component({
  selector: 'app-root',
  imports: [BaseButton],
  template: `
    <button baseButton>
      Next <span class="icon arrow-right" />
    </button>
  `,
})
export class AppComponent {}
```

## ng-template によるテンプレートフラグメントの作成

`<ng-template>`要素を使用すると、**テンプレートフラグメント**、つまり動的またはプログラムによってレンダリングできるコンテンツのセクションを宣言できます。

### テンプレートフラグメントの作成

```angular-html
<p>これは通常の要素です</p>

<ng-template>
  <p>これはテンプレートフラグメントです</p>
</ng-template>
```

### テンプレートフラグメントへの参照の取得

```angular-html
<p>これは通常の要素です</p>

<ng-template #myFragment>
  <p>これはテンプレートフラグメントです</p>
</ng-template>
```

### テンプレートフラグメントのレンダリング

```angular-html
<p>これは通常の要素です</p>

<ng-template #myFragment>
  <p>これはフラグメントです</p>
</ng-template>

<ng-container *ngTemplateOutlet="myFragment"></ng-container>
```

### テンプレートフラグメントのレンダリング時のパラメータの受け渡し

```angular-html
<ng-template #myFragment let-pizzaTopping="topping">
  <p>選択したのは: {{pizzaTopping}}</p>
</ng-template>

<ng-container
  [ngTemplateOutlet]="myFragment"
  [ngTemplateOutletContext]="{topping: '玉ねぎ'}"
/>
```

## ng-container による要素のグループ化

`<ng-container>`は Angular の特別な要素で、複数の要素をグループ化したり、DOM に実際の要素をレンダリングせずにテンプレート内の場所をマークしたりします。

```angular-html
<!-- コンポーネントテンプレート -->
<section>
  <ng-container>
    <h3>User bio</h3>
    <p>Here's some info about the user</p>
  </ng-container>
</section>
```

```angular-html
<!-- レンダリングされたDOM -->
<section>
  <h3>User bio</h3>
  <p>Here's some info about the user</p>
</section>
```

### `<ng-container>`を使用して動的なコンテンツを表示する

```angular-ts
@Component({
  template: `
    <h2>Your profile</h2>
    <ng-container [ngComponentOutlet]="profileComponent()" />
  `
})
export class UserProfile {
  isAdmin = input(false);
  profileComponent = computed(() => this.isAdmin() ? AdminProfile : BasicUserProfile);
}
```

### `<ng-container>`を構造ディレクティブで使用

```angular-html
<ng-container *ngIf="permissions == 'admin'">
  <h1>Admin Dashboard</h1>
  <admin-infographic></admin-infographic>
</ng-container>

<ng-container *ngFor="let item of items; index as i; trackBy: trackByFn">
  <h2>{{ item.title }}</h2>
  <p>{{ item.description }}</p>
</ng-container>
```

## テンプレート内の変数

Angular には、テンプレート内で 2 種類の変数宣言があります。ローカルテンプレート変数とテンプレート参照変数です。

### `@let`を使ったローカルテンプレート変数

```angular-html
@let name = user.name;
@let greeting = 'Hello, ' + name;
@let data = data$ | async;
@let pi = 3.1459;
@let coordinates = {x: 50, y: 100};
```

#### `@let`の値を参照する

```angular-html
@let user = user$ | async;

@if (user) {
  <h1>Hello, {{user.name}}</h1>
  <user-avatar [photo]="user.photo"/>

  <ul>
    @for (snack of user.favoriteSnacks; track snack.id) {
      <li>{{snack.name}}</li>
    }
  </ul>

  <button (click)="update(user)">Update profile</button>
}
```

### テンプレート参照変数

```angular-html
<!-- "taskInput" という名前のテンプレート参照変数を、HTMLInputElementに関連付ける -->
<input #taskInput placeholder="Enter task name">
```

#### テンプレート参照変数に値を代入する

```angular-html
<!-- `startDate` 変数は、`MyDatepicker` のインスタンスに代入されます。 -->
<my-datepicker #startDate />
```

## @defer による遅延読み込み

遅延可能ビュー（別名`@defer`ブロック）は、ページの初期レンダリングに厳密に必要ないコードの読み込みを遅らせることで、アプリケーションの初期バンドルサイズを削減します。

```angular-html
@defer {
  <large-component />
}
```

### `@placeholder`でプレースホルダーコンテンツを表示する

```angular-html
@defer {
  <large-component />
} @placeholder {
  <p>プレースホルダーコンテンツ</p>
}
```

### `@loading`で読み込みコンテンツを表示する

```angular-html
@defer {
  <large-component />
} @loading {
  <img alt="読み込み中..." src="loading.gif" />
} @placeholder {
  <p>プレースホルダーコンテンツ</p>
}
```

### 遅延読み込みが失敗した場合に`@error`でエラー状態を表示する

```angular-html
@defer {
  <large-component />
} @error {
  <p>大型コンポーネントの読み込みに失敗しました。</p>
}
```

### トリガーを使用した遅延コンテンツ読み込みの制御

```angular-html
@defer (on viewport) {
  <large-cmp />
} @placeholder {
  <div>大型コンポーネントのプレースホルダー</div>
}
```

#### 利用可能なトリガー

- `idle`: ブラウザがアイドル状態になるとトリガーされます。
- `viewport`: 指定されたコンテンツがビューポートに入るとトリガーされます。
- `interaction`: ユーザーが指定された要素と対話するとトリガーされます。
- `hover`: マウスが指定された領域にホバーするとトリガーされます。
- `immediate`: 遅延されていないコンテンツのレンダリングが完了した直後にトリガーされます。
- `timer`: 特定の期間後にトリガーされます。

### `prefetch`でデータをプリフェッチする

```angular-html
@defer (on interaction; prefetch on idle) {
  <large-cmp />
} @placeholder {
  <div>大型コンポーネントのプレースホルダー</div>
}
```

## 式構文

Angular の式構文は、JavaScript に基づいていますが、いくつかの重要な点で異なります。

### サポートされる値リテラル

| リテラルタイプ | 例                              |
| -------------- | ------------------------------- |
| 文字列         | `'Hello'`, `"World"`            |
| ブール値       | `true`, `false`                 |
| 数値           | `123`, `3.14`                   |
| オブジェクト   | `{name: 'Alice'}`               |
| 配列           | `['Onion', 'Cheese', 'Garlic']` |
| null           | `null`                          |

### サポートされる演算子

| 演算子               | 例(複数)                                 |
| -------------------- | ---------------------------------------- |
| 加算/連結            | `1 + 2`                                  |
| 減算                 | `52 - 3`                                 |
| 乗算                 | `41 * 6`                                 |
| 除算                 | `20 / 4`                                 |
| 余り（剰余）         | `17 % 5`                                 |
| 括弧                 | `9 * (8 + 4)`                            |
| 条件式（三項演算子） | `a > b ? true : false`                   |
| 論理積               | `&&`                                     |
| 論理和               | `\|\|`                                   |
| 論理否定             | `!`                                      |
| null 合体演算子      | `const foo = null ?? 'default'`          |
| 比較演算子           | `<`, `<=`, `>`, `>=`, `==`, `===`, `!==` |
| パイプ               | `{{ total \| currency }}`                |

## テンプレート内の空白

デフォルトで、Angular テンプレートはフレームワークが不要とみなす空白を保持しません。

### 空白を保持する

```angular-ts
@Component({
  /* ... */,
  preserveWhitespaces: true,
  template: `
    <p>Hello         world</p>
  `
})
```

また、Angular 独自の特別な HTML エンティティ`&ngsp;`も使用できます。このエンティティは、コンパイルされた出力で保持される単一のスペース文字を生成します。

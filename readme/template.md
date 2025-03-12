<docs-decorative-header title="テンプレート構文" imgSrc="adev/src/assets/images/templates.svg"> <!-- markdownlint-disable-line -->
Angular におけるテンプレートとは、HTML の断片です。
テンプレート内で特別な構文を使用することで、Angular の多くの機能を活用できます。
</docs-decorative-header>

Tip: この包括的なガイドに進む前に、Angular の[基本概念](essentials/templates)をご覧ください。

すべての Angular コンポーネントには、コンポーネントがページにレンダリングする[DOM](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model)を定義する**テンプレート**があります。テンプレートを使用することで、Angular はデータが変化してもページを自動的に最新の状態に保つことができます。

テンプレートは通常、`*.component.ts`ファイルの`template`プロパティまたは`*.component.html`ファイル内にあります。詳細については、[コンポーネントに関する詳細なガイド](/guide/components)をご覧ください。

## テンプレートはどのように動作しますか？

テンプレートは、[HTML](https://developer.mozilla.org/en-US/docs/Web/HTML)構文に基づいており、組み込みのテンプレート関数、データバインディング、イベントリスニング、変数など、追加の機能が備わっています。

Angular はテンプレートを JavaScript にコンパイルして、アプリケーションの内部的な理解を構築します。これにより、Angular がアプリケーションに自動的に適用する組み込みのレンダリング最適化が実現されます。

### 標準 HTML との違い

テンプレートと標準 HTML 構文の違いには、次のようなものがあります。

- テンプレートソースコード内のコメントは、レンダリングされた出力に含まれません。
- コンポーネントとディレクティブの要素は、自己クローズできます（例：`<UserProfile />`）。
- 特定の文字（`[]`、`()`など）を持つ属性は、Angular にとって特別な意味を持ちます。詳細については、[バインディングドキュメント](guide/templates/binding)と[イベントリスナーの追加に関するドキュメント](guide/templates/event-listeners)をご覧ください。
- `@`文字は、[制御フロー](guide/templates/control-flow)などのテンプレートに動的な動作を追加するための Angular にとって特別な意味を持ちます。リテラルの`@`文字を含めるには、HTML エンティティコード（`&commat;`または`&#64;`）としてエスケープします。
- Angular は不要な空白文字を無視して折り畳みます。詳細については、[テンプレート内の空白](guide/templates/whitespace)をご覧ください。
- Angular は、動的コンテンツのプレースホルダーとしてコメントノードをページに追加する場合がありますが、開発者はこれらを無視できます。

さらに、ほとんどの HTML 構文は有効なテンプレート構文ですが、Angular はテンプレート内の`<script>`要素をサポートしていません。詳細については、[セキュリティ](best-practices/security)ページをご覧ください。

## 次に何をするか？

以下のトピックにも興味があるかもしれません。

| トピック                                                                        | 詳細                                                               |
| :------------------------------------------------------------------------------ | :----------------------------------------------------------------- |
| [動的なテキスト、プロパティ、属性のバインディング](guide/templates/binding)     | 動的なデータをテキスト、プロパティ、属性にバインドします。         |
| [イベントリスナーの追加](guide/templates/event-listeners)                       | テンプレート内でイベントに応答します。                             |
| [双方向バインディング](guide/templates/two-way-binding)                         | 値を同時にバインドし、変更を伝播します。                           |
| [制御フロー](guide/templates/control-flow)                                      | 要素の表示、非表示、繰り返しを条件付きで行います。                 |
| [パイプ](guide/templates/pipes)                                                 | データを宣言的に変換します。                                       |
| [ng-content による子コンテンツのスロット化](guide/templates/ng-content)         | コンポーネントがコンテンツをレンダリングする方法を制御します。     |
| [ng-template によるテンプレートフラグメントの作成](guide/templates/ng-template) | テンプレートフラグメントを宣言します。                             |
| [ng-container による要素のグループ化](guide/templates/ng-container)             | 複数の要素をグループ化するか、レンダリングする場所をマークします。 |
| [テンプレート内の変数](guide/templates/variables)                               | 変数の宣言について学びます。                                       |
| [@defer による遅延読み込み](guide/templates/defer)                              | `@defer`を使用して遅延可能ビューを作成します。                     |
| [式構文](guide/templates/expression-syntax)                                     | Angular 式と標準 JavaScript の違いについて学びます。               |
| [テンプレート内の空白](guide/templates/whitespace)                              | Angular が空白をどのように処理するかについて学びます。             |

# 動的なテキスト、プロパティ、属性のバインディング

Angular では、**バインディング**によってコンポーネントのテンプレートとそのデータ間に動的な接続が作成されます。この接続により、コンポーネントのデータの変更がレンダリングされたテンプレートに自動的に反映されます。

## テキスト補間による動的テキストのレンダリング {#render-dynamic-text-with-text-interpolation}

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

テーマの例を続けると、ユーザーがページの読み込み後に`theme`の値を`'light'`に変更するボタンをクリックした場合、ページはそれに応じて以下のように更新されます。

```angular-html
<!-- Rendered Output -->
<p>Your color preference is light.</p>
```

テキスト補間は、HTML で通常テキストを記述する場所ならどこでも使用できます。

すべての式の値は文字列に変換されます。オブジェクトと配列は、値の`toString`メソッドを使用して変換されます。

## 動的なプロパティと属性のバインディング

Angular は、角括弧を使用して、動的な値をオブジェクトのプロパティと HTML 属性にバインドすることをサポートしています。

HTML 要素の DOM インスタンス、[コンポーネント](guide/components)インスタンス、または[ディレクティブ](guide/directives)インスタンスのプロパティにバインドできます。

### ネイティブ要素のプロパティ

すべての HTML 要素には、対応する DOM 表現があります。たとえば、各`<button>`HTML 要素は、DOM 内の`HTMLButtonElement`のインスタンスに対応します。Angular では、プロパティバインディングを使用して、要素の DOM 表現に直接値を設定します。

```angular-html
<!-- ボタン要素のDOMオブジェクトの`disabled`プロパティをバインドします -->
<button [disabled]="isFormValid">Save</button>
```

この例では、`isFormValid`が変更されるたびに、Angular は`HTMLButtonElement`インスタンスの`disabled`プロパティを自動的に設定します。

### コンポーネントとディレクティブのプロパティ

要素が Angular コンポーネントの場合、同じ角括弧構文を使用して、コンポーネントの入力プロパティに値を設定するためにプロパティバインディングを使用できます。

```angular-html
<!-- `MyListbox`コンポーネントインスタンスの`value`プロパティをバインドします。 -->
<my-listbox [value]="mySelection" />
```

この例では、`mySelection`が変更されるたびに、Angular は`MyListbox`インスタンスの`value`プロパティを自動的に設定します。

ディレクティブのプロパティにもバインドできます。

```angular-html
<!-- `NgOptimizedImage`ディレクティブの`ngSrc`プロパティにバインドします  -->
<img [ngSrc]="profilePhotoUrl" alt="The current user's profile photo">
```

### 属性

対応する DOM プロパティを持たない HTML 属性（ARIA 属性や SVG 属性など）を設定する必要がある場合は、テンプレート内の要素に属性をバインドするために`attr.`プレフィックスを使用できます。

```angular-html
<!-- `<ul>`要素の`role`属性をコンポーネントの`listRole`プロパティにバインドします。 -->
<ul [attr.role]="listRole">
```

この例では、`listRole`が変更されるたびに、Angular は`setAttribute`を呼び出して`<ul>`要素の`role`属性を自動的に設定します。

属性バインディングの値が`null`の場合、Angular は`removeAttribute`を呼び出して属性を削除します。

### プロパティと属性でのテキスト補間

二重中括弧構文を使用して、プロパティと属性にテキスト補間構文を使用できます。この構文を使用すると、Angular は代入をプロパティバインディングとして扱います。

```angular-html
<!-- 画像要素のDOMオブジェクトの`alt`プロパティに値をバインドします。 -->
<img src="profile-photo.jpg" alt="Profile photo of {{ firstName }}" >
```

テキスト補間構文を使用して属性にバインドするには、属性名の前に`attr.`を付けます。

```angular-html
<button attr.aria-label="Save changes to {{ objectType }}">
```

## CSS クラスとスタイルプロパティのバインディング

Angular は、要素に CSS クラスと CSS スタイルプロパティをバインドするための追加機能をサポートしています。

### CSS クラス

CSS クラスバインディングを作成して、バインドされた値が[真偽値](https://developer.mozilla.org/en-US/docs/Glossary/Truthy)かどうかによって、要素に CSS クラスを追加または削除できます。

```angular-html
<!-- `isExpanded`が真偽値の場合、`expanded`CSSクラスを追加します。 -->
<ul [class.expanded]="isExpanded">
```

`class`プロパティに直接バインドもできます。Angular は、3 種類の値を受け付けます。

| `class`値の説明                                                                                                           | TypeScript 型         |
| ------------------------------------------------------------------------------------------------------------------------- | --------------------- |
| スペースで区切られた 1 つ以上の CSS クラスを含む文字列                                                                    | `string`              |
| CSS クラス文字列の配列                                                                                                    | `string[]`            |
| 各プロパティ名が CSS クラス名で、対応する値がそのクラスが要素に適用されるかどうかを真偽値に基づいて決定するオブジェクト。 | `Record<string, any>` |

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

上記の例は、以下の DOM をレンダリングします。

```angular-html
<ul class="full-width outlined"> ... </ul>
<section class="expandable elevated"> ... </section>
<button class="highlighted"> ... </button>
```

Angular は、有効な CSS クラス名ではない文字列値を無視します。

静的 CSS クラスを使用する場合、`class`に直接バインドする場合、および特定のクラスをバインドする場合、Angular はレンダリングされた結果ですべてのクラスをインテリジェントに組み合わせます。

```angular-ts
@Component({
  template: `<ul class="list" [class]="listType" [class.expanded]="isExpanded"> ...`,
  ...
})
export class Listbox {
  listType = 'box';
  isExpanded = true;
}
```

上記の例では、Angular は`ul`要素を 3 つの CSS クラスすべてでレンダリングします。

```angular-html
<ul class="list box expanded">
```

Angular は、レンダリングされた要素の CSS クラスの特定の順序を保証しません。

`class`を配列かオブジェクトにバインドする場合、Angular は以前の値と現在の値を三重等号演算子(`===`)を使用して比較します。これらの値を変更する場合は、Angular が更新を適用するために新しいオブジェクトか配列インスタンスを作成する必要があります。

要素に同じ CSS クラスの複数のバインディングがある場合、Angular はスタイルの優先順位に従って競合を解決します。

### CSS スタイルプロパティ

要素に直接 CSS スタイルプロパティをバインドできます。

```angular-html
<!-- `isExpanded`プロパティに基づいてCSSの`display`プロパティを設定します。 -->
<section [style.display]="isExpanded ? 'block' : 'none'">
```

単位を受け付ける CSS プロパティについては、さらに単位を指定できます。

```angular-html
<!-- `sectionHeightInPixels`プロパティに基づいてCSSの`height`プロパティをピクセル値に設定します。 -->
<section [style.height.px]="sectionHeightInPixels">
```

複数のスタイル値を 1 つのバインディングで設定もできます。Angular は、以下の種類の値を受け付けます。

| `style`値の説明                                                                              | TypeScript 型         |
| -------------------------------------------------------------------------------------------- | --------------------- |
| `"display: flex; margin: 8px"`などの、0 個以上の CSS 宣言を含む文字列。                      | `string`              |
| 各プロパティ名が CSS プロパティ名で、対応する値がその CSS プロパティの値であるオブジェクト。 | `Record<string, any>` |

```angular-ts
@Component({
  template: `
    <ul [style]="listStyles"> ... </ul>
    <section [style]="sectionStyles"> ... </section>
  `,
  ...
})
export class UserProfile {
  listStyles = 'display: flex; padding: 8px';
  sectionStyles = {
    border: '1px solid black',
    'font-weight': 'bold',
  };
}
```

上記の例は、以下の DOM をレンダリングします。

```angular-html
<ul style="display: flex; padding: 8px"> ... </ul>
<section style="border: 1px solid black; font-weight: bold"> ... </section>
```

`style`をオブジェクトにバインドする場合、Angular は以前の値と現在の値を 3 つ等しい演算子(`===`)を使用して比較します。これらの値を変更する場合は、Angular が更新を適用するために、新しいオブジェクトインスタンスを作成する必要があります。

要素に同じスタイルプロパティの複数のバインディングがある場合、Angular はスタイルの優先順位に従って競合を解決します。

# イベントリスナーの追加

Angular は、イベント名とイベントが発生するたびに実行されるステートメントを括弧で囲むことで、テンプレート内の要素にイベントリスナーを定義することをサポートしています。

## ネイティブイベントのリスナー

HTML 要素にイベントリスナーを追加する場合は、イベントを括弧 `()` で囲みます。これにより、リスナーのステートメントを指定できます。

```angular-ts
@Component({
  template: `
    <input type="text" (keyup)="updateField()" />
  `,
  ...
})
export class AppComponent({
  updateField(): void {
    console.log('Field is updated!');
  }
})
```

この例では、Angular は `<input>` 要素が `keyup` イベントを発行するたびに `updateField` を呼び出します。

`click`、`keydown`、`mouseover` などのネイティブイベントのリスナーを追加できます。詳細については、[MDN の要素のすべての利用可能なイベント](https://developer.mozilla.org/en-US/docs/Web/API/Element#events)をご覧ください。

## イベント引数へのアクセス

Angular は、すべてのテンプレートイベントリスナーで、イベントオブジェクトへの参照を含む `$event` という名前の変数を提供します。

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

## キー修飾子の使用

特定のキーの特定のキーボードイベントをキャプチャする場合は、次のようなコードを記述できます。

```angular-ts
@Component({
  template: `
    <input type="text" (keyup)="updateField($event)" />
  `,
  ...
})
export class AppComponent {
  updateField(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      console.log('The user pressed enter in the text field.');
    }
  }
}
```

ただし、これは一般的なシナリオであるため、Angular ではピリオド（`.`）文字を使用して特定のキーを指定することでイベントをフィルタリングできます。これにより、コードを簡素化できます。

```angular-ts
@Component({
  template: `
    <input type="text" (keyup.enter)="updateField($event)" />
  `,
  ...
})
export class AppComponent({
  updateField(event: KeyboardEvent): void {
    console.log('The user pressed enter in the text field.');
  }
})
```

追加のキー修飾子を追加できます。

```angular-html
<!-- Matches shift and enter -->
<input type="text" (keyup.shift.enter)="updateField($event)" />
```

Angular は、`alt`、`control`、`meta`、`shift` の修飾子をサポートしています。

キーボードイベントにバインドするキーまたはコードを指定できます。キーとコードフィールドは、ブラウザのキーボードイベントオブジェクトのネイティブな部分です。デフォルトでは、イベントバインディングは、[キーボードイベントのキー値](https://developer.mozilla.org/docs/Web/API/UI_Events/Keyboard_event_key_values)を使用することを前提としています。

Angular では、組み込みの `code` サフィックスを提供することで、[キーボードイベントのコード値](https://developer.mozilla.org/docs/Web/API/UI_Events/Keyboard_event_code_values)も指定できます。

```angular-html
<!-- Matches alt and left shift -->
<input type="text" (keydown.code.alt.leftshift)="updateField($event)" />
```

これは、異なるオペレーティングシステム間でキーボードイベントを一貫して処理する場合に役立ちます。たとえば、MacOS デバイスで Alt キーを使用する場合、`key` プロパティは Alt キーで既に修飾された文字に基づいてキーを報告します。これは、Alt + S のような組み合わせが `'ß'` の `key` 値を報告することを意味します。ただし、`code` プロパティは、生成された文字ではなく、押された物理的なまたは仮想的なボタンに対応します。

# 双方向バインディング

**双方向バインディング**は、要素に値をバインドすると同時に、その要素が変更をバインディングを通じて伝播できるようにする、簡潔な方法です。

## 構文

双方向バインディングの構文は、角括弧 `[]` と丸括弧 `()` を組み合わせた `[()]` です。これはプロパティバインディングの構文 `[]` とイベントバインディングの構文 `()` を組み合わせたものです。Angular コミュニティでは、この構文を非公式に「バナナインボックス」と呼んでいます。

## フォームコントロールでの双方向バインディング

開発者は、ユーザーがコントロールを操作したときに、コンポーネントデータとフォームコントロールを同期させるために、双方向バインディングを頻繁に使用します。たとえば、ユーザーがテキスト入力に入力すると、コンポーネントの状態が更新されます。

次の例では、ページの `firstName` 属性が動的に更新されます。

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

ネイティブフォームコントロールで双方向バインディングを使用するには、次の手順を実行する必要があります。

1. `@angular/forms` から `FormsModule` をインポートする
1. 双方向バインディング構文（例：`[(ngModel)]`）で `ngModel` ディレクティブを使用する
1. 更新する状態（例：`firstName`）を割り当てる

これらが設定されると、Angular はテキスト入力の更新がコンポーネントの状態に正しく反映されるようにします。

[`NgModel`](guide/directives#displaying-and-updating-properties-with-ngmodel)の詳細については、公式ドキュメントを参照してください。

## コンポーネント間の双方向バインディング

親コンポーネントと子コンポーネント間の双方向バインディングを活用するには、フォーム要素と比較して、より多くの構成が必要です。

ここでは、`AppComponent` が初期カウント状態を設定しますが、カウンターの UI を更新およびレンダリングするためのロジックは、主にその子である `CounterComponent` にある例を示します。

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

### コンポーネント間の双方向バインディングを有効にする

上記の例をコアに分解すると、コンポーネントの双方向バインディングごとに、次のものが必要です。

子コンポーネントには、次のものが必要です。

1. `@Input()` プロパティ
1. `@Input()` プロパティと同じ名前で、最後に「Change」が追加された対応する `@Output()` イベントエミッター。エミッターは、`@Input()` プロパティと同じ型をエミットする必要があります。
1. `@Input()` の更新された値をイベントエミッターにエミットするメソッド

これは簡略化された例です。

```angular-ts
// './counter/counter.component.ts';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({ // 省略 })
export class CounterComponent {
  @Input() count: number;
  @Output() countChange = new EventEmitter<number>();

  updateCount(amount: number): void {
    this.count += amount;
    this.countChange.emit(this.count);
  }
}
```

親コンポーネントには、次のものが必要です。

1. `@Input()` プロパティ名を双方向バインディング構文で囲む。
1. 更新された値が割り当てられる対応するプロパティを指定する

これは簡略化された例です。

```angular-ts
// ./app.component.ts
import { Component } from '@angular/core';
import { CounterComponent } from './counter/counter.component';

@Component({
  selector: 'app-root',
  imports: [CounterComponent],
  template: `
    <main>
      <app-counter [(count)]="initialCount"></app-counter>
    </main>
  `,
})
export class AppComponent {
  initialCount = 18;
}
```

# 組み込み制御フロー

Angular テンプレートは制御フローブロックをサポートしており、要素の表示、非表示、繰り返しを条件付きで行うことができます。

Note: これらは、以前は\*ngIf、\*ngFor、\*ngSwitch ディレクティブで実現されました。

## `@if`、`@else-if`、`@else`で条件付きのコンテンツを表示する

`@if` ブロックは、条件式が真の場合に、そのコンテンツを条件付きで表示します。

```angular-html
@if (a > b) {
  <p>{{a}} is greater than {{b}}</p>
}
```

代替コンテンツを表示したい場合は、任意の数の `@else if` ブロックと単一の `@else` ブロックを指定できます。

```angular-html
@if (a > b) {
  {{a}} is greater than {{b}}
} @else if (b > a) {
  {{a}} is less than {{b}}
} @else {
  {{a}} is equal to {{b}}
}
```

### 条件式の結果への参照

`@if`条件式は、ブロック内で再利用できるように、条件式の結果を変数に保存できます。

```angular-html
@if (user.profile.settings.startDate; as startDate) {
  {{ startDate }}
}
```

これは、テンプレート内で読みやすく保守しやすいように長い式を参照するのに便利です。

## `@for`ブロックでコンテンツを繰り返す

`@for` ブロックは、コレクションをループし、ブロックのコンテンツを繰り返しレンダリングします。 コレクションは、任意の JavaScript の[反復可能オブジェクト](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Iteration_protocols)にできますが、Angular は `Array` 値に対して追加のパフォーマンス最適化を行っています。

一般的な `@for` ループは次のようになります。

```angular-html
@for (item of items; track item.id) {
  {{ item.name }}
}
```

Angular の `@for` ブロックは、JavaScript の `continue` や `break` のようなフロー変更のステートメントをサポートしていません。

### なぜ `@for` ブロックの `track` は重要なのか？

`track` 式を使用すると、Angular はデータとページ上の DOM ノードの関係を維持できます。 これにより、Angular はデータが変更されたときに、必要な DOM 操作を最小限に抑えてパフォーマンスを最適化できます。

`track` を効果的に使用すると、データコレクションをループ処理する場合に、アプリケーションのレンダリングパフォーマンスを大幅に向上させることができます。

`track` 式には、コレクション内の各アイテムを一意に識別するプロパティを選択します。 データモデルに一意の識別プロパティ（一般的には `id` または `uuid`）が含まれている場合は、この値を使用します。 データにこのようなフィールドが含まれていない場合は、追加することを強くお勧めします。

変更されない静的なコレクションの場合、`$index` を使用して、コレクション内のインデックスで各アイテムを追跡するように Angular に指示できます。

他のオプションが利用できない場合は、`identity` を指定できます。 これは、Angular に三重等号演算子 (`===`) を使用して参照の同一性でアイテムを追跡するように指示します。 Angular はどのデータアイテムがどの DOM ノードに対応するかをマップする方法がないため、可能な限りこのオプションを避けてください。レンダリングの更新が大幅に遅くなる可能性があります。

### `@for` ブロックのコンテキスト変数

`@for` ブロック内では、常にいくつかの暗黙の変数が使用できます。

| 変数     | 意味                                     |
| -------- | ---------------------------------------- |
| `$count` | 反復処理されたコレクション内のアイテム数 |
| `$index` | 現在の行のインデックス                   |
| `$first` | 現在の行が最初の行かどうか               |
| `$last`  | 現在の行が最後の行かどうか               |
| `$even`  | 現在の行インデックスが偶数かどうか       |
| `$odd`   | 現在の行インデックスが奇数かどうか       |

これらの変数は常にこれらの名前で使用できますが、`let` セグメントを使用して別名をつけることができます。

```angular-html
@for (item of items; track item.id; let idx = $index, e = $even) {
  <p>Item #{{ idx }}: {{ item.name }}</p>
}
```

別名は、`@for` ブロックをネストする場合に役立ちます。これにより、外側の `@for` ブロックから内側の `@for` ブロックの変数を取得できます。

### `@empty` ブロックを使用した `@for` ブロックのフォールバックの提供

`@for` ブロックのコンテンツの直後に、オプションで `@empty` セクションを含めることができます。 `@empty` ブロックのコンテンツは、アイテムがない場合に表示されます。

```angular-html
@for (item of items; track item.name) {
  <li> {{ item.name }}</li>
} @empty {
  <li aria-hidden="true"> There are no items.</li>
}
```

## `@switch` ブロックを使用して条件付きでコンテンツを表示する

`@if` ブロックはほとんどのシナリオで適していますが、`@switch` ブロックは条件付きでデータをレンダリングするための代替構文を提供します。 構文は JavaScript の `switch` 文と非常によく似ています。

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

条件式値は、三重等号 (`===`) 演算子を使用してケース式と比較されます。

**`@switch` にはフォールスルーはありません**。そのため、ブロックに `break` や `return` ステートメントに相当するものは必要ありません。

オプションで `@default` ブロックを含めることができます。 `@default` ブロックのコンテンツは、前のケース式のいずれもスイッチ値と一致しない場合に表示されます。

`@case` が式と一致せず、`@default` ブロックがない場合は、何も表示されません。

# パイプ

## 概要

パイプは、Angular テンプレート式で、テンプレート内のデータを宣言的に変換することを可能にする特別な演算子です。パイプを使用すると、変換関数を一度宣言し、その変換を複数のテンプレートで使用できます。Angular のパイプは、[Unix パイプ](<https://en.wikipedia.org/wiki/Pipeline_(Unix)>)に着想を得て、縦棒文字(`|`)を使用します。

Note: Angular のパイプ構文は、縦棒文字を[ビット単位の OR 演算子](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Bitwise_OR)に使用する標準的な JavaScript とは異なります。Angular テンプレート式では、ビット単位の演算子はサポートされていません。

Angular が提供するいくつかの組み込みパイプを使用した例を以下に示します。

```angular-ts
import { Component } from '@angular/core';
import { CurrencyPipe, DatePipe, TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [CurrencyPipe, DatePipe, TitleCasePipe],
  template: `
    <main>
       <!-- Transform the company name to title-case and
       transform the purchasedOn date to a locale-formatted string -->
<h1>Purchases from {{ company | titlecase }} on {{ purchasedOn | date }}</h1>

	    <!-- Transform the amount to a currency-formatted string -->
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

Angular がコンポーネントをレンダリングすると、ユーザーのロケールに基づいて適切な日付形式と通貨が保証されます。ユーザーが米国にいる場合、次のようにレンダリングされます。

```angular-html
<main>
  <h1>Purchases from Acme Corporation on Jul 8, 2024</h1>
  <p>Total: $123.45</p>
</main>
```

Angular による値のローカリゼーションの詳細については、[i18n に関する詳細ガイド](/guide/i18n)を参照してください。

### 組み込みパイプ

Angular には、`@angular/common`パッケージに組み込みパイプのセットが含まれています。

| 名前                                          | 説明                                                                               |
| --------------------------------------------- | ---------------------------------------------------------------------------------- |
| [`AsyncPipe`](api/common/AsyncPipe)           | `Promise`または RxJS`Observable`から値を読み取ります。                             |
| [`CurrencyPipe`](api/common/CurrencyPipe)     | ロケールルールに従って、数値を通貨文字列に変換します。                             |
| [`DatePipe`](api/common/DatePipe)             | ロケールルールに従って`Date`値をフォーマットします。                               |
| [`DecimalPipe`](api/common/DecimalPipe)       | ロケールルールに従って、数値を小数点を含む文字列に変換します。                     |
| [`I18nPluralPipe`](api/common/I18nPluralPipe) | ロケールルールに従って、値を値の複数形にする文字列にマップします。                 |
| [`I18nSelectPipe`](api/common/I18nSelectPipe) | キーを、目的の値を返すカスタムセレクターにマップします。                           |
| [`JsonPipe`](api/common/JsonPipe)             | デバッグのために、オブジェクトを`JSON.stringify`を使用した文字列表現に変換します。 |
| [`KeyValuePipe`](api/common/KeyValuePipe)     | オブジェクトまたは Map を、キーと値のペアの配列に変換します。                      |
| [`LowerCasePipe`](api/common/LowerCasePipe)   | テキストをすべて小文字に変換します。                                               |
| [`PercentPipe`](api/common/PercentPipe)       | ロケールルールに従って、数値をパーセンテージ文字列に変換します。                   |
| [`SlicePipe`](api/common/SlicePipe)           | 要素のサブセット（スライス）を含む新しい配列または文字列を作成します。             |
| [`TitleCasePipe`](api/common/TitleCasePipe)   | テキストをタイトルケースに変換します。                                             |
| [`UpperCasePipe`](api/common/UpperCasePipe)   | テキストをすべて大文字に変換します。                                               |

## パイプの使用

Angular のパイプ演算子は、テンプレート式内で縦棒文字(`|`)を使用します。パイプ演算子は二項演算子です。左側のオペランドは変換関数に渡される値であり、右側のオペランドはパイプの名前とその後の追加の引数（下記参照）です。

```angular-html
<p>Total: {{ amount | currency }}</p>
```

この例では、`amount`の値は、パイプ名が`currency`である`CurrencyPipe`に渡されます。その後、ユーザーのロケールに対するデフォルトの通貨がレンダリングされます。

### 同じ式で複数のパイプを組み合わせる

複数のパイプ演算子を使用することで、値に複数の変換を適用できます。Angular はパイプを左から右に実行します。

次の例は、ローカライズされた日付をすべて大文字で表示するために、パイプの組み合わせを示しています。

```angular-html
<p>The event will occur on {{ scheduledOn | date | uppercase }}.</p>
```

### パイプにパラメータを渡す

一部のパイプは、変換を構成するためのパラメータを受け入れます。パラメータを指定するには、パイプ名の後にコロン(`:`)とパラメータ値を付けます。

たとえば、`DatePipe`は、日付を特定の方法でフォーマットするためのパラメータを受け取ることができます。

```angular-html
<p>The event will occur at {{ scheduledOn | date:'hh:mm' }}.</p>
```

一部のパイプは、複数のパラメータを受け入れる場合があります。追加のパラメータ値は、コロン文字(`:`)で区切って指定できます。

たとえば、タイムゾーンを制御するために、2 番目のオプションのパラメータを渡すこともできます。

```angular-html
<p>The event will occur at {{ scheduledOn | date:'hh:mm':'UTC' }}.</p>
```

## パイプの動作

概念的には、パイプは入力値を受け取り、変換された値を返す関数です。

```angular-ts
import { Component } from '@angular/core';
import { CurrencyPipe} from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [CurrencyPipe],
  template: `
    <main>
      <p>Total: {{ amount | currency }}</p>
    </main>
  `,
})
export class AppComponent {
  amount = 123.45;
}
```

この例では、次のようになります。

1. `CurrencyPipe`は`@angular/common`からインポートされます
1. `CurrencyPipe`は`imports`配列に追加されます
1. `amount`データは`currency`パイプに渡されます

### パイプ演算子の優先順位

パイプ演算子は、`+`, `-`, `*`, `/`, `%`, `&&`, `||`, `??`などの他の二項演算子よりも優先順位が低くなっています。

```angular-html
<!-- firstName and lastName are concatenated before the result is passed to the uppercase pipe -->
{{ firstName + lastName | uppercase }}
```

パイプ演算子は、条件（三項）演算子よりも優先順位が高くなっています。

```angular-html
{{ (isAdmin ? 'Access granted' : 'Access denied') | uppercase }}
```

同じ式を括弧なしで記述した場合:

```angular-html
{{ isAdmin ? 'Access granted' : 'Access denied' | uppercase }}
```

代わりに次のように解析されます。

```angular-html
{{ isAdmin ? 'Access granted' : ('Access denied' | uppercase) }}
```

演算子の優先順位が不明確な場合は、常に式に括弧を使用してください。

### パイプによる変更検知

デフォルトでは、すべてのパイプは`pure`と見なされます。これは、プリミティブ入力値（`String`、`Number`、`Boolean`、`Symbol`など）または変更されたオブジェクト参照（`Array`、`Object`、`Function`、`Date`など）のみが実行されることを意味します。純粋なパイプは、Angular が渡された値が変更されていない場合に、変換関数を呼び出さないようにできるので、パフォーマンス上の利点があります。

その結果、オブジェクトプロパティや配列項目の変更は、オブジェクトまたは配列参照の全体が別のインスタンスに置き換えられない限り検出されません。このレベルの変更検知が必要な場合は、[配列やオブジェクト内の変更の検出](#detecting-change-within-arrays-or-objects)を参照してください。

## カスタムパイプの作成

`@Pipe`デコレーターを使用して TypeScript クラスを実装することで、カスタムパイプを定義できます。パイプには、次の 2 つの要素が必要です。

- パイプデコレーターで指定された名前
- 値を変換する`transform`という名前のメソッド

TypeScript クラスは、さらに`PipeTransform`インターフェースを実装して、パイプの型シグネチャを満たす必要があります。

文字列をケバブケースに変換するカスタムパイプの例を以下に示します。

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

### `@Pipe`デコレーターの使用

カスタムパイプを作成する際は、`@angular/core`パッケージから`Pipe`をインポートし、TypeScript クラスのデコレーターとして使用します。

```angular-ts
import { Pipe } from '@angular/core';

@Pipe({
  name: 'myCustomTransformation',
})
export class MyCustomTransformationPipe {}
```

`@Pipe` デコレーターは `name` を必要とします。この `name` は、テンプレート内でパイプをどのように使用するかを制御します。

### カスタムパイプの名前付け規則

カスタムパイプの名前付け規則は、次の 2 つの規則で構成されます。

- `name` - camelCase が推奨されます。ハイフンは使用しないでください。
- `クラス名` - `name`の PascalCase バージョンに`Pipe`を追加したもの

### `PipeTransform`インターフェースの実装

`@Pipe`デコレーターに加えて、カスタムパイプは常に`@angular/core`の`PipeTransform`インターフェースを実装する必要があります。

```angular-ts
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'myCustomTransformation',
})
export class MyCustomTransformationPipe implements PipeTransform {}
```

このインターフェースを実装することで、パイプクラスが正しい構造を持つことが保証されます。

### パイプの値を変換する

すべての変換は、最初の引数が渡される値で、戻り値が変換された値である`transform`メソッドによって呼び出されます。

```angular-ts
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'myCustomTransformation',
})
export class MyCustomTransformationPipe implements PipeTransform {
  transform(value: string): string {
    return `My custom transformation of ${value}.`
  }
}
```

### カスタムパイプにパラメータを追加する

`transform`メソッドに additional parameters を追加することで、変換にパラメータを追加できます。

```angular-ts
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'myCustomTransformation',
})
export class MyCustomTransformationPipe implements PipeTransform {
  transform(value: string, format: string): string {
    let msg = `My custom transformation of ${value}.`

    if (format === 'uppercase') {
      return msg.toUpperCase()
    } else {
      return msg
    }
  }
}
```

### 配列またはオブジェクト内の変更を検出する {#detecting-change-within-arrays-or-objects}

パイプで配列またはオブジェクト内の変更を検出する必要がある場合は、`pure`フラグを`false`の値で渡すことで、パイプを不純な関数としてマークする必要があります。

不純なパイプは、本当に必要な場合にのみ作成してください。不純なパイプは、注意深く使用しないと、パフォーマンスに大きな影響を与える可能性があります。

```angular-ts
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'joinNamesImpure',
  pure: false,
})
export class JoinNamesImpurePipe implements PipeTransform {
  transform(names: string[]): string {
    return names.join();
  }
}
```

Angular 開発者は、パイプの`name`とクラス名に`Impure`を含めるという慣習を採用して、他の開発者に潜在的なパフォーマンス上の問題を知らせます。

# `<ng-content>` による親コンポーネントからのテンプレートのレンダリング

`<ng-content>` は、マークアップまたはテンプレートフラグメントを受け取って、コンポーネントがコンテンツをレンダリングする方法を制御する特殊な要素です。これは、実際の DOM 要素をレンダリングしません。

以下は、親からマークアップを受け取る `BaseButton` コンポーネントの例です。

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

詳細については、[`<ng-content>` の詳細ガイド](/guide/components/content-projection) で、このパターンを活用する他の方法を確認してください。

# `<ng-template>` を使用したテンプレートフラグメントの作成

[ネイティブの `<template>` 要素](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/template) に触発されて、`<ng-template>` 要素を使用すると、**テンプレートフラグメント**、つまり動的またはプログラムによってレンダリングできるコンテンツのセクションを宣言できます。

## テンプレートフラグメントの作成

`<ng-template>` 要素を使用して、コンポーネントテンプレート内のどこにでもテンプレートフラグメントを作成できます。

```angular-html
<p>これは通常の要素です</p>

<ng-template>
  <p>これはテンプレートフラグメントです</p>
</ng-template>
```

上記のコードをレンダリングすると、`<ng-template>` 要素の内容はページにレンダリングされません。代わりに、テンプレートフラグメントへの参照を取得して、コードを記述して動的にレンダリングできます。

### フラグメントのコンテキストの結合

テンプレートフラグメントには、動的な式を含む結合を含めることができます。

```angular-ts
@Component({
  /* ... */,
  template: `<ng-template>選択した項目は {{count}} 個です。</ng-template>`,
})
export class ItemCounter {
  count: number = 0;
}
```

テンプレートフラグメント内の式またはステートメントは、フラグメントがレンダリングされる場所とは関係なく、フラグメントが宣言されているコンポーネントに対して評価されます。

## テンプレートフラグメントへの参照の取得

テンプレートフラグメントへの参照は、次のいずれかの方法で取得できます。

- `<ng-template>` 要素に [テンプレート参照変数](/guide/templates/variables#template-reference-variables) を宣言する
- [コンポーネントまたはディレクティブクエリ](/guide/components/queries) を使用してフラグメントをクエリする
- `<ng-template>` 要素に直接適用されているディレクティブ内でフラグメントを注入する

これらのすべての場合において、フラグメントは [TemplateRef](/api/core/TemplateRef) オブジェクトによって表されます。

### テンプレート参照変数を使用したテンプレートフラグメントへの参照

テンプレート参照変数を `<ng-template>` 要素に追加することで、同じテンプレートファイル内の他の部分でそのテンプレートフラグメントを参照できます。

```angular-html
<p>これは通常の要素です</p>

<ng-template #myFragment>
  <p>これはテンプレートフラグメントです</p>
</ng-template>
```

その後、`myFragment` 変数を使用して、テンプレート内の他の場所でこのフラグメントを参照できます。

### クエリを使用したテンプレートフラグメントへの参照

[コンポーネントまたはディレクティブクエリ API](/guide/components/queries) を使用して、テンプレートフラグメントへの参照を取得できます。

たとえば、テンプレートにテンプレートフラグメントが 1 つだけ含まれている場合は、`@ViewChild` クエリを使用して `TemplateRef` オブジェクトを直接クエリできます。

```angular-ts
@Component({
  /* ... */,
  template: `
    <p>これは通常の要素です</p>

    <ng-template>
      <p>これはテンプレートフラグメントです</p>
    </ng-template>
  `,
})
export class ComponentWithFragment {
  @ViewChild(TemplateRef) myFragment: TemplateRef<unknown> | undefined;
}
```

その後、他のクラスメンバーと同様に、コンポーネントコードまたはコンポーネントのテンプレート内でこのフラグメントを参照できます。

テンプレートに複数のフラグメントが含まれている場合は、各 `<ng-template>` 要素にテンプレート参照変数を追加して、その名前でフラグメントをクエリすることで、各フラグメントに名前を付けることができます。

```angular-ts
@Component({
  /* ... */,
  template: `
    <p>これは通常の要素です</p>

    <ng-template #fragmentOne>
      <p>これはテンプレートフラグメントの 1 つです</p>
    </ng-template>

    <ng-template #fragmentTwo>
      <p>これは別のテンプレートフラグメントです</p>
    </ng-template>
  `,
})
export class ComponentWithFragment {
  // 名前でクエリを行う場合、`read` オプションを使用して、
  // 要素に関連付けられている `TemplateRef` オブジェクトを取得したいことを指定できます。
  @ViewChild('fragmentOne', {read: TemplateRef}) fragmentOne: TemplateRef<unknown> | undefined;
  @ViewChild('fragmentTwo', {read: TemplateRef}) fragmentTwo: TemplateRef<unknown> | undefined;
}
```

繰り返しますが、他のクラスメンバーと同様に、コンポーネントコードまたはコンポーネントのテンプレート内でこれらのフラグメントを参照できます。

### テンプレートフラグメントの注入

ディレクティブは、そのディレクティブが `<ng-template>` 要素に直接適用されている場合、`TemplateRef` を注入できます。

```angular-ts
@Directive({
  selector: '[myDirective]'
})
export class MyDirective {
  private fragment = inject(TemplateRef);
}
```

```angular-html
<ng-template myDirective>
  <p>これはテンプレートフラグメントの 1 つです</p>
</ng-template>
```

その後、他のクラスメンバーと同様に、ディレクティブコード内でこのフラグメントを参照できます。

## テンプレートフラグメントのレンダリング

`TemplateRef` オブジェクトへの参照を取得したら、`NgTemplateOutlet` ディレクティブを使用してテンプレート内でフラグメントをレンダリングするか、`ViewContainerRef` を使用して TypeScript コード内でフラグメントをレンダリングできます。

### `NgTemplateOutlet` の使用

`@angular/common` の `NgTemplateOutlet` ディレクティブは、`TemplateRef` を受け取り、アウトレットに要素を持つ要素の**兄弟**としてフラグメントをレンダリングします。通常、`NgTemplateOutlet` は [`<ng-container>` 要素](/guide/templates/ng-container) で使用する必要があります。

まず、`NgTemplateOutlet` をインポートします:

```typescript
import { NgTemplateOutlet } from "@angular/common";
```

次の例では、テンプレートフラグメントを宣言し、そのフラグメントを `NgTemplateOutlet` を使用して `<ng-container>` 要素にレンダリングします。

```angular-html
<p>これは通常の要素です</p>

<ng-template #myFragment>
  <p>これはフラグメントです</p>
</ng-template>

<ng-container *ngTemplateOutlet="myFragment"></ng-container>
```

この例では、次のレンダリングされた DOM が生成されます。

```angular-html
<p>これは通常の要素です</p>
<p>これはフラグメントです</p>
```

### `ViewContainerRef` の使用

**ビューコンテナ**は、Angular のコンポーネントツリー内の、コンテンツを含めることができるノードです。コンポーネントまたはディレクティブはすべて、`ViewContainerRef` を注入して、そのコンポーネントまたはディレクティブの DOM 内の位置に対応するビューコンテナへの参照を取得できます。

`ViewContainerRef` の `createEmbeddedView` メソッドを使用して、テンプレートフラグメントを動的にレンダリングできます。`ViewContainerRef` を使用してフラグメントをレンダリングすると、Angular は、`ViewContainerRef` を注入したコンポーネントまたはディレクティブの次の兄弟として、そのフラグメントを DOM に追加します。

次の例は、テンプレートフラグメントへの参照を入力として受け取り、ボタンクリック時にそのフラグメントを DOM にレンダリングするコンポーネントを示しています。

```angular-ts
@Component({
  /* ... */,
  selector: 'component-with-fragment',
  template: `
    <h2>フラグメントを含むコンポーネント</h2>
    <ng-template #myFragment>
      <p>これがフラグメントです</p>
    </ng-template>
    <my-outlet [fragment]="myFragment" />
  `,
})
export class ComponentWithFragment { }

@Component({
  /* ... */,
  selector: 'my-outlet',
  template: `<button (click)="showFragment()">表示</button>`,
})
export class MyOutlet {
  private viewContainer = inject(ViewContainerRef);
  @Input() fragment: TemplateRef<unknown> | undefined;

  showFragment() {
    if (this.fragment) {
      this.viewContainer.createEmbeddedView(this.fragment);
    }
  }
}
```

上記の例では、「表示」ボタンをクリックすると、次の出力が生成されます。

```angular-html
<component-with-fragment>
  <h2>フラグメントを含むコンポーネント>
  <my-outlet>
    <button>表示</button>
  </my-outlet>
  <p>これがフラグメントです</p>
</component-with-fragment>
```

## テンプレートフラグメントのレンダリング時のパラメータの受け渡し

`<ng-template>` を使用してテンプレートフラグメントを宣言する際、さらにフラグメントで受け入れられるパラメータを宣言できます。フラグメントをレンダリングする際には、これらのパラメータに対応する `context` オブジェクトを最適に渡すことができます。このコンテキストオブジェクトのデータは、結合式やステートメント内で使用できます。また、フラグメントが宣言されているコンポーネントからのデータも参照できます。

各パラメータは、`let-` プレフィックスを付けた属性として記述され、値はコンテキストオブジェクトのプロパティ名と一致しています。

```angular-html
<ng-template let-pizzaTopping="topping">
  <p>選択したのは: {{pizzaTopping}}</p>
</ng-template>
```

### `NgTemplateOutlet` の使用

`ngTemplateOutletContext` 入力にコンテキストオブジェクトを結合できます。

```angular-html
<ng-template #myFragment let-pizzaTopping="topping">
  <p>選択したのは: {{pizzaTopping}}</p>
</ng-template>

<ng-container
  [ngTemplateOutlet]="myFragment"
  [ngTemplateOutletContext]="{topping: '玉ねぎ'}"
/>
```

### `ViewContainerRef` の使用

`createEmbeddedView` に対する 2 番目の引数として、コンテキストオブジェクトを渡すことができます。

```angular-ts
this.viewContainer.createEmbeddedView(this.myFragment, {topping: '玉ねぎ'});
```

## 構造ディレクティブ

**構造ディレクティブ**とは、次のいずれかの条件を満たすディレクティブです。

- `TemplateRef` を注入する
- `ViewContainerRef` を注入し、注入された `TemplateRef` をプログラムによってレンダリングする

Angular は、構造ディレクティブ向けの特別な便利な構文をサポートしています。ディレクティブを要素に適用し、ディレクティブのセレクターの前にアスタリスク (`*`) 文字を付けると、Angular は要素全体とそのコンテンツ全体をテンプレートフラグメントとして解釈します。

```angular-html
<section *myDirective>
  <p>これがフラグメントです</p>
</section>
```

これは、次のコードと同じです。

```angular-html
<ng-template myDirective>
  <section>
    <p>これがフラグメントです</p>
  </section>
</ng-template>
```

開発者は通常、構造ディレクティブを使用して、フラグメントを条件付きでレンダリングしたり、フラグメントを複数回レンダリングしたりします。

詳細については、[構造ディレクティブ](/guide/directives/structural-directives) を参照してください。

## さらなるリソース

`ng-template` が他のライブラリで使用される方法の例については、以下を確認してください。

- [Angular Material のタブ](https://material.angular.io/components/tabs/overview) - タブがアクティブになるまで、DOM に何もレンダリングされません
- [Angular Material のテーブル](https://material.angular.io/components/table/overview) - 開発者は、データをレンダリングするさまざまな方法を定義できます

# `<ng-container>` を使用した要素のグループ化

`<ng-container>` は Angular の特別な要素で、複数の要素をグループ化したり、DOM に実際の要素をレンダリングせずにテンプレート内の場所をマークしたりします。

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
<!-- レンダリングされた DOM -->
<section>
  <h3>User bio</h3>
  <p>Here's some info about the user</p>
</section>
```

`<ng-container>` にディレクティブを適用して、テンプレートの一部に動作や設定を追加できます。

Angular は `<ng-container>` に適用されたすべての属性バインディングとイベントリスナー（ディレクティブを介して適用されたものも含む）を無視します。

## `<ng-container>` を使用して動的なコンテンツを表示する

`<ng-container>` は、動的なコンテンツをレンダリングするためのプレースホルダーとして機能できます。

### コンポーネントのレンダリング

Angular の組み込みの `NgComponentOutlet` ディレクティブを使用して、`<ng-container>` の場所にコンポーネントを動的にレンダリングできます。

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

上記の例では、`NgComponentOutlet` ディレクティブは、`<ng-container>` 要素の場所に `AdminProfile` または `BasicUserProfile` のいずれかを動的にレンダリングします。

### テンプレートフラグメントのレンダリング

Angular の組み込みの `NgTemplateOutlet` ディレクティブを使用して、`<ng-container>` の場所にテンプレートフラグメントを動的にレンダリングできます。

```angular-ts
@Component({
  template: `
    <h2>Your profile</h2>
    <ng-container [ngTemplateOutlet]="profileTemplate()" />

    <ng-template #admin>This is the admin profile</ng-template>
    <ng-template #basic>This is the basic profile</ng-template>
  `
})
export class UserProfile {
  isAdmin = input(false);
  adminTemplate = viewChild('admin', {read: TemplateRef});
  basicTemplate = viewChild('basic', {read: TemplateRef});
  profileTemplate = computed(() => this.isAdmin() ? this.adminTemplate() : this.basicTemplate());
}
```

上記の例では、`ngTemplateOutlet` ディレクティブは、`<ng-container>` 要素の場所に 2 つのテンプレートフラグメントのいずれかを動的にレンダリングします。

NgTemplateOutlet の詳細については、[NgTemplateOutlets API ドキュメントページ](/api/common/NgTemplateOutlet) を参照してください。

## `<ng-container>` を構造ディレクティブで使用

`<ng-container>` 要素に構造ディレクティブを適用できます。この一般的な例として、`ngIf` と `ngFor` があります。

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

## `<ng-container>` をインジェクションに使用する

Angular の依存性の注入システムの詳細については、依存性の注入ガイドを参照してください。

`<ng-container>` にディレクティブを適用すると、子孫の要素はディレクティブまたはディレクティブが提供するものを注入できます。テンプレートの特定の部分に値を宣言的に提供したい場合に使用します。

```angular-ts
@Directive({
  selector: '[theme]',
})
export class Theme {
  // 'light' または 'dark' を受け取り、デフォルトは 'light' です。
  mode = input<'light' | 'dark'>('light');
}
```

```angular-html
<ng-container theme="dark">
  <profile-pic />
  <user-bio />
</ng-container>
```

上記の例では、`ProfilePic` コンポーネントと `UserBio` コンポーネントは `Theme` ディレクティブを注入し、その `mode` に基づいてスタイルを適用できます。

# テンプレート内の変数

Angular には、テンプレート内で 2 種類の変数宣言があります。 ローカルテンプレート変数とテンプレート参照変数です。

## `@let` を使ったローカルテンプレート変数

Angular の `@let` 構文を使用すると、ローカル変数を定義し、テンプレート全体で再利用できます。これは、[JavaScript の`let`構文](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let)に似ています。

### `@let` の使用方法

`@let` を使用して、テンプレート式の結果に基づいた値を持つ変数を宣言します。 Angular は、[バインディング](./bindings)と同様に、指定された式を使用して変数の値を自動的に最新の状態に保ちます。

```angular-html
@let name = user.name;
@let greeting = 'Hello, ' + name;
@let data = data$ | async;
@let pi = 3.1459;
@let coordinates = {x: 50, y: 100};
@let longExpression = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit ' +
                      'sed do eiusmod tempor incididunt ut labore et dolore magna ' +
                      'Ut enim ad minim veniam...';
```

各`@let`ブロックでは、ちょうど 1 つの変数を宣言できます。コンマを使用して同じブロックに複数の変数の宣言はできません。

### `@let` の値を参照する

`@let` で変数を宣言したら、同じテンプレート内で再利用できます。

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

### 代入可能性

`@let` と JavaScript の `let` の主な違いは、`@let` は宣言後に再代入できないことです。ただし、Angular は指定された式を使用して変数の値を自動的に最新の状態に保ちます。

```angular-html
@let value = 1;

<!-- Invalid - This does not work! -->
<button (click)="value = value + 1">Increment the value</button>
```

### 変数のスコープ

`@let` 宣言は、現在のビューとその子孫にスコープされます。 Angular は、コンポーネントの境界と、テンプレートに動的なコンテンツ（制御フローブロック、`@defer`ブロック、または構造ディレクティブなど）が含まれる可能性がある場所に新しいビューを作成します。

`@let` 宣言はホイスティングされないため、親ビューまたは兄弟から**アクセスできません**。

```angular-html
@let topLevel = value;

<div>
  @let insideDiv = value;
</div>

{{topLevel}} <!-- Valid -->
{{insideDiv}} <!-- Valid -->

@if (condition) {
  {{topLevel + insideDiv}} <!-- Valid -->

  @let nested = value;

  @if (condition) {
    {{topLevel + insideDiv + nested}} <!-- Valid -->
  }
}

<div *ngIf="condition">
  {{topLevel + insideDiv}} <!-- Valid -->

  @let nestedNgIf = value;

  <div *ngIf="condition">
     {{topLevel + insideDiv + nestedNgIf}} <!-- Valid -->
  </div>
</div>

{{nested}} <!-- Error, not hoisted from @if -->
{{nestedNgIf}} <!-- Error, not hoisted from *ngIf -->
```

### 構文全体

`@let`構文は正式には次のように定義されています。

- `@let`キーワード。
- その後に空白が 1 つ以上続きます（改行は含まれません）。
- その後に、有効な JavaScript 名と空白が 0 個以上続きます。
- その後に `=` 記号と空白が 0 個以上続きます。
- その後に、複数行になる可能性のある Angular 式が続きます。
- `；`記号で終了します。

## テンプレート参照変数 {#template-reference-variables}

テンプレート参照変数は、テンプレート内の要素の値を参照する変数を宣言する方法です。

テンプレート参照変数は、次を指すことができます。

- テンプレート内の DOM 要素（[カスタム要素](https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_custom_elements)を含む）
- Angular コンポーネントまたはディレクティブ
- [ng-template](/api/core/ng-template)からの[TemplateRef](/api/core/TemplateRef)

テンプレート参照変数を使用すると、テンプレートの 1 つの部分から同じテンプレートの別の部分の情報を取得できます。

### テンプレート参照変数を宣言する

テンプレート内の要素に、ハッシュ記号 (`#`) と変数名の後に続く属性を追加することで、変数を宣言できます。

```angular-html
<!-- "taskInput" という名前のテンプレート参照変数を、HTMLInputElementに関連付ける -->
<input #taskInput placeholder="Enter task name">
```

### テンプレート参照変数に値を代入する

Angular は、変数が宣言されている要素に基づいて、テンプレート変数に値を代入します。

変数を Angular コンポーネントに宣言した場合、変数はコンポーネントインスタンスを参照します。

```angular-html
<!-- `startDate` 変数は、`MyDatepicker` のインスタンスに代入されます。 -->
<my-datepicker #startDate />
```

変数を `<ng-template>` 要素に宣言した場合、変数はテンプレートを表す TemplateRef インスタンスを参照します。詳細については、[構造ディレクティブ](/guide/directives/structural-directives)の[Angular がアスタリスク、\*、構文を使用する方法](/guide/directives/structural-directives#asterisk)を参照してください。

```angular-html
<!-- `myFragment` 変数は、このテンプレートフラグメントに対応する `TemplateRef` インスタンスに代入されます。 -->
<ng-template #myFragment>
  <p>This is a template fragment</p>
</ng-template>
```

変数を他の表示されている要素に宣言した場合、変数は `HTMLElement` インスタンスを参照します。

```angular-html
<!-- "taskInput" 変数は、HTMLInputElement インスタンスを参照します。 -->
<input #taskInput placeholder="Enter task name">
```

#### Angular ディレクティブへの参照を代入する

Angular ディレクティブには、テンプレートでディレクティブを参照できる名前を定義する `exportAs` プロパティがある場合があります。

```angular-ts
@Directive({
  selector: '[dropZone]',
  exportAs: 'dropZone',
})
export class DropZone { /* ... */ }
```

要素にテンプレート変数を宣言する場合、この `exportAs` 名を指定することで、変数にディレクティブインスタンスを代入できます。

```angular-html
<!-- `firstZone` 変数は、`DropZone` ディレクティブインスタンスを参照します。 -->
<section dropZone #firstZone="dropZone"> ... </section>
```

`exportAs` 名を指定していないディレクティブは参照できません。

### クエリでのテンプレート参照変数の使用

テンプレート参照変数は、同じテンプレートの別の部分から値を読み取るだけでなく、[コンポーネントとディレクティブのクエリ](/guide/components/queries)のために要素を「マーク」するためにも使用できます。

テンプレート内の特定の要素をクエリする場合は、その要素にテンプレート変数を宣言し、変数名に基づいて要素をクエリできます。

```angular-html
 <input #description value="Original description">
```

```angular-ts
@Component({
  /* ... */,
  template: `<input #description value="Original description">`,
})
export class AppComponent {
  // テンプレート変数名に基づいて入力要素をクエリします。
  @ViewChild('description') input: ElementRef | undefined;
}
```

クエリの詳細については、[クエリによる子の参照](/guide/components/queries)を参照してください。

# `@defer`を用いた遅延読み込み

遅延可能ビュー（別名`@defer`ブロック）は、ページの初期レンダリングに厳密に必要ないコードの読み込みを遅らせることで、アプリケーションの初期バンドルサイズを削減します。これにより、多くの場合、初期読み込みが高速化され、特に Largest Contentful Paint（LCP）と Time to First Byte（TTFB）に関して Core Web Vitals（CWV）が向上します。

この機能を使用するには、テンプレートのセクションを`@defer`ブロックで宣言的にラップします。

```angular-html
@defer {
  <large-component />
}
```

`@defer`ブロック内のコンポーネント、ディレクティブ、パイプのコードは、別の JavaScript ファイルに分割され、残りのテンプレートがレンダリングされた後、必要な場合にのみ読み込まれます。

遅延可能ビューは、さまざまなトリガーやプリフェッチオプションおよびプレースホルダー、読み込み、エラー状態の管理のためのサブブロックをサポートしています。

## どの依存関係が遅延されますか？

アプリケーションを読み込む際に、コンポーネント、ディレクティブ、パイプ、およびコンポーネント CSS スタイルを遅延させることができます。

`@defer`ブロック内の依存関係を遅延させるためには、2 つの条件を満たす必要があります。

1. **スタンドアロンである必要があります。** スタンドアロンでない依存関係は遅延させることができず、`@defer`ブロック内にあっても、依然として先に読み込まれます。
1. **同じファイル内の`@defer`ブロックの外側では参照できません。** `@defer`ブロックの外側で参照される場合、または ViewChild クエリ内で参照される場合、依存関係は先に読み込まれます。

`@defer`ブロックで使用されるコンポーネント、ディレクティブ、パイプの*推移的*依存関係は、厳密にはスタンドアロンである必要はありません。推移的依存関係は依然として`NgModule`で宣言でき、遅延読み込みに参加できます。

Angular のコンパイラは、`@defer`ブロックで使用される各コンポーネント、ディレクティブ、およびパイプに対して[動的インポート](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/import)文を生成します。ブロックのメインコンテンツは、すべてのインポートが解決された後にレンダリングされます。Angular は、これらのインポートの特定の順序を保証しません。

## 遅延読み込みのさまざまなステージを管理する方法

`@defer`ブロックには、遅延読み込みプロセスにおけるさまざまなステージを適切に処理できるように、いくつかのサブブロックがあります。

### `@defer`

これは、遅延読み込みされるコンテンツのセクションを定義するプライマリブロックです。これは最初はレンダリングされません。遅延コンテンツは、指定された[トリガー](/guide/defer#triggers)が発生するか、`when`条件が満たされたときに読み込まれてレンダリングされます。

デフォルトでは、`@defer`ブロックはブラウザの状態が[アイドル](/guide/defer#on-idle)になるとトリガーされます。

```angular-html
@defer {
  <large-component />
}
```

### `@placeholder`でプレースホルダーコンテンツを表示する

デフォルトでは、`@defer`ブロックはトリガーされる前にコンテンツをレンダリングしません。

`@placeholder`は、`@defer`ブロックがトリガーされる前に表示するコンテンツを宣言するオプションのブロックです。

```angular-html
@defer {
  <large-component />
} @placeholder {
  <p>プレースホルダーコンテンツ</p>
}
```

オプションですが、特定のトリガーでは、`@placeholder`または[テンプレート参照変数](/guide/templates/variables#template-reference-variables)のいずれかの存在が必要になる場合があります。詳細については、[トリガー](/guide/defer#triggers)セクションを参照してください。

Angular は、読み込みが完了すると、プレースホルダーコンテンツをメインコンテンツに置き換えます。プレースホルダーセクションには、プレーン HTML、コンポーネント、ディレクティブ、パイプなど、あらゆるコンテンツを使用できます。_プレースホルダーブロックの依存関係は先に読み込まれます_。

`@placeholder`ブロックは、プレースホルダーコンテンツが最初にレンダリングされた後にこのプレースホルダーを表示する`minimum`時間を指定するオプションのパラメータを受け入れます。

```angular-html
@defer {
  <large-component />
} @placeholder (minimum 500ms) {
  <p>プレースホルダーコンテンツ</p>
}
```

この`minimum`パラメータは、ミリ秒(ms)または秒(s)の時間増分で指定されます。このパラメータを使用して、遅延された依存関係がすばやく取得された場合にプレースホルダーコンテンツが高速でちらつくのを防ぐことができます。

### `@loading`で読み込みコンテンツを表示する

`@loading`ブロックは、遅延された依存関係が読み込まれている間に表示するコンテンツを宣言できるようにするオプションのブロックです。これは、読み込みがトリガーされると`@placeholder`ブロックを置き換えます。

```angular-html
@defer {
  <large-component />
} @loading {
  <img alt="読み込み中..." src="loading.gif" />
} @placeholder {
  <p>プレースホルダーコンテンツ</p>
}
```

その依存関係は先に読み込まれます(`@placeholder`と同様)。

`@loading`ブロックは、遅延された依存関係がすばやく取得された場合に発生する可能性のあるコンテンツの高速なちらつきを防ぐために、2 つのパラメータを受け入れます。

- `minimum` - このプレースホルダーを表示する最小時間
- `after` - 読み込みが開始されてから読み込みテンプレートを表示するまでの待機時間

```angular-html
@defer {
  <large-component />
} @loading (after 100ms; minimum 1s) {
  <img alt="読み込み中..." src="loading.gif" />
}
```

両方のパラメータは、ミリ秒(ms)または秒(s)の時間増分で指定されます。さらに、両方のパラメータのタイマーは、読み込みがトリガーされた直後に開始されます。

### 遅延読み込みが失敗した場合に`@error`でエラー状態を表示する

`@error`ブロックは、遅延読み込みが失敗した場合に表示するオプションのブロックです。`@placeholder`や`@loading`と同様に、`@error`ブロックの依存関係は先に読み込まれます。

```angular-html
@defer {
  <large-component />
} @error {
  <p>大型コンポーネントの読み込みに失敗しました。</p>
}
```

## トリガーを使用した遅延コンテンツ読み込みの制御

遅延コンテンツがいつ読み込まれて表示されるかを制御する**トリガー**を指定できます。

`@defer`ブロックがトリガーされると、プレースホルダーコンテンツが遅延読み込みされたコンテンツに置き換えられます。

複数のイベントトリガーを、セミコロン(`;`)で区切って定義でき、OR 条件として評価されます。

トリガーには、`on`と`when`の 2 種類があります。

### `on`

`on`は、`@defer`ブロックがトリガーされる条件を指定します。

使用可能なトリガーは次のとおりです。

| トリガー                      | 説明                                                                       |
| ----------------------------- | -------------------------------------------------------------------------- |
| [`idle`](#idle)               | ブラウザがアイドル状態になるとトリガーされます。                           |
| [`viewport`](#viewport)       | 指定されたコンテンツがビューポートに入るとトリガーされます。               |
| [`interaction`](#interaction) | ユーザーが指定された要素と対話するとトリガーされます。                     |
| [`hover`](#hover)             | マウスが指定された領域にホバーするとトリガーされます。                     |
| [`immediate`](#immediate)     | 遅延されていないコンテンツのレンダリングが完了した直後にトリガーされます。 |
| [`timer`](#timer)             | 特定の期間後にトリガーされます。                                           |

#### `idle`

`idle`トリガーは、ブラウザが requestIdleCallback に基づいてアイドル状態に達すると、遅延コンテンツを読み込みます。これは、`@defer`ブロックのデフォルトの動作です。

```angular-html
<!-- @defer (on idle) -->
@defer {
  <large-cmp />
} @placeholder {
  <div>大型コンポーネントのプレースホルダー</div>
}
```

#### `viewport`

`viewport`トリガーは、[Intersection Observer API](https://developer.mozilla.org/docs/Web/API/Intersection_Observer_API)を使用して、指定されたコンテンツがビューポートに入ると、遅延コンテンツを読み込みます。観測されるコンテンツは、`@placeholder`コンテンツまたは明示的な要素参照にできます。

デフォルトでは、`@defer`は、プレースホルダーがビューポートに入っているかどうかを観察します。このように使用されるプレースホルダーは、単一のルート要素を持つ必要があります。

```angular-html
@defer (on viewport) {
  <large-cmp />
} @placeholder {
  <div>大型コンポーネントのプレースホルダー</div>
}
```

または、`@defer`ブロックと同じテンプレート内に、ビューポートに入っているかどうかが監視される要素として[テンプレート参照変数](/guide/templates/variables)を指定できます。この変数は、ビューポートトリガーのパラメータとして渡されます。

```angular-html
<div #greeting>こんにちは！</div>
@defer (on viewport(greeting)) {
  <greetings-cmp />
}
```

#### `interaction`

`interaction`トリガーは、ユーザーが`click`または`keydown`イベントを通じて指定された要素と対話すると、遅延コンテンツを読み込みます。

デフォルトでは、プレースホルダーが対話要素として機能します。このように使用されるプレースホルダーは、単一のルート要素を持つ必要があります。

```angular-html
@defer (on interaction) {
  <large-cmp />
} @placeholder {
  <div>大型コンポーネントのプレースホルダー</div>
}
```

または、`@defer`ブロックと同じテンプレート内に、ビューポートに入っているかどうかが監視される要素として[テンプレート参照変数](/guide/templates/variables)を指定できます。この変数は、ビューポートトリガーのパラメータとして渡されます。

```angular-html
<div #greeting>こんにちは！</div>
@defer (on interaction(greeting)) {
  <greetings-cmp />
}
```

#### `hover`

`hover`トリガーは、マウスが`mouseover`イベントと`focusin`イベントを通じてトリガーされた領域にホバーすると、遅延コンテンツを読み込みます。

デフォルトでは、プレースホルダーが対話要素として機能します。このように使用されるプレースホルダーは、単一のルート要素を持つ必要があります。

```angular-html
@defer (on hover) {
  <large-cmp />
} @placeholder {
  <div>大型コンポーネントのプレースホルダー</div>
}
```

または、`@defer`ブロックと同じテンプレート内に、ビューポートに入っているかどうかが監視される要素として[テンプレート参照変数](/guide/templates/variables)を指定できます。この変数は、ビューポートトリガーのパラメータとして渡されます。

```angular-html
<div #greeting>こんにちは！</div>
@defer (on hover(greeting)) {
  <greetings-cmp />
}
```

#### `immediate`

`immediate`トリガーは、遅延コンテンツをすぐに読み込みます。これは、遅延ブロックは、他のすべての遅延されていないコンテンツのレンダリングが完了するとすぐに読み込まれることを意味します。

```angular-html
@defer (on immediate) {
  <large-cmp />
} @placeholder {
  <div>大型コンポーネントのプレースホルダー</div>
}
```

#### `timer`

`timer`トリガーは、指定された期間後に遅延コンテンツを読み込みます。

```angular-html
@defer (on timer(500ms)) {
  <large-cmp />
} @placeholder {
  <div>大型コンポーネントのプレースホルダー</div>
}
```

期間パラメータは、ミリ秒(`ms`)または秒(`s`)で指定する必要があります。

### `when`

`when`トリガーは、カスタムの条件式を受け取り、条件が真になったときに遅延コンテンツを読み込みます。

```angular-html
@defer (when condition) {
  <large-cmp />
} @placeholder {
  <div>大型コンポーネントのプレースホルダー</div>
}
```

これは 1 回限りの操作です。`@defer`ブロックは、真になった後に偽の値に変更された場合、プレースホルダーに復帰しません。

## `prefetch`でデータをプリフェッチする

遅延コンテンツが表示される条件を指定することに加えて、**プリフェッチトリガー**をオプションで指定できます。このトリガーを使用すると、`@defer`ブロックに関連付けられた JavaScript を、遅延コンテンツが表示される前に読み込むことができます。

プリフェッチを使用すると、ユーザーが実際に`@defer`ブロックを表示または対話する前に、ユーザーがすぐに対話する可能性のあるリソースのプリフェッチを開始します。これにより、リソースをより高速に利用できるようにするなど、より高度な動作が可能になります。

プリフェッチトリガーは、ブロックのメイントリガーと同様に指定できますが、`prefetch`キーワードを前に付けます。ブロックのメイントリガーとプリフェッチトリガーは、セミコロン(`;`)で区切られます。

次の例では、プリフェッチはブラウザがアイドル状態になると開始され、ブロックのコンテンツは、ユーザーがプレースホルダーと対話したときにのみレンダリングされます。

```angular-html
@defer (on interaction; prefetch on idle) {
  <large-cmp />
} @placeholder {
  <div>大型コンポーネントのプレースホルダー</div>
}
```

## `@defer`ブロックのテスト

Angular は、`@defer`ブロックのテストと、テスト中のさまざまな状態のトリガーを簡素化する TestBed API を提供しています。デフォルトでは、テスト内の`@defer`ブロックは、実際のアプリケーションで`@defer`ブロックが動作するのと同じように動作します。状態を手動でステップ実行する場合は、TestBed の構成で`@defer`ブロックの動作を`Manual`に切り替えることができます。

```angular-ts
it('さまざまな状態で`@defer`ブロックをレンダリングする', async () => {
  // 手動制御のために`@defer`ブロックの動作を"一時停止"状態から開始するように構成します。
  TestBed.configureTestingModule({deferBlockBehavior: DeferBlockBehavior.Manual});
  @Component({
    // ...
    template: `
      @defer {
        <large-component />
      } @placeholder {
        プレースホルダー
      } @loading {
        読み込み中...
      }
    `
  })
  class ComponentA {}
  // コンポーネントのfixtureを作成します。
  const componentFixture = TestBed.createComponent(ComponentA);
  // すべての`@defer`ブロックのfixtureを取得し、最初のブロックを取得します。
  const deferBlockFixture = (await componentFixture.getDeferBlocks())[0];
  // デフォルトでプレースホルダー状態をレンダリングします。
  expect(componentFixture.nativeElement.innerHTML).toContain('プレースホルダー');
  // 読み込み状態をレンダリングし、レンダリングされた出力を検証します。
  await deferBlockFixture.render(DeferBlockState.Loading);
  expect(componentFixture.nativeElement.innerHTML).toContain('読み込み中');
  // 最終状態をレンダリングし、出力を検証します。
  await deferBlockFixture.render(DeferBlockState.Complete);
  expect(componentFixture.nativeElement.innerHTML).toContain('large works!');
});
```

## `@defer`は`NgModule`と連携しますか？

`@defer`ブロックは、スタンドアロンコンポーネントと`NgModule`ベースのコンポーネント、ディレクティブ、パイプの両方と互換性があります。ただし、**スタンドアロンコンポーネント、ディレクティブ、パイプのみを遅延させることができます。**`NgModule`ベースの依存関係は遅延されず、先に読み込まれたバンドルに含まれます。

## `@defer`は、サーバーサイドレンダリング(SSR)と静的サイト生成(SSG)とどのように連携しますか？

デフォルトでは、サーバー上でアプリケーションをレンダリングする際(SSR または SSG を使用する場合)、`@defer`ブロックは常にその`@placeholder`(プレースホルダーが指定されていない場合は何も表示されません)をレンダリングし、トリガーは呼び出されません。クライアント側では、`@placeholder`の内容が水和され、トリガーがアクティブになります。

サーバー上(SSR と SSG の両方)で`@defer`ブロックのメインコンテンツをレンダリングするには、[Incremental Hydration 機能](/guide/incremental-hydration)を有効にして、必要なブロックの`hydrate`トリガーを構成できます。

## ビューを遅延させるためのベストプラクティス

### ネストされた`@defer`ブロックによるカスケード読み込みを避ける

ネストされた`@defer`ブロックがある場合は、同時に読み込まれないように、異なるトリガーを指定する必要があります。これにより、カスケードリクエストが発生し、ページ読み込みのパフォーマンスが低下する可能性があります。

### レイアウトのシフトを避ける

初期読み込み時にユーザーのビューポートに表示されるコンポーネントを遅延させることは避けてください。これを行うと、累積レイアウトシフト(CLS)が増加するため、Core Web Vitals に悪影響を与える可能性があります。

必要な場合、初期ページレンダリング中にコンテンツが読み込まれる`immediate`、`timer`、`viewport`、カスタム`when`トリガーは避けてください。

# 式構文

Angular 式は JavaScript に基づいていますが、いくつかの重要な点で異なります。このガイドでは、Angular 式と標準 JavaScript の類似点と相違点を説明します。

## 値リテラル

Angular は、[リテラル値](https://developer.mozilla.org/en-US/docs/Glossary/Literal)のサブセットを JavaScript からサポートしています。

### サポートされる値リテラル

| リテラルタイプ | 例                              |
| -------------- | ------------------------------- |
| 文字列         | `'Hello'`, `"World"`            |
| ブール値       | `true`, `false`                 |
| 数値           | `123`, `3.14`                   |
| オブジェクト   | `{name: 'Alice'}`               |
| 配列           | `['Onion', 'Cheese', 'Garlic']` |
| null           | `null`                          |

### サポートされていないリテラル

| リテラルタイプ     | 例                    |
| ------------------ | --------------------- |
| テンプレート文字列 | `` `Hello ${name}` `` |
| 正規表現           | `/\d+/`               |

## グローバル

Angular 式は、次の[グローバル](https://developer.mozilla.org/en-US/docs/Glossary/Global_object)をサポートしています。

- [undefined](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/undefined)
- [$any](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#any)

その他の JavaScript グローバルはサポートされていません。一般的な JavaScript グローバルには、`Number`、`Boolean`、`NaN`、`Infinity`、`parseInt`などがあります。

## ローカル変数

Angular は、特定のコンテキストで式に使用できる特別なローカル変数を自動的に用意します。これらの特別な変数は、常にドル記号文字（`$`）で始まります。

たとえば、`@for`ブロックはループに関する情報に対応する複数のローカル変数（`$index`など）を提供します。

## どのような演算子がサポートされていますか？

### サポートされる演算子

Angular は、標準 JavaScript の次の演算子をサポートしています。

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
| 単項否定             | `const y = -x`                           |
| 単項プラス           | `const x = +y`                           |
| プロパティアクセサ   | `person['name'] = 'Mirabel'`             |

Angular 式は、さらに次の非標準の演算子もサポートしています。

| 演算子                             | 例(複数)                       |
| ---------------------------------- | ------------------------------ |
| [パイプ](/guides/templates/pipes)  | `{{ total \| currency }}`      |
| オプショナルチェーン\*             | `someObj.someProp?.nestedProp` |
| 非 null アサーション（TypeScript） | `someObj!.someProp`            |

\*注意: オプショナルチェーンは、標準 JavaScript バージョンとは異なる動作をします。Angular のオプショナルチェーン演算子の左辺が`null`または`undefined`の場合、`undefined`ではなく`null`を返します。

### サポートされていない演算子

| 演算子                           | 例(複数)                          |
| -------------------------------- | --------------------------------- |
| すべてのビット演算子             | `&`, `&=`, `~`, `\|=`, `^=`, etc. |
| 代入演算子                       | `=`                               |
| オブジェクトのデストラクタリング | `const { name } = person`         |
| 配列のデストラクタリング         | `const [firstItem] = items`       |
| カンマ演算子                     | `x = (x++, x)`                    |
| typeof                           | `typeof 42`                       |
| void                             | `void 1`                          |
| in                               | `'model' in car`                  |
| instanceof                       | `car instanceof Automobile`       |
| new                              | `new Car()`                       |

## 式の字句コンテキスト

Angular 式は、コンポーネントクラスのコンテキストと、関連する[テンプレート変数](/guide/templates/variables)、ローカル変数、およびグローバル変数のコンテキストで評価されます。

クラスメンバーを参照する場合、`this`は常に暗黙的に使用されます。

## 宣言

一般的に、Angular 式では宣言はサポートされていません。これには、以下が含まれますが、これらに限定されません。

| 宣言       | 例(複数)                                    |
| ---------- | ------------------------------------------- |
| 変数       | `let label = 'abc'`, `const item = 'apple'` |
| 関数       | `function myCustomFunction() { }`           |
| アロー関数 | `() => { }`                                 |
| クラス     | `class Rectangle { }`                       |

# イベントリスナー文

イベントハンドラーは、**式**ではなく**文**です。Angular 式と同じ構文をすべてサポートしていますが、2 つの重要な違いがあります。

1. 文は**代入演算子**をサポートします（ただし、分割代入はサポートされていません）。
1. 文は**パイプをサポートしていません**

# テンプレート内の空白

デフォルトで、Angular テンプレートはフレームワークが不要とみなす空白を保持しません。これは、要素間の空白と、テキスト内の折り畳み可能な空白の 2 つの状況で一般的に発生します。

## 要素間の空白

ほとんどの開発者は、テンプレートを読みやすくするために、改行とインデントでテンプレートをフォーマットすることを好みます。

```angular-html
<section>
  <h3>User profile</h3>
  <label>
    User name
    <input>
  </label>
</section>
```

このテンプレートには、すべての要素間に空白が含まれています。次のスニペットは、同じ HTML で、存在する空白をすべてハッシュ（`#`）文字に置き換えたもので、どのくらいの空白が存在するかを示しています。

```angular-html
<!-- 全体の空白: 20 -->
<section>###<h3>User profile</h3>###<label>#####User name#####<input>###</label>#</section>
```

テンプレートに書かれた空白をそのまま保持すると、多くの不要な[テキストノード](https://developer.mozilla.org/en-US/docs/Web/API/Text)が生成され、ページのレンダリングオーバーヘッドが増加します。Angular は、要素間のこの空白を無視することで、ページにテンプレートをレンダリングする際の作業量を減らし、全体的なパフォーマンスを向上させています。

## テキスト内の折り畳み可能な空白

Web ブラウザがページに HTML をレンダリングする場合、連続する複数の空白文字を 1 つの文字に折り畳みます。

```angular-html
<!-- テンプレートでの表示 -->
<p>Hello         world</p>
```

この例では、ブラウザは「Hello」と「world」の間にスペースを 1 つだけ表示します。

```angular-html
<!-- ブラウザに表示される内容 -->
<p>Hello world</p>
```

この仕組みの詳細については、[HTML、CSS、および DOM での空白の処理方法](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Whitespace)を参照してください。

Angular は、テンプレートをコンパイルする際に、これらの不要な空白文字を 1 つの文字に折り畳むことで、ブラウザに送信しないようにします。

## 空白を保持する

`@Component`デコレーターで`preserveWhitespaces: true`を指定することで、Angular にテンプレート内の空白を保持するように指示できます。

```angular-ts
@Component({
  /* ... */,
  preserveWhitespaces: true,
  template: `
    <p>Hello         world</p>
  `
})
```

絶対に必要な場合を除いて、このオプションを設定しないでください。空白を保持すると、Angular がレンダリング中に大幅に多くのノードを生成し、アプリケーションが遅くなる可能性があります。

また、Angular 独自の特別な HTML エンティティ`&ngsp;`も使用できます。このエンティティは、コンパイルされた出力で保持される単一のスペース文字を生成します。

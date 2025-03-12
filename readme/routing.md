# Angular ルーティングの進化：モジュールから関数型へ

ご指摘ありがとうございます。確かに前回のまとめは表面的で、Angular ルーティングの進化の背景にある「なぜ」の部分が欠けていました。より深い視点でまとめ直します。

## Angular アーキテクチャの哲学的変遷

### モジュール時代の背景（Angular 2〜13）

- **採用理由**:

  - Java や Spring のような従来の強く型付けされたエンタープライズフレームワークの影響
  - コードの明確な境界と構造化を目指した設計思想
  - 大規模アプリケーションでの依存性管理の複雑さへの対応
  - アプリケーションを論理的な「機能単位」で分割する考え方

- **NgModule の役割**:
  - コンポーネント、ディレクティブ、パイプなどを「束ねる」容器として機能
  - 依存性の注入スコープを定義
  - 遅延読み込みの単位として機能

### 関数型プログラミングへの移行（Angular 14 以降）

- **移行の理由**:

  - モジュールシステムの複雑さと学習曲線の高さ
  - 他のフレームワーク（React、Vue など）との競争力向上の必要性
  - より直感的で柔軟な API 設計への要求
  - ツリーシェイキングの最適化とバンドルサイズ削減の要求

- **スタンドアロンコンポーネントの導入**:
  - モジュールの「束縛」からコンポーネントを解放
  - 個々のコンポーネントが自身の依存関係を明示的に宣言
  - より小さく、より再利用可能な単位での開発が可能に

## ルーティングの進化ストーリー

### モジュール時代のルーティング（〜Angular 13）

```typescript
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
```

- **特徴**:
  - モジュール内でルートを定義
  - `RouterModule.forRoot()`と`forChild()`の区別が必要
  - 親子モジュール間の関係性の理解が必要
  - 遅延読み込みは`loadChildren`を使用してモジュール単位

### 関数型アプローチへの移行（Angular 14〜現在）

```typescript
export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes)],
};
```

- **Angular 14**:

  - スタンドアロンコンポーネントの導入
  - `loadComponent`による単一コンポーネントの遅延読み込み
  - モジュールに依存しないルーティング設定の第一歩

- **Angular 16**:

  - `withComponentInputBinding`の導入
  - ルートパラメータを直接コンポーネントの`@Input()`にバインド可能に
  - 宣言的なデータフローの強化

- **Angular 17**:
  - `app.config.ts`による集中設定の導入
  - 関数型プログラミングスタイルの完全採用
  - `provideRouter`と各種機能拡張（`withDebugTracing`、`withHashLocation`など）
  - より明示的で組み合わせ可能な設定アプローチ

## なぜ関数型アプローチが優れているのか

1. **明示性と透明性**:

   - 設定が明示的で、「魔法」のような暗黙の動作が少ない
   - 依存関係が明確に可視化される

2. **柔軟性と組み合わせ可能性**:

   - 機能を必要に応じて組み合わせられる（`withComponentInputBinding`、`withHashLocation`など）
   - 設定の一部だけを変更することが容易

3. **開発者体験の向上**:

   - より直感的な API 設計
   - 学習曲線の緩和
   - エラーメッセージの改善

4. **パフォーマンスの最適化**:
   - より効果的なツリーシェイキング
   - 使用しない機能のコードが含まれない
   - バンドルサイズの削減

## 将来の方向性

Angular は明らかに関数型プログラミングパラダイムを強化する方向に進んでいます。今後も：

- より宣言的な API の導入
- 副作用の少ない純粋関数の活用
- 設定の組み合わせ可能性のさらなる向上
- バンドルサイズとパフォーマンスの最適化

が期待されます。これは JavaScript エコシステム全体のトレンドとも一致しており、Angular がモダンなフロントエンド開発の最前線に立ち続けるための戦略的な進化と言えるでしょう。

# Angular v19 ルーティングチュートリアル

## はじめに：Angular v19 でのモダンなルーティング

Angular v19 では、関数型アプローチとスタンドアロンコンポーネントを活用した、よりシンプルで効率的なルーティングが可能になりました。このチュートリアルでは、最新の Angular v19 を使用して、基本的なルーティングから高度な機能まで実装する方法を学びます。

## 前提条件

- Node.js と npm の最新版がインストールされていること
- Angular CLI v19 がインストールされていること
  ```bash
  npm install -g @angular/cli@19
  ```

## プロジェクトの作成

まず、新しい Angular プロジェクトを作成します：

```bash
ng new angular-v19-routing-demo
```

プロンプトが表示されたら：

- ルーティングを追加しますか？ → **Yes**
- スタイルシートの形式は？ → **CSS**（またはお好みのもの）

プロジェクトディレクトリに移動します：

```bash
cd angular-v19-routing-demo
```

## 基本的なルーティングの設定

Angular v19 では、`app.routes.ts`と`app.config.ts`ファイルが自動的に生成されます。これらのファイルを確認しましょう。

### app.routes.ts

```typescript
import { Routes } from "@angular/router";

export const routes: Routes = [];
```

### app.config.ts

```typescript
import { ApplicationConfig } from "@angular/core";
import { provideRouter } from "@angular/router";

import { routes } from "./app.routes";

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes)],
};
```

## コンポーネントの作成

ルーティングのデモ用に、いくつかのコンポーネントを作成しましょう：

```bash
ng generate component home
ng generate component about
ng generate component products
ng generate component product-detail
ng generate component not-found
```

## ルートの定義

`app.routes.ts`ファイルを開き、以下のようにルートを定義します：

```typescript
import { Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { AboutComponent } from "./about/about.component";
import { ProductsComponent } from "./products/products.component";
import { ProductDetailComponent } from "./product-detail/product-detail.component";
import { NotFoundComponent } from "./not-found/not-found.component";

export const routes: Routes = [
  { path: "", component: HomeComponent, title: "ホーム" },
  { path: "about", component: AboutComponent, title: "アバウト" },
  { path: "products", component: ProductsComponent, title: "製品一覧" },
  {
    path: "products/:id",
    component: ProductDetailComponent,
    title: "製品詳細",
  },
  { path: "**", component: NotFoundComponent, title: "ページが見つかりません" },
];
```

## ナビゲーションメニューの作成

`app.component.html`ファイルを開き、以下のようにナビゲーションメニューを追加します：

```html
<header>
  <nav>
    <ul>
      <li>
        <a
          routerLink="/"
          routerLinkActive="active"
          [routerLinkActiveOptions]="{exact: true}"
          ariaCurrentWhenActive="page"
          >ホーム</a
        >
      </li>
      <li>
        <a
          routerLink="/about"
          routerLinkActive="active"
          ariaCurrentWhenActive="page"
          >アバウト</a
        >
      </li>
      <li>
        <a
          routerLink="/products"
          routerLinkActive="active"
          ariaCurrentWhenActive="page"
          >製品一覧</a
        >
      </li>
    </ul>
  </nav>
</header>

<main>
  <router-outlet></router-outlet>
</main>

<footer>
  <p>© 2023 Angular v19 ルーティングデモ</p>
</footer>
```

`app.component.ts`ファイルを開き、必要なインポートを追加します：

```typescript
import { Component } from "@angular/core";
import { RouterOutlet, RouterLink, RouterLinkActive } from "@angular/router";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  title = "angular-v19-routing-demo";
}
```

## スタイルの追加

`app.component.css`ファイルに以下のスタイルを追加します：

```css
nav ul {
  display: flex;
  list-style: none;
  padding: 0;
  gap: 1rem;
}

nav a {
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  color: #333;
}

nav a.active {
  background-color: #1976d2;
  color: white;
}

main {
  padding: 2rem;
  min-height: 70vh;
}

header,
footer {
  padding: 1rem;
  background-color: #f5f5f5;
}
```

## 製品データの作成

製品データを管理するサービスを作成します：

```bash
ng generate service services/product
```

`product.service.ts`ファイルを以下のように編集します：

```typescript
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
}

@Injectable({
  providedIn: "root",
})
export class ProductService {
  private products: Product[] = [
    { id: 1, name: "製品A", description: "製品Aの詳細説明", price: 1000 },
    { id: 2, name: "製品B", description: "製品Bの詳細説明", price: 2000 },
    { id: 3, name: "製品C", description: "製品Cの詳細説明", price: 3000 },
    { id: 4, name: "製品D", description: "製品Dの詳細説明", price: 4000 },
    { id: 5, name: "製品E", description: "製品Eの詳細説明", price: 5000 },
  ];

  constructor() {}

  getProducts(): Observable<Product[]> {
    return of(this.products);
  }

  getProduct(id: number): Observable<Product | undefined> {
    return of(this.products.find((product) => product.id === id));
  }
}
```

## 製品一覧コンポーネントの実装

`products.component.ts`ファイルを編集します：

```typescript
import { Component, OnInit } from "@angular/core";
import { RouterLink } from "@angular/router";
import { CommonModule } from "@angular/common";
import { ProductService, Product } from "../services/product.service";

@Component({
  selector: "app-products",
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: "./products.component.html",
  styleUrls: ["./products.component.css"],
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe((products) => {
      this.products = products;
    });
  }
}
```

`products.component.html`ファイルを編集します：

```html
<h1>製品一覧</h1>

<div class="products-grid">
  @for (product of products; track product.id) {
  <div class="product-card">
    <h2>{{ product.name }}</h2>
    <p>価格: {{ product.price }}円</p>
    <a [routerLink]="['/products', product.id]">詳細を見る</a>
  </div>
  } @empty {
  <p>製品が見つかりません</p>
  }
</div>
```

`products.component.css`ファイルにスタイルを追加します：

```css
.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1rem;
}

.product-card {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 1rem;
  transition: transform 0.3s ease;
}

.product-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.product-card a {
  display: inline-block;
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  background-color: #1976d2;
  color: white;
  text-decoration: none;
  border-radius: 4px;
}
```

## 製品詳細コンポーネントの実装

`product-detail.component.ts`ファイルを編集します：

```typescript
import { Component, OnInit, Input } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Router } from "@angular/router";
import { ProductService, Product } from "../services/product.service";

@Component({
  selector: "app-product-detail",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./product-detail.component.html",
  styleUrls: ["./product-detail.component.css"],
})
export class ProductDetailComponent implements OnInit {
  @Input() id!: string;
  product?: Product;

  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit(): void {
    if (this.id) {
      this.productService.getProduct(Number(this.id)).subscribe((product) => {
        if (product) {
          this.product = product;
        } else {
          this.router.navigate(["/not-found"]);
        }
      });
    }
  }

  goBack(): void {
    this.router.navigate(["/products"]);
  }
}
```

`product-detail.component.html`ファイルを編集します：

```html
<div class="product-detail">
  @if (product) {
  <h1>{{ product.name }}</h1>
  <div class="product-info">
    <p class="description">{{ product.description }}</p>
    <p class="price">価格: {{ product.price }}円</p>
  </div>
  <button (click)="goBack()">製品一覧に戻る</button>
  } @else {
  <p>製品を読み込み中...</p>
  }
</div>
```

`product-detail.component.css`ファイルにスタイルを追加します：

```css
.product-detail {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.product-info {
  margin: 2rem 0;
}

.description {
  line-height: 1.6;
  color: #555;
}

.price {
  font-size: 1.5rem;
  font-weight: bold;
  color: #1976d2;
}

button {
  padding: 0.5rem 1rem;
  background-color: #1976d2;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #1565c0;
}
```

## 404 ページの実装

`not-found.component.html`ファイルを編集します：

```html
<div class="not-found">
  <h1>404</h1>
  <h2>ページが見つかりません</h2>
  <p>お探しのページは存在しないか、移動した可能性があります。</p>
  <a routerLink="/">ホームに戻る</a>
</div>
```

`not-found.component.ts`ファイルを編集します：

```typescript
import { Component } from "@angular/core";
import { RouterLink } from "@angular/router";

@Component({
  selector: "app-not-found",
  standalone: true,
  imports: [RouterLink],
  templateUrl: "./not-found.component.html",
  styleUrls: ["./not-found.component.css"],
})
export class NotFoundComponent {}
```

`not-found.component.css`ファイルにスタイルを追加します：

```css
.not-found {
  text-align: center;
  padding: 3rem;
}

.not-found h1 {
  font-size: 6rem;
  margin: 0;
  color: #1976d2;
}

.not-found h2 {
  font-size: 2rem;
  margin-top: 0;
}

.not-found a {
  display: inline-block;
  margin-top: 2rem;
  padding: 0.5rem 1rem;
  background-color: #1976d2;
  color: white;
  text-decoration: none;
  border-radius: 4px;
}
```

## 高度なルーティング機能の追加

### 1. ルートガードの実装

認証ガードを作成します：

```bash
ng generate service guards/auth
```

`auth.service.ts`ファイルを作成します：

```typescript
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private isLoggedIn = false;

  login(): void {
    this.isLoggedIn = true;
  }

  logout(): void {
    this.isLoggedIn = false;
  }

  isAuthenticated(): boolean {
    return this.isLoggedIn;
  }
}
```

`auth.guard.ts`ファイルを作成します：

```typescript
import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { AuthService } from "../services/auth.service";

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isAuthenticated()) {
    return true;
  }

  // 認証されていない場合はログインページにリダイレクト
  return router.createUrlTree(["/login"]);
};
```

### 2. 遅延ロードの実装

管理者モジュールを遅延ロードするように設定します。まず、管理者モジュール用のコンポーネントを作成します：

```bash
ng generate component admin/admin-dashboard
ng generate component admin/admin-products
```

`admin-routes.ts`ファイルを作成します：

```typescript
import { Routes } from "@angular/router";
import { AdminDashboardComponent } from "./admin-dashboard/admin-dashboard.component";
import { AdminProductsComponent } from "./admin-products/admin-products.component";
import { authGuard } from "../guards/auth.guard";

export const ADMIN_ROUTES: Routes = [
  {
    path: "",
    component: AdminDashboardComponent,
    canActivate: [authGuard],
    title: "管理者ダッシュボード",
  },
  {
    path: "products",
    component: AdminProductsComponent,
    canActivate: [authGuard],
    title: "製品管理",
  },
];
```

`app.routes.ts`ファイルに遅延ロードのルートを追加します：

```typescript
import { Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { AboutComponent } from "./about/about.component";
import { ProductsComponent } from "./products/products.component";
import { ProductDetailComponent } from "./product-detail/product-detail.component";
import { NotFoundComponent } from "./not-found/not-found.component";
import { authGuard } from "./guards/auth.guard";

export const routes: Routes = [
  { path: "", component: HomeComponent, title: "ホーム" },
  { path: "about", component: AboutComponent, title: "アバウト" },
  { path: "products", component: ProductsComponent, title: "製品一覧" },
  {
    path: "products/:id",
    component: ProductDetailComponent,
    title: "製品詳細",
  },
  {
    path: "admin",
    loadChildren: () =>
      import("./admin/admin-routes").then((m) => m.ADMIN_ROUTES),
    title: "管理者",
  },
  { path: "**", component: NotFoundComponent, title: "ページが見つかりません" },
];
```

### 3. ルートリゾルバーの実装

製品詳細ページ用のリゾルバーを作成します：

```bash
ng generate service resolvers/product
```

`product.resolver.ts`ファイルを編集します：

```typescript
import { inject } from "@angular/core";
import { ResolveFn, Router } from "@angular/router";
import { EMPTY, Observable, of } from "rxjs";
import { mergeMap } from "rxjs/operators";
import { Product, ProductService } from "../services/product.service";

export const productResolver: ResolveFn<Product> = (route, state) => {
  const productService = inject(ProductService);
  const router = inject(Router);

  const id = Number(route.paramMap.get("id"));

  return productService.getProduct(id).pipe(
    mergeMap((product) => {
      if (product) {
        return of(product);
      } else {
        router.navigate(["/not-found"]);
        return EMPTY;
      }
    })
  );
};
```

`app.routes.ts`ファイルを更新して、リゾルバーを使用します：

```typescript
import { Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { AboutComponent } from "./about/about.component";
import { ProductsComponent } from "./products/products.component";
import { ProductDetailComponent } from "./product-detail/product-detail.component";
import { NotFoundComponent } from "./not-found/not-found.component";
import { authGuard } from "./guards/auth.guard";
import { productResolver } from "./resolvers/product.resolver";

export const routes: Routes = [
  { path: "", component: HomeComponent, title: "ホーム" },
  { path: "about", component: AboutComponent, title: "アバウト" },
  { path: "products", component: ProductsComponent, title: "製品一覧" },
  {
    path: "products/:id",
    component: ProductDetailComponent,
    title: "製品詳細",
    resolve: {
      product: productResolver,
    },
  },
  {
    path: "admin",
    loadChildren: () =>
      import("./admin/admin-routes").then((m) => m.ADMIN_ROUTES),
    title: "管理者",
  },
  { path: "**", component: NotFoundComponent, title: "ページが見つかりません" },
];
```

`product-detail.component.ts`ファイルを更新して、リゾルバーからデータを取得します：

```typescript
import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ActivatedRoute, Router } from "@angular/router";
import { Product } from "../services/product.service";

@Component({
  selector: "app-product-detail",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./product-detail.component.html",
  styleUrls: ["./product-detail.component.css"],
})
export class ProductDetailComponent implements OnInit {
  product?: Product;

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.product = this.route.snapshot.data["product"];
  }

  goBack(): void {
    this.router.navigate(["/products"]);
  }
}
```

## アプリケーションの実行

アプリケーションを実行して、ルーティングが正しく機能することを確認します：

```bash
ng serve
```

ブラウザで http://localhost:4200 にアクセスします。

## まとめ

このチュートリアルでは、Angular v19 の最新機能を活用したルーティングの実装方法を学びました：

1. 関数型アプローチによるルーティング設定
2. スタンドアロンコンポーネントの活用
3. ルートパラメータの使用
4. ルートガードによるアクセス制御
5. 遅延ロードによるパフォーマンス最適化
6. リゾルバーによるデータの事前取得

Angular v19 のルーティングは、以前のバージョンと比較して、より直感的で柔軟、そして効率的になっています。関数型アプローチとスタンドアロンコンポーネントの組み合わせにより、開発者体験が大幅に向上し、メンテナンス性の高いアプリケーションを構築できるようになりました。

# Angular v19 テスト総合チュートリアル作成プロンプト

## 背景と目的

あなたは Angular v19 を使ったモダンなアプリケーション開発のための包括的なテストチュートリアルを作成するエキスパート講師です。このチュートリアルでは、Signals を活用した状態管理とともに、Angular アプリケーションの様々なテスト手法をカバーします。

初心者から中級者の開発者が段階的に学べるようなチュートリアルを作成してください。実践的な例とコード例を豊富に含め、各テスト技術の理論と実装方法の両方を説明してください。

## チュートリアルの構造

チュートリアルは以下のセクションに分かれます：

1. **はじめに**

   - Angular v19 の紹介
   - テスト駆動開発の重要性
   - チュートリアルで作成するアプリケーションの概要

2. **開発環境のセットアップ**

   - Angular CLI のインストールと設定
   - テストツールと依存関係のセットアップ

3. **サンプルアプリケーションの概要**

   - 簡単なタスク管理アプリケーションの構造
   - Signals を使用した状態管理の基本

4. **単体テスト**

   - パイプとサービスの単体テスト
   - Signals を使用したサービスのテスト
   - Jasmine を使用したテストの書き方
   - モックとスパイの活用

5. **コンポーネントテスト**

   - コンポーネントの分離テスト
   - TestBed の使用方法
   - 要素の検査とイベントのシミュレート
   - コンポーネント間の相互作用のテスト

6. **統合テスト**

   - 複数のコンポーネントの連携テスト
   - 親子コンポーネント間の通信テスト
   - 実際のサービスとの統合テスト

7. **非同期テスト**

   - fakeAsync と tick の使用
   - waitForAsync の利用
   - Observable と Promise のテスト
   - HTTP リクエストのテスト

8. **コンポーネントハーネス**

   - コンポーネントハーネスの概念と利点
   - カスタムハーネスの作成
   - ハーネスを使用したテスト例

9. **E2E テスト**

   - Playwright または Cypress の設定
   - ユーザーフローのテスト
   - 視覚的回帰テスト

10. **コードカバレッジの最適化**

    - カバレッジレポートの生成と解釈
    - カバレッジ目標の設定
    - カバレッジを向上させるテスト戦略

11. **CI/CD パイプラインへの統合**
    - GitHub Actions または他の CI ツールでのテストの自動化
    - テスト報告の設定

## 主要な要素

チュートリアルを作成する際には、以下の要素を必ず含めてください：

1. **Signals を活用した状態管理**

   - 読み取り専用と書き込み可能な Signals の使用
   - コンポーネント間での Signal の共有
   - Signal の変更をテストする方法

2. **テスト技術**

   - 単体テスト：個別の関数やクラスの検証
   - コンポーネントテスト：UI コンポーネントの動作確認
   - 統合テスト：複数のコンポーネントやサービスの連携
   - E2E テスト：ユーザーの視点からのアプリケーション検証
   - 非同期テスト：非同期操作の検証テクニック

3. **テストツール**

   - TestBed：Angular のテスト環境設定
   - コンポーネントハーネス：コンポーネントとの安定した対話
   - モックとスパイ：依存関係の模倣と監視
   - 要素検査：DOM 要素の状態確認
   - イベントシミュレーション：ユーザー操作の再現
   - コンポーネント分離：依存関係を切り離したテスト

4. **実践的なコード例**

   - 各テスト技術の完全なコード例
   - テストの失敗と成功のシナリオ
   - テストコードのリファクタリング例

5. **ベストプラクティス**
   - テスト構造と命名規則
   - テストの保守性と可読性の向上
   - テスト駆動開発のワークフロー

## 具体的なコード例

以下のようなコード例を含めてください：

1. **Signal を使用したサービスとそのテスト**
2. **コンポーネントテストの基本例と応用例**
3. **非同期操作のテスト**
4. **カスタムコンポーネントハーネスの実装と使用**
5. **E2E テストのシナリオ**

## チュートリアルの形式

- **段階的アプローチ**: 基本から高度なトピックへ
- **実践的**: 各セクションに実装可能なコード例を含める
- **視覚的**: 必要に応じて図やダイアグラムを使用
- **対話的**: 読者が進捗を確認できる小さな課題を含める

各セクションでは、理論的な説明、実装ステップ、実践的なコード例、そして考慮すべき注意点をカバーしてください。

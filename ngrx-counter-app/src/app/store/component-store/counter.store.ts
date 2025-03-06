import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';

// コンポーネントストアの状態インターフェース
export interface CounterState {
  count: number;
}

// 初期状態
const initialState: CounterState = {
  count: 0
};

@Injectable()
export class CounterComponentStore extends ComponentStore<CounterState> {
  constructor() {
    super(initialState);
  }

  // セレクター - 現在のカウント値を取得
  readonly count$ = this.select(state => state.count);

  // アップデーター - カウントを増加
  readonly increment = this.updater((state) => ({
    ...state,
    count: state.count + 1
  }));

  // アップデーター - カウントを減少
  readonly decrement = this.updater((state) => ({
    ...state,
    count: state.count - 1
  }));

  // アップデーター - カウントをリセット
  readonly reset = this.updater((state) => ({
    ...state,
    count: 0
  }));

  // アップデーター - 指定した値だけカウントを増加
  readonly incrementByAmount = this.updater((state, amount: number) => ({
    ...state,
    count: state.count + amount
  }));
}

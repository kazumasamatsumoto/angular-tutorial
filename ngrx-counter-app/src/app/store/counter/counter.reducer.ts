import { createReducer, on } from '@ngrx/store';
import * as CounterActions from './counter.actions';

export interface CounterState {
  count: number;
}

export const initialState: CounterState = {
  count: 0
};

export const counterReducer = createReducer(
  initialState,
  on(CounterActions.increment, (state) => ({
    ...state,
    count: state.count + 1
  })),
  on(CounterActions.decrement, (state) => ({
    ...state,
    count: state.count - 1
  })),
  on(CounterActions.reset, (state) => ({
    ...state,
    count: 0
  })),
  on(CounterActions.incrementByAmount, (state, { amount }) => ({
    ...state,
    count: state.count + amount
  }))
);

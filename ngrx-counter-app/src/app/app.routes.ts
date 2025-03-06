import { Routes } from '@angular/router';
import { CounterComponent } from './components/counter/counter.component';
import { DisplayComponent } from './components/display/display.component';
import { ComponentStoreCounterComponent } from './components/component-store-counter/component-store-counter.component';

export const routes: Routes = [
  { path: '', redirectTo: 'counter', pathMatch: 'full' },
  { path: 'counter', component: CounterComponent },
  { path: 'display', component: DisplayComponent },
  { path: 'component-store', component: ComponentStoreCounterComponent },
  { path: '**', redirectTo: 'counter' } // ワイルドカードルート
];

import { Routes } from '@angular/router';
import { TaskAppComponent } from './components/task-app/task-app.component';
import { SignalRxjsDemoComponent } from './components/signal-rxjs-demo/signal-rxjs-demo.component';

export const routes: Routes = [
  { path: '', component: TaskAppComponent },
  { path: 'rxjs-demo', component: SignalRxjsDemoComponent },
  { path: '**', redirectTo: '' }
];

import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TaskAppComponent } from './components/task-app/task-app.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TaskAppComponent, NavBarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Angular Signals Tutorial';
}

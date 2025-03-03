import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss'
})
export class NavBarComponent {
  navItems = [
    { path: '/', label: 'Task Manager', description: 'Task management with Angular Signals' },
    { path: '/rxjs-demo', label: 'RxJS Integration', description: 'Signal and RxJS integration examples' }
  ];
}

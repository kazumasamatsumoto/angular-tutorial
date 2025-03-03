import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

interface TaskStats {
  total: number;
  active: number;
  completed: number;
}

@Component({
  selector: 'app-task-stats',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task-stats.component.html',
  styleUrl: './task-stats.component.scss'
})
export class TaskStatsComponent {
  @Input() stats!: TaskStats;
  
  // Calculate completion percentage
  get completionPercentage(): number {
    if (this.stats.total === 0) return 0;
    return Math.round((this.stats.completed / this.stats.total) * 100);
  }
}

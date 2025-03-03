import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TaskService } from '../../services/task.service';
import { TaskListComponent } from '../task-list/task-list.component';
import { TaskFormComponent } from '../task-form/task-form.component';
import { TaskStatsComponent } from '../task-stats/task-stats.component';

@Component({
  selector: 'app-task-app',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TaskListComponent,
    TaskFormComponent,
    TaskStatsComponent
  ],
  templateUrl: './task-app.component.html',
  styleUrl: './task-app.component.scss'
})
export class TaskAppComponent {
  private taskService = inject(TaskService);
  
  // Expose the service's computed signals to the template
  protected filteredTasks = this.taskService.filteredTasks;
  protected stats = this.taskService.stats;
  
  // Search functionality
  protected searchTerm = '';
  
  onSearch(): void {
    this.taskService.setSearchTerm(this.searchTerm);
  }
  
  // Filter functionality
  protected currentFilter = this.taskService.getFilter();
  
  setFilter(filter: 'all' | 'active' | 'completed'): void {
    this.taskService.setFilter(filter);
    this.currentFilter = filter;
  }
  
  // Clear completed tasks
  clearCompleted(): void {
    this.taskService.clearCompleted();
  }
}

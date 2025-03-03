import { Component } from '@angular/core';
import { Task } from '../../models/task';
import { TaskService } from '../../services/task.service';
import { CommonModule } from '@angular/common';
import { TaskListComponent } from '../task-list/task-list.component';
import { TaskFormComponent } from '../task-form/task-form.component';
import { TaskDetailComponent } from '../task-detail/task-detail.component';

@Component({
  selector: 'app-task-app',
  standalone: true,
  imports: [CommonModule, TaskListComponent, TaskFormComponent, TaskDetailComponent],
  templateUrl: './task-app.component.html',
  styleUrls: ['./task-app.component.scss']
})
export class TaskAppComponent {
  selectedTask: Task | null = null;
  
  constructor(private taskService: TaskService) { }
  
  onSelectTask(taskId: number): void {
    const task = this.taskService.getTaskById(taskId);
    this.selectedTask = task || null;
  }
  
  onUpdateTask(task: Task): void {
    this.taskService.updateTask(task);
  }
  
  onCloseDetail(): void {
    this.selectedTask = null;
  }
}

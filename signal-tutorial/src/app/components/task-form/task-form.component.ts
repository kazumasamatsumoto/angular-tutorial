import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.scss'
})
export class TaskFormComponent {
  private taskService = inject(TaskService);
  
  // Form properties
  title: string = '';
  description: string = '';
  
  // Add a new task
  addTask(): void {
    if (this.title.trim()) {
      this.taskService.addTask(this.title.trim(), this.description.trim());
      this.resetForm();
    }
  }
  
  // Reset the form
  resetForm(): void {
    this.title = '';
    this.description = '';
  }
}

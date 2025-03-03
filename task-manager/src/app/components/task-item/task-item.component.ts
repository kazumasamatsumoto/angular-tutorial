import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from '../../models/task';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-task-item',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.scss']
})
export class TaskItemComponent {
  @Input() task!: Task;
  @Output() toggleComplete = new EventEmitter<void>();
  @Output() deleteTask = new EventEmitter<void>();
  
  onToggleComplete(): void {
    this.toggleComplete.emit();
  }
  
  onDeleteTask(): void {
    this.deleteTask.emit();
  }
}

import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Task } from '../../models/task';
import { TaskService } from '../../services/task.service';
import { CommonModule } from '@angular/common';
import { TaskItemComponent } from '../task-item/task-item.component';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, TaskItemComponent],
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];
  @Output() selectTask = new EventEmitter<number>();
  
  constructor(private taskService: TaskService) { }
  
  ngOnInit(): void {
    this.taskService.getTasks().subscribe(tasks => {
      this.tasks = tasks;
    });
  }
  
  onTaskToggle(taskId: number): void {
    this.taskService.toggleTaskCompletion(taskId);
  }
  
  onTaskDelete(taskId: number): void {
    this.taskService.deleteTask(taskId);
  }
  
  onSelectTask(taskId: number): void {
    this.selectTask.emit(taskId);
  }
}

import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { Task } from '../../models/task';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-task-detail',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.scss']
})
export class TaskDetailComponent implements OnChanges {
  @Input() task: Task | null = null;
  @Output() updateTask = new EventEmitter<Task>();
  @Output() closeDetail = new EventEmitter<void>();
  
  taskForm: FormGroup;
  isEditing = false;
  
  constructor(private fb: FormBuilder) {
    this.taskForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', Validators.required],
      completed: [false]
    });
  }
  
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['task'] && this.task) {
      this.taskForm.patchValue({
        title: this.task.title,
        description: this.task.description,
        completed: this.task.completed
      });
      this.isEditing = false;
    }
  }
  
  onClose(): void {
    this.closeDetail.emit();
  }
  
  onToggleEdit(): void {
    this.isEditing = !this.isEditing;
    if (!this.isEditing && this.task) {
      // 編集モードを終了する際にフォームを元の値にリセット
      this.taskForm.patchValue({
        title: this.task.title,
        description: this.task.description,
        completed: this.task.completed
      });
    }
  }
  
  onSubmit(): void {
    if (this.taskForm.valid && this.task) {
      const updatedTask: Task = {
        ...this.task,
        ...this.taskForm.value
      };
      
      this.updateTask.emit(updatedTask);
      this.isEditing = false;
    }
  }
}

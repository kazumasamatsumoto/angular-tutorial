import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Task } from '../../models/task';
import { CommonModule } from '@angular/common';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss']
})
export class TaskFormComponent {
  taskForm: FormGroup;
  @Output() taskAdded = new EventEmitter<void>();
  
  constructor(
    private fb: FormBuilder,
    private taskService: TaskService
  ) {
    this.taskForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', Validators.required]
    });
  }
  
  onSubmit(): void {
    if (this.taskForm.valid) {
      const newTask: Omit<Task, 'id'> = {
        ...this.taskForm.value,
        completed: false
      };
      
      this.taskService.addTask(newTask);
      this.taskForm.reset();
      this.taskAdded.emit();
    } else {
      // フォームを検証してエラーを表示
      this.markFormGroupTouched(this.taskForm);
    }
  }
  
  // フォームグループのすべてのコントロールをタッチ済みとしてマーク
  private markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      
      if ((control as FormGroup).controls) {
        this.markFormGroupTouched(control as FormGroup);
      }
    });
  }
}

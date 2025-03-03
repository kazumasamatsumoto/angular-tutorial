import { Injectable } from '@angular/core';
import { Task } from '../models/task';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private tasks: Task[] = [
    { id: 1, title: 'Angularを学ぶ', description: 'コンポーネントの基本を理解する', completed: false },
    { id: 2, title: 'タスク管理アプリを作る', description: 'コンポーネント間の連携を実践する', completed: false },
    { id: 3, title: 'CSSでスタイリング', description: 'アプリの見た目を整える', completed: true }
  ];
  
  private tasksSubject = new BehaviorSubject<Task[]>(this.tasks);
  
  constructor() { }
  
  getTasks(): Observable<Task[]> {
    return this.tasksSubject.asObservable();
  }
  
  getTaskById(id: number): Task | undefined {
    return this.tasks.find(task => task.id === id);
  }
  
  addTask(task: Omit<Task, 'id'>): void {
    const newTask: Task = {
      ...task,
      id: this.getNextId()
    };
    
    this.tasks = [...this.tasks, newTask];
    this.tasksSubject.next(this.tasks);
  }
  
  updateTask(updatedTask: Task): void {
    this.tasks = this.tasks.map(task => 
      task.id === updatedTask.id ? updatedTask : task
    );
    this.tasksSubject.next(this.tasks);
  }
  
  toggleTaskCompletion(id: number): void {
    this.tasks = this.tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    this.tasksSubject.next(this.tasks);
  }
  
  deleteTask(id: number): void {
    this.tasks = this.tasks.filter(task => task.id !== id);
    this.tasksSubject.next(this.tasks);
  }
  
  private getNextId(): number {
    return Math.max(0, ...this.tasks.map(task => task.id)) + 1;
  }
}

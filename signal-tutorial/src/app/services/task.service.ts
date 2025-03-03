import { Injectable, signal, computed, effect } from '@angular/core';
import { Task } from '../models/task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  // Primary task state signal
  private tasksSignal = signal<Task[]>([]);
  
  // Filter state
  private filterSignal = signal<'all' | 'active' | 'completed'>('all');
  
  // Search term signal
  private searchTermSignal = signal<string>('');
  
  // Computed signals for derived state
  public filteredTasks = computed(() => {
    const tasks = this.tasksSignal();
    const filter = this.filterSignal();
    const searchTerm = this.searchTermSignal().toLowerCase();
    
    // First filter by status
    let filteredByStatus = tasks;
    if (filter === 'active') {
      filteredByStatus = tasks.filter(task => !task.completed);
    } else if (filter === 'completed') {
      filteredByStatus = tasks.filter(task => task.completed);
    }
    
    // Then filter by search term if present
    if (searchTerm) {
      return filteredByStatus.filter(task => 
        task.title.toLowerCase().includes(searchTerm) || 
        task.description.toLowerCase().includes(searchTerm)
      );
    }
    
    return filteredByStatus;
  });
  
  // Statistics as computed signals
  public stats = computed(() => {
    const tasks = this.tasksSignal();
    return {
      total: tasks.length,
      active: tasks.filter(task => !task.completed).length,
      completed: tasks.filter(task => task.completed).length
    };
  });
  
  constructor() {
    // Load initial state from localStorage
    this.loadFromLocalStorage();
    
    // Set up persistence effect
    effect(() => {
      // This effect will run whenever tasksSignal changes
      const tasks = this.tasksSignal();
      localStorage.setItem('tasks', JSON.stringify(tasks));
    });
  }
  
  // Task operations
  addTask(title: string, description: string): void {
    const newTask: Task = {
      id: Date.now().toString(),
      title,
      description,
      completed: false,
      createdAt: new Date()
    };
    
    this.tasksSignal.update(tasks => [...tasks, newTask]);
  }
  
  updateTask(id: string, updates: Partial<Task>): void {
    this.tasksSignal.update(tasks =>
      tasks.map(task =>
        task.id === id ? { ...task, ...updates } : task
      )
    );
  }
  
  toggleTask(id: string): void {
    this.tasksSignal.update(tasks =>
      tasks.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  }
  
  deleteTask(id: string): void {
    this.tasksSignal.update(tasks => tasks.filter(task => task.id !== id));
  }
  
  // Filter operations
  setFilter(filter: 'all' | 'active' | 'completed'): void {
    this.filterSignal.set(filter);
  }
  
  getFilter(): 'all' | 'active' | 'completed' {
    return this.filterSignal();
  }
  
  // Search operations
  setSearchTerm(term: string): void {
    this.searchTermSignal.set(term);
  }
  
  getSearchTerm(): string {
    return this.searchTermSignal();
  }
  
  // Local storage operations
  private loadFromLocalStorage(): void {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      try {
        // Parse the saved tasks and convert string dates back to Date objects
        const parsedTasks = JSON.parse(savedTasks).map((task: any) => ({
          ...task,
          createdAt: new Date(task.createdAt)
        }));
        this.tasksSignal.set(parsedTasks);
      } catch (e) {
        console.error('Failed to parse tasks from localStorage', e);
        this.tasksSignal.set([]);
      }
    }
  }
  
  // Clear all completed tasks
  clearCompleted(): void {
    this.tasksSignal.update(tasks => tasks.filter(task => !task.completed));
  }
}

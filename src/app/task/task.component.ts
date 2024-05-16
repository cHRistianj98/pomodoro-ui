import { Component, OnInit } from '@angular/core';
import { Task } from './data/task.model';
import { TaskService } from "./services/task.service";

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

  tasks!: Task[]; // ! means that value will be effectively assigned later
  taskDescription = '';
  numberOfPomodoroSessions = 1;

  constructor(private taskService: TaskService) {
  }

  ngOnInit(): void {
    this.getTasks()
  }

  getTasks(): void {
    this.taskService.getTasks()
      .subscribe(tasks => this.tasks = tasks);
  }

  addTask() {
    if (this.taskDescription.trim() !== '') {
      const newTask: Task = {
        description: this.taskDescription,
        numberOfPomodoroSessions: this.numberOfPomodoroSessions,
        done: false,
        currentPomodoroSession: 0
      };
      this.taskService.addTask(newTask)
        .subscribe(task => {
          this.tasks.push(task);
          this.taskDescription = '';
        });
    }
  }

  deleteTask(description: string) {
  }
}

import { Component, OnInit } from '@angular/core';
import { Task } from './task.model';
import { TaskService } from "./services/task.service";

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
  tasks!: Task[]; // ! means that value will be effectively assigned later
  newTaskName: string = '';

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
    if (this.newTaskName.trim() !== '') {
      const newTask: Task = {
        description: 'description',
        numberOfPomodoroSessions: 1
      };
      this.tasks.push(newTask);
      this.newTaskName = 'sdasd';
    }
  }

  deleteTask(description: string) {
  }
}

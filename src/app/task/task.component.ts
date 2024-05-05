import { Component } from '@angular/core';
import { Task } from './task.model';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent {
  tasks: Task[] = [
    { description: "desc1", numberOfPomodoroSessions: 1 },
    { description: "desc2", numberOfPomodoroSessions: 2 }
  ];
  newTaskName: string = '';

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

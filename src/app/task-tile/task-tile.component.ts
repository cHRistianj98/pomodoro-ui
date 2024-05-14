import {Component, Input} from '@angular/core';
import {Task} from '../task/task.model';
import {TaskService} from "../task/services/task.service";

@Component({
  selector: 'app-task-tile',
  templateUrl: './task-tile.component.html',
  styleUrl: './task-tile.component.css'
})
export class TaskTileComponent {
  @Input() task!: Task;

  constructor(private taskService: TaskService) {
  }

  onCheckboxChange(event: Event) {
    if (event.target instanceof HTMLInputElement) {
      // this.task.done = event.target.checked;
      this.taskService.toggleTask(this.task.id)
        .subscribe(task => this.task = task)
    }
  }
}

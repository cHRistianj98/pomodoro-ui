import {Component, Input} from '@angular/core';
import { Task } from '../task/task.model';

@Component({
  selector: 'app-task-tile',
  templateUrl: './task-tile.component.html',
  styleUrl: './task-tile.component.css'
})
export class TaskTileComponent {
  @Input() task!: Task;

  onCheckboxChange(event: Event) {
    if (event.target instanceof HTMLInputElement) {
      this.task.done = event.target.checked;
    }
  }
}

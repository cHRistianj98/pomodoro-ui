import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { TimerComponent} from "./timer/timer.component";
import {AppModule} from "./app.module";
import {TaskCreationComponent} from "./task-creation/task-creation.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, TimerComponent, AppModule, TaskCreationComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'pomodoro-ui';
}

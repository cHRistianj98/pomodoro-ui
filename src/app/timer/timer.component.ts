import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPlay, faStop, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { TaskDto } from "../core/task.dto";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { TaskService } from "../core/task.service";

@Component({
  selector: 'app-timer',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, ReactiveFormsModule],
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss']
})
export class TimerComponent {
  // timer
  private readonly initialSeconds = 25 * 60;
  timeLeft = this.initialSeconds;
  intervalId?: number;

  // icons
  faPlay = faPlay;
  faStop = faStop;
  faPlusCircle = faPlusCircle;

  // tasks
  tasks: TaskDto[] = [];
  taskForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private taskService: TaskService
  ) {
    this.taskForm = this.formBuilder.group({
      description: ['', [Validators.required]],
      numberOfPomodoroSessions: [
        null,
        [Validators.required, Validators.min(1)]
      ]
    });
  }

  get minutes(): string {
    const m = Math.floor(this.timeLeft / 60);
    return m < 10 ? `0${m}` : `${m}`;
  }

  get seconds(): string {
    const s = this.timeLeft % 60;
    return s < 10 ? `0${s}` : `${s}`;
  }

  start(): void {
    if (this.intervalId) return;
    this.intervalId = window.setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        this.stop()
      }
    }, 1000);
  }

  stop(): void {
    if (this.intervalId != null) {
      clearInterval(this.intervalId);
      this.intervalId = undefined;
    }
  }

  addTask(): void {
    if (this.taskForm.valid) {
      this.taskForm.markAllAsTouched();
      return;
    }
    this.taskService.createTask(this.taskForm.value).subscribe({
      next: task => {
        this.tasks.unshift(task);
        this.taskForm.reset({
          description: '',
          numberOfPomodoroSessions: null
        })
      },
      error: () => {
        console.error('The task could not be created');
      }
    });
  }
}

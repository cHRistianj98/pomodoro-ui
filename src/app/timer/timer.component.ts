import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPlay, faStop, faPlusCircle, faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
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
export class TimerComponent implements OnInit{
  // timer
  private readonly initialSeconds = 25 * 60;
  timeLeft = this.initialSeconds;
  intervalId?: number;

  // icons
  faPlay = faPlay;
  faStop = faStop;
  faPlusCircle = faPlusCircle;
  faCheckCircle = faCheckCircle;
  faTimesCircle = faTimesCircle;

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
        1,
        [Validators.required, Validators.min(1)]
      ]
    });
  }

  ngOnInit(): void {
    this.loadTasks();
  }

  private loadTasks(): void {
    this.taskService.getTasks().subscribe({
      next: (allTasks) => {
        this.tasks = allTasks;
      },
      error: (err) => {
        console.error('Tasks could not be fetched', err);
      }
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
    if (this.taskForm.invalid) {
      this.taskForm.markAllAsTouched();
      return;
    }
    const {description, numberOfPomodoroSessions} = this.taskForm.value;
    this.taskService.createTask({description, numberOfPomodoroSessions})
      .subscribe({
        next: (task: TaskDto) => {
          this.tasks.unshift(task);
          this.taskForm.reset({
            description: '',
            numberOfPomodoroSessions: 1
          });
        },
        error: err => {
          console.error('Błąd przy dodawaniu taska', err);
        }
      });
  }

  toggleDone(task: TaskDto): void {
    this.taskService.updateTaskDone(task.id!, !task.done)
      .subscribe({
        next: (updated) => {
          const idx = this.tasks.findIndex(t => t.id === updated.id);
          if (idx > -1) this.tasks[idx] = updated;
        },
        error: err => {
          console.error('Cannot be marked done', err);
        }
      });
  }

  deleteTask(task: TaskDto): void {
    if (!task.id) {
      return;
    }
    this.taskService.deleteTask(task.id).subscribe({
      next: () => {
        this.tasks = this.tasks.filter(t => t.id !== task.id);
      },
      error: err => console.error('Error during task deletion', err)
    });
  }
}

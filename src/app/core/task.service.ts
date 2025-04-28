import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TaskDto }    from './task.dto';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TaskService {

  private baseUrl = 'http://localhost:8080/api/v1/tasks';

  constructor(private http: HttpClient) {}

  createTask(task: {
    description: string;
    numberOfPomodoroSessions: number;
  }): Observable<TaskDto> {
    const payload = {
      ...task,
      done: false,
      currentPomodoroSession: 0
    };
    return this.http.post<TaskDto>(this.baseUrl, payload);
  }
}

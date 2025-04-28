import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TaskDto }    from './task.dto';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class TaskService {

  private baseUrl = 'http://localhost:8080/api/v1/tasks';

  constructor(private http: HttpClient, private auth: AuthService) {}

  createTask(task: {
    description: string;
    numberOfPomodoroSessions: number;
  }): Observable<TaskDto> {
    const payload = {
      ...task,
      done: false,
      currentPomodoroSession: 0
    };
    const token = this.auth.token;
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return this.http.post<TaskDto>(this.baseUrl, payload, { headers });
  }
}

import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Task } from '../task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private tasksUrl = 'http://localhost:8080/api/tasks';

  constructor(private http: HttpClient) {
  }

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.tasksUrl);
  }

  addTask(task: Task): Observable<Task> {
    return this.http.post<Task>(this.tasksUrl, task);
  }

  toggleTask(id: number): Observable<Task> {
    return this.http.patch<Task>(`${this.tasksUrl}/${id}`, {});
  }
}

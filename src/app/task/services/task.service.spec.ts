import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TaskService } from './task.service';
import { Task } from '../data/task.model';

describe('TaskService', () => {
  let service: TaskService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TaskService]
    });

    service = TestBed.inject(TaskService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should retrieve tasks from the API via GET', () => {
    const dummyTasks: Task[] = [
      { id: 1, description: 'Test Task 1', done: false, numberOfPomodoroSessions: 10, currentPomodoroSession: 0 },
      { id: 2, description: 'Test Task 2', done: true, numberOfPomodoroSessions: 20, currentPomodoroSession: 1 },
    ];

    service.getTasks().subscribe(tasks => {
      expect(tasks.length).toBe(2);
      expect(tasks).toEqual(dummyTasks);
    });

    const request = httpMock.expectOne(`${service['tasksUrl']}`);
    expect(request.request.method).toBe('GET');
    request.flush(dummyTasks);
  });
});

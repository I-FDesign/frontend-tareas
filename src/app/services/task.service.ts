import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Task } from '../models/task.model';
import { BACKEND_URL } from '../config';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  getTasks() {
    let url = BACKEND_URL + 'api/tasks';
    url += '?token=' + this.authService.token;

    return this.http.get(url);
  }

  getTask(taskId) {
    let url = BACKEND_URL + 'api/task/' + taskId;
    url += '?token=' + this.authService.token;

    return this.http.get(url);
  }

  createTask(task: Task) {

    let url = BACKEND_URL + 'api/new-task';
    url += '?token=' + this.authService.token;

    return this.http.post(url, task);
  }

  editTask(task) {
    let url = BACKEND_URL + 'api/edit-task/' + task.id;
    url += '?token=' + this.authService.token;

    return this.http.put(url, task);
  }

  deleteTask(taskId: string) {
    let url = BACKEND_URL + 'api/delete-task/' + taskId;
    url += '?token=' + this.authService.token;

    return this.http.delete(url);
  }
}

import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { Task } from 'src/app/models/task.model';

import swal from 'sweetalert';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  // tslint:disable: radix

  tasks: Task[] = [];
  tasksToNotify = [];

  loading = true;

  constructor(
    private taskService: TaskService
  ) {
    this.getTasks();
   }

  ngOnInit() {
  }

  getTasks() {
    this.taskService.getTasks().subscribe((res: any) => {
      this.tasks = res.tasks;
      this.loading = false;
      this.verifyTasks();
    });
  }

  verifyTasks() {

    this.tasks.forEach(task => {
      const now = new Date().getTime();
      const oneDayLater = now + (24 * 60 * 60 * 1000);

      const hour = task.expirationHour.split(' ')[0]; // Example 4:25 a.m -> 4:00
      const amOrPm = task.expirationHour.split(' ')[1]; // Example 4:25 a.m -> a.m
      let hours = parseInt(hour.split(':')[0]); // Example 4:25 -> 4
      const minutes = parseInt(hour.split(':')[1]); // Example 4:25 -> 25

      if (amOrPm !== 'a. m.') {
        hours += 12;
      }

      const expirationTime = (task.expiration + (hours * 60 * 60) + (minutes * 60)) * 1000;

      if (expirationTime <= now) {
        this.tasksToNotify.push({
          task,
          status: 'expired'
        });
      } else if (expirationTime <= oneDayLater) {
        this.tasksToNotify.push({
          task,
          status: 'next-to'
        });
      }
    });
  }

  deleteTask(taskId: string) {
    this.taskService.deleteTask(taskId).subscribe((res: any) => {
      swal({
        title: 'Tarea eliminada',
        text: res.message,
        icon: 'success',
        timer: 1200
      });

      this.getTasks();
    });
  }

}

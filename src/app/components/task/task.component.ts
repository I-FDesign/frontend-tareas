import { Component, OnInit } from '@angular/core';
import { Task } from '../../models/task.model';
import { TaskService } from '../../services/task.service';

import swal from 'sweetalert';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

  task: Task = new Task();

  error: string;

  editMode = false;

  constructor(
    private taskService: TaskService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.url.subscribe(actualRoute => {
      if (actualRoute[1].path === 'edit') {
        this.editMode = true;
        this.task.id = actualRoute[2].path;

        this.getTask(this.task.id);
      }
    });
  }

  getTask(taskId) {
    this.taskService.getTask(taskId).subscribe((res: any) => {
      this.task = res.task;
      this.task.expiration = null;
      this.task.expirationHour = null;
    });
  }

  validateForm() {
    if (!this.task.title) {
      this.error = 'Debes agregar un titulo';
      return false;
    }

    if (!this.task.expiration) {
      this.error = 'Debes agregar una fecha de vencimiento';
      return false;
    }

    if (!this.task.expirationHour) {
      this.error = 'Debes agregar una hora de vencimiento';
      return false;
    }


    if (!this.task.priority) {
      this.error = 'Debes especificar una prioridad';
      return false;
    }

    return true;
  }

  newTask() {
    if (!this.validateForm()) {
      return;
    }

    this.taskService.createTask(this.task)
      .subscribe((res: any) => {
        swal({
          title: 'Tarea creada',
          text: 'La tarea se ha creado correctamente',
          icon: 'success',
          timer: 1500
        });

        this.task = new Task();
        this.error = null;
    });

  }

  editTask() {
    if (!this.validateForm()) {
      return;
    }

    this.taskService.editTask(this.task).subscribe((res: any) => {
      swal({
        title: 'Tarea actualizada',
        text: res.message,
        icon: 'success',
        timer: 1500
      });
    })
  }

}

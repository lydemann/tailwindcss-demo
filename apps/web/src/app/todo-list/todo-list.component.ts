import { Component, TrackByFunction } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoItemComponent } from './todo-item/todo-item.component';
import { TodoItem, TodoListService } from './todo-list.service';
import { map, Observable } from 'rxjs';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { SharedModule } from '../shared/shared.module';

@Component({
  selector: 'app-demo-todo-list',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TodoItemComponent, SharedModule],
  template: `
    <div class="block mb-2">
      <app-todo-item
        *ngFor="let todoItem of todoItems$ | async; trackBy: todoItemsTrackBy"
        [todoItem]="todoItem"
        (delete)="onDeleteTodo($event)"
      >
      </app-todo-item>
    </div>

    <form [formGroup]="formGroup" (submit)="onSaveTodo()">
      <mat-form-field class="example-form-field" appearance="fill">
        <mat-label>Todo name</mat-label>
        <input matInput type="text" formControlName="name" />
      </mat-form-field>

      <button mat-button color="primary" type="submit">Save</button>
    </form>
  `,
  styles: [
    `
      :host {
        @apply flex justify-center flex-col items-center;
      }
    `,
  ],
})
export class TodoListComponent {
  todoItems$: Observable<TodoItem[]>;
  formGroup: FormGroup<{
    id: FormControl<string | null>;
    name: FormControl<string | null>;
    isCompleted: FormControl<string | null>;
  }>;

  constructor(private todoListService: TodoListService) {
    this.todoItems$ = todoListService.todoItems$;

    this.formGroup = new FormGroup({
      id: new FormControl(''),
      name: new FormControl('', Validators.required),
      isCompleted: new FormControl('', Validators.required),
    });
  }

  onDeleteTodo(todoItemId: string) {
    this.todoListService.deleteTodo(todoItemId);
  }

  onSaveTodo() {
    const todoItem = {
      name: this.formGroup.value.name,
    } as TodoItem;

    this.todoListService.saveTodo(todoItem);
  }

  todoItemsTrackBy: TrackByFunction<TodoItem> = (idx, item) => {
    return item.id;
  };
}

import { Component, TrackByFunction } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoItemComponent } from './todo-item/todo-item.component';
import { TodoItem, TodoListService } from './todo-list.service';
import { Observable } from 'rxjs';
import {
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
    <div class="block mb-6">
      <app-todo-item
        class="mb-1"
        *ngFor="let todoItem of todoItems$ | async; trackBy: todoItemsTrackBy"
        [todoItem]="todoItem"
        (delete)="onDeleteTodo($event)"
        (edit)="onEdit($event)"
        (isCompleteChange)="onComplete($event)"
      >
      </app-todo-item>
    </div>

    <form [formGroup]="formGroup" (submit)="onSaveTodo()">
      <mat-form-field class="example-form-field" appearance="fill">
        <mat-label>Todo name</mat-label>
        <input matInput type="text" formControlName="name" />
      </mat-form-field>

      <button
        mat-button
        color="primary"
        [disabled]="formGroup.invalid"
        type="submit"
      >
        Save
      </button>
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
  selectedTodo!: TodoItem | null;
  todoItems$: Observable<TodoItem[]>;
  formGroup: FormGroup<{
    id: FormControl<string | null>;
    name: FormControl<string | null>;
    isCompleted: FormControl<boolean | null>;
  }>;

  constructor(private todoListService: TodoListService) {
    this.todoItems$ = todoListService.todoItems$;

    this.formGroup = new FormGroup({
      id: new FormControl(''),
      name: new FormControl('', Validators.required),
      isCompleted: new FormControl(false, Validators.required),
    });
  }

  onDeleteTodo(todoItemId: string) {
    this.todoListService.deleteTodo(todoItemId);
  }

  onEdit(todoItem: TodoItem) {
    this.selectedTodo = todoItem;

    this.formGroup.setValue(this.selectedTodo);
  }

  onComplete(todoItem: TodoItem) {
    this.todoListService.saveTodo(todoItem);
  }

  onSaveTodo() {
    const todoItem = {
      ...this.selectedTodo,
      name: this.formGroup.value.name,
    } as TodoItem;

    this.todoListService.saveTodo(todoItem);

    this.selectedTodo = null;
    this.formGroup.reset();
  }

  todoItemsTrackBy: TrackByFunction<TodoItem> = (idx, item) => {
    return item.id;
  };
}

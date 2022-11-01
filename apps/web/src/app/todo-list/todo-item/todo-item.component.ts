import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { TodoItem } from '../todo-list.service';

@Component({
  selector: 'app-todo-item',
  standalone: true,
  imports: [SharedModule, ReactiveFormsModule],
  template: ` <mat-card>
    <div class="flex justify-between items-center gap-4">
      <div>{{ todoItem?.name }}</div>
      <div>
        <mat-checkbox color="primary"> </mat-checkbox>
        <button mat-icon-button (click)="onDelete()">
          <mat-icon color="warn" fontIcon="delete"> </mat-icon>
        </button>
        <button mat-icon-button (click)="onEdit()">
          <mat-icon color="accent" fontIcon="edit"> </mat-icon>
        </button>
      </div>
    </div>
  </mat-card>`,
  styles: [
    `
      :host {
        @apply block;
      }
    `,
  ],
})
export class TodoItemComponent {
  @Input() todoItem: TodoItem | undefined;
  @Output() delete = new EventEmitter<string>();
  @Output() edit = new EventEmitter<TodoItem>();

  onDelete() {
    this.delete.emit(this.todoItem?.id);
  }

  onEdit() {
    this.edit.emit(this.todoItem);
  }
}

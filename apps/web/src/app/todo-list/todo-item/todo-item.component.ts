import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { TodoItem } from '../todo-list.service';

@Component({
  selector: 'app-todo-item',
  standalone: true,
  imports: [SharedModule],
  template: `<div>{{ todoItem?.name }}</div>
    <div class="flex justify-center">
      <input type="checkbox" [value]="todoItem?.isCompleted" />
      <button mat-icon-button (click)="onDelete()"><mat-icon color="warn" fontIcon="delete"> </mat-icon></button>
    </div>`,
  styles: [
    `
      :host {
        @apply flex gap-4 min-w-[200px] justify-between items-center;
      }
    `,
  ],
})
export class TodoItemComponent {
  @Input() todoItem: TodoItem | undefined;
  @Output() delete = new EventEmitter<string>();

  onDelete() {
    this.delete.emit(this.todoItem?.id);
  }
}

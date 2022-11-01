import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
} from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { SharedModule } from '../../shared/shared.module';
import { TodoItem } from '../todo-list.service';

@Component({
  selector: 'app-todo-item',
  standalone: true,
  imports: [SharedModule, ReactiveFormsModule],
  template: ` <mat-card>
    <div class="flex justify-between items-center gap-4">
      <div [class.line-through]="todoItem?.isCompleted">{{ todoItem?.name }}</div>
      <div>
        <mat-checkbox color="primary" [formControl]="isCompleteFormControl">
        </mat-checkbox>
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
export class TodoItemComponent implements OnDestroy {
  @Input() todoItem: TodoItem | undefined;
  @Output() isCompleteChange = new EventEmitter<TodoItem>();
  @Output() delete = new EventEmitter<string>();
  @Output() edit = new EventEmitter<TodoItem>();

  destroy = new Subject<void>();
  isCompleteFormControl = new FormControl<boolean>(false);

  constructor() {
    this.isCompleteFormControl.valueChanges
      .pipe(takeUntil(this.destroy))
      .subscribe((value) => {
        if (value !== null) {
          this.isCompleteChange.next({
            ...this.todoItem,
            isCompleted: value,
          } as TodoItem);
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }

  onDelete() {
    this.delete.emit(this.todoItem?.id);
  }

  onEdit() {
    this.edit.emit(this.todoItem);
  }
}

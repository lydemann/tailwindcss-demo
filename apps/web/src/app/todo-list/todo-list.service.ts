import { Injectable } from '@angular/core';
import { BehaviorSubject, delay, map, Observable, of } from 'rxjs';

export interface TodoItem {
  id: string;
  name: string;
  isCompleted: boolean;
}

export interface TodoListState {
  todoItems: TodoItem[];
}

@Injectable({
  providedIn: 'root',
})
export class TodoListService {
  state = new BehaviorSubject<TodoListState>({ todoItems: [] });
  todoItems$: Observable<TodoItem[]> = this.state
    .asObservable()
    .pipe(map((state) => state.todoItems));

  deleteTodo(todoItemId: string) {
    const newTodoList = this.state.value.todoItems.filter(
      (todo) => todo.id !== todoItemId
    );
    this.state.next({ ...this.state.value, todoItems: newTodoList });
  }

  fetchTodoItems() {
    this.state.next({
      todoItems: [
        {
          id: '1',
          name: 'Create YT video',
          isCompleted: false,
        } as TodoItem,
        {
          id: '2',
          name: 'Go to the gym',
          isCompleted: false,
        } as TodoItem,
        {
          id: '3',
          name: 'Buy flowers',
          isCompleted: false,
        } as TodoItem,
      ],
    });
  }

  saveTodo(todoItem: TodoItem) {
    if (todoItem.id) {
      // update
    } else {
      // create
      const newTodoItem = {
        ...todoItem,
        id: (this.state.value.todoItems.length + 1).toString(),
      } as TodoItem;
      this.state.next({
        ...this.state.value,
        todoItems: [...this.state.value.todoItems, newTodoItem],
      });
    }
  }
}

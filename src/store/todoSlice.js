import { createSlice } from '@reduxjs/toolkit';

const getInitialTodo = () => {
  const localTodoList = localStorage.getItem('todoList');

  if (localTodoList) {
    return JSON.parse(localTodoList);
  }

  localStorage.setItem('todoList', JSON.stringify([]));
  return [];
};

const setLocalStorage = state => {
  localStorage.setItem('todoList', JSON.stringify(state));
};

const initialValue = {
  filterStatus: 'all',
  todos: getInitialTodo(),
};

const todoSlice = createSlice({
  name: 'todos',
  initialState: initialValue,
  reducers: {
    addTodo(state, action) {
      state.todos.push(action.payload);
      setLocalStorage(state.todos);
    },

    deleteTodo(state, action) {
      state.todos = state.todos.filter(todo => todo.id !== action.payload);
      setLocalStorage(state.todos);
    },

    updateTodo(state, action) {
      const currentTodo = state.todos.find(
        todo => todo.id === action.payload.id
      );
      currentTodo.title = action.payload.title;
      currentTodo.status = action.payload.status;
      setLocalStorage(state.todos);
    },
    updateFilterStatus(state, action) {
      state.filterStatus = action.payload;
    },
  },
});

export const { addTodo, deleteTodo, updateTodo, updateFilterStatus } =
  todoSlice.actions;

export default todoSlice.reducer;

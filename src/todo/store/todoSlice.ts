import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'
import type { Todo } from '../_common/types'
import { getTodoIndex } from './utils'

interface TodoState {
  todos: Todo[]
  sortedTodos: Todo[]
  loading: boolean
  error: string | null
}

const initialState: TodoState = {
  todos: [],
  sortedTodos: [],
  loading: false,
  error: null,
}

const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload
    },
    setTodos: (state, action: PayloadAction<Todo[]>) => {
      state.todos = action.payload
      if (state.sortedTodos.length === 0) {
        state.sortedTodos = action.payload
      }
    },
    addTodo: (state, action: PayloadAction<Todo>) => {
      state.todos.push(action.payload)
      state.sortedTodos.push(action.payload)
    },
    updateTodo: (state, action: PayloadAction<Todo>) => {
      const updatedTodo = action.payload
      const todoIndex = getTodoIndex(state.todos, updatedTodo.id)
      if (todoIndex !== -1) {
        state.todos[todoIndex] = updatedTodo
      }
      const sortedIndex = getTodoIndex(state.sortedTodos, updatedTodo.id)
      if (sortedIndex !== -1) {
        state.sortedTodos[sortedIndex] = updatedTodo
      }
    },
    deleteTodo: (state, action: PayloadAction<number>) => {
      const todoId = action.payload
      state.todos = state.todos.filter((todo) => todo.id !== todoId)
      state.sortedTodos = state.sortedTodos.filter((todo) => todo.id !== todoId)
    },
    reorderTodos: (state, action: PayloadAction<{ oldIndex: number; newIndex: number }>) => {
      const { oldIndex, newIndex } = action.payload
      const [movedTodo] = state.sortedTodos.splice(oldIndex, 1)
      state.sortedTodos.splice(newIndex, 0, movedTodo)
    },
    clearTodos: (state) => {
      state.todos = []
      state.sortedTodos = []
    },
  },
})

export const { setLoading, setError, setTodos, addTodo, updateTodo, deleteTodo, reorderTodos, clearTodos } =
  todoSlice.actions

export default todoSlice.reducer

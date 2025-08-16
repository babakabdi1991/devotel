import type { Todo } from '../_common/types'
import type { CreateTodoRequest, UpdateTodoRequest } from '../types'

const API_BASE_URL = import.meta.env.VITE_BASE_URL

export const todoApi = {
  getTodos: async (): Promise<Todo[]> => {
    const response = await fetch(`${API_BASE_URL}/todos`)
    const data = await response.json()
    return data.todos
  },

  createTodo: async (todoData: CreateTodoRequest): Promise<Todo> => {
    const response = await fetch(`${API_BASE_URL}/todos/add`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(todoData),
    })
    return response.json()
  },

  updateTodo: async (id: number, todoData: UpdateTodoRequest): Promise<Todo> => {
    const response = await fetch(`${API_BASE_URL}/todos/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(todoData),
    })
    return response.json()
  },

  deleteTodo: async (id: number): Promise<Todo> => {
    const response = await fetch(`${API_BASE_URL}/todos/${id}`, {
      method: 'DELETE',
    })
    return response.json()
  },
}

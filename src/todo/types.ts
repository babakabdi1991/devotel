export interface CreateTodoRequest {
  todo: string
  completed: boolean
  userId: number
}

export interface UpdateTodoRequest {
  completed?: boolean
  todo?: string
}

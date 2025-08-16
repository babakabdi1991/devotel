import type { Todo } from '../_common/types'

export function getTodoIndex(todos: Todo[], id: number) {
  return todos.findIndex((todo) => todo.id === id)
}

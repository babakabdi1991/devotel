export type TodoListProps = {
  handleToggleTodo: (id: number) => void
  handleDeleteTodo: (id: number) => void
  isUpdatePending: boolean
}

import { useUpdateTodo } from '../query'
import { useAppSelector } from '../store/hooks'

export function useUpdate() {
  const { sortedTodos } = useAppSelector((state) => state.todos)

  const { mutate, isPending: isUpdatePending } = useUpdateTodo()

  const handleToggleTodo = (id: number) => {
    const todo = sortedTodos.find((t) => t.id === id)
    if (todo) {
      mutate({
        id,
        data: { completed: !todo.completed },
      })
    }
  }

  return { isUpdatePending, handleToggleTodo }
}

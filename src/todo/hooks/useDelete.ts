import { useDeleteTodo } from '../query'

export function useDelete() {
  const { mutate, isPending: isDeletePending } = useDeleteTodo()

  const handleDeleteTodo = (id: number) => {
    if (window.confirm('Are you sure you want to delete this todo?')) {
      mutate(id)
    }
  }

  return { handleDeleteTodo, isDeletePending }
}

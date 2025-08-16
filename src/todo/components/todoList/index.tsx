import { useAppSelector } from '../../store/hooks'
import translation from '../../translation'
import DraggableTodoCard from '../draggableTodoCard'
import type { TodoListProps } from './types'

export default function TodoList({ handleToggleTodo, handleDeleteTodo, isUpdatePending }: TodoListProps) {
  const { sortedTodos } = useAppSelector((state) => state.todos)
  const hasTodo = sortedTodos.length > 0

  if (!hasTodo) <EmptyTodo />
  return (
    <div className='space-y-2'>
      {sortedTodos.map((todo) => (
        <DraggableTodoCard
          key={todo.id}
          todo={todo}
          onToggle={handleToggleTodo}
          onDelete={handleDeleteTodo}
          isUpdating={isUpdatePending}
        />
      ))}
    </div>
  )
}

function EmptyTodo() {
  return (
    <div className='space-y-2'>
      <p className='text-gray-500 text-center py-4'>{translation.emptyTodo}</p>
    </div>
  )
}

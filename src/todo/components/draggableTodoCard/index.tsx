import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { CheckIcon } from '../../../../public/Icon/CheckIcon'
import { DeleteIcon } from '../../../../public/Icon/DeleteIcon'
import type { DraggableTodoCardProps } from './types'

export default function DraggableTodoCard({ todo, onToggle, onDelete, isUpdating }: DraggableTodoCardProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: todo.id,
    transition: {
      duration: 150,
      easing: 'cubic-bezier(0.25, 1, 0.5, 1)',
    },
  })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.8 : 1,
    scale: isDragging ? 1.05 : 1,
    zIndex: isDragging ? 1000 : 'auto',
    boxShadow: isDragging ? '0 10px 25px rgba(0, 0, 0, 0.15)' : 'none',
  }

  function handleToggle(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.stopPropagation()
    onToggle(todo.id)
  }

  function handleDelete(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.stopPropagation()
    onDelete(todo.id)
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`flex items-center gap-3 p-3 border rounded-lg cursor-move transition-all duration-200 ease-out hover:shadow-md ${
        todo.completed ? 'bg-gray-50 border-gray-200' : 'bg-white border-gray-300'
      } ${isDragging ? 'shadow-lg' : ''} ${isUpdating ? 'opacity-50' : ''}`}
    >
      <button
        onClick={handleToggle}
        disabled={isUpdating}
        className={`flex-shrink-0 w-5 h-5 rounded border-2 transition-all duration-200 ${
          todo.completed
            ? 'bg-green-500 border-green-500 text-white scale-110'
            : 'border-gray-300 hover:border-blue-500 hover:scale-110'
        } ${isUpdating ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        {todo.completed && <CheckIcon />}
      </button>

      <span
        className={`flex-1 text-sm transition-all duration-200 ${
          todo.completed ? 'text-gray-500 line-through' : 'text-gray-900'
        }`}
      >
        {todo.todo}
      </span>

      <button
        onClick={handleDelete}
        disabled={isUpdating}
        className={`text-gray-400 hover:text-red-600 transition-all duration-200 hover:scale-110 ${
          isUpdating ? 'opacity-50 cursor-not-allowed' : ''
        }`}
      >
        <DeleteIcon />
      </button>
    </div>
  )
}

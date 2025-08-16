import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import type { Todo } from '../_common/types'
export default function DraggableTodoCard({
  todo,
  onToggle,
  onDelete,
  isUpdating,
}: {
  todo: Todo
  onToggle: (id: number) => void
  onDelete: (id: number) => void
  isUpdating: boolean
}) {
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
        onClick={(e) => {
          e.stopPropagation()
          onToggle(todo.id)
        }}
        disabled={isUpdating}
        className={`flex-shrink-0 w-5 h-5 rounded border-2 transition-all duration-200 ${
          todo.completed
            ? 'bg-green-500 border-green-500 text-white scale-110'
            : 'border-gray-300 hover:border-blue-500 hover:scale-110'
        } ${isUpdating ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        {todo.completed && (
          <svg className='w-full h-full' fill='currentColor' viewBox='0 0 20 20'>
            <path
              fillRule='evenodd'
              d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
              clipRule='evenodd'
            />
          </svg>
        )}
      </button>

      <span
        className={`flex-1 text-sm transition-all duration-200 ${
          todo.completed ? 'text-gray-500 line-through' : 'text-gray-900'
        }`}
      >
        {todo.todo}
      </span>

      <button
        onClick={(e) => {
          e.stopPropagation()
          onDelete(todo.id)
        }}
        disabled={isUpdating}
        className={`text-gray-400 hover:text-red-600 transition-all duration-200 hover:scale-110 ${
          isUpdating ? 'opacity-50 cursor-not-allowed' : ''
        }`}
      >
        <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16'
          />
        </svg>
      </button>
    </div>
  )
}

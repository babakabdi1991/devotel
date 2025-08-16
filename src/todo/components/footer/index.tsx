import { useAppSelector } from '../../store/hooks'

export default function Footer() {
  const { sortedTodos } = useAppSelector((state) => state.todos)
  const hasTodo = sortedTodos.length > 0
  if (!hasTodo) return null

  return (
    <div className='mt-6 pt-4 border-t border-gray-200'>
      <p className='text-sm text-gray-600 text-center'>
        {sortedTodos.filter((t) => t.completed).length} of {sortedTodos.length} completed
      </p>
    </div>
  )
}

import { KeyboardSensor, PointerSensor, useSensor, useSensors, type DragEndEvent } from '@dnd-kit/core'
import { sortableKeyboardCoordinates } from '@dnd-kit/sortable'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { reorderTodos } from '../store/todoSlice'

export function useDrag() {
  const { sortedTodos } = useAppSelector((state) => state.todos)
  const dispatch = useAppDispatch()

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8, // Start dragging after 8px movement
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    if (active.id !== over?.id) {
      const oldIndex = sortedTodos.findIndex((item) => item.id === active.id)
      const newIndex = sortedTodos.findIndex((item) => item.id === over?.id)

      if (oldIndex !== -1 && newIndex !== -1) {
        dispatch(reorderTodos({ oldIndex, newIndex }))
      }
    }
  }

  return { sensors, handleDragEnd }
}

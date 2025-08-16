import type { Todo } from '../../_common/types'

export type DraggableTodoCardProps = {
  todo: Todo
  onToggle: (id: number) => void
  onDelete: (id: number) => void
  isUpdating: boolean
}

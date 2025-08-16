import type { DragEndEvent } from '@dnd-kit/core'
import { closestCenter, DndContext, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core'
import { SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMemo } from 'react'
import { useForm } from 'react-hook-form'
import DraggableTodoCard from './components/draggableTodoCard'
import Error from './components/error'
import Loading from './components/loading'
import { useCreateTodo, useDeleteTodo, useGetTodo, useUpdateTodo } from './query'
import { useAppDispatch, useAppSelector } from './store/hooks'
import { reorderTodos, setError, setTodos } from './store/todoSlice'
import { baseSchema, type TodoFormData } from './validation'

// API functions

function Todos() {
  const dispatch = useAppDispatch()
  //   const queryClient = useQueryClient()

  // Redux state
  //   const { sortedTodos, loading, error } = useAppSelector((state) => state.todos)
  const { sortedTodos, error } = useAppSelector((state) => state.todos)

  const { todos, isLoading, getTodosError } = useGetTodo()

  // Update Redux state when data is loaded
  useMemo(() => {
    if (todos.length > 0) {
      dispatch(setTodos(todos))
    }
  }, [todos, dispatch])

  // Handle query errors
  useMemo(() => {
    if (getTodosError) {
      dispatch(setError(getTodosError.message))
    }
  }, [getTodosError, dispatch])

  const createTodoMutation = useCreateTodo()
  const updateTodoMutation = useUpdateTodo()
  const deleteTodoMutation = useDeleteTodo()

  const titles = useMemo(() => sortedTodos.map((todo) => todo.todo), [sortedTodos])

  //Zod issue:https://github.com/colinhacks/zod/issues/1696
  const schema = useMemo(
    () =>
      baseSchema.superRefine((data, ctx) => {
        if (titles.includes(data.todo)) {
          ctx.addIssue({ path: ['todo'], code: 'custom', message: 'repetitive title' })
        }
      }),
    [titles]
  )

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TodoFormData>({
    resolver: zodResolver(schema),
    defaultValues: { todo: '' },
    mode: 'onChange',
  })

  // DnD Sensors with enhanced configuration
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

  const handleAddTodo = (data: TodoFormData) => {
    createTodoMutation.mutate({
      todo: data.todo,
      completed: false,
      userId: 1, // Default user ID
    })
    reset()
  }

  const handleToggleTodo = (id: number) => {
    const todo = sortedTodos.find((t) => t.id === id)
    if (todo) {
      updateTodoMutation.mutate({
        id,
        data: { completed: !todo.completed },
      })
    }
  }

  const handleDeleteTodo = (id: number) => {
    if (window.confirm('Are you sure you want to delete this todo?')) {
      deleteTodoMutation.mutate(id)
    }
  }

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

  if (isLoading) <Loading />
  if (getTodosError || error) <Error />

  return (
    <div className='min-h-screen bg-gray-50 py-8'>
      <div className='max-w-md mx-auto bg-white rounded-lg shadow-md p-6'>
        <h1 className='text-2xl font-bold text-gray-900 mb-6 text-center'>Todo List</h1>

        {/* Add Todo Form */}
        <form onSubmit={handleSubmit(handleAddTodo)} className='mb-6'>
          <div className='flex gap-2'>
            <input
              {...register('todo')}
              type='text'
              placeholder='Add a new todo...'
              disabled={createTodoMutation.isPending}
              className='flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 disabled:opacity-50'
            />
            <button
              type='submit'
              disabled={createTodoMutation.isPending}
              className='px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed'
            >
              {createTodoMutation.isPending ? 'Adding...' : 'Add'}
            </button>
          </div>
          {errors.todo && <p className='mt-1 text-sm text-red-600'>{errors.todo.message}</p>}
        </form>

        {/* Draggable Todo List with Animations */}
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={sortedTodos.map((todo) => todo.id)} strategy={verticalListSortingStrategy}>
            <div className='space-y-2'>
              {sortedTodos.length === 0 ? (
                <p className='text-gray-500 text-center py-4'>No todos yet. Add one above!</p>
              ) : (
                sortedTodos.map((todo) => (
                  <DraggableTodoCard
                    key={todo.id}
                    todo={todo}
                    onToggle={handleToggleTodo}
                    onDelete={handleDeleteTodo}
                    isUpdating={updateTodoMutation.isPending}
                  />
                ))
              )}
            </div>
          </SortableContext>
        </DndContext>

        {/* Stats */}
        {sortedTodos.length > 0 && (
          <div className='mt-6 pt-4 border-t border-gray-200'>
            <p className='text-sm text-gray-600 text-center'>
              {sortedTodos.filter((t) => t.completed).length} of {sortedTodos.length} completed
            </p>
          </div>
        )}

        {/* Mutation Status */}
        {(createTodoMutation.isPending || updateTodoMutation.isPending || deleteTodoMutation.isPending) && (
          <div className='mt-4 p-2 bg-blue-50 border border-blue-200 rounded-md'>
            <p className='text-sm text-blue-600 text-center'>
              {createTodoMutation.isPending && 'Adding todo...'}
              {updateTodoMutation.isPending && 'Updating todo...'}
              {deleteTodoMutation.isPending && 'Deleting todo...'}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Todos

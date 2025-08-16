import { zodResolver } from '@hookform/resolvers/zod'
import { useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { useAppSelector } from '../../store/hooks'
import type { FormProps } from './types'
import { baseSchema, type TodoFormData } from './validation'

export default function AddTodoForm({ mutate, isPending }: FormProps) {
  const { sortedTodos = [] } = useAppSelector((state) => state.todos)

  const handleAddTodo = (data: TodoFormData) => {
    mutate({
      todo: data.todo,
      completed: false,
      userId: 1, // Default user ID
    })
    reset()
  }

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
  })

  return (
    <form onSubmit={handleSubmit(handleAddTodo)} className='mb-6'>
      <div className='flex gap-2'>
        <input
          {...register('todo')}
          type='text'
          placeholder='Add a new todo...'
          disabled={isPending}
          className='flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 disabled:opacity-50'
        />
        <button
          type='submit'
          disabled={isPending}
          className='px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed'
        >
          {isPending ? 'Adding...' : 'Add'}
        </button>
      </div>
      {errors.todo && <p className='mt-1 text-sm text-red-600'>{errors.todo.message}</p>}
    </form>
  )
}

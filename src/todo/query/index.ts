import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useAppDispatch } from '../store/hooks'
import { addTodo, deleteTodo, setError, updateTodo } from '../store/todoSlice'
import type { CreateTodoRequest, UpdateTodoRequest } from '../types'
import { todoApi } from './api'

export function useGetTodo() {
  const {
    data: todos = [],
    isLoading,
    error: getTodosError,
  } = useQuery({
    queryKey: ['todos'],
    queryFn: todoApi.getTodos,
  })

  return { todos, isLoading, getTodosError }
}

export function useCreateTodo() {
  const dispatch = useAppDispatch()
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (todoData: CreateTodoRequest) => todoApi.createTodo(todoData),
    onSuccess: (newTodo) => {
      queryClient.invalidateQueries({ queryKey: ['todos'] })
      dispatch(addTodo(newTodo))
    },
    onError: (error) => {
      dispatch(setError(error.message))
    },
  })
}

export function useUpdateTodo() {
  const dispatch = useAppDispatch()
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateTodoRequest }) => todoApi.updateTodo(id, data),
    onSuccess: (updatedTodo) => {
      queryClient.invalidateQueries({ queryKey: ['todos'] })
      dispatch(updateTodo(updatedTodo))
    },
    onError: (error) => {
      dispatch(setError(error.message))
    },
  })
}

export function useDeleteTodo() {
  const dispatch = useAppDispatch()
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: number) => todoApi.deleteTodo(id),
    onSuccess: (_, deletedId) => {
      queryClient.invalidateQueries({ queryKey: ['todos'] })
      dispatch(deleteTodo(deletedId))
    },
    onError: (error) => {
      dispatch(setError(error.message))
    },
  })
}

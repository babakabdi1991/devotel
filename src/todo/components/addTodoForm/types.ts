import type { UseMutateFunction } from '@tanstack/react-query'
import type { Todo } from '../../_common/types'
import type { CreateTodoRequest } from '../../types'

export type FormProps = {
  mutate: UseMutateFunction<Todo, Error, CreateTodoRequest, unknown>
  isPending: boolean
}

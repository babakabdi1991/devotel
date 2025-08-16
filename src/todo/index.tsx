import { closestCenter, DndContext } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import AddTodoForm from './components/addTodoForm'
import Error from './components/error'
import Layout from './components/layout'
import Loading from './components/loading'
import TodoList from './components/todoList'
import { useDelete } from './hooks/useDelete'
import { useDrag } from './hooks/useDrag'
import { useUpdate } from './hooks/useUpdate'
import { useCreateTodo, useGetTodo } from './query'
import { useAppSelector } from './store/hooks'

function Todos() {
  const { sortedTodos, error } = useAppSelector((state) => state.todos)
  const { isLoading, getTodosError } = useGetTodo()

  const { isUpdatePending, handleToggleTodo } = useUpdate()
  const { handleDeleteTodo, isDeletePending } = useDelete()
  const { mutate: createMutation, isPending: isCreatePending } = useCreateTodo()
  const { sensors, handleDragEnd } = useDrag()

  const isPending = isUpdatePending || isCreatePending || isDeletePending

  if (isLoading) <Loading />
  if (getTodosError || error) <Error />

  return (
    <Layout isPending={isPending}>
      <AddTodoForm mutate={createMutation} isPending={isCreatePending} />
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={sortedTodos.map((todo) => todo.id)} strategy={verticalListSortingStrategy}>
          <TodoList
            handleToggleTodo={handleToggleTodo}
            handleDeleteTodo={handleDeleteTodo}
            isUpdatePending={isUpdatePending}
          />
        </SortableContext>
      </DndContext>
    </Layout>
  )
}

export default Todos

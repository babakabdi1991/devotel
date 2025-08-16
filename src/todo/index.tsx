import { closestCenter, DndContext } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { useMemo } from 'react'
import AddTodoForm from './components/addTodoForm'
import Error from './components/error'
import Footer from './components/footer'
import Layout from './components/layout'
import Loading from './components/loading'
import MutationStatus from './components/mutationStatus'
import TodoList from './components/todoList'
import { useDelete } from './hooks/useDelete'
import { useDrag } from './hooks/useDrag'
import { useUpdate } from './hooks/useUpdate'
import { useCreateTodo, useGetTodo } from './query'
import { useAppDispatch, useAppSelector } from './store/hooks'
import { setError, setTodos } from './store/todoSlice'

function Todos() {
  const dispatch = useAppDispatch()
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

  const { isUpdatePending, handleToggleTodo } = useUpdate()
  const { handleDeleteTodo, isDeletePending } = useDelete()
  const { mutate: createMutation, isPending: isCreatePending } = useCreateTodo()
  const { sensors, handleDragEnd } = useDrag()

  if (isLoading) <Loading />
  if (getTodosError || error) <Error />

  return (
    <Layout>
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
      <Footer />
      <MutationStatus
        isUpdatePending={isUpdatePending}
        isCreatePending={isCreatePending}
        isDeletePending={isDeletePending}
      />
    </Layout>
  )
}

export default Todos

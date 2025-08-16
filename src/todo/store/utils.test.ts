import { describe, expect, it } from 'vitest'
import type { Todo } from '../_common/types'
import { getTodoIndex } from './utils'

const MockTodos: Todo[] = [
  { id: 1, todo: 'Buy milk', completed: false, userId: 4 },
  { id: 2, todo: 'Walk dog', completed: true, userId: 5 },
  { id: 3, todo: 'Write tests', completed: false, userId: 6 },
]

describe('getTodoIndex', () => {
  it('returns the correct index when todo exists', () => {
    const index = getTodoIndex(MockTodos, 2)
    expect(index).toBe(1) // id=2 is at index 1
  })

  it('returns -1 when todo does not exist', () => {
    const index = getTodoIndex(MockTodos, 999)
    expect(index).toBe(-1)
  })

  it('returns 0 when the first todo matches', () => {
    const index = getTodoIndex(MockTodos, 1)
    expect(index).toBe(0)
  })

  it('works with an empty array', () => {
    const index = getTodoIndex([], 1)
    expect(index).toBe(-1)
  })
})

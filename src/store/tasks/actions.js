import * as actionsTypes from './actionTypes'
export function taskCompleted(task) {
  return { type: actionsTypes.taskUpdated, payload: { ...task, completed: !task.completed } }
}
export function taskTitleChanged(task, title) {
  return { type: actionsTypes.taskUpdated, payload: { ...task, title } }
}
export function taskDeleted(task) {
  return { type: actionsTypes.taskDeleted, payload: { ...task } }
}
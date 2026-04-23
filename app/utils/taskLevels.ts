import type { InformationSystem } from '~/model/InformationSystem'
import type { Page } from '~/model/Page'
import type { Task } from '~/model/Task/Task'
import { TaskStatus } from '~/model/Task/TaskStatus'

export function isTaskDone(task: Task): boolean {
  return task.completed === true
    || task.status === TaskStatus.COMPLETED
    || (task.activity?.isCompleted === true && task.finish?.isComplete === true)
}

export function isTaskLevelLocked(task: Task, currentRound: number): boolean {
  return task.round > currentRound
}

export function areLevelTasksDone(tasks: Task[], level: number): boolean {
  const levelTasks = tasks.filter(task => task.round === level)
  return levelTasks.length > 0 && levelTasks.every(isTaskDone)
}

export function advanceCurrentRound(system: InformationSystem): boolean {
  let advanced = false

  while (areLevelTasksDone(system.tasks, system.currentRound)) {
    system.currentRound += 1
    advanced = true
  }

  return advanced
}

export function levelVisiblePagesMatch(tasks: Task[], level: number, allPages: Page[] = []): boolean {
  const levelTasks = tasks.filter(task => task.round === level)

  if (levelTasks.length <= 1) {
    return true
  }

  const [firstSignature, ...restSignatures] = levelTasks.map(task => visiblePagesSignature(task, allPages))
  return restSignatures.every(signature => signature === firstSignature)
}

export function inconsistentVisiblePageLevels(tasks: Task[], allPages: Page[] = []): number[] {
  const levels = [...new Set(tasks.map(task => task.round))].sort((a, b) => a - b)
  return levels.filter(level => !levelVisiblePagesMatch(tasks, level, allPages))
}

function visiblePagesSignature(task: Task, allPages: Page[]): string {
  const pages = Array.isArray(task.visiblePages) ? task.visiblePages : allPages
  return pages
    .map(page => page.route)
    .sort((a, b) => a.localeCompare(b))
    .join('|')
}


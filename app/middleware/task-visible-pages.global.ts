import {
  firstTaskAllowedPage,
  systemVisiblePages,
  systemPageRouteFromPath,
  taskAllowsPage,
} from '~/utils/taskPageVisibility'

export default defineNuxtRouteMiddleware((to) => {
  const systemId = typeof to.params.id === 'string' ? to.params.id : null

  if (!systemId) {
    return
  }

  const systemsStore = useSystemsStore()
  const globalSettings = useGlobalSettingsStore()
  const system = systemsStore.getSystemById(systemId)

  if (!system) {
    return
  }

  const pageRoute = systemPageRouteFromPath(to.path, systemId)
  const systemPage = systemVisiblePages(system).find(page => page.route === pageRoute)

  if (!systemPage) {
    return
  }

  const selectedTask = globalSettings.selectedTaskId
    ? system.tasks.find(task => task.id === globalSettings.selectedTaskId)
    : null

  if (taskAllowsPage(selectedTask, systemPage.route)) {
    return
  }

  const fallbackPage = firstTaskAllowedPage(system, selectedTask)

  if (fallbackPage) {
    return navigateTo(`/systems/${systemId}${fallbackPage.route}`, { replace: true })
  }

  return abortNavigation()
})

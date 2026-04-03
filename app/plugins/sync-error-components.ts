export default defineNuxtPlugin((_nuxtApp) => {
    const systemsStore = useSystemsStore()
    const globalSettings = useGlobalSettingsStore()

    const sync = () => {
        const tasks = systemsStore.selectedSystem?.tasks ?? []
        const solved = new Set(globalSettings.solvedComponentIds)
        const ids = new Set<string>()
        console.log('[sync-error-components] raw globalSettings.solvedComponentIds:', globalSettings.solvedComponentIds)
        console.log('[sync-error-components] solvedComponentIds:', [...solved])
        for (const task of tasks) {
            for (const component of task.errorComponents ?? []) {
                const isSolved = solved.has(component.id)
                console.log(`[sync-error-components] component "${component.id}" (${component.name}) → solved: ${isSolved}`)
                if (!isSolved) {
                    ids.add(component.id)
                }
            }
        }
        console.log('[sync-error-components] final errorComponentIds:', [...ids])
        globalSettings.errorComponentIds = Array.from(ids)
    }

    watch(
        () => [systemsStore.selectedSystem?.tasks, globalSettings.solvedComponentIds] as const,
        sync,
        { deep: true, immediate: true }
    )
})

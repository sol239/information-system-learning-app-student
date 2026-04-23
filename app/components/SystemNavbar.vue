<template>
    <div class="w-full sticky top-0 z-[11000] bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
        <div class="max-w-[100vw] px-4 mx-auto">
            <!-- Main navbar container -->
            <div class="flex flex-wrap items-center justify-between gap-4 py-2">

                <!-- Left Section: Navigation Menu -->
                <nav
                    class="flex flex-wrap items-center gap-1 p-1 bg-gray-100/50 dark:bg-gray-800/50 rounded-lg border border-gray-200/50 dark:border-gray-700/50">
                    <template v-for="item in localItems" :key="item.route">
                        <NuxtLink v-if="isPageAvailable(item.route)" :to="item.to"
                            class="flex items-center gap-2 px-3 py-1.5 rounded-md transition-all duration-200 group relative"
                            :class="[
                                $route.path === item.to
                                    ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm ring-1 ring-gray-200/50 dark:ring-gray-600/50'
                                    : 'text-gray-600 dark:text-gray-400 hover:bg-white/50 dark:hover:bg-gray-700/50 hover:text-gray-900 dark:hover:text-white'
                            ]">
                            <UIcon :name="item.icon || 'i-lucide-file'" class="w-5 h-5 transition-transform duration-200 group-hover:scale-110" />
                            <span class="text-sm font-medium">{{ item.label }}</span>

                            <div v-if="$route.path === item.to"
                                class="absolute -bottom-1 left-3 right-3 h-0.5 bg-primary-500 rounded-full"></div>
                        </NuxtLink>

                        <ModernHoverPopover
                            v-else
                            :title="t('task_page_unavailable_title')"
                            :description="t('task_page_unavailable_description')"
                            icon="i-lucide-lock"
                        >
                            <button
                                type="button"
                                class="flex cursor-not-allowed items-center gap-2 rounded-md px-3 py-1.5 text-gray-400 opacity-70 dark:text-gray-500"
                                :aria-label="`${item.label}: ${t('task_page_unavailable_description')}`"
                            >
                                <UIcon :name="item.icon || 'i-lucide-lock'" class="h-5 w-5" />
                                <span class="text-sm font-medium">{{ item.label }}</span>
                            </button>
                        </ModernHoverPopover>
                    </template>
                </nav>

            </div>
        </div>
    </div>

</template>

<script setup lang="ts">
/* 1. Imports */
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { DATABASE_PAGE_ROUTE, systemVisiblePages, taskAllowsPage } from '~/utils/taskPageVisibility'

/* 2. Stores */
const highlightStore = useHighlightStore()
const systemsStore = useSystemsStore()
const globalSettingsStore = useGlobalSettingsStore()

/* 3. Context hooks */
const { t, locale } = useI18n()
const route = useRoute()

/* 8. Local state (ref, reactive) */
const tasksPopoverOpen = ref(false)

const selectedTask = computed(() => {
    const selectedTaskId = globalSettingsStore.selectedTaskId

    if (!selectedTaskId) {
        return null
    }

    return systemsStore.selectedSystem?.tasks?.find(task => task.id === selectedTaskId) ?? null
})

const localItems = computed(() => {
    // Access locale.value so the computed updates when the locale changes
    void locale.value

    const system = systemsStore.selectedSystem
    const pages = system
        ? systemVisiblePages(system, t('database')).filter(page => page.route !== DATABASE_PAGE_ROUTE)
        : []
    return pages.map(page => ({
        label: page.name,
        route: page.route,        icon: page.icon,        to: `/systems/${systemsStore.selectedSystemId}${page.route}`,
        data_target: page.route.replace(/^\//, '').replace(/\//g, '-'),
    }))
})

function isPageAvailable(pageRoute: string): boolean {
    return taskAllowsPage(selectedTask.value, pageRoute)
}

/* 10. Watchers */
onMounted(() => {
    // TODO:
    const handleKeydown = (event: KeyboardEvent) => {
        if (event.key === 'q' && event.altKey) {
            //highlightStore.toggleHighlight()
        }
        if (event.key === 'w' && event.altKey) {
            //highlightStore.toggleEdit()
        }
        if (event.key === 't' && event.altKey) {
            event.preventDefault()
            tasksPopoverOpen.value = !tasksPopoverOpen.value
        }
    }

    document.addEventListener('keydown', handleKeydown)

    onUnmounted(() => {
        document.removeEventListener('keydown', handleKeydown)
    })
})
</script>

<style scoped>
/* Hide button labels on mobile screens */
@media (max-width: 639px) {
    .mobile-hidden {
        display: none;
    }
}
</style>

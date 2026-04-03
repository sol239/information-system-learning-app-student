<template>
    <div class="w-full sticky top-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800"
        style="z-index: 10000;">
        <div class="max-w-[100vw] px-4 mx-auto">
            <!-- Main navbar container -->
            <div class="flex flex-wrap items-center justify-between gap-4 py-2">

                <!-- Left Section: Navigation Menu -->
                <nav
                    class="flex flex-wrap items-center gap-1 p-1 bg-gray-100/50 dark:bg-gray-800/50 rounded-lg border border-gray-200/50 dark:border-gray-700/50">
                    <NuxtLink v-for="item in localItems" :key="item.label" :to="item.to as any"
                        class="flex items-center gap-2 px-3 py-1.5 rounded-md transition-all duration-200 group relative"
                        :class="[
                            $route.path === item.to
                                ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm ring-1 ring-gray-200/50 dark:ring-gray-600/50'
                                : 'text-gray-600 dark:text-gray-400 hover:bg-white/50 dark:hover:bg-gray-700/50 hover:text-gray-900 dark:hover:text-white'
                        ]">
                        <span class="text-sm font-medium">{{ item.label }}</span>

                        <div v-if="$route.path === item.to"
                            class="absolute -bottom-1 left-3 right-3 h-0.5 bg-primary-500 rounded-full"></div>
                    </NuxtLink>
                </nav>

                <!-- Right Section: System Actions -->
                <SystemToolbar />
            </div>
        </div>
    </div>

</template>

<script setup lang="ts">
/* 1. Imports */
import { computed, onMounted, onUnmounted, ref } from 'vue'
import SystemToolbar from '~/components/SystemToolbar.vue'

/* 2. Stores */
const highlightStore = useHighlightStore()
const systemsStore = useSystemsStore()

/* 3. Context hooks */
const { t, locale } = useI18n()

/* 8. Local state (ref, reactive) */
const tasksPopoverOpen = ref(false)

const localItems = computed(() => {
    void locale.value
    const pages = systemsStore.selectedSystem?.pages ?? []
    return pages.map(page => ({
        label: page.name,
        to: `/systems/${systemsStore.selectedSystemId}${page.route}`,
        data_target: page.route.replace(/^\//, '').replace(/\//g, '-'),
    }))
})

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

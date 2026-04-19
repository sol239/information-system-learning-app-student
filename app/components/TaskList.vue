<template>
  <div class="flex flex-col">
    <!-- Task detail view -->
    <div v-if="selectedTask" class="flex flex-col p-4 gap-4">
      <UButton
        icon="i-lucide-arrow-left"
        variant="ghost"
        color="neutral"
        size="sm"
        class="self-start"
        @click="selectedTask = null"
      >
        {{ t('back_to_tasks') }}
      </UButton>
      <TaskStudentDetail :task="selectedTask" />
    </div>

    <!-- Task list view -->
    <div v-else class="flex flex-col p-4 gap-2">
      <div v-if="!tasks.length" class="flex flex-col items-center py-8 text-center gap-2">
        <UIcon name="i-lucide-clipboard-list" class="w-10 h-10 text-gray-300 dark:text-gray-600" />
        <p class="text-sm text-gray-500 dark:text-gray-400">{{ t('task_list_empty') }}</p>
      </div>

      <button
        v-for="task in tasks"
        :key="task.id"
        class="flex flex-col gap-1.5 rounded-lg border border-gray-200 dark:border-gray-700 p-3 text-left transition-colors hover:bg-gray-50 dark:hover:bg-gray-800/60 cursor-pointer w-full"
        @click="openTask(task)"
      >
        <div class="flex items-start justify-between gap-2">
          <span class="font-medium text-sm text-gray-900 dark:text-white leading-snug">{{ task.title }}</span>
          <span
            role="checkbox"
            :aria-checked="isTaskDone(task)"
            :aria-label="t('task_completed')"
            class="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded border-2 transition-colors"
            :class="isTaskDone(task)
              ? 'border-green-500 bg-green-500 dark:border-green-400 dark:bg-green-400'
              : 'border-gray-300 bg-white dark:border-gray-600 dark:bg-gray-900'"
          >
            <UIcon v-if="isTaskDone(task)" name="i-lucide-check" class="h-3 w-3 text-white" />
          </span>
        </div>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useSystemsStore } from '~/stores/systemsStore'
import type { Task } from '~/model/Task/Task'

const { t } = useI18n()

const systemsStore = useSystemsStore()
const globalSettings = useGlobalSettingsStore()
const selectedTask = ref<Task | null>(null)

const tasks = computed(() => systemsStore.selectedSystem?.tasks ?? [])

function isTaskDone(task: Task): boolean {
  return task.activity?.isCompleted === true && task.finish?.isComplete === true
}

function openTask(task: Task) {
  if (globalSettings.teacherMode) {
    globalSettings.selectedTaskId = task.id
    return
  }

  selectedTask.value = task
}
</script>

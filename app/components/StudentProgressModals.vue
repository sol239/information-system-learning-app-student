<template>
  <div>
    <UModal
      v-model:open="welcomeModalOpen"
      :title="t('student_welcome_modal_title')"
      :ui="{ content: 'sm:max-w-md' }"
    >
      <template #body>
        <div class="space-y-4">
          <p class="text-sm leading-6 text-gray-600 dark:text-gray-300">
            {{ t('student_welcome_modal_description') }}
          </p>

          <div class="rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 dark:border-gray-800 dark:bg-gray-900">
            <div class="flex items-center justify-between gap-4">
              <span class="text-sm font-medium text-gray-700 dark:text-gray-200">
                {{ t('student_welcome_modal_tasks_count') }}
              </span>
              <UBadge color="primary" variant="subtle" size="lg">
                {{ taskCount }}
              </UBadge>
            </div>
          </div>
        </div>
      </template>

      <template #footer>
        <div class="flex w-full justify-end">
          <UButton color="primary" @click="closeWelcomeModal">
            {{ t('student_welcome_modal_button') }}
          </UButton>
        </div>
      </template>
    </UModal>

    <UModal
      v-model:open="completedModalOpen"
      :title="t('student_completed_modal_title')"
      :ui="{ content: 'sm:max-w-md' }"
    >
      <template #body>
        <div class="space-y-4">
          <p class="text-sm leading-6 text-gray-600 dark:text-gray-300">
            {{ t('student_completed_modal_description') }}
          </p>

          <div class="grid grid-cols-2 gap-3">
            <div class="rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 dark:border-gray-800 dark:bg-gray-900">
              <div class="text-xs font-medium uppercase text-gray-500 dark:text-gray-400">
                {{ t('tasks') }}
              </div>
              <div class="mt-1 text-xl font-semibold text-gray-900 dark:text-white">
                {{ completedTasksCount }}/{{ taskCount }}
              </div>
            </div>

            <div class="rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 dark:border-gray-800 dark:bg-gray-900">
              <div class="text-xs font-medium uppercase text-gray-500 dark:text-gray-400">
                {{ t('score') }}
              </div>
              <div class="mt-1 text-xl font-semibold text-gray-900 dark:text-white">
                {{ score }}
              </div>
            </div>
          </div>
        </div>
      </template>

      <template #footer>
        <div class="flex w-full justify-end">
          <UButton color="primary" @click="completedModalOpen = false">
            {{ t('student_completed_modal_button') }}
          </UButton>
        </div>
      </template>
    </UModal>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import { TaskStatus } from '~/model/Task/TaskStatus'

const { t } = useI18n()
const globalSettings = useGlobalSettingsStore()
const systemsStore = useSystemsStore()

const welcomeModalOpen = ref(false)
const completedModalOpen = ref(false)
const isMounted = ref(false)

const systemId = computed(() => systemsStore.selectedSystemId ?? 'unknown')
const tasks = computed(() => systemsStore.selectedSystem?.tasks ?? [])
const taskCount = computed(() => tasks.value.length)
const completedTasksCount = computed(() =>
  tasks.value.filter(task => task.completed || task.status === TaskStatus.COMPLETED).length,
)
const allTasksCompleted = computed(() => taskCount.value > 0 && completedTasksCount.value === taskCount.value)
const score = computed(() => systemsStore.selectedSystem?.score.score ?? 0)
const studentModeActive = computed(() => isMounted.value && !!systemsStore.selectedSystem && !globalSettings.teacherMode)

const welcomeStorageKey = computed(() => `student-welcome-modal-seen:${systemId.value}`)
const completedStorageKey = computed(() => `student-completed-modal-seen:${systemId.value}`)

function hasSessionFlag(key: string) {
  return window.sessionStorage.getItem(key) === 'true'
}

function setSessionFlag(key: string) {
  window.sessionStorage.setItem(key, 'true')
}

function clearSessionFlag(key: string) {
  window.sessionStorage.removeItem(key)
}

function maybeOpenWelcomeModal() {
  if (!studentModeActive.value || hasSessionFlag(welcomeStorageKey.value)) {
    return
  }

  welcomeModalOpen.value = true
  setSessionFlag(welcomeStorageKey.value)
}

function maybeOpenCompletedModal() {
  if (!studentModeActive.value || !allTasksCompleted.value || welcomeModalOpen.value || hasSessionFlag(completedStorageKey.value)) {
    return
  }

  completedModalOpen.value = true
  setSessionFlag(completedStorageKey.value)
}

function closeWelcomeModal() {
  welcomeModalOpen.value = false
  maybeOpenCompletedModal()
}

onMounted(() => {
  isMounted.value = true
  maybeOpenWelcomeModal()
  maybeOpenCompletedModal()
})

watch([studentModeActive, systemId], () => {
  maybeOpenWelcomeModal()
  maybeOpenCompletedModal()
})

watch(allTasksCompleted, (isCompleted) => {
  if (!isMounted.value) {
    return
  }

  if (!isCompleted) {
    clearSessionFlag(completedStorageKey.value)
    completedModalOpen.value = false
    return
  }

  maybeOpenCompletedModal()
})

watch(welcomeModalOpen, (isOpen) => {
  if (!isOpen) {
    maybeOpenCompletedModal()
  }
})
</script>

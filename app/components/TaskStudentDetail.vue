<template>
  <UCard v-if="props.task" class="shadow-lg dark:bg-gray-900/50">
    <div class="space-y-6">
      <!-- Title & round/points -->
      <div class="flex flex-col gap-2">
        <div class="flex flex-wrap items-center gap-2">
          <UBadge color="sky" variant="subtle" size="lg">
            {{ t('task_round') }} {{ props.task.round }}
          </UBadge>
          <UBadge color="green" variant="subtle" size="lg">
            {{ props.task.pointsReward }} {{ t('task_pts') }}
          </UBadge>
          <UBadge v-if="props.task.failPenalty" color="red" variant="subtle" size="lg">
            -{{ props.task.failPenalty }} {{ t('task_penalty') }}
          </UBadge>
        </div>
        <h2 class="text-2xl font-bold text-gray-900 dark:text-white w-full">
          {{ props.task.title }}
        </h2>
        <p v-if="props.task.description" class="text-base text-gray-600 dark:text-gray-300 w-full">
          {{ props.task.description }}
        </p>
      </div>

      <!-- Activity section -->
      <div class="rounded-xl border border-gray-200 p-4 dark:border-gray-800 space-y-3">
        <div class="flex items-center justify-between gap-2">
          <div>
            <p class="text-xs font-semibold uppercase tracking-wide text-gray-400 dark:text-gray-500">{{ t('task_activity') }}</p>
            <h3 class="text-base font-semibold text-gray-900 dark:text-white">
              {{ activityLabel }}
            </h3>
          </div>
          <UBadge
            v-if="props.task.activityType === ActivityType.SELECT || props.task.activityType === ActivityType.SELECT_OPTIONS"
            :color="props.task.activity?.isCompleted ? 'green' : 'neutral'"
            variant="subtle"
            size="md"
            class="flex items-center gap-1.5"
          >
            <div
              class="w-4 h-4 rounded border-2 flex items-center justify-center shrink-0"
              :class="props.task.activity?.isCompleted
                ? 'border-green-500 bg-green-500 dark:border-green-400 dark:bg-green-400'
                : 'border-gray-400 dark:border-gray-500'"
            >
              <UIcon v-if="props.task.activity?.isCompleted" name="i-lucide-check" class="text-white w-3 h-3" />
            </div>
            {{ t('completed') }}
          </UBadge>
        </div>

        <p v-if="activityDescription" class="text-sm text-gray-700 dark:text-gray-300">
          {{ activityDescription }}
        </p>

        <!-- SELECT_OPTIONS activity options - checkable -->
        <div v-if="activityOptions.length" class="space-y-2">
          <div
            v-for="(option, index) in activityOptions"
            :key="`act-opt-${index}`"
            class="flex items-center gap-3 rounded-lg border px-3 py-2 select-none transition-colors"
            :class="[
              props.task.activity?.isCompleted
                ? 'cursor-not-allowed opacity-60'
                : 'cursor-pointer',
              selectedActivityOptionIndices.includes(index)
                ? 'border-sky-400 bg-sky-50 dark:border-sky-600 dark:bg-sky-900/20'
                : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
            ]"
            @click="!props.task.activity?.isCompleted && toggleActivityOption(index)"
          >
            <div
              class="w-5 h-5 rounded border-2 flex items-center justify-center shrink-0 transition-colors"
              :class="selectedActivityOptionIndices.includes(index)
                ? 'border-sky-500 bg-sky-500 dark:border-sky-400 dark:bg-sky-400'
                : 'border-gray-400 dark:border-gray-500'"
            >
              <UIcon v-if="selectedActivityOptionIndices.includes(index)" name="i-lucide-check" class="text-white w-3 h-3" />
            </div>
            <span class="text-sm text-gray-800 dark:text-gray-200">{{ option.text }}</span>
          </div>
        </div>

        <!-- substituteAfterActivity notice -->
        <div v-if="props.task.activity?.substituteAfterActivity" class="flex items-start gap-2 rounded-lg border border-blue-200 bg-blue-50 px-3 py-2 dark:border-blue-800 dark:bg-blue-900/20">
          <UIcon name="i-lucide-info" class="mt-0.5 shrink-0 text-blue-500 dark:text-blue-400" />
          <p class="text-sm text-blue-700 dark:text-blue-300">
            {{ t('task_substitute_notice') }}
          </p>
        </div>

        <!-- Selected components badges (SELECT activity) -->
        <div v-if="props.task.activityType === ActivityType.SELECT && selectedComponentNames.length" class="flex flex-wrap gap-2">
          <UBadge
            v-for="name in selectedComponentNames"
            :key="name"
            color="sky"
            variant="subtle"
            size="md"
          >
            {{ name }}
          </UBadge>
        </div>

        <div v-if="props.task.activityType === ActivityType.SELECT || props.task.activityType === ActivityType.SELECT_OPTIONS" class="flex items-center gap-3 mt-2">
          <UButton
            color="primary"
            variant="solid"
            icon="i-lucide-check-circle"
            :disabled="props.task.activity?.isCompleted === true"
            @click="evaluateActivity"
          >
            {{ t('evaluate') }}
          </UButton>
          <UBadge
            v-if="activityEvaluationResult === true"
            color="green"
            variant="subtle"
            size="lg"
            class="flex items-center gap-1"
          >
            <UIcon name="i-lucide-circle-check" class="w-4 h-4" />
            {{ t('correct_answer') }}
          </UBadge>
          <UBadge
            v-else-if="activityEvaluationResult === false"
            color="red"
            variant="subtle"
            size="lg"
            class="flex items-center gap-1"
          >
            <UIcon name="i-lucide-circle-x" class="w-4 h-4" />
            {{ t('incorrect_answer') }}
          </UBadge>
        </div>
      </div>

      <!-- Finish section -->
      <div class="rounded-xl border border-gray-200 p-4 dark:border-gray-800 space-y-3">
        <div>
          <p class="text-xs font-semibold uppercase tracking-wide text-gray-400 dark:text-gray-500">{{ t('task_finish') }}</p>
          <h3 class="text-base font-semibold text-gray-900 dark:text-white">
            {{ finishLabel }}
          </h3>
        </div>

        <p v-if="props.task.finishDescription" class="text-sm text-gray-700 dark:text-gray-300">
          {{ props.task.finishDescription }}
        </p>

        <!-- SELECT_OPTIONS finish options - checkable -->
        <div v-if="finishOptions.length" class="space-y-2">
          <div
            v-for="(option, index) in finishOptions"
            :key="`fin-opt-${index}`"
            class="flex items-center gap-3 rounded-lg border px-3 py-2 cursor-pointer select-none transition-colors"
            :class="selectedFinishOptionIndices.includes(index)
              ? 'border-sky-400 bg-sky-50 dark:border-sky-600 dark:bg-sky-900/20'
              : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'"
            @click="toggleFinishOption(index)"
          >
            <div
              class="w-5 h-5 rounded border-2 flex items-center justify-center shrink-0 transition-colors"
              :class="selectedFinishOptionIndices.includes(index)
                ? 'border-sky-500 bg-sky-500 dark:border-sky-400 dark:bg-sky-400'
                : 'border-gray-400 dark:border-gray-500'"
            >
              <UIcon v-if="selectedFinishOptionIndices.includes(index)" name="i-lucide-check" class="text-white w-3 h-3" />
            </div>
            <span class="text-sm text-gray-800 dark:text-gray-200">{{ option.text }}</span>
          </div>
        </div>

        <UInput
          v-if="props.task.finishType === FinishType.TYPE_CORRECT"
          v-model="typeCorrectAnswer"
          :placeholder="t('task_your_answer')"
          class="w-full"
        />

        <UButton
          v-if="props.task.finishType === FinishType.SELECT_OPTIONS || props.task.finishType === FinishType.TYPE_CORRECT"
          color="primary"
          variant="solid"
          icon="i-lucide-check-circle"
          class="mt-2"
        >
          {{ t('evaluate') }}
        </UButton>
      </div>

      <!-- Feedback -->
      <div v-if="props.task.feedback" class="rounded-xl border border-amber-200 bg-amber-50 p-4 dark:border-amber-800 dark:bg-amber-900/20">
        <p class="text-sm text-amber-800 dark:text-amber-300">{{ props.task.feedback }}</p>
      </div>
    </div>
  </UCard>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { ActivityType } from '~/model/Task/Activity/ActivityType'
import { FinishType } from '~/model/Task/Finish/FinishType'
import type { Task } from '~/model/Task/Task'
import type { SelectActivity } from '~/model/Task/Activity/SelectActivity'
import type { SelectOptionsActivity } from '~/model/Task/Activity/SelectOptionsActivity'
import type { Option } from '~/model/Task/Option'
import type { GUID } from '~/model/GUID'

const { t } = useI18n()
const highlightStore = useHighlightStore()
const systemsStore = useSystemsStore()
const globalSettings = useGlobalSettingsStore()

const props = defineProps<{
  task: Task | null
}>()

const selectedActivityOptionIndices = ref<number[]>([])
const selectedFinishOptionIndices = ref<number[]>([])
const typeCorrectAnswer = ref('')
const activityEvaluationResult = ref<boolean | null>(null)

function toggleActivityOption(index: number) {
  const idx = selectedActivityOptionIndices.value.indexOf(index)
  if (idx === -1) selectedActivityOptionIndices.value.push(index)
  else selectedActivityOptionIndices.value.splice(idx, 1)
}

function toggleFinishOption(index: number) {
  const idx = selectedFinishOptionIndices.value.indexOf(index)
  if (idx === -1) selectedFinishOptionIndices.value.push(index)
  else selectedFinishOptionIndices.value.splice(idx, 1)
}

function evaluateActivity() {
  const task = props.task
  if (!task?.activity) return

  console.log('[evaluateActivity] task.substituteAfterActivity:', (task as any).substituteAfterActivity, '| task.activity.substituteAfterActivity:', (task.activity as any).substituteAfterActivity)

  let isCorrect = false

  if (task.activityType === ActivityType.SELECT) {
    const activity = task.activity as SelectActivity
    const selectedIds = Array.from(highlightStore.selectedHighlightedComponentsIds)
    const correctIds = activity.activityComponents.map((c: any) => c.id)
    console.log('[SELECT] correct IDs:', correctIds, '| input:', selectedIds)
    isCorrect = selectedIds.length === correctIds.length && selectedIds.every(id => correctIds.includes(id))
    activity.isCompleted = isCorrect
  } else if (task.activityType === ActivityType.SELECT_OPTIONS) {
    const activity = task.activity as SelectOptionsActivity
    const correctIndices = activity.options
      .map((o: any, i: number) => o.isCorrect ? i : -1)
      .filter((i: number) => i !== -1)
    const selectedIndices = [...selectedActivityOptionIndices.value]
    console.log('[SELECT_OPTIONS] correct indices:', correctIndices, '| selected indices:', selectedIndices)
    isCorrect = selectedIndices.length === correctIndices.length && selectedIndices.every(i => correctIndices.includes(i))
    activity.isCompleted = isCorrect
  }

  activityEvaluationResult.value = isCorrect

  if (isCorrect) {
    const activity = task.activity as any
    console.log('[evaluateActivity] full task.activity:', JSON.parse(JSON.stringify(activity)))
    console.log('[evaluateActivity] full task keys:', Object.keys(task as any))
    const substitute = activity?.substituteAfterActivity || (task as any).substituteAfterActivity
    console.log('[evaluateActivity] substitute resolved to:', substitute)
    if (substitute) {
      const ids: string[] = (activity.activityComponents ?? []).map((c: any) => c.id).filter(Boolean)
      console.log('[evaluateActivity] adding to solvedComponentIds:', ids)
      for (const id of ids) {
        if (!globalSettings.solvedComponentIds.includes(id)) {
          globalSettings.solvedComponentIds.push(id)
        }
      }
      console.log('[evaluateActivity] solvedComponentIds after:', [...globalSettings.solvedComponentIds])
    }
  }

  // Persist updated progress to IndexedDB
  const system = systemsStore.selectedSystem
  if (system) {
    systemsStore.updateSystem(system)
  }

  const score = systemsStore.selectedSystem?.score
  if (score) {
    if (isCorrect) {
      score.increaseScore(task.pointsReward)
    } else {
      score.decreaseScore(task.failPenalty)
      score.incrementMistakes()
    }
  }
}

const selectedComponentNames = computed(() => {
  if (props.task?.activityType !== ActivityType.SELECT) return []
  const components = systemsStore.selectedSystem?.actualComponents ?? []
  return Array.from(highlightStore.selectedHighlightedComponentsIds)
    .map(id => components.find(c => c.id === id)?.name ?? id)
})

const activityLabel = computed(() => {
  const label = props.task?.activity?.label
  if (label) return label
  switch (props.task?.activityType) {
    case ActivityType.REPAIR: return t('task_activity_repair')
    case ActivityType.SELECT: return t('task_activity_select')
    case ActivityType.SELECT_OPTIONS: return t('task_activity_select_options')
    default: return t('task_activity')
  }
})

const activityDescription = computed(() => props.task?.activity?.description ?? '')

const activityOptions = computed<{ text: string }[]>(() => {
  const activity = props.task?.activity as ({ options?: { text: string }[] } | undefined)
  return activity?.options ?? []
})

const finishLabel = computed(() => {
  const task = props.task as (Task & { finish?: { label?: string } }) | null
  if (task?.finish?.label) return task.finish.label
  switch (props.task?.finishType) {
    case FinishType.IMMEDIATE: return t('task_finish_immediate')
    case FinishType.AFTER_DATABASE_UPDATE: return t('task_finish_after_db')
    case FinishType.SELECT_OPTIONS: return t('task_finish_select_options')
    case FinishType.TYPE_CORRECT: return t('task_finish_type_correct')
    default: return t('task_finish')
  }
})

const finishOptions = computed<{ text: string }[]>(() => {
  const task = props.task as (Task & { finish?: { options?: { text: string }[] } }) | null
  return task?.finish?.options ?? []
})
</script>

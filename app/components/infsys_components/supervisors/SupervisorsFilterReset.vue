<template>
    <UButton class="highlightable" id="supervisors-filter-reset" variant="outline" color="violet"
        size="xl" @click="resetFilter" icon="i-lucide-rotate-ccw"
        @click.stop="highlightStore.isHighlightMode && highlightStore.highlightHandler.selectElement('supervisors-filter-reset', $event)">
    </UButton>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useHighlightStore } from '#imports'
import { useComponentCodeStore } from '~/stores/useComponentCodeStore'
import { ComponentHandler } from '~/composables/ComponentHandler'

const highlightStore = useHighlightStore()
const componentCodeStore = useComponentCodeStore()

const filterText = defineModel<string>({ default: '' })

const participantsFilterResetComponent = computed(() => componentCodeStore.getComponentById('supervisors-filter-reset') || componentCodeStore.getDefaultComponent('supervisors-filter-reset'))

const correctParticipantsFilterResetSql = computed(() => participantsFilterResetComponent.value?.sql?.['sql'] || '')
const correctParticipantsFilterResetJs = computed(() => participantsFilterResetComponent.value?.js?.['js'] || '')
const correctParticipantsFilterResetHtml = computed(() => participantsFilterResetComponent.value?.html?.['html'] || '')
const correctParticipantsFilterResetCss = computed(() => participantsFilterResetComponent.value?.css?.['css'] || '')

const participantsFilterResetSql = computed(() => ComponentHandler.getComponentValue('supervisors-filter-reset', 'sql', correctParticipantsFilterResetSql.value))
const participantsFilterResetJs = computed(() => ComponentHandler.getComponentValue('supervisors-filter-reset', 'js', correctParticipantsFilterResetJs.value))
const participantsFilterResetHtml = computed(() => ComponentHandler.getComponentValue('supervisors-filter-reset', 'html', correctParticipantsFilterResetHtml.value))
const participantsFilterResetCss = computed(() => ComponentHandler.getComponentValue('supervisors-filter-reset', 'css', correctParticipantsFilterResetCss.value))

function resetFilter() {
    filterText.value = ''
}
</script>

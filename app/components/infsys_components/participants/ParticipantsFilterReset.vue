<template>
    <div class="highlightable" id="participants-filter-reset"
        @click="highlightStore.isHighlightMode ? highlightStore.highlightHandler.selectElement('participants-filter-reset', $event) : resetFilter()">
        <div class="component-wrapper">
            <UButton size="xl" variant="outline" color="sky" icon="i-lucide-rotate-ccw"
                :disabled="highlightStore.isEditModeActive">
            </UButton>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useHighlightStore } from '#imports'
import { useComponentCodeStore } from '~/stores/useComponentCodeStore'
import { ComponentHandler } from '~/composables/ComponentHandler'

const highlightStore = useHighlightStore()
const componentCodeStore = useComponentCodeStore()

const filterText = defineModel<string>({ default: '' })

const participantsFilterResetComponent = computed(() => componentCodeStore.getComponentById('participants-filter-reset') || componentCodeStore.getDefaultComponent('participants-filter-reset'))

const correctParticipantsFilterResetSql = computed(() => participantsFilterResetComponent.value?.sql?.['sql'] || '')
const correctParticipantsFilterResetJs = computed(() => participantsFilterResetComponent.value?.js?.['js'] || '')
const correctParticipantsFilterResetHtml = computed(() => participantsFilterResetComponent.value?.html?.['html'] || '')
const correctParticipantsFilterResetCss = computed(() => participantsFilterResetComponent.value?.css?.['css'] || '')

const participantsFilterResetSql = computed(() => ComponentHandler.getComponentValue('participants-filter-reset', 'sql', correctParticipantsFilterResetSql.value))
const participantsFilterResetJs = computed(() => ComponentHandler.getComponentValue('participants-filter-reset', 'js', correctParticipantsFilterResetJs.value))
const participantsFilterResetHtml = computed(() => ComponentHandler.getComponentValue('participants-filter-reset', 'html', correctParticipantsFilterResetHtml.value))
const participantsFilterResetCss = computed(() => ComponentHandler.getComponentValue('participants-filter-reset', 'css', correctParticipantsFilterResetCss.value))

function resetFilter() {
    filterText.value = ''
}
</script>

<template>
    <div class="highlightable" id="supervisors-filter-input"
        @click="highlightStore.isHighlightMode && highlightStore.highlightHandler.selectElement('supervisors-filter-input', $event)">
        <UInput v-model="filterText" color="violet" :placeholder="t('filter_supervisors')"
            size="xl" />
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useHighlightStore } from '#imports'
import { useComponentCodeStore } from '~/stores/useComponentCodeStore'
import { ComponentHandler } from '~/composables/ComponentHandler'

const { t } = useI18n()
const highlightStore = useHighlightStore()
const componentCodeStore = useComponentCodeStore()

const filterText = defineModel<string>({ default: '' })

const participantsFilterInputComponent = computed(() => componentCodeStore.getComponentById('supervisors-filter-input') || componentCodeStore.getDefaultComponent('supervisors-filter-input'))

const correctParticipantsFilterInputSql = computed(() => participantsFilterInputComponent.value?.sql?.['sql'] || '')
const correctParticipantsFilterInputJs = computed(() => participantsFilterInputComponent.value?.js?.['js'] || `(p.name && p.name.toLowerCase().includes(text)) ||
(p.email && p.email.toLowerCase().includes(text)) ||
(p.phone && p.phone.toLowerCase().includes(text)) ||
(p.address && p.address.toLowerCase().includes(text)) ||
(p.sessions && getSessionNames(p.sessions).toLowerCase().includes(text))`)
const correctParticipantsFilterInputHtml = computed(() => participantsFilterInputComponent.value?.html?.['html'] || '')
const correctParticipantsFilterInputCss = computed(() => participantsFilterInputComponent.value?.css?.['css'] || '')

const participantsFilterInputSql = computed(() => ComponentHandler.getComponentValue('supervisors-filter-input', 'sql', correctParticipantsFilterInputSql.value))
const participantsFilterInputJs = computed(() => ComponentHandler.getComponentValue('supervisors-filter-input', 'js', correctParticipantsFilterInputJs.value))
const participantsFilterInputHtml = computed(() => ComponentHandler.getComponentValue('supervisors-filter-input', 'html', correctParticipantsFilterInputHtml.value))
const participantsFilterInputCss = computed(() => ComponentHandler.getComponentValue('supervisors-filter-input', 'css', correctParticipantsFilterInputCss.value))
</script>

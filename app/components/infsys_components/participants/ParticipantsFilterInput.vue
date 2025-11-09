<template>
    <div class="highlightable" id="participants-filter-input"
        @click="highlightStore.isHighlightMode && highlightStore.highlightHandler.selectElement('participants-filter-input', $event)">
        <div class="component-wrapper">
            <UInput size="xl" v-model="filterText" color="sky"
                :placeholder="t('filter_participants')"
                :disabled="highlightStore.isEditModeActive" />
            <EditComponentModalOpenButton v-if="highlightStore.isEditModeActive"
                :componentId="'participants-filter-input'" class="edit-button" />
        </div>
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

const participantsFilterInputComponent = computed(() => componentCodeStore.getComponentById('participants-filter-input') || componentCodeStore.getDefaultComponent('participants-filter-input'))

const correctParticipantsFilterInputSql = computed(() => participantsFilterInputComponent.value?.sql?.['sql'] || '')
const correctParticipantsFilterInputJs = computed(() => participantsFilterInputComponent.value?.js?.['js'] || `(p.name && p.name.toLowerCase().includes(text)) ||
(p.email && p.email.toLowerCase().includes(text)) ||
(p.phone && p.phone.toLowerCase().includes(text)) ||
(p.address && p.address.toLowerCase().includes(text)) ||
(p.sessions && getSessionNames(p.sessions).toLowerCase().includes(text))`)
const correctParticipantsFilterInputHtml = computed(() => participantsFilterInputComponent.value?.html?.['html'] || '')
const correctParticipantsFilterInputCss = computed(() => participantsFilterInputComponent.value?.css?.['css'] || '')

const participantsFilterInputSql = computed(() => ComponentHandler.getComponentValue('participants-filter-input', 'sql', correctParticipantsFilterInputSql.value))
const participantsFilterInputJs = computed(() => ComponentHandler.getComponentValue('participants-filter-input', 'js', correctParticipantsFilterInputJs.value))
const participantsFilterInputHtml = computed(() => ComponentHandler.getComponentValue('participants-filter-input', 'html', correctParticipantsFilterInputHtml.value))
const participantsFilterInputCss = computed(() => ComponentHandler.getComponentValue('participants-filter-input', 'css', correctParticipantsFilterInputCss.value))
</script>

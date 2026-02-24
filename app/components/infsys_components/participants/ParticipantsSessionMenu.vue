<template>
    <div class="highlightable" :id="'participants-session-menu'"
        @click="highlightStore.isHighlightMode && highlightStore.highlightHandler.selectElement('participants-session-menu', $event)">
        <div class="component-wrapper">
            <USelect color="sky" size="xl" v-model="value" :items="filterSessionsItems"
                :disabled="highlightStore.isEditModeActive" />
            <EditComponentModalOpenButton v-if="highlightStore.isEditModeActive" :componentId="'sessions-list'"
                class="edit-button" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useSelectedSystemStore } from '#imports'
import { useHighlightStore } from '#imports'
import { useComponentCodeStore } from '~/stores/useComponentCodeStore'
import { ComponentHandler } from '~/composables/ComponentHandler'

const { t } = useI18n()
const highlightStore = useHighlightStore()
const componentCodeStore = useComponentCodeStore()
const selectedSystemStore = useSelectedSystemStore()

const value = defineModel<string>({ default: 'all' })

const participantsSessionMenuComponent = computed(() => componentCodeStore.getComponentById('participants-session-menu') || componentCodeStore.getDefaultComponent('participants-session-menu'))

const correctParticipantsSessionMenuSql = computed(() => participantsSessionMenuComponent.value?.sql?.['sql'] || '')
const correctParticipantsSessionMenuJs = computed(() => participantsSessionMenuComponent.value?.js?.['js'] || '')
const correctParticipantsSessionMenuHtml = computed(() => participantsSessionMenuComponent.value?.html?.['html'] || '')
const correctParticipantsSessionMenuCss = computed(() => participantsSessionMenuComponent.value?.css?.['css'] || '')

const participantsSessionMenuSql = computed(() => ComponentHandler.getComponentValue('participants-session-menu', 'sql', correctParticipantsSessionMenuSql.value))
const participantsSessionMenuJs = computed(() => ComponentHandler.getComponentValue('participants-session-menu', 'js', correctParticipantsSessionMenuJs.value))
const participantsSessionMenuHtml = computed(() => ComponentHandler.getComponentValue('participants-session-menu', 'html', correctParticipantsSessionMenuHtml.value))
const participantsSessionMenuCss = computed(() => ComponentHandler.getComponentValue('participants-session-menu', 'css', correctParticipantsSessionMenuCss.value))

// sessions-list component wiring via ComponentManager/ComponentHandler
const sessionsListComponent = computed(() => componentCodeStore.getComponentById('sessions-list') || componentCodeStore.getDefaultComponent('sessions-list'))
const correctSessionsListSql = computed(() => sessionsListComponent.value?.sql?.['sql'] || '')
const sessionsListSql = computed(() => ComponentHandler.getComponentValue('sessions-list', 'sql', correctSessionsListSql.value))

const sessions = computed(() => {
    const _ = selectedSystemStore.dbNumber
    if (!selectedSystemStore.selectedSystem?.db) {
        return []
    }
    try {
        const sessionsQuery = sessionsListSql.value
        if (!sessionsQuery) {
            return []
        }
        const _sessions = selectedSystemStore.selectedSystem.db.query(sessionsQuery).results || []
        return _sessions.map((s: any) => ({
            id: s.session_id,
            fromDate: new Date(s.from_date),
            toDate: new Date(s.to_date),
            capacity: s.capacity,
            participants: [],
            ifFull: function () { return this.participants.length >= this.capacity; }
        }))
    } catch (error) {
        console.error('Error loading sessions from database:', error)
        return []
    }
})

const filterSessionsItems = computed(() => [
    { label: t('all_sessions'), value: 'all' },
    ...sessions.value.map(session => ({
        label: formatDateRange(session.fromDate, session.toDate),
        value: session.id
    }))
])

const formatDateRange = (fromDate: Date, toDate: Date): string => {
    const from = fromDate.toLocaleDateString('cs-CZ', { day: 'numeric', month: 'short' })
    const to = toDate.toLocaleDateString('cs-CZ', { day: 'numeric', month: 'short', year: 'numeric' })
    return `${from} - ${to}`
}
</script>

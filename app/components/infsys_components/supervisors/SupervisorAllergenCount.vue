<template>
    <div class="highlightable relative" :id="'supervisor-allergens'"
        @click="highlightStore.isHighlightMode && highlightStore.highlightHandler.selectElement('supervisor-allergens', $event)">
        <!-- Allergies Badge -->
        <div :style="{
            display: 'inline-flex',
            alignItems: 'center',
            padding: '0.25rem 0.75rem',
            fontSize: '0.875rem',
            fontWeight: '600',
            borderRadius: '9px',
            backgroundColor: allergenCount > 0 ? '#fef2f2' : '#f0fdf4',
            color: allergenCount > 0 ? '#dc2626' : '#16a34a',
            border: '1px solid ' + (allergenCount > 0 ? 'rgba(220, 38, 38, 0.1)' : 'rgba(22, 163, 74, 0.1)'),
            whiteSpace: 'nowrap',
            marginTop: '0.5rem'
        }">
            {{ t("allergens") }}: {{ allergenCount }}
        </div>
        <EditComponentModalOpenButton v-if="highlightStore.isEditModeActive" :componentId="'supervisor-allergen-count'"
            class="absolute -top-1 -right-1 z-10" />
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

const props = defineProps<{
    participantId: number
}>()

const participantAllergenCountComponent = computed(() => componentCodeStore.getComponentById('supervisor-allergen-count') || componentCodeStore.getDefaultComponent('supervisor-allergen-count'))

const correctParticipantAllergenCountSql = computed(() => participantAllergenCountComponent.value?.sql?.['sql'] || '')

const participantAllergenCountSql = computed(() => ComponentHandler.getComponentValue('supervisor-allergen-count', 'sql', correctParticipantAllergenCountSql.value))

const allergenCount = computed(() => {
    if (!props.participantId) return 0;

    const _ = selectedSystemStore.dbNumber

    if (!selectedSystemStore.selectedSystem?.db || typeof selectedSystemStore.selectedSystem?.db?.query !== "function") {
        return 0
    }

    const allergenCountQuery = participantAllergenCountSql.value;
    if (!allergenCountQuery) return 0;

    try {
        const result = selectedSystemStore.selectedSystem.db.query(allergenCountQuery, [props.participantId])?.results || [];
        return result[0]?.count || 0;
    } catch (error) {
        console.error('Error querying allergen count:', error);
        return 0;
    }
})
</script>

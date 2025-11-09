<template>
    <div class="highlightable relative" :id="'participant-allergens'"
        @click="highlightStore.isHighlightMode && highlightStore.highlightHandler.selectElement('participant-allergens', $event)">
        <!-- Allergies Badge -->
        <UBadge size="lg" :color="allergenCount > 0 ? 'red' : 'green'"
            variant="soft" class="mt-2">
            {{ t("allergens") }}: {{ allergenCount }}
        </UBadge>
        <EditComponentModalOpenButton v-if="highlightStore.isEditModeActive"
            :componentId="'participant-allergen-count'" class="absolute -top-1 -right-1 z-10" />
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

const participantAllergenCountComponent = computed(() => componentCodeStore.getComponentById('participant-allergen-count') || componentCodeStore.getDefaultComponent('participant-allergen-count'))

const correctParticipantAllergenCountSql = computed(() => participantAllergenCountComponent.value?.sql?.['sql'] || '')

const participantAllergenCountSql = computed(() => ComponentHandler.getComponentValue('participant-allergen-count', 'sql', correctParticipantAllergenCountSql.value))

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

<template>
    <!-- Custom Drawer Implementation -->
    <div v-if="modalOpen" class="custom-drawer-overlay" @click="resetForm" style="z-index: 5000;">
        <div class="custom-drawer" :class="{ 'open': modalOpen }" @click.stop>
            <div class="drawer-content">
                <UCard class="p-4 min-w-96">
                    <template #header>
                        <h3 class="text-lg font-semibold">{{ t('edit_meal') }}</h3>
                    </template>

                    <UForm :state="editMeal" @submit="handleEditMeal(editMeal)" class="flex flex-col space-y-4">
                        <div class="highlightable" id="meals-edit-name"
                            @click="highlightStore.isHighlightMode && highlightStore.highlightHandler.selectElement('meals-edit-name', $event)">
                            <div class="component-wrapper">
                                <label for="name" class="block text-sm font-medium text-white mb-1">{{ t('meal_name') }}</label>
                                <UInput
                                    :class="[{ 'border-red-500': !editMealNameComputed, 'border-green-500': editMealNameComputed }]"
                                    id="name" v-model="editMeal.name" type="text"
                                    :disabled="highlightStore.isHighlightMode"
                                    :placeholder="t('enter_meal_name')" />
                                <div v-if="editMealNameError" class="text-red-500 text-sm mt-1 font-bold">
                                    {{ editMealNameError }}
                                </div>
                            </div>
                        </div>

                        <div class="highlightable" id="meals-edit-when_served"
                            @click="highlightStore.isHighlightMode && highlightStore.highlightHandler.selectElement('meals-edit-when_served', $event)">
                            <div class="component-wrapper">
                                <label for="when_served" class="block text-sm font-medium text-white mb-1">{{ t('when_served') }}</label>
                                <USelect
                                    :class="[{ 'border-red-500': !editMealWhenServedComputed, 'border-green-500': editMealWhenServedComputed }]"
                                    id="when_served" v-model="editMeal.when_served"
                                    :options="whenServedOptions"
                                    :disabled="highlightStore.isHighlightMode"
                                    :placeholder="t('select_when_served')" />
                                <div v-if="editMealWhenServedError" class="text-red-500 text-sm mt-1 font-bold">
                                    {{ editMealWhenServedError }}
                                </div>
                            </div>
                        </div>

                        <div class="flex flex-col gap-3 pt-4">
                            <UButton type="submit" color="yellow" :loading="isSubmitting" :disabled="hasValidationErrors">
                                {{ t('update') }}
                            </UButton>
                            <UButton variant="outline" color="yellow" @click="resetForm">
                                {{ t('cancel') }}
                            </UButton>
                        </div>
                    </UForm>
                </UCard>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useSelectedSystemStore, useToast } from '#imports'
import { useHighlightStore } from '#imports'
import { useComponentCodeStore } from '~/stores/useComponentCodeStore'

const { t } = useI18n()
const selectedSystemStore = useSelectedSystemStore()
const toast = useToast()
const highlightStore = useHighlightStore()
const componentCodeStore = useComponentCodeStore()

// Props
const props = defineProps<{
    meal: any
    editModalOpen: boolean
}>()

// Emits
const emit = defineEmits<{
    'update:editModalOpen': [value: boolean]
}>()

// Modal state
const modalOpen = computed({
    get: () => props.editModalOpen,
    set: (value) => emit('update:editModalOpen', value)
})

// Form state
const editMeal = ref({
    id: null,
    name: '',
    when_served: ''
})

const isSubmitting = ref(false)

// Validation
const editMealNameComputed = computed(() => editMeal.value.name.trim().length > 0)
const editMealWhenServedComputed = computed(() => editMeal.value.when_served.trim().length > 0)

const editMealNameError = computed(() => {
    if (!editMealNameComputed.value) {
        return t('meal_name_required')
    }
    return ''
})

const editMealWhenServedError = computed(() => {
    if (!editMealWhenServedComputed.value) {
        return t('when_served_required')
    }
    return ''
})

const hasValidationErrors = computed(() => {
    return !editMealNameComputed.value || !editMealWhenServedComputed.value
})

// When served options
const whenServedOptions = [
    { label: t('breakfast'), value: 'Breakfast' },
    { label: t('lunch'), value: 'Lunch' },
    { label: t('dinner'), value: 'Dinner' },
    { label: t('snack'), value: 'Snack' }
]

// Watch for meal prop changes to populate form
watch(() => props.meal, (newMeal) => {
    if (newMeal && modalOpen.value) {
        editMeal.value = {
            id: newMeal.id,
            name: newMeal.title || '',
            when_served: newMeal.description || ''
        }
    }
}, { immediate: true })

// Watch for modal open to populate form
watch(() => modalOpen.value, (isOpen) => {
    if (isOpen && props.meal) {
        editMeal.value = {
            id: props.meal.id,
            name: props.meal.title || '',
            when_served: props.meal.description || ''
        }
    }
})

// Handle form submission
const handleEditMeal = async (mealData: any) => {
    if (hasValidationErrors.value) {
        return
    }

    isSubmitting.value = true

    try {
        const system = selectedSystemStore.selectedSystem
        if (!system?.db) {
            throw new Error('Database not available')
        }

        // Get the edit meal component
        const componentId = 'meals-edit'
        const editMealComponent = componentCodeStore.getComponentById(componentId) || componentCodeStore.getDefaultComponent(componentId)
        const sqlQuery = editMealComponent?.sql?.['sql'] || ''

        if (!sqlQuery) {
            throw new Error('Edit meal SQL query not found')
        }

        // Execute the update query
        system.db.exec(sqlQuery, [mealData.name, mealData.when_served, mealData.id])

        // If we reach here without error, the meal was updated successfully
        selectedSystemStore.incrementDbNumber()
        toast.add({
            title: t('meal_updated_successfully'),
            color: 'green'
        })
        resetForm()
    } catch (error) {
        console.error('Failed to edit meal:', error)
        toast.add({
            title: t('meal_edit_error'),
            color: 'red'
        })
    } finally {
        isSubmitting.value = false
    }
}

// Reset form
const resetForm = () => {
    editMeal.value = {
        id: null,
        name: '',
        when_served: ''
    }
    modalOpen.value = false
}
</script>

<style scoped>
.custom-drawer-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 5000;
    display: flex;
    align-items: stretch;
    justify-content: flex-end;
    transition: opacity 0.3s ease;
}

.custom-drawer {
    width: 400px;
    max-width: 90vw;
    background: #1e293b;
    box-shadow: -4px 0 20px rgba(0, 0, 0, 0.3);
    transform: translateX(100%);
    transition: transform 0.3s ease;
    overflow-y: auto;
    border-left: 1px solid #334155;
    z-index: 5001;
}

.custom-drawer.open {
    transform: translateX(0);
}

.drawer-content {
    padding: 1rem;
    height: 100%;
}

.form-input {
    width: 100%;
    padding: 0.5rem 0.75rem;
    border: 1px solid #d1d5db;
    border-radius: 0.375rem;
    background-color: #ffffff;
    color: #111827;
    font-size: 0.875rem;
    line-height: 1.25rem;
    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}

.form-input:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.form-input:disabled {
    background-color: #f9fafb;
    color: #6b7280;
    cursor: not-allowed;
}

/* Validation colors */
.border-red-500 {
    border-color: #ef4444 !important;
    border-width: 3px !important;
}

.border-green-500 {
    border-color: #22c55e !important;
    border-width: 3px !important;
}

.component-wrapper {
    position: relative;
    display: inline-block;
    width: 100%;
}

.edit-button {
    position: absolute;
    top: 0.25rem;
    right: 0.25rem;
    z-index: 10;
}
</style>

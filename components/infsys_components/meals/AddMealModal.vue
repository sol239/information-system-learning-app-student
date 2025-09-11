<template>
    <!-- Custom Drawer Implementation -->
    <div v-if="modalOpen" class="custom-drawer-overlay" @click="resetForm" style="z-index: 5000;">
        <div class="custom-drawer" :class="{ 'open': modalOpen }" @click.stop>
            <div class="drawer-content">
                <UCard class="p-4 min-w-96">
                    <template #header>
                        <h3 class="text-lg font-semibold">{{ t('add_meal') }}</h3>
                    </template>

                    <UForm :state="newMeal" @submit="handleAddMeal(newMeal)" class="flex flex-col space-y-4">
                        <div class="highlightable" id="meals-add-name"
                            @click="highlightStore.isHighlightMode && highlightStore.highlightHandler.selectElement('meals-add-name', $event)">
                            <div class="component-wrapper">
                                <label for="name" class="block text-sm font-medium text-white mb-1">{{ t('meal_name') }}</label>
                                <UInput
                                    :class="[{ 'border-red-500': !newMealNameComputed, 'border-green-500': newMealNameComputed }]"
                                    id="name" v-model="newMeal.name" type="text"
                                    :disabled="highlightStore.isHighlightMode"
                                    :placeholder="t('enter_meal_name')" />
                                <div v-if="newMealNameError" class="text-red-500 text-sm mt-1 font-bold">
                                    {{ newMealNameError }}
                                </div>
                            </div>
                        </div>

                        <div class="highlightable" id="meals-add-when_served"
                            @click="highlightStore.isHighlightMode && highlightStore.highlightHandler.selectElement('meals-add-when_served', $event)">
                            <div class="component-wrapper">
                                <label for="when_served" class="block text-sm font-medium text-white mb-1">{{ t('when_served') }}</label>
                                <USelect
                                    :class="[{ 'border-red-500': !newMealWhenServedComputed, 'border-green-500': newMealWhenServedComputed }]"
                                    id="when_served" v-model="newMeal.when_served"
                                    :options="whenServedOptions"
                                    :disabled="highlightStore.isHighlightMode"
                                    :placeholder="t('select_when_served')" />
                                <div v-if="newMealWhenServedError" class="text-red-500 text-sm mt-1 font-bold">
                                    {{ newMealWhenServedError }}
                                </div>
                            </div>
                        </div>

                        <div class="flex flex-col gap-3 pt-4">
                            <UButton type="submit" color="green" :loading="isSubmitting" :disabled="hasValidationErrors">
                                {{ t('add') }}
                            </UButton>
                            <UButton variant="outline" color="green" @click="resetForm">
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
    addModalOpen: boolean
}>()

// Emits
const emit = defineEmits<{
    'update:addModalOpen': [value: boolean]
}>()

// Modal state
const modalOpen = computed({
    get: () => props.addModalOpen,
    set: (value) => emit('update:addModalOpen', value)
})

// Form state
const newMeal = ref({
    name: '',
    when_served: ''
})

const isSubmitting = ref(false)

// Validation
const newMealNameComputed = computed(() => newMeal.value.name.trim().length > 0)
const newMealWhenServedComputed = computed(() => newMeal.value.when_served.trim().length > 0)

const newMealNameError = computed(() => {
    if (!newMealNameComputed.value) {
        return t('meal_name_required')
    }
    return ''
})

const newMealWhenServedError = computed(() => {
    if (!newMealWhenServedComputed.value) {
        return t('when_served_required')
    }
    return ''
})

const hasValidationErrors = computed(() => {
    return !newMealNameComputed.value || !newMealWhenServedComputed.value
})

// When served options
const whenServedOptions = [
    { label: t('breakfast'), value: 'Breakfast' },
    { label: t('lunch'), value: 'Lunch' },
    { label: t('dinner'), value: 'Dinner' },
    { label: t('snack'), value: 'Snack' }
]

// Handle form submission
const handleAddMeal = async (mealData: any) => {
    if (hasValidationErrors.value) {
        return
    }

    isSubmitting.value = true

    try {
        const system = selectedSystemStore.selectedSystem
        if (!system?.db) {
            throw new Error('Database not available')
        }

        // Get the add meal component
        const componentId = 'meals-add'
        const addMealComponent = componentCodeStore.getComponentById(componentId) || componentCodeStore.getDefaultComponent(componentId)
        const sqlQuery = addMealComponent?.sql?.['sql'] || ''

        if (!sqlQuery) {
            throw new Error('Add meal SQL query not found')
        }

        // Execute the insert query
        system.db.exec(sqlQuery, [mealData.name, mealData.when_served])

        // If we reach here without error, the meal was added successfully
        selectedSystemStore.incrementDbNumber()
        toast.add({
            title: t('meal_added_successfully'),
            color: 'green'
        })
        resetForm()
    } catch (error) {
        console.error('Failed to add meal:', error)
        toast.add({
            title: t('meal_add_error'),
            color: 'red'
        })
    } finally {
        isSubmitting.value = false
    }
}

// Reset form
const resetForm = () => {
    newMeal.value = {
        name: '',
        when_served: ''
    }
    modalOpen.value = false
}

// Watch for modal open to reset form
watch(() => modalOpen.value, (isOpen) => {
    if (isOpen) {
        resetForm()
        modalOpen.value = true // Keep modal open after reset
    }
})
</script>

<style scoped>
.custom-drawer-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: flex-end;
    z-index: 5000;
}

.custom-drawer {
    background-color: white;
    width: 400px;
    height: 100%;
    transform: translateX(100%);
    transition: transform 0.3s ease;
    overflow-y: auto;
}

.custom-drawer.open {
    transform: translateX(0);
}

.drawer-content {
    padding: 1rem;
}

.form-input {
    width: 100%;
    padding: 0.5rem;
    border: 1px solid #d1d5db;
    border-radius: 0.375rem;
    background-color: white;
    color: #111827;
}

.form-input:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 1px #3b82f6;
}

.component-wrapper {
    position: relative;
    display: inline-block;
    width: 100%;
}
</style>

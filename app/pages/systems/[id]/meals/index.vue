<template>
    <div class="p-6 flex flex-col gap-6 max-w-7xl mx-auto">

        <!-- Page header -->
        <h1 class="text-4xl font-bold">{{ t('meals') }}</h1>

        <!-- Toolbar -->
        <div class="flex flex-wrap items-center gap-3">
            <!-- Serving-time filter dropdown -->
            <USelect
                v-model="selectedTime"
                :items="timeFilterItems"
                value-key="value"
                label-key="label"
                class="w-48"
            />

            <!-- Meal count widget -->
            <ComponentWrapper :component="countBarComponent" />

            <!-- Spacer -->
            <div class="flex-1" />

            <!-- Add meal -->
            <UButton color="primary" icon="i-heroicons-plus">
                {{ t('add_meal') }}
            </UButton>
        </div>

        <!-- Meals grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            <div
                v-for="mealId in filteredMealIds"
                :key="mealId"
                class="bg-white rounded-xl border-2 border-emerald-400 p-5 flex flex-col gap-4 hover:shadow-md transition-shadow"
            >
                <!-- Name + serving-time badge -->
                <ComponentWrapper
                    :component="withVars(cardInfoComponent, [new Variable('mealId', mealId)])"
                />

                <hr class="border-gray-100" />

                <!-- Allergen pills -->
                <ComponentWrapper
                    :component="withVars(allergenListComponent, [new Variable('mealId', mealId)])"
                />

                <!-- Actions -->
                <div class="flex gap-3 pt-1 border-t border-gray-100">
                    <UButton color="success" variant="solid" class="flex-1">
                        {{ t('view_details') }}
                    </UButton>
                    <UButton color="error" variant="outline" class="flex-1">
                        {{ t('delete') }}
                    </UButton>
                </div>
            </div>
        </div>

        <!-- Empty state -->
        <div v-if="filteredMealIds.length === 0 && isDbReady" class="text-center py-12">
            <UIcon name="i-heroicons-cake" class="w-16 h-16 mx-auto mb-4 text-gray-400" />
            <h3 class="text-xl font-semibold text-gray-900 mb-2">{{ t('no_meals') }}</h3>
            <p class="text-gray-500">{{ t('no_meals_description') }}</p>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useI18n } from 'vue-i18n';
import ComponentWrapper from '~/components/ComponentWrapper.vue';
import { ComponentVariables, Variable } from '~/model/ComponentVariables';
import { useSystemsStore } from '~/stores/systemsStore';
import { DatabaseHandler } from '~/utils/DatabaseHandler';

function withVars(comp: any, vars: Variable[]) {
  if (!comp) return undefined;
  const clone = Object.create(comp);
  clone.variables = new ComponentVariables();
  clone.variables.generalVariables = vars;
  return clone;
}

const route = useRoute();
const systemsStore = useSystemsStore();
const { t } = useI18n();
const systemId = route.params.id as string;

systemsStore.selectedSystemId = systemId;

const isDbReady = computed(() => !!systemsStore.selectedSystem?.database?.sqlJsDatabase);

// Components (registered via plugin from SystemComponents/meals/)
const cardInfoComponent = computed(() => systemsStore.getComponentById('meal-card-info'));
const allergenListComponent = computed(() => systemsStore.getComponentById('meal-allergen-list'));
const countBarComponent = computed(() => systemsStore.getComponentById('meals-total-count-bar'));

// Meal data
interface MealRow { id: number; time: string }
const meals = ref<MealRow[]>([]);

// Filter
const selectedTime = ref<string | null>(null);

const timeFilterItems = computed(() => [
    { label: t('all_meals'), value: null },
    { label: 'snĂ­danÄ›', value: 'snĂ­danÄ›' },
    { label: 'obÄ›d', value: 'obÄ›d' },
    { label: 'veÄŤeĹ™e', value: 'veÄŤeĹ™e' },
]);

const filteredMealIds = computed(() => {
    let list = meals.value;
    if (selectedTime.value) {
        list = list.filter(m => m.time === selectedTime.value);
    }
    return list.map(m => m.id);
});

const loadData = async () => {
    const db = systemsStore.selectedSystem?.database;
    if (!db) return;

    try {
        const result = await db.query(
            `SELECT id_jidla, doba_podavani FROM jidla ORDER BY id_jidla`
        );
        if (result.data?.[0]?.values) {
            meals.value = result.data[0].values.map(row => ({
                id: Number(row[0]),
                time: String(row[1])
            }));
        }
    } catch (e) {
        console.error('Failed to load meals:', e);
    }
};

watch(() => systemsStore.selectedSystem?.database?.sqlJsDatabase, (db) => {
    if (db) loadData();
}, { immediate: true });

onMounted(() => {
    if (systemsStore.selectedSystem?.database?.sqlJsDatabase) loadData();
});
</script>

<style scoped>
</style>


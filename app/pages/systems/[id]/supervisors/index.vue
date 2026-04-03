<template>
    <div class="p-6 flex flex-col gap-6 max-w-7xl mx-auto">

        <!-- Page header -->
        <h1 class="text-4xl font-bold">{{ t('supervisors') }}</h1>

        <!-- Toolbar -->
        <div class="flex flex-wrap items-center gap-3">
            <!-- Session filter dropdown -->
            <USelect
                v-model="selectedSessionId"
                :items="sessionFilterItems"
                value-key="value"
                label-key="label"
                class="w-40"
            />

            <!-- Total count widget -->
            <ComponentWrapper :component="countBarComponent" />

            <!-- Spacer -->
            <div class="flex-1" />

            <!-- Reset filter -->
            <UButton
                icon="i-heroicons-arrow-path"
                color="neutral"
                variant="outline"
                @click="resetFilter"
            />

            <!-- Search -->
            <UInput
                v-model="filterText"
                icon="i-heroicons-magnifying-glass"
                :placeholder="t('filter_supervisors')"
                class="w-56"
            />

            <!-- Add supervisor -->
            <UButton color="primary" icon="i-heroicons-plus">
                {{ t('add_supervisor') }}
            </UButton>
        </div>

        <!-- Supervisors grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            <div
                v-for="supervisorId in filteredSupervisorIds"
                :key="supervisorId"
                class="bg-white rounded-xl border-2 border-violet-400 p-5 flex flex-col gap-4 hover:shadow-md transition-shadow"
            >
                <!-- Name + age + email + phone + address -->
                <ComponentWrapper
                    :component="withVars(cardInfoComponent, [new Variable('supervisorId', supervisorId)])"
                />

                <!-- Session line -->
                <ComponentWrapper
                    :component="withVars(sessionBadgeComponent, [new Variable('supervisorId', supervisorId)])"
                />

                <!-- Allergen badge -->
                <ComponentWrapper
                    :component="withVars(allergenBadgeComponent, [new Variable('supervisorId', supervisorId)])"
                />

                <!-- Actions -->
                <div class="flex gap-3 pt-1 border-t border-gray-100">
                    <UButton color="primary" variant="solid" class="flex-1">
                        {{ t('view_details') }}
                    </UButton>
                    <UButton color="error" variant="outline" class="flex-1">
                        {{ t('delete') }}
                    </UButton>
                </div>
            </div>
        </div>

        <!-- Empty state -->
        <div v-if="filteredSupervisorIds.length === 0 && isDbReady" class="text-center py-12">
            <UIcon name="i-heroicons-academic-cap" class="w-16 h-16 mx-auto mb-4 text-gray-400" />
            <h3 class="text-xl font-semibold text-gray-900 mb-2">{{ t('no_supervisors') }}</h3>
            <p class="text-gray-500">{{ t('no_supervisors_description') }}</p>
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

// Components (registered via plugin from SystemComponents/supervisors/)
const cardInfoComponent = computed(() => systemsStore.getComponentById('supervisor-card-info'));
const sessionBadgeComponent = computed(() => systemsStore.getComponentById('supervisor-session-badge'));
const allergenBadgeComponent = computed(() => systemsStore.getComponentById('supervisor-allergen-badge'));
const countBarComponent = computed(() => systemsStore.getComponentById('supervisors-total-count-bar'));

// Supervisor data
interface SupervisorRow { id: number; sessionId: number | null }
const supervisors = ref<SupervisorRow[]>([]);

// Filters
const filterText = ref('');
const selectedSessionId = ref<number | null>(null);

interface SessionItem { label: string; value: number | null }
const sessions = ref<{ id: number; label: string }[]>([]);

const sessionFilterItems = computed<SessionItem[]>(() => [
    { label: t('all_sessions'), value: null },
    ...sessions.value.map(s => ({ label: s.label, value: s.id }))
]);

const filteredSupervisorIds = computed(() => {
    let ids = supervisors.value;
    if (selectedSessionId.value !== null) {
        ids = ids.filter(s => s.sessionId === selectedSessionId.value);
    }
    return ids.map(s => s.id);
});

function resetFilter() {
    selectedSessionId.value = null;
    filterText.value = '';
}

const loadData = async () => {
    const db = systemsStore.selectedSystem?.database;
    if (!db) return;

    try {
        // Load supervisors with their session
        const vResult = await db.query(
            `SELECT v.id_vedouciho, vt.id_turnusu FROM vedouci v
             LEFT JOIN vedouci_turnusy vt ON v.id_vedouciho = vt.id_vedouciho
             ORDER BY vt.id_turnusu, v.id_vedouciho`
        );
        if (vResult.data?.[0]?.values) {
            supervisors.value = vResult.data[0].values.map(row => ({
                id: Number(row[0]),
                sessionId: row[1] !== null ? Number(row[1]) : null
            }));
        }

        // Load sessions for the filter dropdown
        const sResult = await db.query(
            `SELECT id_turnusu FROM turnusy ORDER BY id_turnusu`
        );
        if (sResult.data?.[0]?.values) {
            sessions.value = sResult.data[0].values.map(row => ({
                id: Number(row[0]),
                label: `Session ${row[0]}`
            }));
        }
    } catch (e) {
        console.error('Failed to load supervisors:', e);
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

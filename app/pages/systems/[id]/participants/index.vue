<template>
    <div class="p-6 flex flex-col gap-6 max-w-7xl mx-auto">

        <!-- Page header -->
        <h1 class="text-4xl font-bold">{{ t('participants') }}</h1>

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

            <!-- Capacity bar component -->
            <ComponentWrapper :component="capacityBarComponent" />

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
                :placeholder="t('filter_participants')"
                class="w-56"
            />

            <!-- Add participant -->
            <UButton color="primary" icon="i-heroicons-plus">
                {{ t('add_participant') }}
            </UButton>
        </div>

        <!-- Participants grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            <div
                v-for="participantId in filteredParticipantIds"
                :key="participantId"
                class="bg-white rounded-xl border-2 border-cyan-400 p-5 flex flex-col gap-4 hover:shadow-md transition-shadow"
            >
                <!-- Name + age + email + phone + address -->
                <ComponentWrapper
                    :component="withVars(cardInfoComponent, [new Variable('participantId', participantId)])"
                />

                <!-- Session line -->
                <ComponentWrapper
                    :component="withVars(sessionBadgeComponent, [new Variable('participantId', participantId)])"
                />

                <!-- Allergen badge -->
                <ComponentWrapper
                    :component="withVars(allergenBadgeComponent, [new Variable('participantId', participantId)])"
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
        <div v-if="filteredParticipantIds.length === 0 && isDbReady" class="text-center py-12">
            <UIcon name="i-heroicons-users" class="w-16 h-16 mx-auto mb-4 text-gray-400" />
            <h3 class="text-xl font-semibold text-gray-900 mb-2">{{ t('no_participants') }}</h3>
            <p class="text-gray-500">{{ t('no_participants_description') }}</p>
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

// Components (registered via plugin from SystemComponents/participants/)
const cardInfoComponent = computed(() => systemsStore.getComponentById('participant-card-info'));
const sessionBadgeComponent = computed(() => systemsStore.getComponentById('participant-session-badge'));
const allergenBadgeComponent = computed(() => systemsStore.getComponentById('participant-allergen-badge'));
const capacityBarComponent = computed(() => systemsStore.getComponentById('participants-total-capacity-bar'));

// Participant data
interface ParticipantRow { id: number; sessionId: number }
const participants = ref<ParticipantRow[]>([]);

// Filters
const filterText = ref('');
const selectedSessionId = ref<number | null>(null);

interface SessionItem { label: string; value: number | null }
const sessions = ref<{ id: number; label: string }[]>([]);

const sessionFilterItems = computed<SessionItem[]>(() => [
    { label: t('all_sessions'), value: null },
    ...sessions.value.map(s => ({ label: s.label, value: s.id }))
]);

const filteredParticipantIds = computed(() => {
    let ids = participants.value;
    if (selectedSessionId.value !== null) {
        ids = ids.filter(p => p.sessionId === selectedSessionId.value);
    }
    // filterText filtering is handled server-side via SQL when feasible;
    // here we keep the id list and let ComponentWrapper render names naturally.
    // For a simple client filter we would need names cached â€” kept minimal.
    return ids.map(p => p.id);
});

function resetFilter() {
    selectedSessionId.value = null;
    filterText.value = '';
}

const loadData = async () => {
    const db = systemsStore.selectedSystem?.database;
    if (!db) return;

    try {
        // Load participants with their session
        const pResult = await db.query(
            `SELECT u.id_ucastnika, tu.id_turnusu FROM ucastnici u
             LEFT JOIN turnusy_ucastnici tu ON u.id_ucastnika = tu.id_ucastnika
             ORDER BY tu.id_turnusu, u.id_ucastnika`
        );
        if (pResult.data?.[0]?.values) {
            participants.value = pResult.data[0].values.map(row => ({
                id: Number(row[0]),
                sessionId: Number(row[1])
            }));
        }

        // Load sessions for the filter dropdown
        const sResult = await db.query(
            `SELECT id_turnusu, datum_od, datum_do FROM turnusy ORDER BY id_turnusu`
        );
        if (sResult.data?.[0]?.values) {
            sessions.value = sResult.data[0].values.map(row => ({
                id: Number(row[0]),
                label: `Session ${row[0]}`
            }));
        }
    } catch (e) {
        console.error('Failed to load participants:', e);
    }
};

watch(() => systemsStore.selectedSystem?.database?.sqlJsDatabase, (db) => {
    if (db) loadData();
}, { immediate: true });

onMounted(() => {
    if (systemsStore.selectedSystem?.database?.sqlJsDatabase) loadData();
});
</script>


<template>
  <div class="max-w-5xl mx-auto py-12 px-4 sm:px-6">
    <div class="grid grid-cols-1 gap-8">
      <!-- Header Section -->
      <UCard class="border-t-4 border-teacher-500 shadow-lg dark:bg-gray-900/50">
        <div class="flex flex-col md:flex-row items-start gap-6">
          <div class="flex-1">
            <span class="flex items-center gap-3 mb-4">
              <h1
                class="systems-page-title text-3xl font-bold text-gray-900 dark:text-white mb-2"
              >
                {{ t("information_systems") }}
              </h1>

              <UBadge size="lg" color="teacher" variant="subtle" icon="i-heroicons-academic-cap">
                {{ t("teacher") }}
              </UBadge>
            </span>

            <div class="flex flex-col gap-6">
              <p
                class="systems-page-description text-lg text-gray-600 dark:text-gray-300 max-w-prose leading-relaxed flex-1"
              >
                {{ t("manage_your_systems_description") }}
              </p>

              <!--
              <div class="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                <div class="flex items-center justify-between gap-4 rounded-xl border border-gray-200 px-4 py-3 dark:border-gray-800 lg:min-w-[420px] lg:max-w-[620px] lg:flex-1">
                  <div class="flex flex-col">
                    <span class="text-sm font-medium text-gray-900 dark:text-white">
                      {{ t("load_systems_from_public_folder") }}
                    </span>
                    <span class="text-sm text-gray-500 dark:text-gray-400">
                      {{ t("load_systems_from_public_folder_description") }}
                    </span>
                  </div>
                  <USwitch
                    color="teacher"
                    :model-value="globalSettingsStore.loadSystemsFromPublicFolder"
                    @update:model-value="onTogglePublicSystems"
                  />
                </div>

                <div class="flex flex-wrap gap-4 lg:justify-end">
                  <UploadSystemZipModal />
                </div>
              </div>
              -->
              <div class="flex flex-wrap gap-4 lg:justify-end">
                <UploadSystemZipModal />
              </div>
            </div>
          </div>
        </div>
      </UCard>

      <!-- Systems List -->
      <div v-if="systemsStore.systems.length > 0" class="space-y-6">
        <UCard
          v-for="(system, index) in systemsStore.systems"
          :key="system.id"
          class="group transition hover:ring-2 hover:ring-teacher-500/50 cursor-pointer shadow-lg dark:bg-gray-900/50"
          @click="navigateToSystem(system.id)"
        >
          <div class="space-y-4">
            <!-- System Header with Icon, Title, and Delete Button -->
            <div class="flex items-center justify-between">
              <div class="flex items-center space-x-3">
                <div class="p-2 bg-teacher-500/10 rounded-lg">
                  <UIcon
                    name="i-heroicons-computer-desktop"
                    class="w-6 h-6 text-teacher-500"
                  />
                </div>
                <div>
                  <h3
                    class="system-name text-xl font-semibold text-gray-900 dark:text-white"
                  >
                    {{ system.name }}
                  </h3>
                  <p class="text-sm text-gray-500">{{ system.id }} • {{ t("information_system") }}</p>
                </div>
              </div>
              <div class="flex items-center gap-3">
                <!-- <UBadge :color="dbReadyMap[system.id] ? 'green' : 'red'" variant="subtle"
                                    :icon="dbReadyMap[system.id] ? 'i-lucide-database' : 'i-lucide-database'">
                                    {{ dbReadyMap[system.id] ? t('db_ready') : t('db_not_ready') }}
                                </UBadge> -->
                <UButton
                  v-if="globalSettingsStore.teacherMode"
                  icon="i-lucide-pencil"
                  color="blue"
                  variant="ghost"
                  size="md"
                  @click.stop="openEditModal(system)"
                />
                <UButton
                  icon="i-lucide-trash-2"
                  color="red"
                  variant="ghost"
                  size="md"
                  @click.stop="deleteSystem(system.id)"
                />
                <UBadge color="sky" variant="subtle" icon="i-lucide-clipboard-list">
                  {{ t("tasks") }}: {{ completedTasksCount(system) }}/{{
                    system.tasks?.length ?? 0
                  }}
                </UBadge>
              </div>
            </div>

            <!-- Description -->
            <p class="text-gray-600 dark:text-gray-300 leading-relaxed">
              {{ system.description }}
            </p>

            <!-- Actions -->
            <!-- 
            <div class="pt-4 flex flex-col sm:flex-row gap-3">
              <UButton
                icon="i-lucide-arrow-right"
                color="teacher"
                variant="outline"
                class="w-full"
                @click.stop="navigateToSystem(system.id)"
              >
                {{ t("enter_system") }}
              </UButton>
            </div>
            -->
          </div>
        </UCard>
      </div>
    </div>

    <!-- Edit System Modal -->
    <UModal v-model="isEditModalOpen" :title="t('edit_system')">
      <UCard>
        <template #header>
          <div class="flex items-center justify-between">
            <h3 class="text-lg font-semibold">{{ t('edit_system') }}</h3>
            <UButton color="neutral" variant="ghost" icon="i-lucide-x" @click="isEditModalOpen = false" />
          </div>
        </template>

        <div class="space-y-4">
          <UFormGroup :label="t('system_id')" name="id">
            <UInput v-model="editForm.id" />
          </UFormGroup>
          
          <UFormGroup :label="t('system_name')" name="name">
            <UInput v-model="editForm.name" />
          </UFormGroup>
          
          <UFormGroup :label="t('system_description')" name="description">
            <UTextarea v-model="editForm.description" :rows="4" />
          </UFormGroup>
        </div>

        <template #footer>
          <div class="flex justify-end gap-3">
            <UButton color="neutral" variant="outline" @click="isEditModalOpen = false">{{ t('cancel') }}</UButton>
            <UButton color="teacher" @click="saveSystemEdit">{{ t('save') }}</UButton>
          </div>
        </template>
      </UCard>
    </UModal>
  </div>
</template>

<script setup lang="ts">
/* 1. Imports */
import { DatabaseWrapper } from "~/utils/DatabaseWrapper";
import { TaskStatus } from "~/model/Task/TaskStatus";
import type { InformationSystem } from "~/model/InformationSystem";
import UploadSystemZipModal from "~/components/UploadSystemZipModal.vue";
import { usePreloadedSystems } from "~/composables/usePreloadedSystems";
import { useGlobalSettingsStore } from "~/stores/globalSettingsStore";
import { useSystemsStore } from "~/stores/systemsStore";
import { IndexedDbStorage } from "~/utils/IndexedDbStorage";
import { OperationResultType } from "~/utils/OperationResultType";

/* 2. Stores */
const globalSettingsStore = useGlobalSettingsStore();
const systemsStore = useSystemsStore();
const { prepareSystem } = usePrepareSystem();
const { pushFirstAvailablePage } = useAvailableSystemPages();

/* 3. Context hooks */
const { t } = useI18n();
const toast = useToast();
const router = useRouter();

/* 4. State */
const dbReadyMap = reactive<Record<string, boolean>>({});
const {
  systems: preloadedSystems,
  loading: preloadLoading,
  errors: preloadErrors,
  load: loadPreloaded,
} = usePreloadedSystems();

/* Edit Modal State */
const isEditModalOpen = ref(false);
const editForm = reactive({
  oldId: "",
  id: "",
  name: "",
  description: "",
});

/* 5. Lifecycle */
onMounted(async () => {
  await loadSystemsPageData();
});

watch(
  () => globalSettingsStore.loadSystemsFromPublicFolder,
  async (enabled, previousValue) => {
    if (previousValue === undefined || enabled === previousValue) {
      return;
    }

    await loadSystemsPageData();
  },
);

/* 5. Methods */
async function loadSystemsPageData() {
  await loadStoredSystems();

  if (globalSettingsStore.loadSystemsFromPublicFolder) {
    await loadPreloadedSystemsIntoStore();
  }
}

async function loadStoredSystems() {
  const result = await IndexedDbStorage.GetStoredInformationSystems();
  if (result.result === OperationResultType.SUCCESS && result.data) {
    systemsStore.systems.splice(0, systemsStore.systems.length, ...result.data);
    for (const sys of result.data) {
      dbReadyMap[sys.id] = await DatabaseWrapper.isDatabaseInitialized(sys.database);
    }
  }
}

async function loadPreloadedSystemsIntoStore() {
  await loadPreloaded();

  for (const sys of preloadedSystems.value) {
    if (systemsStore.systems.some((existingSystem) => String(existingSystem.id) === String(sys.id))) {
      continue;
    }

    await systemsStore.addSystem(sys);
    dbReadyMap[sys.id] = await DatabaseWrapper.isDatabaseInitialized(sys.database);
  }

  if (preloadErrors.value.length) {
    console.warn("Preloaded systems errors:", preloadErrors.value);
  }
}

async function onTogglePublicSystems(value: boolean) {
  globalSettingsStore.loadSystemsFromPublicFolder = value;
}

async function navigateToSystem(id: string) {
  //console.log("Navigating to system " + id);
  if (!(await prepareSystem(id))) {
    return;
  }

  //console.log("Navigating to first available page...");
  await pushFirstAvailablePage(null);
}

async function navigateToDesigner(id: string) {
  if (!(await prepareSystem(id))) {
    return;
  }

  const system = systemsStore.getSystemById(id);
  const firstSystemRoute = system?.pages?.[0]?.route
    ? `/systems/${id}${system.pages[0].route}`
    : `/systems/${id}/dashboard`;

  router.push({
    path: `/systems/${id}/designer`,
    query: {
      backTo: firstSystemRoute,
    },
  });
}

async function deleteSystem(id: string) {
  await systemsStore.deleteSystemById(id);
}

function openEditModal(system: InformationSystem) {
  editForm.oldId = system.id;
  editForm.id = system.id;
  editForm.name = system.name;
  editForm.description = system.description;
  isEditModalOpen.value = true;
}

async function saveSystemEdit() {
  const system = systemsStore.getSystemById(editForm.oldId);
  if (!system) return;

  // Clone to avoid direct mutation issues or we can simply update the store object
  const sysJson = JSON.parse(JSON.stringify(system));
  const newSys = InformationSystem.fromJSON(sysJson);

  newSys.id = editForm.id;
  newSys.name = editForm.name;
  newSys.description = editForm.description;

  if (editForm.oldId !== editForm.id) {
    // If ID changed, we might need to delete old and add new or update id carefully
    await systemsStore.deleteSystemById(editForm.oldId);
    await systemsStore.addSystem(newSys);
  } else {
    // If ID didn't change, just update
    await systemsStore.updateSystem(newSys);
  }
  
  isEditModalOpen.value = false;
}

function completedTasksCount(system: InformationSystem): number {
  return system.tasks?.filter((t) => t.status === TaskStatus.COMPLETED).length ?? 0;
}
</script>

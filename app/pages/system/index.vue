<script setup lang="ts">
/* 1. Imports */
import { onMounted, ref, computed } from 'vue'
import { navigateTo } from '#app'
import { FileHandler } from '~/composables/FileHandler'
import { InformationSystem } from '~/model/InformationSystem'
import { useInformationSystemStore } from '~/stores/useInformationSystemStore'
import { useSelectedSystemStore } from '~/stores/useSelectedSystemStore'
import JSZip from 'jszip'

/* 2. Stores */
const informationSystemStore = useInformationSystemStore()
const selectedSystemStore = useSelectedSystemStore()
/* 3. Context hooks */
const { t } = useI18n()
const toast = useToast()

/* 4. Constants (non-reactive) */
// Systems are now managed entirely through the store
//let systems: InformationSystem[] = FileHandler.getInformationSystems()
//let systems: InformationSystem[] = [];
/* 5. Props */
// none

/* 6. Emits */
// none

/* 7. Template refs */
// none

/* 8. Local state (ref, reactive) */
const isReloading = ref(false)
const value = ref(null)
const loadedSystemTitle = ref<string | null>(null)
const previewSystemName = ref<string | null>(null)
const open = ref(false)

/* 9. Computed */
const flexJustifyClass = computed(() => informationSystemStore.systems.length === 1 ? 'justify-start' : 'justify-center')

/* 10. Watchers */
watch(value, async (newZipFile) => {
  if (!newZipFile) {
    loadedSystemTitle.value = null
    previewSystemName.value = null
    return
  }

  // Reset loaded state when new file is selected
  loadedSystemTitle.value = null

  // Extract system name from ZIP file for preview
  try {
    const zip = await JSZip.loadAsync(newZipFile as File);
    const configEntry = Object.values(zip.files).find(file => file.name.endsWith('config.json'));

    if (configEntry) {
      const configText = await configEntry.async('text');
      const configData = JSON.parse(configText);
      previewSystemName.value = configData.name || 'Unknown System';
    } else {
      previewSystemName.value = 'Invalid ZIP - no config.json found';
    }
  } catch (error) {
    console.error('Error reading ZIP file:', error);
    previewSystemName.value = 'Error reading ZIP file';
  }
})

/* 11. Methods */
async function navigateToSystem(systemId: number) {
  selectedSystemStore.select(systemId)
  const selectedSystem = informationSystemStore.systems.find(sys => sys.id === systemId)
  if (selectedSystem) {
    // Ensure the system database is initialized before navigating
    if (!selectedSystem.dbInitialized) {
      console.log(`Initializing database for system ${systemId}...`)
      await informationSystemStore.initializeDbs()
    }

    // Re-find the system after potential initialization
    const currentSystem = informationSystemStore.systems.find(sys => sys.id === systemId)
    if (currentSystem && currentSystem.db) {
      selectedSystemStore.setSelectedSystem(currentSystem as InformationSystem)
    } else {
      console.warn(`System with ID ${systemId} could not be properly initialized.`)
      return
    }
  } else {
    console.warn(`System with ID ${systemId} not found.`)
    return
  }
  console.log("Navigating to system with ID:", systemId)
  navigateTo(`/system/${systemId}/dashboard`)
}

function initializeSystems() {
  const systemsFromFile = FileHandler.getInformationSystems()
  console.log('Loaded systems from file:', systemsFromFile)

  try {
    // Merge file-based systems with any existing systems in the store
    // (persisted systems will already be in the store)
    const existingIds = new Set(informationSystemStore.systems.map(s => s.id))
    const newSystems = systemsFromFile.filter(s => !existingIds.has(s.id))
    informationSystemStore.systems.push(...newSystems)
  } catch (error) {
    console.error('Error setting systems in store:', error)
  }
}

function reloadSystems() {
  isReloading.value = true
  const systemsFromFile = FileHandler.getInformationSystems()
  informationSystemStore.systems = systemsFromFile
  isReloading.value = false
}

/* 12. Lifecycle */
onMounted(() => {
  //initializeSystems()
})

/* 13. defineExpose */
// none

function helper() {
  console.log("Systems in store:", informationSystemStore.systems)
}

async function uploadSystem() {
  if (!value.value) return

  try {
    const systemLoader = await SystemZipLoader.create(value.value as File);
    systemLoader.printFiles();
    const system: InformationSystem | null = await systemLoader.getSystem();
    if (system) {
      console.log('Loaded system from zip:', system)
      console.log('System name:', system.name)
      informationSystemStore.addSystem(system)
      loadedSystemTitle.value = system.name
      console.log('loadedSystemTitle set to:', loadedSystemTitle.value)
      // Close the modal after successful upload
      open.value = false
      // Reset the file input
      value.value = null
      previewSystemName.value = null
      // Show success toast
      toast.add({
        title: t('system_upload_success'),
        description: `${system.name} ${t('has_been_uploaded')}`,
        color: 'green'
      })
    } else {
      console.error('No valid system found in the uploaded zip file.')
      loadedSystemTitle.value = null
      // Show error toast for invalid system
      toast.add({
        title: t('upload_error'),
        description: t('no_valid_system_found'),
        color: 'red'
      })
    }
  } catch (error) {
    console.error('Error processing uploaded zip file:', error)
    loadedSystemTitle.value = null
    // Show error toast for processing error
    toast.add({
      title: t('upload_error'),
      description: t('error_processing_zip'),
      color: 'red'
    })
  }
}
</script>

<template>
  <div class="flex gap-4 justify-center mt-8">
      <UButton icon="i-lucide-plus" @click="open = true">
        {{ t('add_new_system') }}
      </UButton>
      <UButton icon="i-heroicons-arrow-path" color="red" variant="outline" @click="informationSystemStore.clearSystems">
        {{ t('clear_systems') }}
      </UButton>
    </div>
  <div class="flex flex-col gap-4 min-h-screen" :class="flexJustifyClass">
    
    <UCard v-for="(system, index) in informationSystemStore.systems" :key="system.id" :class="{ 'mt-4': index === 0 }"
      class="w-full max-w-4xl mx-auto">
      <template #header>
        <h2 class="text-xl font-semibold">{{ system.name }}</h2>
      </template>

      <p class="text-base text-white-600/25">{{ system.description }}</p>

      <template #footer>
        <div class="flex justify-between items-center w-full">
          <UButton size="lg" color="primary" variant="outline" @click="navigateToSystem(system.id)">
            {{ t('enter_system') }}
          </UButton>
          <!--
          <UButton :loading="isReloading" icon="heroicons-outline:refresh" color="primary" variant="solid" @click="reloadSystems">
            Reload
          </UButton>
          -->
        </div>
      </template>
    </UCard>


    

    <UModal v-model:open="open" :title="t('add_new_system')" close-icon="i-lucide-x">
      <template #body>
        <UFileUpload v-model="value" accept=".zip" :description="t('upload_system_zip')" />
        <div v-if="previewSystemName && !loadedSystemTitle" class="mt-4">
          <p class="text-emerald-400 font-medium"><span class="font-bold">{{ previewSystemName }}</span></p>
        </div>
        <UButton v-if="value && !loadedSystemTitle" class="mt-4" variant="outline" @click="uploadSystem"> {{
          t('upload_system') }}</UButton>
      </template>
    </UModal>

    <UButton @click="helper" class="mt-4">Print Current Systems</UButton>
  </div>
</template>
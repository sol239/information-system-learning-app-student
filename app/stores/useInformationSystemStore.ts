import { defineStore } from 'pinia'
import { InformationSystem } from '~/model/InformationSystem'
import { ref } from 'vue'
import { sys } from 'typescript'

export const useInformationSystemStore = defineStore('informationSystem', () => {
  const systems = ref<InformationSystem[]>([])

  function addSystem(system: InformationSystem) {
    systems.value.push(system)
  }

  function clearSystems() {
    systems.value = []
  }

  function deleteSystem(systemId: number) {
    const index = systems.value.findIndex(sys => sys.id === systemId)
    if (index !== -1) {
      systems.value.splice(index, 1)
    }
  }

  async function initializeDbs() {
    console.log("Reinitializing databases.")
    for (let i = 0; i < systems.value.length; i++) {
        systems.value[i].dbInitialized = false;
        const dbHandler = await InformationSystem.databaseInitStatic(systems.value[i].configData);
        
        systems.value[i].db = dbHandler;
        systems.value[i].dbInitialized = true;  
      }
  }

  return {
    systems,
    addSystem,
    clearSystems,
    deleteSystem,
    initializeDbs
  }
}, {
  persist: {
    serializer: {
      serialize: JSON.stringify,
      deserialize: (value: string) => {
        const parsed = JSON.parse(value)

        console.log("Deserializing informationSystem store:", parsed)
        
        // Check if this is old data structure (if needed in future)
        // For now, assume the structure is current
        
        // Convert plain objects back to InformationSystem instances
        if (parsed.systems && Array.isArray(parsed.systems)) {
          parsed.systems = parsed.systems.map((sys: any) => InformationSystem.fromJSON(sys))
        } else {
          parsed.systems = []
        }
        
        return parsed
      }
    },
    afterHydrate: async (context) => {
      // TODO: Piece of trash - needs to be fixed !!!!
      //await context.store.initializeDbs()
    }
  }
})

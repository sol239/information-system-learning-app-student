<template>
  <UModal v-model:open="isOpen" :dismissible="false" :ui="{ content: 'w-[80vw] max-w-[80vw]' }">
    <template #title>
      <div class="flex items-center gap-2">
        <span>Edit Component</span>
        <UBadge color="neutral" variant="subtle" size="sm" class="font-mono">{{ props.component.id }}</UBadge>
        <UButton @click="handleSave" color="sky" :disabled="!isFormValid">Save Changes</UButton>
      </div>
    </template>
    
    <template #body>
      <EditComponentBody 
        v-if="isOpen"
        ref="bodyRef"
        :component="props.component"
        :variables="props.variables"
        @validation-change="isFormValid = $event"
      />
    </template>
  </UModal>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { Component as SystemComponent } from '~/model/Component';
import { ComponentVariables } from '~/model/ComponentVariables';
import EditComponentBody from './EditComponentBody.vue';


const props = defineProps<{
  open: boolean;
  component: SystemComponent;
  variables?: ComponentVariables;
}>();

const emit = defineEmits<{
  (e: 'update:open', val: boolean): void;
  (e: 'save', payload: { updatedComponent: SystemComponent, updatedVariables: ComponentVariables }): void;
}>();

const isOpen = computed({
  get: () => props.open,
  set: (val) => emit('update:open', val)
});

// A reference to the child body component so we can call its exposed method
const bodyRef = ref<InstanceType<typeof EditComponentBody> | null>(null);

// Controls whether the save button is disabled
const isFormValid = ref(true);

function handleSave() {
  if (!bodyRef.value) return;

  // Grab the heavily processed payload directly from the child
  const payload = bodyRef.value.getDraftData();
  
  // Pass it up to the main renderer file
  emit('save', payload);
  
  // Close the modal
  isOpen.value = false;
}
</script>
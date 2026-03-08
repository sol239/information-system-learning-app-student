<template>
    <div
        class="relative overflow-hidden rounded-3xl bg-gradient-to-br from-teacher-500/10 via-student-500/5 to-sky-500/10 p-8 lg:p-12 border border-teacher-500/20 shadow-xl shadow-teacher-500/5">
        <div
            class="absolute -top-12 -right-12 opacity-5 transform rotate-12 transition-transform hover:scale-110 duration-700">
            <UIcon name="i-lucide-tent" class="w-64 h-64 text-teacher-600" />
        </div>
        <div class="absolute -bottom-8 -left-8 opacity-5 transform -rotate-12">
            <UIcon name="i-lucide-sun" class="w-48 h-48 text-student-600" />
        </div>

        <div class="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
            <div class="flex-1">
                <div class="flex items-center gap-3 mb-4">
                    <UBadge color="teacher" variant="subtle" size="md" class="font-bold tracking-wider uppercase">
                        System Dashboard
                    </UBadge>
                </div>

                <h1 class="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-4 tracking-tight">
                    {{ systemsStore.selectedSystem?.name || 'Loading System...' }}
                </h1>

                <p class="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl leading-relaxed font-medium">
                    {{ systemsStore.selectedSystem?.description || 'System overview and management dashboard.' }}
                </p>

                <div class="flex flex-wrap gap-4 mt-8">
                    <div
                        class="flex items-center gap-2 px-4 py-2 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-full border border-gray-200/50 dark:border-gray-700/50 shadow-sm">
                        <UIcon name="i-heroicons-map" class="w-5 h-5 text-student-500" />
                        <span class="text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase">
                            {{ systemsStore.selectedSystem?.language || 'en-US' }}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import ComponentWrapper from '~/components/ComponentWrapper.vue';
import { useSystemsStore } from '~/stores/systemsStore';

const systemsStore = useSystemsStore();
</script>
<template>
  <div class="max-w-5xl mx-auto py-12 px-4 sm:px-6">
    
    <div class="grid grid-cols-1 gap-8">
      
      <UCard class="border-t-4 border-sky-500 shadow-lg dark:bg-gray-900/50">
        
        <div class="flex flex-col md:flex-row items-start gap-6">
          <div class="hidden md:flex p-3 bg-sky-500/10 rounded-lg text-sky-500">
            <UIcon name="i-heroicons-academic-cap" class="w-10 h-10" />
          </div>

          <div class="flex-1">
            <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              {{ t('homepage_welcome_message') }}
            </h1>

            <p class="text-lg text-gray-600 dark:text-gray-300 mb-6 max-w-prose leading-relaxed">
              {{ t('homepage_description') }}
            </p>

            <div class="flex flex-wrap gap-4">
              <UButton to="/systems" size="lg" color="sky" variant="solid" icon="i-heroicons-computer-desktop" class="redirect_to_systems">
                Browse Systems
              </UButton>

              <UButton 
                to="https://github.com/sol239/information-system-learning-app" 
                class="redirect_to_github"
                target="_blank"
                icon="i-simple-icons-github" 
                color="violet" 
                variant="solid" 
                size="lg">
                {{ t('view_on_github') }}
              </UButton>
            </div>
          </div>
        </div>
      </UCard>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <UCard class="transition hover:ring-2 hover:ring-sky-500/50 cursor-pointer">
          <div class="flex items-center gap-4">
            <UIcon name="i-heroicons-server" class="w-8 h-8 text-sky-500" />
            <div>
              <p class="text-sm text-gray-500">Available Systems</p>
              <p class="text-2xl font-bold">3</p>
            </div>
          </div>
        </UCard>

        <UCard class="transition hover:ring-2 hover:ring-green-500/50 cursor-pointer">
          <div class="flex items-center gap-4">
            <UIcon name="i-heroicons-check-badge" class="w-8 h-8 text-green-500" />
            <div>
              <p class="text-sm text-gray-500">Tasks Completed</p>
              <p class="text-2xl font-bold">0</p>
            </div>
          </div>
        </UCard>

        <UCard class="transition hover:ring-2 hover:ring-purple-500/50 cursor-pointer">
           <div class="flex items-center gap-4">
            <UIcon name="i-heroicons-book-open" class="w-8 h-8 text-purple-500" />
            <div>
              <p class="text-sm text-gray-500">Current Level</p>
              <p class="text-2xl font-bold">Novice</p>
            </div>
          </div>
        </UCard>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>
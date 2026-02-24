<template>
  <div
    class="min-h-screen flex flex-col overflow-x-hidden w-full bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100">
    <GlobalNavbar />
    <main class="flex-1 w-full max-w-full">
      <slot />
    </main>
  </div>
</template>

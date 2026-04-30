<template>
<UButton label="Debug" @click="handleButtonClick" />
</template>


<script lang="ts" setup>
const config = useRuntimeConfig();
const appMode = config.public.appMode;
const loadComponentsFrom = config.public.loadComponentsFrom;
const loadPagesFrom = config.public.loadPagesFrom;
const singleSystem = config.public.singleSystem;

function handleButtonClick() {
    console.log('appMode', appMode)
    console.log('loadComponentsFrom', loadComponentsFrom)
    console.log('loadPagesFrom', loadPagesFrom)
    console.log('singleSystem', singleSystem)
}

</script>
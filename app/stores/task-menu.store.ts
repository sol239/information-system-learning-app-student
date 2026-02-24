export const useTaskMenuStore = defineStore('taskMenu', () => {

    const taskMenuOpened: Ref<boolean> = ref(true);
    const taskMenuDisplayedAsSidebar: Ref<boolean> = ref(true);
    const sidebarCollapsed: Ref<boolean> = ref(false);
    const isSmallScreen: Ref<boolean> = ref(false);

    function toggleTaskMenu() {
        taskMenuOpened.value = !taskMenuOpened.value
    }

    function toggleTaskMenuDisplay() {
        if (isSmallScreen.value) return;
        taskMenuDisplayedAsSidebar.value = !taskMenuDisplayedAsSidebar.value
    }

    function toggleSidebarCollapsed() {
        sidebarCollapsed.value = !sidebarCollapsed.value
    }

    if (import.meta.client) {
        const mq = window.matchMedia('(max-width: 1023px)');

        const updateMedia = (e: MediaQueryListEvent | MediaQueryList) => {
            isSmallScreen.value = e.matches;
            if (isSmallScreen.value) {
                taskMenuDisplayedAsSidebar.value = false;
            }
        };

        updateMedia(mq);
        mq.addEventListener('change', updateMedia);
    }


    return {
        taskMenuOpened,
        toggleTaskMenu,
        taskMenuDisplayedAsSidebar,
        toggleTaskMenuDisplay,
        sidebarCollapsed,
        toggleSidebarCollapsed,
        isSmallScreen
    }
})
<template>
   <div class="teacher-page">

      <!-- Split layout: list | detail -->
      <div class="teacher-page__body">

         <!-- LEFT: scrollable component list -->
         <div class="component-list-wrapper">

            <!-- Toolbar: search + tag filter -->
            <div class="component-toolbar">

               <!-- Search bar -->
               <div class="component-search">
                  <span class="component-search__icon">
                     <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <circle cx="11" cy="11" r="8" />
                        <line x1="21" y1="21" x2="16.65" y2="16.65" />
                     </svg>
                  </span>
                  <input v-model="search" type="text" placeholder="Search components…"
                     class="component-search__input" />
                  <button v-if="search" class="component-search__clear" @click="search = ''" aria-label="Clear search">
                     <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                     </svg>
                  </button>
               </div>

               <!-- Tag filter -->
               <div class="tag-filter" :class="{ 'tag-filter--open': tagDropdownOpen }"
                  v-click-outside="() => tagDropdownOpen = false">
                  <button class="tag-filter__trigger" @click="tagDropdownOpen = !tagDropdownOpen"
                     :aria-expanded="tagDropdownOpen">
                     <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
                     </svg>
                     <span>Tags</span>
                     <span v-if="selectedTags.size < allTags.length" class="tag-filter__badge">{{ selectedTags.size
                     }}/{{ allTags.length }}</span>
                     <svg class="tag-filter__chevron" xmlns="http://www.w3.org/2000/svg" width="11" height="11"
                        viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"
                        stroke-linejoin="round">
                        <polyline points="6 9 12 15 18 9" />
                     </svg>
                  </button>

                  <div v-if="tagDropdownOpen" class="tag-filter__dropdown">
                     <div class="tag-filter__dropdown-header">
                        <button class="tag-filter__action" @click="selectAllTags">All</button>
                        <button class="tag-filter__action" @click="clearAllTags">None</button>
                     </div>
                     <div class="tag-filter__tags-grid">
                        <button v-for="tag in allTags" :key="tag" class="tag-filter__tag-btn component-list__tag"
                           :class="[
                              `component-list__tag--${tag}`,
                              { 'tag--inactive': !selectedTags.has(tag) }
                           ]" @click="toggleTag(tag)">
                           {{ tag }}
                        </button>
                     </div>
                  </div>
               </div>

            </div>

            <div class="component-list">
               <div v-for="component in filteredComponents" :key="component.id" class="component-list__row"
                  :class="{ 'component-list__row--active': selected?.id === component.id }"
                  @click="selected = component">
                  <div class="component-list__preview">
                     <ComponentPreview :component="component" :show-header="false" />
                  </div>
                  <div class="component-list__info">
                     <div class="component-list__title-row">
                        <span class="component-list__name">{{ component.name }}</span>
                        <div v-if="component.tags?.length" class="component-list__tags">
                           <span v-for="tag in component.tags" :key="tag" class="component-list__tag"
                              :class="`component-list__tag--${tag}`">{{ tag }}</span>
                        </div>
                     </div>
                     <span v-if="component.description" class="component-list__desc">{{ component.description }}</span>
                  </div>
               </div>

               <div v-if="filteredComponents.length === 0" class="component-list__empty">
                  {{ search || selectedTags.size < allTags.length ? 'No components match your filters.'
                     : 'No components available.' }} </div>
               </div>

            </div>

            <!-- RIGHT: detail panel (shown when a component is selected) -->
            <transition name="slide-in">
               <div v-if="selected" class="detail-pane">
                  <ComponentDetail :component="selected" @close="selected = null" />
               </div>
            </transition>

         </div>
      </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useComponentCodeStore } from '~/stores/useComponentCodeStore'
import type { Component } from '~/model/Component'

const componentStore = useComponentCodeStore()
const selected = ref<Component | null>(null)
const search = ref('')
const tagDropdownOpen = ref(false)

// All available tags (sorted for stable order)
const allTags = computed(() => [...componentStore.getAllTags()].sort())

// Selected tags — starts with everything selected
const selectedTags = ref<Set<string>>(new Set(allTags.value))

// Keep selectedTags in sync if new tags appear (e.g. after store hydration)
watch(allTags, (tags) => {
   for (const t of tags) {
      if (!selectedTags.value.has(t)) selectedTags.value.add(t)
   }
}, { immediate: false })

function toggleTag(tag: string) {
   const next = new Set(selectedTags.value)
   if (next.has(tag)) next.delete(tag)
   else next.add(tag)
   selectedTags.value = next
}

function selectAllTags() { selectedTags.value = new Set(allTags.value) }
function clearAllTags() { selectedTags.value = new Set() }

// v-click-outside directive (lightweight inline, WeakMap avoids TS property errors)
const _coHandlers = new WeakMap<HTMLElement, (e: Event) => void>()
const vClickOutside = {
   mounted(el: HTMLElement, binding: { value: () => void }) {
      const handler = (e: Event) => { if (!el.contains(e.target as Node)) binding.value() }
      _coHandlers.set(el, handler)
      document.addEventListener('mousedown', handler)
   },
   unmounted(el: HTMLElement) {
      const handler = _coHandlers.get(el)
      if (handler) document.removeEventListener('mousedown', handler)
   }
}

const filteredComponents = computed(() => {
   const q = search.value.trim().toLowerCase()
   return componentStore.getDefaultComponentMap().filter(c => {
      // Name filter
      if (q && !c.name.toLowerCase().includes(q)) return false
      // Tag filter: component must share at least one tag with selectedTags
      // (if component has no tags at all, show it only when all tags are selected)
      if (selectedTags.value.size < allTags.value.length) {
         const compTags: string[] = Array.isArray(c.tags) ? c.tags : []
         if (compTags.length === 0) return false
         if (!compTags.some(t => selectedTags.value.has(t))) return false
      }
      return true
   })
})
</script>

<style scoped>
/* ── Page shell ──────────────────────────────────────────── */
.teacher-page {
   display: flex;
   flex-direction: column;
   height: 100vh;
   overflow: hidden;
   background: var(--color-bg, #11111b);
}

.teacher-page__header {
   flex-shrink: 0;
   padding: 16px 24px;
   border-bottom: 1px solid var(--color-border, rgba(255, 255, 255, 0.07));
   background: var(--color-surface, #1e1e2e);
}

/* ── Split body ──────────────────────────────────────────── */
.teacher-page__body {
   flex: 1;
   display: flex;
   overflow: hidden;
}

/* ── Left panel wrapper ──────────────────────────────────── */
.component-list-wrapper {
   flex: 1;
   display: flex;
   flex-direction: column;
   overflow: hidden;
   border-right: 1px solid var(--color-border, rgba(255, 255, 255, 0.07));
}

/* ── Toolbar row (search + tag filter) ───────────────────── */
.component-toolbar {
   flex-shrink: 0;
   display: flex;
   align-items: center;
   gap: 8px;
   margin: 14px 16px 6px;
}

/* ── Search bar ──────────────────────────────────────────── */
.component-search {
   flex: 1;
   display: flex;
   align-items: center;
   gap: 8px;
   padding: 0 12px;
   height: 38px;
   background: var(--color-surface, #1e1e2e);
   border: 1px solid var(--color-border, rgba(255, 255, 255, 0.09));
   border-radius: 9px;
   transition: border-color 0.15s ease, box-shadow 0.15s ease;
}

.component-search:focus-within {
   border-color: rgba(56, 189, 248, 0.5);
   box-shadow: 0 0 0 2px rgba(56, 189, 248, 0.12);
}

.component-search__icon {
   color: var(--color-text-muted, #6c7086);
   display: flex;
   align-items: center;
   flex-shrink: 0;
}

.component-search__input {
   flex: 1;
   background: transparent;
   border: none;
   outline: none;
   font-size: 0.85rem;
   color: var(--color-text-primary, #cdd6f4);
   caret-color: #38bdf8;
}

.component-search__input::placeholder {
   color: var(--color-text-muted, #6c7086);
}

.component-search__clear {
   background: none;
   border: none;
   padding: 2px;
   cursor: pointer;
   color: var(--color-text-muted, #6c7086);
   display: flex;
   align-items: center;
   border-radius: 4px;
   transition: color 0.15s ease;
}

.component-search__clear:hover {
   color: var(--color-text-primary, #cdd6f4);
}

/* ── Tag filter ──────────────────────────────────────────── */
.tag-filter {
   position: relative;
   flex-shrink: 0;
}

.tag-filter__trigger {
   display: flex;
   align-items: center;
   gap: 6px;
   height: 38px;
   padding: 0 12px;
   background: var(--color-surface, #1e1e2e);
   border: 1px solid var(--color-border, rgba(255, 255, 255, 0.09));
   border-radius: 9px;
   color: var(--color-text-muted, #6c7086);
   font-size: 0.82rem;
   cursor: pointer;
   transition: border-color 0.15s ease, color 0.15s ease, box-shadow 0.15s ease;
   white-space: nowrap;
}

.tag-filter__trigger:hover,
.tag-filter--open .tag-filter__trigger {
   border-color: rgba(56, 189, 248, 0.5);
   color: var(--color-text-primary, #cdd6f4);
   box-shadow: 0 0 0 2px rgba(56, 189, 248, 0.12);
}

.tag-filter__badge {
   background: rgba(56, 189, 248, 0.18);
   color: #38bdf8;
   font-size: 0.72rem;
   font-weight: 600;
   padding: 1px 6px;
   border-radius: 99px;
}

.tag-filter__chevron {
   transition: transform 0.15s ease;
}

.tag-filter--open .tag-filter__chevron {
   transform: rotate(180deg);
}

.tag-filter__dropdown {
   position: absolute;
   top: calc(100% + 6px);
   right: 0;
   width: 240px;
   max-height: 320px;
   overflow-y: auto;
   background: var(--color-surface, #1e1e2e);
   border: 1px solid var(--color-border, rgba(255, 255, 255, 0.1));
   border-radius: 12px;
   box-shadow: 0 12px 32px rgba(0, 0, 0, 0.5);
   z-index: 100;
   padding: 10px;
}

.tag-filter__dropdown::-webkit-scrollbar {
   width: 4px;
}

.tag-filter__dropdown::-webkit-scrollbar-track {
   background: transparent;
}

.tag-filter__dropdown::-webkit-scrollbar-thumb {
   background: rgba(255, 255, 255, 0.1);
   border-radius: 3px;
}

.tag-filter__dropdown-header {
   display: flex;
   gap: 4px;
   padding: 2px 4px 6px;
   border-bottom: 1px solid var(--color-border, rgba(255, 255, 255, 0.07));
   margin-bottom: 4px;
}

.tag-filter__action {
   flex: 1;
   padding: 4px 0;
   background: rgba(255, 255, 255, 0.05);
   border: none;
   border-radius: 5px;
   color: var(--color-text-muted, #6c7086);
   font-size: 0.75rem;
   cursor: pointer;
   transition: background 0.12s ease, color 0.12s ease;
}

.tag-filter__action:hover {
   background: rgba(56, 189, 248, 0.12);
   color: #38bdf8;
}

.tag-filter__tags-grid {
   display: flex;
   flex-wrap: wrap;
   gap: 6px;
   padding: 4px 2px;
}

.tag-filter__tag-btn {
   border: 1px solid transparent;
   cursor: pointer;
   transition: all 0.15s ease;
   user-select: none;
}

.tag-filter__tag-btn:hover {
   transform: translateY(-1px);
   box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}

.tag--inactive {
   background: rgba(255, 255, 255, 0.03) !important;
   color: var(--color-text-muted, #585b70) !important;
   border-color: rgba(255, 255, 255, 0.05) !important;
   opacity: 0.6;
}

.tag--inactive:hover {
   opacity: 1;
   background: rgba(255, 255, 255, 0.06) !important;
}

/* ── Left list ───────────────────────────────────────────── */
.component-list {
   flex: 1;
   overflow-y: auto;
   display: flex;
   flex-direction: column;
   gap: 10px;
   padding: 10px 12px 16px 16px;
}

.component-list::-webkit-scrollbar {
   width: 5px;
}

.component-list::-webkit-scrollbar-track {
   background: transparent;
}

.component-list::-webkit-scrollbar-thumb {
   background: rgba(255, 255, 255, 0.1);
   border-radius: 3px;
}

/* ── List row ────────────────────────────────────────────── */
.component-list__row {
   display: flex;
   align-items: flex-start;
   gap: 12px;
   padding: 10px;
   border-radius: 10px;
   background: var(--color-surface, #1e1e2e);
   border: 1px solid var(--color-border, rgba(255, 255, 255, 0.07));
   cursor: pointer;
   transition: background 0.15s ease, border-color 0.15s ease, box-shadow 0.15s ease;
}

.component-list__row:hover {
   background: var(--color-surface-hover, #252535);
   border-color: rgba(255, 255, 255, 0.14);
}

.component-list__row--active {
   border-color: #38bdf8 !important;
   background: rgba(56, 189, 248, 0.06) !important;
   box-shadow: 0 0 0 1px rgba(56, 189, 248, 0.25);
}

/* ── Preview thumbnail ───────────────────────────────────── */
.component-list__preview {
   flex-shrink: 0;
   width: 140px;
}

/* ── Info column ─────────────────────────────────────────── */
.component-list__info {
   flex: 1;
   display: flex;
   flex-direction: column;
   gap: 4px;
   padding-top: 2px;
   min-width: 0;
}

.component-list__name {
   font-size: 0.88rem;
   font-weight: 600;
   color: var(--color-text-primary, #cdd6f4);
   white-space: nowrap;
   overflow: hidden;
   text-overflow: ellipsis;
   flex-shrink: 1;
   min-width: 0;
}

/* ── Title row (name + badges) ───────────────────────────── */
.component-list__title-row {
   display: flex;
   align-items: center;
   gap: 6px;
   flex-wrap: wrap;
   min-width: 0;
}

/* ── Tag badges ──────────────────────────────────────────── */
.component-list__tags {
   display: flex;
   flex-wrap: wrap;
   gap: 4px;
}

.component-list__tag {
   display: inline-flex;
   align-items: center;
   padding: 1px 6px;
   border-radius: 99px;
   font-size: 0.65rem;
   font-weight: 600;
   letter-spacing: 0.02em;
   text-transform: lowercase;
   /* default (page tag) */
   background: rgba(255, 255, 255, 0.07);
   color: var(--color-text-muted, #6c7086);
   border: 1px solid rgba(255, 255, 255, 0.08);
}

/* tech-tag colour overrides */
.component-list__tag--html {
   background: rgba(228, 77, 38, 0.15);
   color: #f28c70;
   border-color: rgba(228, 77, 38, 0.25);
}

.component-list__tag--css {
   background: rgba(38, 143, 228, 0.15);
   color: #7ab8f5;
   border-color: rgba(38, 143, 228, 0.25);
}

.component-list__tag--js {
   background: rgba(240, 195, 48, 0.15);
   color: #f0d060;
   border-color: rgba(240, 195, 48, 0.25);
}

.component-list__tag--sql {
   background: rgba(80, 200, 120, 0.15);
   color: #72e0a0;
   border-color: rgba(80, 200, 120, 0.25);
}

.component-list__desc {
   font-size: 0.75rem;
   color: var(--color-text-muted, #6c7086);
   line-height: 1.4;
   display: -webkit-box;
   -webkit-line-clamp: 3;
   line-clamp: 3;
   -webkit-box-orient: vertical;
   overflow: hidden;
}

.component-list__empty {
   display: flex;
   align-items: center;
   justify-content: center;
   padding: 48px;
   color: var(--color-text-muted, #6c7086);
   font-size: 0.85rem;
}

/* ── Right detail pane ───────────────────────────────────── */
.detail-pane {
   flex: 2;
   overflow: hidden;
   display: flex;
   flex-direction: column;
}

/* ── Slide-in transition ─────────────────────────────────── */
.slide-in-enter-active {
   transition: opacity 0.2s ease, transform 0.22s ease;
}

.slide-in-leave-active {
   transition: opacity 0.15s ease, transform 0.15s ease;
}

.slide-in-enter-from {
   opacity: 0;
   transform: translateX(20px);
}

.slide-in-leave-to {
   opacity: 0;
   transform: translateX(20px);
}
</style>

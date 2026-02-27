<template>
    <div class="detail-panel">

        <!-- Header -->
        <div class="detail-panel__header">
            <div class="detail-panel__titles">
                <span class="detail-panel__name">{{ component.name }}</span>
                <span v-if="component.description" class="detail-panel__desc">{{ component.description }}</span>
                <div v-if="component.tags?.length" class="detail-panel__tags">
                    <span v-for="tag in component.tags" :key="tag" class="detail-tag" :class="`detail-tag--${tag}`">
                        {{ tag }}
                    </span>
                </div>
            </div>
            <div class="detail-panel__meta">
                <span class="detail-panel__id">{{ component.id }}</span>
                <button class="detail-panel__close" @click="$emit('close')" title="Close detail">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </button>
            </div>
        </div>

        <!-- Sections -->
        <div class="detail-panel__sections">
            <div v-for="section in visibleSections" :key="section.key" class="detail-section">
                <!-- Section label -->
                <div class="detail-section__title-row">
                    <h3 class="detail-section__label" :class="`detail-section__label--${section.key}`">
                        {{ sectionLabel(section.key) }}
                    </h3>
                    <!-- SQL tab switcher when multiple entries -->
                    <div v-if="section.key === 'sql' && section.entries.length > 1" class="sql-tabs">
                        <button v-for="(entry, idx) in section.entries" :key="entry.key" class="sql-tab"
                            :class="{ 'sql-tab--active': activeSqlKey === entry.key }"
                            @click="activeSqlKey = entry.key">{{ idx + 1 }}</button>
                    </div>
                </div>

                <!-- Non-SQL: show all entries stacked -->
                <template v-if="section.key !== 'sql'">
                    <div v-for="entry in section.entries" :key="entry.key" class="detail-section__entry">
                        <div v-if="section.entries.length > 1" class="detail-section__entry-key">{{ entry.key }}</div>
                        <div class="detail-section__editor-wrap"
                            :class="{ 'detail-section__editor-wrap--focused': focusedEditorKey === (section.key + '.' + entry.key) }">
                            <div v-if="focusedEditorKey !== (section.key + '.' + entry.key)"
                                class="editor-scroll-shield" @click.stop="focusEditor(section.key + '.' + entry.key)">
                                <span class="editor-focus-hint">Click to scroll</span>
                            </div>
                            <vue-monaco-editor :language="monacoLang(section.key)" :theme="monacoTheme"
                                :value="entry.value" :options="readonlyOptions" class="detail-section__editor"
                                :height="editorHeight(entry.value)" />
                        </div>
                    </div>
                </template>

                <!-- SQL: show active tab only -->
                <template v-else>
                    <div class="detail-section__editor-wrap"
                        :class="{ 'detail-section__editor-wrap--focused': focusedEditorKey === ('sql.' + activeSqlKey) }">
                        <div v-if="focusedEditorKey !== ('sql.' + activeSqlKey)" class="editor-scroll-shield"
                            @click.stop="focusEditor('sql.' + activeSqlKey)">
                            <span class="editor-focus-hint">Click to scroll</span>
                        </div>
                        <vue-monaco-editor :language="'sql'" :theme="monacoTheme" :value="activeSqlValue(section)"
                            :options="readonlyOptions" class="detail-section__editor"
                            :height="editorHeight(activeSqlValue(section))" />
                    </div>
                </template>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
const emit = defineEmits(['close'])
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import { VueMonacoEditor } from '@guolao/vue-monaco-editor'
import type { Component } from '~/model/Component'

const props = defineProps<{
    component: Component
}>()

/* ── Theme ───────────────────────────────────────────────── */
const colorMode = useColorMode()
const isDark = computed(() => colorMode.value === 'dark')
const monacoTheme = computed(() => isDark.value ? 'vs-dark' : 'vs-light')

/* ── Read-only Monaco options ────────────────────────────── */
const focusedEditorKey = ref<string | null>(null)

const readonlyOptions = {
    readOnly: true,
    minimap: { enabled: false },
    wordWrap: 'on' as const,
    automaticLayout: true,
    scrollBeyondLastLine: false,
    fontSize: 13,
    fontFamily: "'Fira Mono', 'Consolas', 'Menlo', monospace",
    lineNumbers: 'on' as const,
    renderLineHighlight: 'none' as const,
    scrollbar: { verticalScrollbarSize: 4, horizontalScrollbarSize: 4 },
}

function focusEditor(key: string) {
    focusedEditorKey.value = key
}

// Click anywhere outside the focused editor to deactivate it
function onPageClick() {
    focusedEditorKey.value = null
}

onMounted(() => {
    document.addEventListener('click', onPageClick)
})

onUnmounted(() => {
    document.removeEventListener('click', onPageClick)
})

/* ── Sections builder ────────────────────────────────────── */
type SectionEntry = { key: string; value: string }
type Section = { key: string; entries: SectionEntry[] }

const SECTION_KEYS: readonly string[] = ['html', 'css', 'js', 'sql']

const visibleSections = computed<Section[]>(() => {
    const result: Section[] = []
    for (const k of SECTION_KEYS) {
        const record = props.component[k as keyof typeof props.component] as Record<string, string> | undefined
        if (!record) continue
        const entries = Object.entries(record)
            .filter(([, v]) => v && v.trim() !== '')
            .map(([key, value]) => ({ key, value }))
        if (entries.length) result.push({ key: k, entries })
    }
    return result
})

/* ── SQL tab state ───────────────────────────────────────── */
const activeSqlKey = ref<string>('')

// auto-pick first SQL key when component changes
watch(
    () => props.component,
    (c) => {
        const first = Object.keys(c.sql ?? {})[0] ?? ''
        activeSqlKey.value = first
    },
    { immediate: true }
)

function activeSqlValue(section: Section): string {
    const entry = section.entries.find(e => e.key === activeSqlKey.value)
        ?? section.entries[0]
    return entry?.value ?? ''
}

/* ── Helpers ─────────────────────────────────────────────── */
const LINE_HEIGHT = 19   // px — matches Monaco's default at font-size 13
const EDITOR_PADDING = 16 // top + bottom gutter
const EDITOR_MIN = 56
const EDITOR_MAX = 500

/**
 * Returns a `height` string for vue-monaco-editor that exactly fits the
 * content's line count, clamped between EDITOR_MIN and EDITOR_MAX.
 */
function editorHeight(code: string): string {
    const lines = (code ?? '').split('\n').length
    const px = Math.min(Math.max(lines * LINE_HEIGHT + EDITOR_PADDING, EDITOR_MIN), EDITOR_MAX)
    return `${px}px`
}

function sectionLabel(key: string): string {
    const map: Record<string, string> = {
        html: 'HTML',
        css: 'CSS',
        js: 'JavaScript',
        sql: 'SQL',
    }
    return map[key] ?? key.toUpperCase()
}

function monacoLang(key: string): string {
    const map: Record<string, string> = {
        html: 'html',
        css: 'css',
        js: 'javascript',
        sql: 'sql',
    }
    return map[key] ?? 'plaintext'
}
</script>

<style scoped>
/* ── Panel shell ─────────────────────────────────────────── */
.detail-panel {
    display: flex;
    flex-direction: column;
    height: 100%;
    overflow: hidden;
    background: var(--color-surface, #1e1e2e);
    border-left: 1px solid var(--color-border, rgba(255, 255, 255, 0.08));
}

/* ── Header ──────────────────────────────────────────────── */
.detail-panel__header {
    flex-shrink: 0;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 12px;
    padding: 16px 20px 14px;
    border-bottom: 1px solid var(--color-border, rgba(255, 255, 255, 0.08));
    background: var(--color-surface-raised, rgba(255, 255, 255, 0.03));
}

.detail-panel__titles {
    display: flex;
    flex-direction: column;
    gap: 3px;
}

.detail-panel__name {
    font-size: 1rem;
    font-weight: 700;
    color: var(--color-text-primary, #cdd6f4);
}

.detail-panel__desc {
    font-size: 0.78rem;
    color: var(--color-text-muted, #6c7086);
    line-height: 1.4;
    margin-bottom: 4px;
}

.detail-panel__tags {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    margin-top: 4px;
}

.detail-tag {
    font-size: 0.65rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.04em;
    padding: 2px 8px;
    border-radius: 100px;
    background: rgba(255, 255, 255, 0.05);
    color: var(--color-text-muted, #6c7086);
    border: 1px solid rgba(255, 255, 255, 0.08);
}

.detail-tag--html {
    color: #38bdf8;
    border-color: rgba(56, 189, 248, 0.2);
    background: rgba(56, 189, 248, 0.05);
}

.detail-tag--css {
    color: #f97316;
    border-color: rgba(249, 115, 22, 0.2);
    background: rgba(249, 115, 22, 0.05);
}

.detail-tag--js {
    color: #10b981;
    border-color: rgba(16, 185, 129, 0.2);
    background: rgba(16, 185, 129, 0.05);
}

.detail-tag--sql {
    color: #facc15;
    border-color: rgba(250, 204, 21, 0.2);
    background: rgba(250, 204, 21, 0.05);
}

/* Highlight page-name tags differently */
.detail-tag:not(.detail-tag--html):not(.detail-tag--css):not(.detail-tag--js):not(.detail-tag--sql) {
    color: #cdd6f4;
    background: rgba(205, 214, 244, 0.08);
}

.detail-panel__meta {
    display: flex;
    align-items: center;
    gap: 12px;
}

.detail-panel__id {
    font-size: 0.7rem;
    font-family: 'Fira Mono', monospace;
    color: var(--color-text-muted, #6c7086);
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.07);
    border-radius: 4px;
    padding: 2px 7px;
    white-space: nowrap;
    flex-shrink: 0;
}

.detail-panel__close {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    border-radius: 8px;
    border: 1px solid transparent;
    background: transparent;
    color: var(--color-text-muted, #6c7086);
    cursor: pointer;
    transition: all 0.2s ease;
    padding: 0;
}

.detail-panel__close:hover {
    background: rgba(255, 255, 255, 0.08);
    color: var(--color-text-primary, #cdd6f4);
    border-color: rgba(255, 255, 255, 0.1);
}

.detail-panel__close:active {
    transform: scale(0.92);
}

/* ── Sections scroll area ────────────────────────────────── */
.detail-panel__sections {
    flex: 1;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: 0;
    padding: 0 0 24px;
}

.detail-panel__sections::-webkit-scrollbar {
    width: 5px;
}

.detail-panel__sections::-webkit-scrollbar-track {
    background: transparent;
}

.detail-panel__sections::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 3px;
}

/* ── Individual section ──────────────────────────────────── */
.detail-section {
    display: flex;
    flex-direction: column;
    border-bottom: 1px solid var(--color-border, rgba(255, 255, 255, 0.06));
    padding: 14px 20px 16px;
}

.detail-section__title-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 8px;
}

.detail-section__label {
    font-family: 'Fira Mono', monospace;
    font-size: 0.78rem;
    font-weight: 700;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    margin: 0;
}

.detail-section__label--html {
    color: #38bdf8;
}

.detail-section__label--css {
    color: #f97316;
}

.detail-section__label--js {
    color: #10b981;
}

.detail-section__label--sql {
    color: #facc15;
}

/* ── Entry (multiple entries in one section) ─────────────── */
.detail-section__entry {
    display: flex;
    flex-direction: column;
    gap: 4px;
    margin-bottom: 10px;
}

.detail-section__entry:last-child {
    margin-bottom: 0;
}

.detail-section__entry-key {
    font-size: 0.7rem;
    font-family: 'Fira Mono', monospace;
    color: var(--color-text-muted, #6c7086);
    text-transform: uppercase;
    letter-spacing: 0.04em;
}

/* ── Monaco editor wrapper ───────────────────────────────── */
.detail-section__editor-wrap {
    position: relative;
    border-radius: 6px;
    border: 1px solid rgba(255, 255, 255, 0.07);
    transition: border-color 0.2s ease, box-shadow 0.2s ease;
    cursor: pointer;
}

.detail-section__editor-wrap--focused {
    border-color: rgba(139, 92, 246, 0.6);
    box-shadow: 0 0 0 2px rgba(139, 92, 246, 0.2);
    cursor: default;
}

/* ── Scroll shield overlay ───────────────────────────────── */
.editor-scroll-shield {
    position: absolute;
    inset: 0;
    z-index: 5;
    cursor: pointer;
    display: flex;
    align-items: flex-start;
    justify-content: flex-end;
}

.editor-focus-hint {
    margin: 6px 8px 0 0;
    font-size: 0.65rem;
    font-family: 'Fira Mono', monospace;
    color: rgba(255, 255, 255, 0.25);
    pointer-events: none;
    transition: color 0.2s ease;
    letter-spacing: 0.04em;
}

.editor-scroll-shield:hover .editor-focus-hint {
    color: rgba(255, 255, 255, 0.5);
}

.detail-section__editor {
    width: 100%;
    border-radius: 6px;
    overflow: hidden;
}

/* ── SQL tabs ────────────────────────────────────────────── */
.sql-tabs {
    display: flex;
    gap: 6px;
}

.sql-tab {
    width: 28px;
    height: 28px;
    border-radius: 50%;
    border: 2px solid #facc15;
    background: transparent;
    color: #facc15;
    font-weight: 600;
    font-size: 0.8rem;
    cursor: pointer;
    transition: all 0.15s ease;
    display: flex;
    align-items: center;
    justify-content: center;
}

.sql-tab:hover,
.sql-tab--active {
    background: #facc15;
    color: #1e1e2e;
}
</style>

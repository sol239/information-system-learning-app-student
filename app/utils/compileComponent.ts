// utils/compileComponent.ts
import { parse, compileScript, compileTemplate, compileStyle } from '@vue/compiler-sfc'
import * as Vue from 'vue'
import * as VueRouter from 'vue-router'
import { useSystemsStore } from '~/stores/systemsStore'
import { DatabaseWrapper } from '~/utils/DatabaseWrapper'
import ComponentWrapper from '~/components/ComponentWrapper.vue'

const MODULE_MAP: Record<string, any> = {
    'vue': Vue,
    'vue-router': VueRouter,
    '~/stores/systemsStore': { useSystemsStore },
    '~/utils/DatabaseWrapper': { DatabaseWrapper },
    '~/components/ComponentWrapper.vue': { default: ComponentWrapper },
}

function stripImports(code: string): string {
    return code
        .replace(/^import\s+.*?from\s+['"][^'"]+['"]\s*;?\s*$/gm, '')
        .replace(/^import\s+['"][^'"]+['"]\s*;?\s*$/gm, '')
        .replace(/^export\s+/gm, '')
}

export async function compileSFC(source: string, id: string): Promise<any> {
    const { descriptor } = parse(source)

    const compiledScript = compileScript(descriptor, {
        id,
        genDefaultAs: '__comp__',
    })

    const hasScoped = descriptor.styles.some(s => s.scoped)

    const compiledTemplate = compileTemplate({
        source: descriptor.template!.content,
        filename: `${id}.vue`,
        id,
        scoped: hasScoped,
        compilerOptions: {
            bindingMetadata: compiledScript.bindings,
        },
    })

    for (const style of descriptor.styles) {
        const compiled = compileStyle({
            source: style.content,
            filename: `${id}.vue`,
            id,
            scoped: style.scoped ?? false,
        })
        const existing = document.querySelector(`style[data-comp-id="${id}"]`)
        if (!existing) {
            const el = document.createElement('style')
            el.setAttribute('data-comp-id', id)
            el.textContent = compiled.code
            document.head.appendChild(el)
        }
    }

    const strippedScript = stripImports(compiledScript.content)
    const strippedTemplate = stripImports(compiledTemplate.code)

    const moduleCode = `
        const { computed, ref, reactive, watch, watchEffect, onMounted, onUnmounted, toRef, toRefs, nextTick,
                withAsyncContext: _withAsyncContext,
                resolveComponent: _resolveComponent,
                createVNode: _createVNode,
                createElementVNode: _createElementVNode,
                openBlock: _openBlock,
                createElementBlock: _createElementBlock,
                createBlock: _createBlock,
                Fragment: _Fragment,
                renderList: _renderList,
                withCtx: _withCtx,
                toDisplayString: _toDisplayString,
                normalizeClass: _normalizeClass,
                normalizeStyle: _normalizeStyle,
                mergeProps: _mergeProps,
                vModelText: _vModelText,
                withDirectives: _withDirectives,
                vShow: _vShow
        } = __modules__['vue']
        const { useRoute, useRouter } = __modules__['vue-router']
        const { useSystemsStore } = __modules__['~/stores/systemsStore']
        const { DatabaseWrapper } = __modules__['~/utils/DatabaseWrapper']
        const ComponentWrapper = __modules__['~/components/ComponentWrapper.vue'].default

        ${strippedScript}

        __comp__.components = { ComponentWrapper }

        ${strippedTemplate}
        __comp__.render = render
        return __comp__
    `

    const factory = new Function('__modules__', moduleCode)
    return factory(MODULE_MAP)
}
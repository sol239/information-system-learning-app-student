import { SystemZipLoader } from '~/utils/SystemZipLoader'
import { InformationSystem } from '~/model/InformationSystem'
import { OperationResultType } from '~/utils/OperationResultType'
import type { InformationSystem as InformationSystemType } from '~/model/InformationSystem'

/**
 * Loads InformationSystem instances from ZIP files listed in public/systems/manifest.json.
 *
 * manifest.json format:
 * { "systems": ["system-a.zip", "system-b.zip"] }
 *
 * Place ZIP files in public/systems/ next to the manifest.
 */
export function usePreloadedSystems() {
    const systems = ref<InformationSystemType[]>([])
    const loading = ref(false)
    const errors = ref<string[]>([])

    const baseURL = useRuntimeConfig().app.baseURL.replace(/\/$/, '')

    async function load() {
        loading.value = true
        errors.value = []
        systems.value = []

        let manifest: { systems: string[] }
        try {
            const res = await fetch(`${baseURL}/systems/manifest.json`)
            if (!res.ok) throw new Error(`manifest.json fetch failed: ${res.status}`)
            manifest = await res.json()
        } catch (e) {
            errors.value.push(String(e))
            loading.value = false
            return
        }

        const results = await Promise.allSettled(
            manifest.systems.map(filename => loadSystemFromZip(`${baseURL}/systems/${filename}`, filename))
        )

        for (const result of results) {
            if (result.status === 'fulfilled' && result.value) {
                systems.value.push(result.value)
            } else if (result.status === 'rejected') {
                errors.value.push(String(result.reason))
            }
        }

        loading.value = false
    }

    async function loadSystemFromZip(url: string, filename: string): Promise<InformationSystemType | null> {
        const res = await fetch(url)
        if (!res.ok) throw new Error(`Failed to fetch ${filename}: ${res.status}`)

        const blob = await res.blob()
        const file = new File([blob], filename, { type: 'application/zip' })

        const loaderResult = await SystemZipLoader.create(file)
        if (loaderResult.result !== OperationResultType.SUCCESS || !loaderResult.data) {
            throw new Error(`Failed to parse ${filename}: ${loaderResult.message}`)
        }

        const loader = loaderResult.data
        const filesContents: Record<string, string> = {
            'config.json': loader.jsonConfigFileContent ?? '',
            'system_components.json': loader.jsonComponentsContent ?? '',
            ...loader.csvFilesContent,
            ...loader.vueFilesContent,
            ...loader.sqlFilesContent,
        }

        const systemResult = await InformationSystem.loadSystem(filesContents)
        if (systemResult.result !== OperationResultType.SUCCESS || !systemResult.data) {
            throw new Error(`Failed to load system from ${filename}: ${systemResult.message}`)
        }

        return systemResult.data
    }

    return { systems, loading, errors, load }
}

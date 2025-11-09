import JSZip from 'jszip';
import { InformationSystem } from '~/model/InformationSystem';

export class SystemZipLoader {

    private zip: JSZip = new JSZip();
    private files: Record<string, JSZip.JSZipObject> = {};

    public static async create(zipFile: File): Promise<SystemZipLoader> {
        const loader = new SystemZipLoader();
        await loader.loadZip(zipFile);
        return loader;
    }

    private async loadZip(zipFile: File): Promise<void> {
        this.zip = await JSZip.loadAsync(zipFile);
        this.loadFiles();
    }

    private loadFiles(): void {
        this.zip.forEach((relativePath, zipEntry) => {
            this.files[relativePath] = zipEntry;
        });
    }

    public async printFiles(): Promise<void> {
        console.log('JSZip contents:');
        console.log("Files count: " + Object.keys(this.files).length + " files");
        for (const [path, entry] of Object.entries(this.files)) {
            try {
                const content = await entry.async('uint8array');
                const size = content.length;
                console.log(`- ${path}: ${entry.name}`);
            } catch (error) {
                console.log(`- ${path}: ${entry.name}, size: unknown (error: ${error})`);
            }
        }
    }


    public async getSystem(): Promise<InformationSystem | null> {
        // Find the config.json file in the zip
        const configEntry = Object.values(this.files).find(entry => entry.name.endsWith('config.json'));
        if (!configEntry) {
            console.error('No config.json found in the zip file.');
            return null;
        }

        try {
            // Read and parse the config.json
            const configText = await configEntry.async('text');
            const configData = JSON.parse(configText);

            // Extract CSV files from the ZIP as a map of file names to contents
            const csvData: Record<string, string> = {};
            for (const [path, entry] of Object.entries(this.files)) {
                if (path.endsWith('.csv')) {
                    const fileName = path.split('/').pop()!; // Extract file name (e.g., 'participants.csv')
                    csvData[fileName] = await entry.async('text');
                }
            }

            const infoSystem = InformationSystem.fromJSON(configData);
            await infoSystem.databaseInitNew(configData, csvData); // Pass CSV data to databaseInit
            return infoSystem;
        } catch (error) {
            console.error('Failed to load system from zip:', error);
            return null;
        }
    }
}
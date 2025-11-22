export class IndexedDbHandler {
    private static DB_NAME = 'InformationSystemDB';
    private static STORE_NAME = 'systems';
    private static VERSION = 1;

    private static async openDB(): Promise<IDBDatabase> {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open(this.DB_NAME, this.VERSION);

            request.onerror = (event) => {
                console.error("IndexedDB error:", event);
                reject("IndexedDB error");
            };

            request.onsuccess = (event) => {
                resolve((event.target as IDBOpenDBRequest).result);
            };

            request.onupgradeneeded = (event) => {
                const db = (event.target as IDBOpenDBRequest).result;
                if (!db.objectStoreNames.contains(this.STORE_NAME)) {
                    db.createObjectStore(this.STORE_NAME);
                }
            };
        });
    }

    public static async saveSystemDB(systemId: number, data: Uint8Array): Promise<void> {
        const db = await this.openDB();
        return new Promise((resolve, reject) => {
            const transaction = db.transaction([this.STORE_NAME], 'readwrite');
            const store = transaction.objectStore(this.STORE_NAME);
            const request = store.put(data, systemId);

            request.onsuccess = () => resolve();
            request.onerror = () => reject(request.error);
        });
    }

    public static async loadSystemDB(systemId: number): Promise<Uint8Array | null> {
        const db = await this.openDB();
        return new Promise((resolve, reject) => {
            const transaction = db.transaction([this.STORE_NAME], 'readonly');
            const store = transaction.objectStore(this.STORE_NAME);
            const request = store.get(systemId);

            request.onsuccess = () => {
                resolve(request.result ? (request.result as Uint8Array) : null);
            };
            request.onerror = () => reject(request.error);
        });
    }
    
    public static async deleteSystemDB(systemId: number): Promise<void> {
        const db = await this.openDB();
        return new Promise((resolve, reject) => {
            const transaction = db.transaction([this.STORE_NAME], 'readwrite');
            const store = transaction.objectStore(this.STORE_NAME);
            const request = store.delete(systemId);

            request.onsuccess = () => resolve();
            request.onerror = () => reject(request.error);
        });
    }
}

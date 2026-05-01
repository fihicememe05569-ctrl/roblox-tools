type DataType = { id: string; value: any; timestamp: number; };

class DataService {
    private dataStore: Map<string, DataType> = new Map();

    addData(id: string, value: any): void {
        const timestamp = Date.now();
        this.dataStore.set(id, { id, value, timestamp });
    }

    getData(id: string): DataType | undefined {
        return this.dataStore.get(id);
    }

    updateData(id: string, value: any): void {
        if (this.dataStore.has(id)) {
            const { timestamp } = this.dataStore.get(id)!;
            this.dataStore.set(id, { id, value, timestamp });
        } else {
            throw new Error(`Data with ID: ${id} does not exist.`);
        }
    }

    deleteData(id: string): boolean {
        return this.dataStore.delete(id);
    }

    listAllData(): DataType[] {
        return Array.from(this.dataStore.values());
    }
}

export const dataService = new DataService();
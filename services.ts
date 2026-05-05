type RobloxData = {id: number; name: string; data: any;};

class DataHandler {
    private dataStore: Map<number, RobloxData>;

    constructor() {
        this.dataStore = new Map<number, RobloxData>();
    }

    addData(item: RobloxData): void {
        this.dataStore.set(item.id, item);
    }

    removeData(id: number): boolean {
        return this.dataStore.delete(id);
    }

    getData(id: number): RobloxData | undefined {
        return this.dataStore.get(id);
    }

    filterData(predicate: (data: RobloxData) => boolean): RobloxData[] {
        const result: RobloxData[] = [];
        for (const data of this.dataStore.values()) {
            if (predicate(data)) {
                result.push(data);
            }
        }
        return result;
    }

    clearData(): void {
        this.dataStore.clear();
    }
}
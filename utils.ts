export interface RobloxData<T> {
    id: number;
    name: string;
    attributes: T;
}

export function filterRobloxData<T>(data: RobloxData<T>[], predicate: (item: RobloxData<T>) => boolean): RobloxData<T>[] {
    return data.filter(predicate);
}

export function sortRobloxData<T>(data: RobloxData<T>[], key: keyof T, ascending: boolean = true): RobloxData<T>[] {
    return data.sort((a, b) => {
        const valueA = a.attributes[key];
        const valueB = b.attributes[key];
        return ascending ? (valueA > valueB ? 1 : -1) : (valueA < valueB ? 1 : -1);
    });
}

export function convertRobloxDataToJSON<T>(data: RobloxData<T>[]): string {
    return JSON.stringify(data, null, 2);
}

export function parseRobloxDataFromJSON<T>(jsonString: string): RobloxData<T>[] {
    return JSON.parse(jsonString) as RobloxData<T>[];
}
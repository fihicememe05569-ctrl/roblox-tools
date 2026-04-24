export function filterRobloxData<T>(data: T[], predicate: (item: T) => boolean): T[] {
    return data.filter(predicate);
}

export function transformRobloxData<T, U>(data: T[], transform: (item: T) => U): U[] {
    return data.map(transform);
}

export function combineRobloxData<T>(...dataArrays: T[][]): T[] {
    return dataArrays.reduce((acc, curr) => acc.concat(curr), []);
}

export function getRobloxDataById<T>(data: T[], id: string | number, idKey: keyof T): T | undefined {
    return data.find(item => item[idKey] === id);
}

export function sortRobloxData<T>(data: T[], compareFn: (a: T, b: T) => number): T[] {
    return [...data].sort(compareFn);
}

export function paginateRobloxData<T>(data: T[], page: number, pageSize: number): T[] {
    const start = (page - 1) * pageSize;
    return data.slice(start, start + pageSize);
}

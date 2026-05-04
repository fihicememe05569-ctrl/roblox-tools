export function optimizeArrayPerformance<T>(array: T[]): T[] {
    const seen: Set<T> = new Set<T>();
    return array.filter(item => {
        if (!seen.has(item)) {
            seen.add(item);
            return true;
        }
        return false;
    });
}

export function debounce<T>(func: (...args: T[]) => void, wait: number) {
    let timeout: NodeJS.Timeout | null;
    return (...args: T[]) => {
        if (timeout) clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), wait);
    };
}

export function throttle<T>(func: (...args: T[]) => void, limit: number) {
    let lastFunc: NodeJS.Timeout | null;
    let lastRan: number = Date.now();
    return (...args: T[]) => {
        if (!lastFunc) {
            func(...args);
            lastRan = Date.now();
            lastFunc = setTimeout(() => {
                lastFunc = null;
            }, limit);
        }
    };
}
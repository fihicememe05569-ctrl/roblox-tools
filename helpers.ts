export function debounce<T extends (...args: any[]) => void>(fn: T, delay: number): T {
    let timeoutId: NodeJS.Timeout | null = null;
    return function(this: any, ...args: any[]) {
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        timeoutId = setTimeout(() => { fn.apply(this, args); }, delay);
    } as T;
}

export function throttle<T extends (...args: any[]) => void>(fn: T, limit: number): T {
    let lastCall: number | null = null;
    return function(this: any, ...args: any[]) {
        const now = Date.now();
        if (lastCall === null || (now - lastCall) >= limit) {
            lastCall = now;
            fn.apply(this, args);
        }
    } as T;
}

export function randomInRange(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function clamp(value: number, min: number, max: number): number {
    return Math.max(min, Math.min(max, value));
}

export function deepClone<T>(obj: T): T {
    return JSON.parse(JSON.stringify(obj));
}

export function debounce<T extends (...args: any[]) => any>(func: T, delay: number): (...args: Parameters<T>) => void {
    let timeoutId: NodeJS.Timeout | null = null;
    return function (...args: Parameters<T>): void {
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        timeoutId = setTimeout(() => {
            func(...args);
        }, delay);
    };
}

export function throttle<T extends (...args: any[]) => any>(func: T, limit: number): (...args: Parameters<T>) => void {
    let lastFunc: NodeJS.Timeout | null;
    let lastRan: number = 0;
    return function (...args: Parameters<T>): void {
        const context = this;
        if (!lastRan) {
            func.apply(context, args);
            lastRan = Date.now();
        } else {
            if (Date.now() - lastRan >= limit) {
                if (lastFunc) {
                    clearTimeout(lastFunc);
                }
                func.apply(context, args);
                lastRan = Date.now();
            } else {
                lastFunc = setTimeout(function () {
                    func.apply(context, args);
                }, limit - (Date.now() - lastRan));
            }
        }
    };
}

export function randomElement<T>(array: T[]): T {
    const index = Math.floor(Math.random() * array.length);
    return array[index];
}

export function uniqueArray<T>(array: T[]): T[] {
    return Array.from(new Set(array));
}

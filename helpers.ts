export function memoize<T extends (...args: any[]) => any>(fn: T): T {
    const cache: Map<string, ReturnType<T>> = new Map();
    return function(...args: Parameters<T>): ReturnType<T> {
        const key = JSON.stringify(args);
        if (cache.has(key)) {
            return cache.get(key) as ReturnType<T>;
        }
        const result = fn(...args);
        cache.set(key, result);
        return result;
    } as T;
}

export function throttle(func: Function, limit: number) {
    let lastFunc: ReturnType<typeof setTimeout>;
    let lastRan: number;
    return function(this: any) {
        const context = this;
        const args = arguments;
        if (!lastRan) {
            func.apply(context, args);
            lastRan = Date.now();
        } else {
            clearTimeout(lastFunc);
            lastFunc = setTimeout(function() {
                if (Date.now() - lastRan >= limit) {
                    func.apply(context, args);
                    lastRan = Date.now();
                }
            }, limit - (Date.now() - lastRan));
        }
    };
}
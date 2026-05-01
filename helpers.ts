export function debounce(func: Function, delay: number) {
    let timeoutId: NodeJS.Timeout;
    return function(...args: any[]) {
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        timeoutId = setTimeout(() => {
            func.apply(this, args);
        }, delay);
    };
}

export function throttle(func: Function, limit: number) {
    let lastFunc: NodeJS.Timeout;
    let lastRan: number;
    return function(...args: any[]) {
        const context = this;
        if (!lastRan) {
            func.apply(context, args);
            lastRan = Date.now();
        }
        if (lastFunc) {
            clearTimeout(lastFunc);
        }
        lastFunc = setTimeout(function() {
            if ((Date.now() - lastRan) >= limit) {
                func.apply(context, args);
                lastRan = Date.now();
            }
        }, limit - (Date.now() - lastRan));
    };
}

export function deepClone<T>(obj: T): T {
    return JSON.parse(JSON.stringify(obj));
}

export function isObject(obj: any): boolean {
    return obj !== null && typeof obj === 'object';
}

export function mergeDeep(target: any, source: any): any {
    if (isObject(target) && isObject(source)) {
        for (const key in source) {
            if (isObject(source[key])) {
                if (!(key in target)) Object.assign(target, { [key]: {} });
                mergeDeep(target[key], source[key]);
            } else {
                Object.assign(target, { [key]: source[key] });
            }
        }
    }
    return target;
}
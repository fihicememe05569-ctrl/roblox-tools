// A utility function to calculate distance between two points on a 2D plane
export function calculateDistance(x1: number, y1: number, x2: number, y2: number): number {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}

// A function to determine if a number is within a specified range
export function isInRange(value: number, min: number, max: number): boolean {
    return value >= min && value <= max;
}

// A function to debounce another function
export function debounce(func: Function, delay: number): Function {
    let timeoutId: NodeJS.Timeout;
    return function(...args: any[]) {
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        timeoutId = setTimeout(() => {
            func(...args);
        }, delay);
    };
}

// A function that generates a random integer within a range
export function getRandomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// A function to shuffle an array randomly
export function shuffleArray<T>(array: T[]): T[] {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}
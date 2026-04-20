/**
 * Generates a random integer between min and max (inclusive).
 * @param min - The minimum number in the range.
 * @param max - The maximum number in the range.
 * @returns A random integer between min and max.
 */
function getRandomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Shuffles an array in place using the Fisher-Yates algorithm.
 * @param array - The array to shuffle.
 * @returns The shuffled array.
 */
function shuffleArray<T>(array: T[]): T[] {
    for (let i = array.length - 1; i > 0; i--) {
        const j = getRandomInt(0, i);
        [array[i], array[j]] = [array[j], array[i]];  // Swap elements
    }
    return array;
}

/**
 * Pauses execution for a given number of milliseconds.
 * @param milliseconds - The time to wait in milliseconds.
 * @returns A promise that resolves after the timeout.
 */
function delay(milliseconds: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
}

export { getRandomInt, shuffleArray, delay };
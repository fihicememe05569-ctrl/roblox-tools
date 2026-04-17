/**
 * Combines two arrays, removing duplicates.
 *
 * @param arr1 - The first array.
 * @param arr2 - The second array.
 * @returns A new array containing unique elements from both input arrays.
 */
function combineUnique<T>(arr1: T[], arr2: T[]): T[] {
    const uniqueElements = new Set<T>([...arr1, ...arr2]);
    return Array.from(uniqueElements);
}

/**
 * Flattens a nested array.
 *
 * @param nestedArray - The array to flatten.
 * @returns A new flattened array.
 */
function flattenArray<T>(nestedArray: T[][]): T[] {
    return nestedArray.reduce<T[]>((acc, val) => acc.concat(val), []);
}

/**
 * Calculates the factorial of a number.
 *
 * @param num - The number to calculate the factorial for.
 * @returns The factorial of the given number.
 * @throws Error if num is negative.
 */
function factorial(num: number): number {
    if (num < 0) throw new Error('Negative numbers do not have factorials.');
    return num <= 1 ? 1 : num * factorial(num - 1);
}

export { combineUnique, flattenArray, factorial };